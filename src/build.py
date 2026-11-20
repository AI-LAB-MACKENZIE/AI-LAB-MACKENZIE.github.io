"""Monta o site: injeta cabeçalho, rodapé, metadados e o símbolo "M" oficial.

Uso:  python3 -I src/build.py [pasta-espelho]
Lê src/pages/*.html e escreve as páginas prontas em public/ (publicada pelo GitHub Pages).
Versão em inglês: src/pages/en/*.html (mesmos nomes de arquivo) vira public/en/, com o seletor PT/EN no menu.
Se informada, copia public/ para a pasta-espelho (útil para pré-visualizar localmente)."""
import hashlib, pathlib, re, shutil, sys

SRC = pathlib.Path(__file__).resolve().parent
OUT = SRC.parent / "public"
M = (OUT / "m-symbol.svg").read_text().replace("<svg ", '<svg aria-hidden="true" ', 1)

NAV = {"pt": [("index.html", "Home"), ("pesquisa.html", "Atuação"), ("producoes.html", "Produções"),
              ("noticias.html", "Notícias"), ("equipe.html", "Equipe"), ("contato.html", "Contato")],
       "en": [("index.html", "Home"), ("pesquisa.html", "What we do"), ("producoes.html", "Work"),
              ("noticias.html", "News"), ("equipe.html", "Team"), ("contato.html", "Contact")]}

# Regra: toda menção à Universidade, ao Centro (Escola de Negócios) e ao PPGA leva ao respectivo site.
# Os nomes mais longos vêm primeiro; "Programa de Pós-Graduação em Ciência da Informação" (USP) não casa.
PPGA = "https://www.mackenzie.br/pos-graduacao/mestrado-doutorado/sao-paulo-higienopolis/administracao-de-empresas"
INST = [("Universidade Presbiteriana Mackenzie", "https://www.mackenzie.br/"),
        ("Centro de Ciências Sociais e Aplicadas", "https://www.mackenzie.br/universidade/unidades-academicas/ccsa"),
        ("Escola de Negócios Mackenzie", "https://www.mackenzie.br/universidade/unidades-academicas/ccsa"),
        ("Escola de Negócios", "https://www.mackenzie.br/universidade/unidades-academicas/ccsa"),   # = CCSA
        ("Programa de Pós-Graduação em Administração de Empresas", PPGA),
        ("Programa de Pós-Graduação em Administração", PPGA),
        ("Programa de Mestrado e Doutorado em Administração", PPGA),
        # Versão em inglês
        ("Mackenzie Presbyterian University", "https://www.mackenzie.br/"),
        ("Center for Applied Social Sciences", "https://www.mackenzie.br/universidade/unidades-academicas/ccsa"),
        ("Mackenzie Business School", "https://www.mackenzie.br/universidade/unidades-academicas/ccsa"),
        ("Graduate Program in Business Administration", PPGA),
        ("Master's and PhD Program in Business Administration", PPGA)]
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
STAGES_EN = [
    ("Ideation and concept", "Problem-solution fit, initial value proposition, first market estimate.", "TRL 1–2 · IRL 1–2"),
    ("Pre-seed and validation", "Low-fidelity prototypes, conversations with potential users, competitor analysis.", "TRL 3–4 · IRL 3–4"),
    ("Seed and MVP", "Minimum viable product launched, first users and real pilots.", "TRL 5–6 · IRL 5–6"),
    ("Early growth", "Proven product-market fit, repeatable model, predictable costs.", "TRL 7–8 · IRL 7–8"),
    ("Scale", "High-volume operation, optimized channels, geographic expansion.", "TRL 9 · IRL 9"),
    ("Maturity", "Established market position, predictable revenue, corporate governance.", "Continuous innovation"),
]


def stage(m, lang="pt"):
    now, goal = int(m.group(1)), int(m.group(2))
    en = lang == "en"
    cells = []
    for i, (name, desc, lvl) in enumerate(STAGES_EN if en else STAGES, 1):
        cls, tag = "", ""
        if i == now:
            cls, tag = " now", f'<span class="st-tag">{"Today" if en else "Hoje"}</span>'
        elif i == goal:
            cls, tag = " goal", f'<span class="st-tag">{"Target" if en else "Meta"}</span>'
        elif now < i < goal:
            cls = " path"
        elif i < now:
            cls = " past"
        cells.append(f'<li class="st{cls}">{tag}<span class="st-n">{i:02d}</span><b>{name}</b><p>{desc}</p><span class="st-lvl">{lvl}</span></li>')
    label = f"Current stage: phase {now}. Target: phase {goal}." if en else f"Estágio atual: fase {now}. Meta: fase {goal}."
    return f'<ol class="stages" aria-label="{label}">{"".join(cells)}</ol>'


