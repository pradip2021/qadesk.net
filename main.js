// QAdesk site — minimal, dependency-free interactions.
(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close the menu after tapping a link (mobile)
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Current year in the footer
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());

  // Click-to-zoom for screenshots (lightbox)
  var shots = document.querySelectorAll('.shot img');
  if (shots.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('aria-hidden', 'true');
    var full = document.createElement('img');
    full.alt = '';
    box.appendChild(full);
    document.body.appendChild(box);
    var closeBox = function () {
      box.classList.remove('open');
      box.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    shots.forEach(function (img) {
      img.addEventListener('click', function () {
        full.src = img.currentSrc || img.src;
        full.alt = img.alt || '';
        box.classList.add('open');
        box.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
    box.addEventListener('click', closeBox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeBox();
    });
  }
})();
