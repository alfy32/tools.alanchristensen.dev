# Claude Instructions — tools.alanchristensen.dev

## Adding a new tool

When adding a new tool, update all three of these:

1. **Create `my-tool.html`** at the project root.
2. **`tools-nav.js`** — add an entry to the `TOOLS` array. This drives both the desktop side nav and the mobile hamburger menu on every page.
3. **`index.html`** — add a `<a href="my-tool.html" class="tool-card-item">` card to the `.tool-cards-grid` div.

## Cache-busting version

Shared assets (`style.css`, `nav.js`, `tools-nav.js`) are referenced with a `?v=N` query string to bust browser caches. **Bump the version number any time you modify one of those files.** Update the reference in every HTML file — all pages must use the same version or some will serve stale assets.

Current version: **3**

When bumping: find all `?v=N` references with `grep -r "?v=" --include="*.html"` and replace every occurrence with the new version.
