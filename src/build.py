"""Monta o site: injeta cabeçalho, rodapé, metadados e o símbolo "M" oficial.

Uso:  python3 -I src/build.py [pasta-espelho]
Lê src/pages/*.html e escreve as páginas prontas em public/ (publicada pelo GitHub Pages).
Se informada, copia public/ para a pasta-espelho (útil para pré-visualizar localmente)."""
import hashlib, pathlib, re, shutil, sys

SRC = pathlib.Path(__file__).resolve().parent
OUT = SRC.parent / "public"
M = (OUT / "m-symbol.svg").read_text().replace("<svg ", '<svg aria-hidden="true" ', 1)

NAV = [("index.html", "Home"), ("pesquisa.html", "Pesquisa"), ("projetos.html", "Projetos"),
       ("noticias.html", "Notícias"), ("equipe.html", "Equipe"), ("contato.html", "Contato")]

# Regra: toda menção à Universidade, ao Centro e ao PPGA leva ao respectivo site.
# Os nomes mais longos vêm primeiro; "Programa de Pós-Graduação em Ciência da Informação" (USP) não casa.
PPGA = "https://www.mackenzie.br/pos-graduacao/mestrado-doutorado/sao-paulo-higienopolis/administracao-de-empresas"
INST = [("Universidade Presbiteriana Mackenzie", "https://www.mackenzie.br/"),
        ("Centro de Ciências Sociais e Aplicadas", "https://www.mackenzie.br/universidade/unidades-academicas/ccsa"),
        ("Programa de Pós-Graduação em Administração de Empresas", PPGA),
        ("Programa de Pós-Graduação em Administração", PPGA),
        ("Programa de Mestrado e Doutorado em Administração", PPGA)]
INST_RE = re.compile("|".join(re.escape(n) for n, _ in sorted(INST, key=lambda x: -len(x[0]))))
INST_URL = dict(INST)
SKIP = {"a", "title", "script", "style", "svg", "button", "textarea"}


def link_institutions(html):
    """Envolve em <a> as menções em texto corrido que ainda não são links."""
    out, stack = [], []
    for part in re.split(r"(<[^>]+>)", html):
        if part.startswith("<"):
            m = re.match(r"<(/?)([a-zA-Z0-9]+)", part)
            if m and m.group(2).lower() in SKIP and not part.endswith("/>"):
                if m.group(1):
                    if stack and stack[-1] == m.group(2).lower():
                        stack.pop()
                else:
                    stack.append(m.group(2).lower())
        elif not stack:
            part = INST_RE.sub(lambda m: f'<a class="ref" href="{INST_URL[m.group(0)]}" target="_blank" rel="noreferrer">{m.group(0)}</a>', part)
        out.append(part)
    return "".join(out)


def header(active):
    on = ' class="on"'
    links = "".join(f'<a href="{h}"{on if h == active else ""}>{t}</a>' for h, t in NAV)
    return (f'<header id="hdr"><a href="index.html" class="sig" aria-label="Laboratório de IA + Estratégia, Mackenzie">{M}'
            f'<span class="t"><small>Laboratório de</small><b>IA + Estratégia</b></span></a>'
            f'<nav id="nav">{links}</nav><button class="menu-btn" id="menuBtn" aria-expanded="false">Menu</button></header>')


FOOTER = (SRC / "footer.html").read_text().replace("{{M}}", M)
# Versão do CSS no link: força o navegador a baixar o estilo novo a cada mudança.
CSS_V = hashlib.md5((OUT / "site.css").read_bytes()).hexdigest()[:8]
SCRIPT = (SRC / "site.js").read_text()
SITE = "https://ai-lab-mackenzie.github.io/"
HEAD = ('<meta name="description" content="Laboratório de IA + Estratégia da Universidade Presbiteriana Mackenzie: '
        'pesquisa sobre inteligência artificial, estratégia e tomada de decisão nas organizações.">\n'
        '<link rel="icon" type="image/png" href="favicon.png">\n'
        '<link rel="apple-touch-icon" href="apple-touch-icon.png">\n'
        '<meta property="og:type" content="website">\n'
        '<meta property="og:site_name" content="Laboratório de IA + Estratégia · Mackenzie">\n'
        f'<meta property="og:image" content="{SITE}opengraph.jpg">\n'
        '<meta name="theme-color" content="#EA0029">')

for page in sorted((SRC / "pages").glob("*.html")):
    html = page.read_text()
    active = re.search(r"<!--\s*active:\s*(\S+)\s*-->", html)
    html = (html.replace("{{HEADER}}", header(active.group(1) if active else ""))
                .replace("{{FOOTER}}", FOOTER).replace("{{M}}", M)
                .replace("{{SCRIPT}}", f"<script>{SCRIPT}</script>"))
    html = link_institutions(html)
    html = html.replace('href="site.css"', f'href="site.css?v={CSS_V}"')
    html = html.replace('<meta name="viewport" content="width=device-width, initial-scale=1">',
                        '<meta name="viewport" content="width=device-width, initial-scale=1">\n' + HEAD, 1)
    if "—" in html:
        print(f"AVISO: travessão (—) em {page.name}")
    (OUT / page.name).write_text(html)
    print("ok", page.name)

if len(sys.argv) > 1:
    mirror = pathlib.Path(sys.argv[1])
    shutil.copytree(OUT, mirror, dirs_exist_ok=True)
    print("espelhado em", mirror)
