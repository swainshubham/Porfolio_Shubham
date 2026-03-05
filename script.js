(function () {
  'use strict';

  // ----- Year in footer -----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Nav scroll effect -----
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile menu -----
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Cursor glow (desktop only) -----
  var cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', function () {
      cursorGlow.style.opacity = '0';
    });
  }

  // ----- Scroll-triggered animations (AOS-style) -----
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(function (el) {
    observer.observe(el);
  });

  // ----- Active nav link on scroll -----
  var sections = document.querySelectorAll('.section, .hero');
  function setActiveNav() {
    var scrollY = window.scrollY;
    sections.forEach(function (section) {
      var id = section.getAttribute('id');
      if (!id) return;
      var top = section.offsetTop - 100;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(function (a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) a.classList.add('active');
        });
      }
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();
})();
