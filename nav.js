(function () {
  // Capture before any async callback — document.currentScript is null after execution
  var scriptSrc = document.currentScript && document.currentScript.src;
  var rootHref = scriptSrc ? scriptSrc.slice(0, scriptSrc.lastIndexOf('/') + 1) : '/';

  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));

  function updateToggle() {
    const btn = document.getElementById('dark-toggle');
    if (!btn) return;
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = dark ? 'Light mode' : 'Dark mode';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const header = document.createElement('header');
    header.id = 'site-header';
    header.innerHTML =
      '<a class="site-name" href="' + rootHref + '">Alan Christensen</a>' +
      '<button id="dark-toggle"></button>';
    document.body.prepend(header);

    updateToggle();

    document.getElementById('dark-toggle').addEventListener('click', function () {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = dark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateToggle();
    });
  });
})();
