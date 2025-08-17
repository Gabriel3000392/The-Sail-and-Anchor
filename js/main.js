// js/main.js
(function(){
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if(!btn || !nav) return;

  // set ARIA ties
  btn.setAttribute('aria-controls', 'siteNav');
  btn.setAttribute('aria-expanded', 'false');

  const toggle = () => {
    const willOpen = !nav.classList.contains('show');
    nav.classList.toggle('show', willOpen);
    btn.setAttribute('aria-expanded', String(willOpen));
  };

  // open/close on button tap
  btn.addEventListener('click', toggle);

  // close when a link is tapped
  nav.addEventListener('click', e => {
    const link = e.target.closest('a');
    if(link && nav.classList.contains('show')){
      nav.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // close on Escape
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && nav.classList.contains('show')){
      nav.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });

  // optional: close if you tap outside the menu
  document.addEventListener('click', e => {
    const clickInside = nav.contains(e.target) || btn.contains(e.target);
    if(!clickInside && nav.classList.contains('show')){
      nav.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Simple lightbox for Gallery
(function(){
  const grid = document.querySelector('.gallery-grid');
  const dlg = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');

  if(!grid || !dlg || !img) return;

  grid.addEventListener('click', e => {
    const a = e.target.closest('a');
    if(!a) return;
    e.preventDefault();
    img.src = a.getAttribute('href');
    img.alt = a.querySelector('img')?.alt || '';
    dlg.showModal();
  });

  const close = () => dlg.open && dlg.close();
  closeBtn?.addEventListener('click', close);
  dlg.addEventListener('click', e => {
    // click outside image closes
    const rect = img.getBoundingClientRect();
    const inImg = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if(!inImg) close();
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') close();
  });
})();