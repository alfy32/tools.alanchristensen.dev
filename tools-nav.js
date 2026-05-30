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

    var mob = document.createElement('div');
    mob.id = 'tools-mobile-nav';
    var sel = document.createElement('select');
    sel.setAttribute('aria-label', 'Select tool');
    var hasActive = false;
    TOOLS.forEach(function (t) {
      var opt = document.createElement('option');
      opt.value = t.url;
      opt.textContent = t.name;
      if (isActive(t.url)) { opt.selected = true; hasActive = true; }
      sel.appendChild(opt);
    });
    if (!hasActive) {
      var ph = document.createElement('option');
      ph.textContent = 'Choose a tool…';
      ph.value = '';
      ph.disabled = true;
      ph.selected = true;
      sel.prepend(ph);
    }
    sel.addEventListener('change', function () { if (this.value) location.href = this.value; });
    mob.appendChild(sel);

    shell.insertBefore(nav, main);
    shell.insertBefore(mob, main);
  });
})();
