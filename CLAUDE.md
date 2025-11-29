# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static single-page website for an administrative law firm (행정사무소). The site is built with vanilla HTML, CSS, and jQuery, using CDN libraries for Swiper, AOS, and jQuery. All code is consolidated into minimal files for simplicity.

## File Structure

**Current structure:**
- `index.html` - Single-page application (all sections in one file)
- `main.css` - All styles consolidated (includes CSS variables at top)
- `main.js` - All JavaScript functionality (jQuery-based)
- `images/` - Image assets (currently has placeholder gradients when images missing)

**Important:** CSS and JS files are in the project root, NOT in `css/` and `js/` folders. The HTML references them as `./main.css` and `./main.js`.

## Development

### Running Locally

This is a static site - simply open `index.html` in a browser. For a better development experience with live reload:

```bash
# Python 3
python -m http.server 8000

# Node.js (if http-server is installed)
npx http-server -p 8000
```

Then visit `http://localhost:8000`

### Customization Points

**Colors:** All theme colors are CSS variables in `main.css` (lines 12-20):
```css
:root {
    --primary: #041f2f;      /* Main color */
    --second: #9d856d;       /* Accent color */
    --max-width: 1570px;     /* Content width */
}
```

**Text content:** Edit directly in `index.html`:
- Company name: Search for "○○ 행정사합동사무소"
- Phone: Search for "02-1234-5678"
- Address: In `<address>` tag (around line 432)
- Services: In `.service-card` sections (lines 151-214)

**Images:** Place in `images/` folder. When images are missing, CSS shows colored gradients as placeholders (defined at end of `main.css`, lines 1158-1201).

## Architecture

### JavaScript (main.js)

All functionality is in an IIFE wrapped with jQuery. Main initialization functions:

- `initHeader()` - Mobile menu toggle, scroll header effects
- `initSliders()` - Swiper initialization (main visual, cases, team)
- `initAnimations()` - AOS scroll animations
- `initForms()` - Form validation, phone formatting
- `initScrollEffects()` - Smooth scrolling, top button, mobile call button

**Key patterns:**
- All Swiper instances use `new Swiper()` directly (no wrapper)
- Form submission is preventDefault with client-side validation only (no backend)
- Phone input auto-formats to XXX-XXXX-XXXX pattern
- Mobile menu uses class toggling (`.active`)

### CSS Architecture

**Sections:**
1. CSS Variables (`:root`)
2. Reset & Global styles
3. Header (fixed positioning, scrolled state)
4. Main visual slider (Swiper with fade effect)
5. Services grid (4-column responsive)
6. Contact form + News (2-column layout)
7. Cases slider (responsive columns: 3/2/1)
8. Team slider (fade effect)
9. Fixed footer (bottom bar)
10. Footer
11. Mobile call button (fab)
12. Media queries (1400px, 1024px, 768px, 480px)
13. Image placeholders (temporary, at end)

**Responsive breakpoints:**
- 1400px - Medium desktop
- 1024px - Tablet (mobile menu activates)
- 768px - Mobile landscape
- 480px - Mobile portrait

### Dependencies (CDN)

All external libraries loaded via CDN:
- jQuery 3.7.1
- Swiper 11
- AOS 2.3.4
- Google Fonts (Noto Sans KR, Noto Serif KR)

**Note:** Site requires internet connection to function due to CDN dependencies.

## Common Issues

**CSS/JS not loading:** Paths are `./main.css` and `./main.js` (in root), not in subdirectories.

**Images not showing:** Files must be in `images/` folder with exact names:
- `logo.png`, `logo.ico`
- `main_img01.jpg`, `main_img02.jpg`, `main_img03.jpg`
- `team01.png`, `og-image.jpg`

**Sliders not working:** Check browser console for CDN loading errors.

## Deployment

This is a static site. Deploy entire directory to any static host:
- Netlify (drag & drop)
- Vercel
- GitHub Pages
- Any FTP hosting

Ensure `index.html` is at root level.
