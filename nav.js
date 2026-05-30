(function () {
  // Capture before any async callback — document.currentScript is null after execution
  var scriptSrc = document.currentScript && document.currentScript.src;
  var rootHref = scriptSrc ? scriptSrc.slice(0, scriptSrc.lastIndexOf('/') + 1) : '/';

  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function updateToggle() {
    var btn = document.getElementById('dark-toggle');
    if (btn) {
      btn.textContent = isDark() ? 'Light mode' : 'Dark mode';
      btn.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
    }
    var mobileBtn = document.getElementById('mobile-dark-item');
    if (mobileBtn) mobileBtn.textContent = isDark() ? 'Light mode' : 'Dark mode';
  }

  function toggleTheme() {
    var next = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggle();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var header = document.createElement('header');
    header.id = 'site-header';
    header.innerHTML =
      '<a class="site-name" href="' + rootHref + '">Alan Christensen</a>' +
      '<div class="header-actions">' +
        '<button id="dark-toggle"></button>' +
        '<button id="nav-hamburger" aria-label="Open menu" aria-expanded="false">&#9776;</button>' +
      '</div>';
    document.body.prepend(header);

    var menu = document.createElement('div');
    menu.id = 'nav-mobile-menu';
    var darkBtn = document.createElement('button');
    darkBtn.id = 'mobile-dark-item';
    darkBtn.className = 'nav-menu-item';
    menu.appendChild(darkBtn);
    header.appendChild(menu);

    updateToggle();

    document.getElementById('dark-toggle').addEventListener('click', toggleTheme);
    darkBtn.addEventListener('click', function () { toggleTheme(); closeMenu(); });

    var hamburger = document.getElementById('nav-hamburger');
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = menu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    document.addEventListener('click', closeMenu);
    menu.addEventListener('click', function (e) { e.stopPropagation(); });

    function closeMenu() {
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    }
  });
})();
