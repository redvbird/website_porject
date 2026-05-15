(function () {
  'use strict';

  // 移动端导航开关
  var navToggle = document.querySelector('.site-nav__toggle');
  var navList = document.getElementById('primary-nav');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navList.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && !e.target.closest('.site-nav__has-sub > a')) {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 当前页高亮(基于 URL 匹配)
  var navLinks = document.querySelectorAll('.site-nav__list > li > a');
  var path = window.location.pathname;
  for (var n = 0; n < navLinks.length; n++) {
    var href = navLinks[n].getAttribute('href');
    if (!href) continue;
    if (
      (href === '/' && (path === '/' || path === '/index.html')) ||
      (href !== '/' && path.indexOf(href) === 0)
    ) {
      navLinks[n].parentElement.classList.add('is-active');
    }
  }

  // 进入视口 fade-in
  var targets = document.querySelectorAll('.section, .hero, .page-hero, .cta-strip');
  for (var i = 0; i < targets.length; i++) {
    targets[i].classList.add('fade-in');
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    for (var j = 0; j < targets.length; j++) {
      io.observe(targets[j]);
    }
  } else {
    for (var k = 0; k < targets.length; k++) {
      targets[k].classList.add('is-visible');
    }
  }
})();
