# Repository Guidelines

> 로그 기록: 기존 내용을 지우지 말고, 변경 사항을 간략·명확하게 추가만 합니다.

## Project Structure & Module Organization
- Single-page style static site split into modular HTML files at the repo root (`index.html`, `about.html`, `services.html`, `cases.html`, `contact.html`), with shared fragments in `header.html` and `footer.html`.
- Styling lives in `main.css`; scripts in `main.js` (jQuery IIFE pattern with Swiper + AOS initialization). Images and icons are under `images/`.
- Reference docs sit in `docs/` (`README.md`, deployment notes, changelogs) and a helper server script in `start_server.bat`.

## Build, Test, and Development Commands
- `start_server.bat` — launches a UTF-8 Python static server on `http://localhost:8000` for quick browsing.
- `python -m http.server 8000` — alternative manual start from the repo root.
- Open `index.html` directly in a browser for simple content checks when network is offline.

## Coding Style & Naming Conventions
- HTML: 4-space indentation, semantic sections, reuse shared header/footer placeholders (`#header-placeholder`, `#footer-placeholder`).
- CSS: centralized theme tokens in `:root` (`--primary`, `--second`, `--max-width`); favor existing utility classes and keep glassmorphism/blur effects consistent with current design.
- JS: wrap additions in the existing `(function($){ ... })(jQuery);` structure, use `const`/`let` when adding modern code, and prefer function-scoped helpers (`init*`) for new behaviors.
- Assets: place new media in `images/` and keep filenames lowercase with hyphens.

## Testing Guidelines
- No automated test suite; rely on manual verification across desktop/tablet/mobile breakpoints (1400/1024/768/480px) and ensure sliders/forms still initialize.
- After CSS changes, run a quick Lighthouse-style pass in the browser devtools to watch performance and accessibility regressions (focus states, contrast, aria labels on interactive elements).

## Commit & Pull Request Guidelines
- Commits: concise imperative subject lines (`Add hero CTA`, `Refine cases slider`); group related asset changes with code that references them.
- PRs: include a short summary of user-facing changes, before/after screenshots for visual tweaks, and note any CDN/library version bumps. Link issues or TODOs when relevant and call out manual test scope (browsers/devices checked).

## Deployment & External Assets
- CDN dependencies (Swiper, AOS, jQuery) load from `cdn.jsdelivr.net`; if swapping versions, test offline fallback for critical paths and mirror integrity attributes when adding new CDNs.
- For static hosting (Netlify/Vercel/GitHub Pages), ensure `index.html` remains at the repo root and relative asset paths (`./images/...`, `./main.css`, `./main.js`) stay unchanged.
