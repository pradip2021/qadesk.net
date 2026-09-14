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
- `404.html` — branded not-found page (`noindex`)
- `styles.css` — brand-matched dark theme (QAdesk palette: `#0e0e14` bg, `#6f9dff` accent); shared by all pages
- `main.js` — mobile nav, footer year, download-link placeholder; shared by all pages
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
The Download button points to a GitHub **Release** asset:
`https://github.com/pradip2021/qadesk.net/releases/download/0.9.4/QAdesk-Setup-0.9.4.exe`
The installer is ~105 MB (over GitHub's 100 MB git limit), so it lives as a Release asset, never in the repo.
**The URL path must match the release tag exactly** — the v0.9.4 release was tagged `0.9.4` (no `v`), so the button uses `.../download/0.9.4/...`. On a new version, keep the tag/filename convention consistent (or update the button href to match).

## TODO before going live
- [x] Wire the **Download** button to the installer URL (GitHub Release asset, tag `v0.9.4`).
- [x] Add real product **screenshots**, favicons, and OG share image.
- [ ] **Create the `v0.9.4` release** and upload `QAdesk-Setup-0.9.4.exe` (from `QAdesk/release/`) so the download link resolves.
- [ ] **Enable GitHub Pages** + add the DNS records (above).
- [ ] Confirm **pricing / licensing** copy (none stated — positioned as a free download).

## Content accuracy
All feature copy is drawn from the actual QAdesk app (32 QA checks, 6 agents, LQA scoring,
Skills & Policies, the supported CAT formats, offline/privacy, Windows). No invented claims.
Nothing about pricing or download URLs is asserted until provided.
