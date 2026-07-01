// SV Signature Holidays — shared site behaviour

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const heroExists = document.querySelector('.hero, .page-hero');

  function onScroll(){
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else if (!header.classList.contains('solid')) header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');
  if (menuToggle && mobileMenu){
    menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (closeMenu && mobileMenu){
    closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  if (mobileMenu){
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // contact form (static demo — no backend)
  const contactForm = document.getElementById('enquiryForm');
  if (contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successBox = document.getElementById('formSuccess');
      contactForm.reset();
      if (successBox) successBox.classList.add('show');
      contactForm.querySelectorAll('input,textarea,select').forEach(el => el.blur());
    });
  }
});
