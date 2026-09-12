# QAdesk website (qadesk.net)

Marketing site for **QAdesk** — the offline translation quality-assurance desktop app.

## Stack
Plain static site — HTML, CSS, vanilla JS. No build step, no framework, no dependencies.
Deploy the folder to any static host (the qadesk.net server, Netlify, GitHub Pages, Cloudflare Pages).

## Pages
- `index.html` — home / landing page
- `download.html` — download + system requirements + install steps
- `docs.html` — documentation hub (getting started, features, the 32 checks)
- `changelog.html` — release notes (v0.9.4 current; earlier history TBD)
- `about.html` — the maker story
- `styles.css` — brand-matched dark theme (QAdesk palette: `#0e0e14` bg, `#6f9dff` accent); shared by all pages
- `main.js` — mobile nav, footer year, download-link placeholder; shared by all pages
- `assets/` — images/downloads (empty for now)

The nav and footer are duplicated in each page's HTML (no build step / no templating on purpose). If you change a nav link, update it across all pages.

## Local preview
Open `index.html` in a browser, or serve it:

```bash
python -m http.server 8080
```

Then visit http://localhost:8080.

## TODO before going live
- [ ] Wire the **Download** button to the real installer URL (`[data-download]` in `download.html` / `index.html`).
- [x] Add real product **screenshots** — `assets/qa-issues.png` (hero), plus `lqa-scorecard`, `agents-tasks`, `qa-autocorrect` in the "See it in action" gallery. Sourced from `QAdesk/academy/shots/lib/` (real 1236×1104 UI captures).
- [ ] Confirm **pricing / licensing** copy (none stated yet — positioned as a free download).
- [ ] Add favicon PNGs (currently an inline SVG favicon). `og:image` is set to `assets/qa-issues.png`.
- [ ] Point the DNS / hosting at this folder for **qadesk.net**.

## Content accuracy
All feature copy is drawn from the actual QAdesk app (32 QA checks, 6 agents, LQA scoring,
Skills & Policies, the supported CAT formats, offline/privacy, Windows). No invented claims.
Nothing about pricing or download URLs is asserted until provided.
