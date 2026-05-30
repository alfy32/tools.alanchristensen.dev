# tools.alanchristensen.dev — Site Design

**Date:** 2026-05-30
**Status:** Implemented

## Goal

A tools site hosted at `tools.alanchristensen.dev`. Hosts free, browser-only developer utilities anyone can use. The site should be easy to extend — adding a new tool should take minutes.

## Audience & Tone

- Developers and anyone who finds a tool useful
- Light mode by default, dark mode toggle, clean and readable without being flashy

---

## Architecture

**Stack:** Plain HTML, CSS, and vanilla JavaScript. No framework, no build step.

**Rationale:** All tools run entirely in the browser. No backend needed. A static site avoids dependency churn, deploys instantly, and is trivial to maintain.

**File structure:**

```
tools.alanchristensen.dev/
├── index.html              # Tools landing — intro text + tool cards
├── json-formatter.html
├── xml-formatter.html
├── epoch-converter.html
├── style.css               # Shared styles, dark mode, layout
├── nav.js                  # Shared site header injected via JS
├── tools-nav.js            # Tools side nav injected via JS (tool list + active state)
└── CNAME                   # GitHub Pages custom domain config
```

**Adding a new tool:** Create `my-tool.html` at root, add an entry to the tool list in `tools-nav.js`. No routing config, no build step, no other changes needed.

---

## Pages

### Tools Section Layout

All pages share a consistent two-column shell:

```
┌─────────────────────────────────────────────────┐
│  [site nav — name + dark mode toggle]           │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│  Tool list   │   Main content area              │
│  (side nav)  │                                  │
│              │                                  │
│  JSON Fmt    │   (tool UI or tools landing)     │
│  XML Fmt     │                                  │
│  Epoch Conv  │                                  │
│              │                                  │
└──────────────┴──────────────────────────────────┘
```

**Side nav (desktop ≥ 768px):** Fixed-width left column, always visible. Lists all tools by name. The active tool is highlighted. Clicking a tool navigates to that tool's page.

**Top nav (mobile < 768px):** Side nav collapses. A compact `<select>` dropdown at the top of the content area lets the user switch tools.

`tools-nav.js` injects the side nav markup into every page and marks the current page active based on `location.pathname`. The tool list lives in one place in that file.

### Tools Landing (`index.html`)

Shown in the main content area when no specific tool is selected. Contains:
- A short intro ("Free, browser-only utilities for developers — no data leaves your machine")
- A grid of tool cards (name + one-line description)

### Tool Pages

Main content area shows the tool UI. Layout within the content area:
- Input area on the left (or top on mobile)
- Output area on the right (or bottom on mobile)
- Action button (Format, Convert, etc.)
- Copy-to-clipboard on output

**Launch tools:**

| Tool | Input | Output |
|------|-------|--------|
| JSON Formatter | Raw JSON string | Pretty-printed, syntax-highlighted JSON |
| XML Formatter | Raw XML string | Pretty-printed, indented XML |
| Epoch Converter | Unix timestamp (auto-detects ms vs s based on magnitude) | Human-readable local datetime and UTC |

---

## Visual Design

- **Font:** System font stack — no external fonts, loads instantly, looks native on every OS
- **Colors:** White background, dark text, single muted accent (blue or slate). Dark mode inverts bg/text, keeps accent
- **Dark mode:** Toggle button in nav, preference persisted to `localStorage`
- **Layout:** Full-width shell with a ~200px fixed side nav and the remaining width for content
- **Nav:** Site name/logo left, dark mode toggle right. Side nav handles tool switching; no breadcrumb needed since the side nav shows context

---

## Hosting

| Concern | Solution | Cost |
|---------|----------|------|
| Hosting | GitHub Pages | Free |
| CI/CD | GitHub Pages auto-deploy on push to `main` | Free |
| Custom domain | Registered | ~$10–15/yr |
| HTTPS | GitHub Pages provides it automatically for custom domains | Free |
| Backend (if ever needed) | Cloudflare Workers — 100k requests/day free tier | Free / pay-per-use |

**Domain:** `tools.alanchristensen.dev`

**GitHub repo:** `github.com/alfy32/tools.alanchristensen.dev`

**Deployment:** Push to `main` → GitHub Pages serves it. No CI config needed for a static site.

---

## Extensibility

The site is designed to grow incrementally:
- New tool = one new HTML file at root + one entry in `tools-nav.js` — the side nav and mobile dropdown update automatically everywhere
- Shared styles and nav come from `style.css`, `nav.js`, and `tools-nav.js` — update once, applies everywhere
- If a future tool needs a backend call, add a Cloudflare Worker endpoint and call it from the tool's JS