def header(active, lang, name):
    on = ' class="on"'
    links = "".join(f'<a href="{h}"{on if h == active else ""}>{t}</a>' for h, t in NAV[lang])
    if lang == "en":
        sig = ("AI + Strategy Lab, Mackenzie", "Laboratory of", "AI + Strategy")
        switch = f'<a class="lang" href="../{name}" hreflang="pt-BR" lang="pt-BR" title="Versão em português">PT</a>'
    else:
        sig = ("Laboratório de IA + Estratégia, Mackenzie", "Laboratório de", "IA + Estratégia")
        switch = f'<a class="lang" href="en/{name}" hreflang="en" lang="en" title="English version">EN</a>'
    return (f'<header id="hdr"><a href="index.html" class="sig" aria-label="{sig[0]}">{M}'
            f'<span class="t"><small>{sig[1]}</small><b>{sig[2]}</b></span></a>'
            f'<nav id="nav">{links}{switch}</nav><button class="menu-btn" id="menuBtn" aria-expanded="false">Menu</button></header>')


FOOTER = {"pt": (SRC / "footer.html").read_text().replace("{{M}}", M),
          "en": (SRC / "footer.en.html").read_text().replace("{{M}}", M)}
# Versão do CSS no link: força o navegador a baixar o estilo novo a cada mudança.
CSS_V = hashlib.md5((OUT / "site.css").read_bytes()).hexdigest()[:8]
SCRIPT = (SRC / "site.js").read_text()
SITE = "https://ai-lab-mackenzie.github.io/"
DESC = {"pt": ("Laboratório de IA + Estratégia da Universidade Presbiteriana Mackenzie: pesquisa sobre inteligência "
               "artificial, estratégia e tomada de decisão nas organizações.", "Laboratório de IA + Estratégia · Mackenzie", "pt_BR"),
        "en": ("AI + Strategy Lab at Mackenzie Presbyterian University: research on artificial intelligence, "
               "strategy and decision-making in organizations.", "AI + Strategy Lab · Mackenzie", "en_US")}


def head(lang, name):
    desc, site_name, locale = DESC[lang]
    pt_url, en_url = SITE + name.replace("index.html", ""), SITE + "en/" + name.replace("index.html", "")
    return (f'<meta name="description" content="{desc}">\n'
            '<link rel="icon" type="image/png" href="favicon.png">\n'
            '<link rel="apple-touch-icon" href="apple-touch-icon.png">\n'
            f'<link rel="alternate" hreflang="pt-BR" href="{pt_url}">\n'
            f'<link rel="alternate" hreflang="en" href="{en_url}">\n'
            '<meta property="og:type" content="website">\n'
            f'<meta property="og:site_name" content="{site_name}">\n'
            f'<meta property="og:locale" content="{locale}">\n'
            f'<meta property="og:image" content="{SITE}opengraph.jpg">\n'
            '<meta name="theme-color" content="#EA0029">')


# Páginas em /en/ ficam um nível abaixo: arquivos comuns (imagens, CSS, ícones) ganham "../".
ASSET_RE = re.compile(r"""((?:src|href|srcset)=["']|url\(["']?)(?=img/|site\.css|favicon\.png|apple-touch-icon\.png|m-symbol\.svg|opengraph\.jpg)""")

for lang, folder, out in (("pt", SRC / "pages", OUT), ("en", SRC / "pages" / "en", OUT / "en")):
    out.mkdir(exist_ok=True)
    for page in sorted(folder.glob("*.html")):
        html = page.read_text()
        active = re.search(r"<!--\s*active:\s*(\S+)\s*-->", html)
        html = (html.replace("{{HEADER}}", header(active.group(1) if active else "", lang, page.name))
                    .replace("{{FOOTER}}", FOOTER[lang]).replace("{{M}}", M)
                    .replace("{{SCRIPT}}", f"<script>{SCRIPT}</script>"))
        html = re.sub(r"\{\{STAGE atual=(\d) meta=(\d)\}\}", lambda m: stage(m, lang), html)
        html = link_institutions(html)
        html = html.replace('href="site.css"', f'href="site.css?v={CSS_V}"')
        html = html.replace('<meta name="viewport" content="width=device-width, initial-scale=1">',
                            '<meta name="viewport" content="width=device-width, initial-scale=1">\n' + head(lang, page.name), 1)
        if lang == "en":
            html = ASSET_RE.sub(r"\1../", html)
            if not (SRC / "pages" / page.name).exists():
                print(f"AVISO: en/{page.name} não tem versão em português")
        elif not (SRC / "pages" / "en" / page.name).exists():
            print(f"AVISO: {page.name} ainda não tem versão em inglês (o botão EN vai dar 404)")
        if "—" in html:
            print(f"AVISO: travessão (—) em {lang}/{page.name}")
        (out / page.name).write_text(html)
        print("ok", lang, page.name)

if len(sys.argv) > 1:
    mirror = pathlib.Path(sys.argv[1])
    shutil.copytree(OUT, mirror, dirs_exist_ok=True)
    print("espelhado em", mirror)
