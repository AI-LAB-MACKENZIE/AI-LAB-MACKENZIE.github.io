# Laboratório de IA + Estratégia · Mackenzie

Site do **Laboratório de IA + Estratégia** da Escola de Negócios Mackenzie, Centro de Ciências Sociais e Aplicadas da Universidade Presbiteriana Mackenzie. O laboratório pesquisa inteligência artificial aplicada à estratégia, à tomada de decisão, à inovação, à transformação digital e ao comportamento organizacional.

🔗 **Acesse o site:** https://ai-lab-mackenzie.github.io/

## Como o site é feito

Site estático em HTML e CSS, sem framework, seguindo o Manual de Identidade Visual Mackenzie (vermelho `#EA0029`, fonte Roboto, símbolo "M" oficial).

```
src/
  pages/      uma página por arquivo, com marcadores {{HEADER}}, {{FOOTER}} e {{SCRIPT}}
  footer.html rodapé comum
  site.js     menu, abas, animações e redirecionamento dos links do site antigo
  build.py    monta as páginas
public/       o que vai ao ar: páginas geradas, site.css, imagens
```

`build.py` injeta cabeçalho, rodapé e metadados em cada página e transforma em link toda menção à Universidade Presbiteriana Mackenzie, ao Centro de Ciências Sociais e Aplicadas e ao Programa de Pós-Graduação em Administração de Empresas.

## Editar e publicar

1. Edite `src/pages/*.html`, `src/footer.html`, `src/site.js` ou `public/site.css`.
2. Gere as páginas: `python3 -I src/build.py`
3. Faça commit e push na branch `main`. O GitHub Actions gera o site de novo e publica no GitHub Pages.

O formulário de contato envia as mensagens para ailabmack@gmail.com pelo [FormSubmit](https://formsubmit.co/).
