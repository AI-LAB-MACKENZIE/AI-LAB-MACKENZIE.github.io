"""Monta o site: injeta cabeçalho, rodapé, metadados e o símbolo "M" oficial.

Uso:  python3 -I src/build.py [pasta-espelho]
Lê src/pages/*.html e escreve as páginas prontas em public/ (publicada pelo GitHub Pages).
Se informada, copia public/ para a pasta-espelho (útil para pré-visualizar localmente)."""
import hashlib, pathlib, re, shutil, sys

SRC = pathlib.Path(__file__).resolve().parent
OUT = SRC.parent / "public"
M = (OUT / "m-symbol.svg").read_text().replace("<svg ", '<svg aria-hidden="true" ', 1)

NAV = [("index.html", "Home"), ("pesquisa.html", "Atuação"), ("producoes.html", "Produções"),
       ("noticias.html", "Notícias"), ("equipe.html", "Equipe"), ("contato.html", "Contato")]

# Regra: toda menção à Universidade, ao Centro (Escola de Negócios) e ao PPGA leva ao respectivo site.
# Os nomes mais longos vêm primeiro; "Programa de Pós-Graduação em Ciência da Informação" (USP) não casa.
PPGA = "https://www.mackenzie.br/pos-graduacao/mestrado-doutorado/sao-paulo-higienopolis/administracao-de-empresas"
INST = [("Universidade Presbiteriana Mackenzie", "https://www.mackenzie.br/"),
        ("Centro de Ciências Sociais e Aplicadas", "https://www.mackenzie.br/universidade/unidades-academicas/ccsa"),
        ("Escola de Negócios Mackenzie", "https://www.mackenzie.br/universidade/unidades-academicas/ccsa"),
        ("Escola de Negócios", "https://www.mackenzie.br/universidade/unidades-academicas/ccsa"),   # = CCSA
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


# Estágio de inovação (Unified Concept-to-Market Innovation Taxonomy). Uso na página: {{STAGE atual=2 meta=3}}
STAGES = [
    ("Ideação e conceito", "Encaixe entre problema e solução, proposta de valor inicial, primeira estimativa de mercado.", "TRL 1–2 · IRL 1–2"),
    ("Pré-seed e validação", "Protótipos de baixa fidelidade, conversa com potenciais usuários, análise da concorrência.", "TRL 3–4 · IRL 3–4"),
    ("Seed e MVP", "Produto mínimo viável lançado, primeiros usuários e pilotos reais.", "TRL 5–6 · IRL 5–6"),
    ("Crescimento inicial", "Encaixe entre produto e mercado comprovado, modelo repetível, custos previsíveis.", "TRL 7–8 · IRL 7–8"),
    ("Escala", "Operação em grande volume, canais otimizados, expansão geográfica.", "TRL 9 · IRL 9"),
    ("Maturidade", "Posição consolidada no mercado, receitas previsíveis, governança corporativa.", "Inovação contínua"),
]


def stage(m):
    now, goal = int(m.group(1)), int(m.group(2))
    cells = []
    for i, (name, desc, lvl) in enumerate(STAGES, 1):
        cls, tag = "", ""
        if i == now:
            cls, tag = " now", '<span class="st-tag">Hoje</span>'
        elif i == goal:
            cls, tag = " goal", '<span class="st-tag">Meta</span>'
        elif now < i < goal:
            cls = " path"
        elif i < now:
            cls = " past"
        cells.append(f'<li class="st{cls}">{tag}<span class="st-n">{i:02d}</span><b>{name}</b><p>{desc}</p><span class="st-lvl">{lvl}</span></li>')
    return f'<ol class="stages" aria-label="Estágio atual: fase {now}. Meta: fase {goal}.">{"".join(cells)}</ol>'


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
    html = re.sub(r"\{\{STAGE atual=(\d) meta=(\d)\}\}", stage, html)
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
