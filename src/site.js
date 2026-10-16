(() => {
  // Links do site antigo (rotas com #/...) levam à página nova correspondente.
  const OLD = { '#/team': 'equipe.html', '#/news': 'noticias.html', '#/news/anpad-articles': 'noticia-anpad.html',
    '#/news/ai-lab-approved': 'noticia-aprovacao.html', '#/results': 'projetos.html', '#/contact': 'contato.html',
    '#/repos': 'repositorios.html', '#/': 'index.html' };
  if (OLD[location.hash]) { location.replace(OLD[location.hash]); return; }

  const hdr = document.getElementById('hdr');
  const hero = document.querySelector('.hero, .page-hero');
  const limit = () => hero ? hero.offsetHeight - 90 : -1;
  const onScroll = () => hdr.classList.toggle('solid', scrollY > limit());
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const btn = document.getElementById('menuBtn');
  btn.addEventListener('click', () => {
    const open = hdr.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Fechar' : 'Menu';
  });

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });

  // Abas (Projetos, Equipe): trocam o conteúdo no lugar, sem rolar a página.
  const bar = document.querySelector('.tabs[role="tablist"]');
  let tabbed = false;
  if (bar) {
    const tabs = [...bar.querySelectorAll('a')];
    const panels = tabs.map(a => document.querySelector(a.getAttribute('href')));
    const select = (i, fromClick) => {
      tabs.forEach((a, k) => { a.classList.toggle('on', k === i); a.setAttribute('aria-selected', k === i); });
      panels.forEach((p, k) => { p.hidden = k !== i; });
      history.replaceState(null, '', tabs[i].getAttribute('href'));
      const top = bar.getBoundingClientRect().top + scrollY - 70;
      if (fromClick && scrollY > top) scrollTo({ top, behavior: 'instant' });
    };
    tabs.forEach((a, i) => {
      a.setAttribute('role', 'tab');
      a.addEventListener('click', e => { e.preventDefault(); select(i, true); });
    });
    const start = Math.max(0, tabs.findIndex(a => a.getAttribute('href') === location.hash));
    select(start, false);
    if (location.hash && tabs[start].getAttribute('href') === location.hash) {
      tabbed = true;
      addEventListener('load', () => setTimeout(() => scrollTo({ top: bar.getBoundingClientRect().top + scrollY - 70, behavior: 'instant' }), 60));
    }
  }

  addEventListener('load', () => {
    const t = !tabbed && location.hash && document.querySelector(location.hash);
    if (t) setTimeout(() => t.scrollIntoView(), 60);
  });
})();
