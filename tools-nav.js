(function () {
  var TOOLS = [
    { name: 'JSON Formatter',  url: 'json-formatter.html' },
    { name: 'XML Formatter',   url: 'xml-formatter.html' },
    { name: 'Time Converter', url: 'epoch-converter.html' },
  ];

  function isActive(filename) {
    var p = location.pathname;
    return p.endsWith('/' + filename) || p.endsWith('/' + filename.replace('.html', ''));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var shell = document.getElementById('tools-shell');
    if (!shell) return;
    var main = document.getElementById('tools-main');

    // Desktop side nav
    var nav = document.createElement('nav');
    nav.id = 'tools-sidenav';
    nav.setAttribute('aria-label', 'Tools');
    var lbl = document.createElement('div');
    lbl.className = 'sidenav-label';
    lbl.textContent = 'Tools';
    nav.appendChild(lbl);
    TOOLS.forEach(function (t) {
      var a = document.createElement('a');
      a.href = t.url;
      a.textContent = t.name;
      if (isActive(t.url)) a.classList.add('active');
      nav.appendChild(a);
    });
    shell.insertBefore(nav, main);

    // Mobile hamburger menu — inject tool links before the dark mode item
    var mobileMenu = document.getElementById('nav-mobile-menu');
    if (mobileMenu) {
      var darkItem = document.getElementById('mobile-dark-item');
      var divider = document.createElement('div');
      divider.className = 'nav-menu-divider';
      mobileMenu.insertBefore(divider, darkItem);
      TOOLS.forEach(function (t) {
        var a = document.createElement('a');
        a.href = t.url;
        a.className = 'nav-menu-item' + (isActive(t.url) ? ' active' : '');
        a.textContent = t.name;
        mobileMenu.insertBefore(a, divider);
      });
    }
  });
})();
