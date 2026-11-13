(() => {
  const header = document.querySelector('.site-header');
  const btn = document.querySelector('.menu-btn');

  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (btn) {
    btn.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        btn.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Filtro de categorías del blog
  const filterBtns = document.querySelectorAll('.filters button');
  filterBtns.forEach(b => b.addEventListener('click', () => {
    const cat = b.dataset.filter;
    filterBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    document.querySelectorAll('.posts .post').forEach(p => {
      p.hidden = cat !== 'all' && p.dataset.cat !== cat;
    });
  }));

  // Aparición suave al hacer scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
