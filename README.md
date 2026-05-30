# tools.alanchristensen.dev

Free, browser-based developer tools. No account needed. No data leaves your machine.

## Tools

- JSON Formatter — pretty-print and validate JSON with syntax highlighting
- XML Formatter — pretty-print and indent XML markup
- Time Converter — convert Unix timestamps to human-readable dates (seconds, milliseconds, or ISO 8601)
- Base64 — encode plain text to Base64 or decode Base64 back to text; auto-detects direction
- UUID Generator — generate one or many version 4 UUIDs

## Stack

Plain HTML, CSS, and vanilla JavaScript. No framework, no build step, no dependencies.

## Adding a tool

1. Create `my-tool.html` at the root
2. Add an entry to `tools-nav.js`

That's it — the side nav and mobile dropdown update automatically.

## Running locally

Open any `.html` file directly in a browser, or serve the root with any static file server:

```
npx serve .
```

## Hosting

GitHub Pages at [tools.alanchristensen.dev](https://tools.alanchristensen.dev). Push to `main` and it deploys automatically.
