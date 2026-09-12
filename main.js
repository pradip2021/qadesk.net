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

  // Download link placeholder — wired to the real installer URL once available.
  var dl = document.querySelector('[data-download]');
  if (dl && dl.getAttribute('href') === '#') {
    dl.addEventListener('click', function (e) {
      e.preventDefault();
      alert('The download link will be wired up once the installer URL is set.');
    });
  }
})();
