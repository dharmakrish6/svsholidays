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

  // media slider
  const mediaSliders = document.querySelectorAll('[data-media-slider]');
  mediaSliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('.media-slide'));
    if (!slides.length) return;

    let activeIndex = 0;
    let autoplayTimer;
    const dots = slider.querySelector('.slider-dots');
    const prevBtn = slider.querySelector('[data-slider-prev]');
    const nextBtn = slider.querySelector('[data-slider-next]');

    const updateDots = () => {
      if (!dots) return;
      dots.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('is-active', index === activeIndex);
      });
    };

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === activeIndex);
        const video = slide.querySelector('video');
        if (!video) return;
        if (slideIndex === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
      updateDots();
    };

    const startAutoplay = () => {
      clearInterval(autoplayTimer);
      autoplayTimer = window.setInterval(() => {
        showSlide(activeIndex + 1);
      }, 6000);
    };

    if (dots) {
      dots.innerHTML = slides.map((_, index) => `<button class="slider-dot${index === 0 ? ' is-active' : ''}" type="button" aria-label="Show slide ${index + 1}"></button>`).join('');
      dots.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
          showSlide(index);
          startAutoplay();
        });
      });
    }

    prevBtn?.addEventListener('click', () => {
      showSlide(activeIndex - 1);
      startAutoplay();
    });
    nextBtn?.addEventListener('click', () => {
      showSlide(activeIndex + 1);
      startAutoplay();
    });

    slider.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    slider.addEventListener('mouseleave', startAutoplay);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearInterval(autoplayTimer);
      else startAutoplay();
    });

    showSlide(0);
    startAutoplay();
  });

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
