# tools.alanchristensen.dev

Free, browser-based developer tools. No account needed. No data leaves your machine.

## Tools

- JSON Formatter — pretty-print and validate JSON with syntax highlighting
- XML Formatter — pretty-print and indent XML markup
- Epoch Converter — convert Unix timestamps to human-readable dates

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
