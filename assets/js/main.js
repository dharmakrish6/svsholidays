const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

const hamburger = document.getElementById('hamburgerBtn');
const navPanel = document.getElementById('navPanel');
const navBackdrop = document.getElementById('navBackdrop');

function closeNav() {
  hamburger.classList.remove('open');
  navPanel.classList.remove('nav-open');
  navBackdrop.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-locked');
}
function openNav() {
  hamburger.classList.add('open');
  navPanel.classList.add('nav-open');
  navBackdrop.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('nav-locked');
}
if (hamburger && navPanel && navBackdrop) {
  hamburger.addEventListener('click', () => {
    navPanel.classList.contains('nav-open') ? closeNav() : openNav();
  });
  navPanel.querySelectorAll('a, button').forEach(el => el.addEventListener('click', closeNav));
  navBackdrop.addEventListener('click', closeNav);
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) closeNav();
  });
}

const pkgTabs = document.querySelectorAll('.pkg-tab');
pkgTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    pkgTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    document.querySelectorAll('.pkg-grid').forEach(grid => grid.classList.remove('is-active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.dataset.target).classList.add('is-active');
  });
});

document.querySelectorAll('.pkg-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a.text-cta')) return;
    card.classList.toggle('flipped');
  });
});

const visitEl = document.getElementById('siteVisits');
if (visitEl) {
  fetch('https://abacus.jasoncameron.dev/hit/svsignatureholidays-com/visits')
    .then(res => res.json())
    .then(data => {
      visitEl.textContent = `Visitors: ${data.value.toLocaleString()}`;
    })
    .catch(() => {
      visitEl.remove();
    });
}
