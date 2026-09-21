# QAdesk website (qadesk.net)

Marketing site for **QAdesk** — the offline translation quality-assurance desktop app.

## Stack
Plain static site — HTML, CSS, vanilla JS. No build step, no framework, no dependencies.
Deploy the folder to any static host (the qadesk.net server, Netlify, GitHub Pages, Cloudflare Pages).

## Pages
- `index.html` — home / landing page
- `download.html` — download + system requirements + install steps
- `docs.html` — documentation hub (getting started, features, the 32 checks)
- `changelog.html` — release notes (v0.10.0 current, with prior history)
- `about.html` — the maker story
- `brand/index.html` — brand & press kit (logos, marks, lockups; image assets live in `brand/`)
- `404.html` — branded not-found page (`noindex`)
- `styles.css` — brand-matched dark theme (QAdesk palette: `#0e0e14` bg, `#6f9dff` accent); shared by all pages
- `main.js` — mobile nav toggle + footer year; shared by all pages
- `robots.txt` — allows all crawlers; points to the sitemap
- `sitemap.xml` — the five public pages, absolute `https://qadesk.net/` URLs
- `assets/` — screenshots, favicons, and the OG share image

Note: `robots.txt` and `sitemap.xml` hard-code the `https://qadesk.net` origin — update them if the site is hosted elsewhere. Configure the host to serve `404.html` as the not-found page.

The nav and footer are duplicated in each page's HTML (no build step / no templating on purpose). If you change a nav link, update it across all pages.

## Local preview
Open `index.html` in a browser, or serve it:

```bash
python -m http.server 8080
```

Then visit http://localhost:8080.

## Hosting (GitHub Pages)
Repo: **https://github.com/pradip2021/qadesk.net** (`main`).
- `CNAME` (`qadesk.net`) + `.nojekyll` are committed, so Pages serves this repo at the apex domain and skips Jekyll processing.
- Enable once in **Settings → Pages → Source: Deploy from a branch → `main` / root**.
- DNS at the registrar: apex `A` records to GitHub Pages `185.199.108–111.153` (+ AAAA `2606:50c0:8000–8003::153`); `www` `CNAME` → `pradip2021.github.io`. Then tick **Enforce HTTPS**.

## Installer download
The Download button (in `download.html`) points to a GitHub **Release** asset — current:
`https://github.com/pradip2021/qadesk.net/releases/download/v0.10.0/QAdesk-Setup-0.10.0.exe`
The installer is ~110 MB (over GitHub's 100 MB git limit), so it lives as a Release asset, never in the repo.
**The URL path must match the release tag exactly.** Releases are tagged `v`-prefixed (e.g. `v0.10.0`) with the asset named `QAdesk-Setup-<version>.exe`, so the button uses `.../download/v0.10.0/QAdesk-Setup-0.10.0.exe`. On a new version, bump the href to match the new tag/filename.

## Publishing a new version
The site is **live** at qadesk.net (GitHub Pages, apex domain, HTTPS). For each new QAdesk release:
1. Build the installer (`npm run dist` in the QAdesk app repo) → `QAdesk/release/QAdesk-Setup-<version>.exe`.
2. Create a GitHub **Release** on this repo tagged `v<version>` and upload that `.exe` as the asset.
3. Update this site and push to `main` (Pages redeploys in ~1 min):
   - `update.json` — `latest`, `url`, `releaseDate` (the in-app auto-updater reads this).
   - `download.html` — version badge, button href, and the meta line.
   - `changelog.html` — add the new version entry; demote the previous "Current release".
4. Verify live: `update.json` `latest` and the download button both resolve to the new asset.

Note: installers are **not code-signed** (no cert), so `download.html` keeps a SmartScreen "Run anyway" note. Pricing copy positions QAdesk as free during Early Access.

## Content accuracy
All feature copy is drawn from the actual QAdesk app (32 QA checks, 6 agents, LQA scoring,
Skills & Policies, the supported CAT formats, offline/privacy, Windows). No invented claims.
Nothing about pricing or download URLs is asserted until provided.
