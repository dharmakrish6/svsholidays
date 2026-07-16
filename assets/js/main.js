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
