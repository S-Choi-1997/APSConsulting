# CLAUDE.md - AI Assistant Guide for APSConsulting Repository

## Project Overview

**Project Name**: APS 행정사사무소 & APS 컨설팅 그룹 웹사이트
**Type**: Single Page Application (SPA) - Static Website
**Tech Stack**: Vanilla JavaScript, Vite, CSS
**Deployment**: Google Cloud Storage (Static Hosting)
**Language**: Korean (ko)

This is a professional consulting firm website for APS Administrative Scrivener Office and APS Consulting Group. The site provides information about services, team members, partnerships, and contact details in a single-page tabbed interface.

---

## Repository Structure

```
APSConsulting/
├── src/
│   ├── main.js          # Main application logic & HTML generation (518 lines)
│   └── style.css        # All styling and responsive design
├── public/
│   └── favicon.svg      # Site favicon
├── node_modules/        # Dependencies (gitignored)
├── dist/                # Build output (gitignored)
├── index.html           # Entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── .gitignore          # Git ignore rules
├── readme.md           # Project documentation (Korean)
├── fix.md              # Change log for fixes
└── CLAUDE.md           # This file - AI assistant guide
```

---

## Architecture & Design Patterns

### 1. **Single JavaScript File Architecture**
- **All HTML is generated in JavaScript** using template literals in `src/main.js:5-518`
- Content is injected into `#app` div at runtime
- No separate HTML templates or components
- Entire DOM structure defined in one large template literal

### 2. **Tab-Based Navigation System**
- Multi-section content controlled by tab navigation
- Sections: 소개 (Intro), 구성원 (Members), 업무 (Services), 협력 네트워크 (Alliances), 전문 자문 (Advisory), 소식 (News), 문의 (Contact)
- **View Activation Pattern**:
  - Each section has `data-view` attribute
  - Navigation buttons have `data-target` attribute
  - JavaScript toggles `.active` class on views and nav links
  - See `activateView()` function in `src/main.js:493-506`

### 3. **Responsive Design Strategy**
- **Mobile-First Approach**: Base styles for mobile, media queries for desktop
- **Hamburger Menu**: Mobile navigation uses toggle button (`.menu-toggle`)
- **CSS Custom Properties**: Centralized theming via `:root` variables
- **Key Breakpoints**:
  - Mobile: < 768px (stacked layouts, hamburger menu)
  - Tablet: 768px - 1024px (transitional layouts)
  - Desktop: > 1024px (full multi-column layouts)

### 4. **Accessibility Considerations**
- ARIA labels throughout: `aria-label`, `aria-labelledby`, `aria-expanded`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`
- Keyboard navigation support
- Focus management for tab navigation
- Role attributes for image placeholders

---

## Key Conventions & Code Style

### JavaScript Conventions

1. **Variable Naming**: camelCase for all variables
   ```javascript
   const currentYear = new Date().getFullYear();
   const primaryNav = document.querySelector('.primary-nav');
   ```

2. **String Templates**: Multi-line template literals for HTML generation
   ```javascript
   document.querySelector('#app').innerHTML = `
     <div class="page">
       ...
     </div>
   `;
   ```

3. **Event Handling**: Event delegation and direct listeners
   - Direct listeners on navigation links and buttons
   - No event delegation framework

4. **DOM Selection**: `querySelector` and `querySelectorAll` throughout

### CSS Conventions

1. **Naming Pattern**: BEM-inspired but not strict
   - Block: `.site-header`, `.hero`, `.service-card`
   - Element: `.header-inner`, `.hero-text`, `.brand-block`
   - Modifier: `.active`, `.primary`, `.ghost`

2. **Color Scheme**: Soft blue professional palette
   - Background: `#fafafa` (light gray)
   - Primary: `#1e40af` / `#1e3a8a` (dark navy blue)
   - Text: `#2c3e50` (soft dark)
   - Accent: Blue gradient variations

3. **Layout Approach**:
   - Flexbox for 1D layouts (headers, footers, rows)
   - Grid for 2D layouts (card grids, form layouts)
   - CSS custom properties for theming: `var(--header-height)`, `var(--footer-height)`

4. **Spacing**: `clamp()` for responsive sizing
   ```css
   padding: 12px clamp(20px, 5vw, 64px);
   gap: clamp(20px, 3vw, 40px);
   ```

---

## Development Workflow

### Setup
```bash
npm install          # Install dependencies (vite only)
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build
```

### Git Workflow

1. **Main Branch**: `main` (not shown in current state, using feature branch)
2. **Current Branch**: `claude/claude-md-mijy9x1y7snc3uqu-01GXBV6U3tSDgQgBqT5B8B3f`
3. **Branch Naming**: Feature branches use descriptive names
   - Examples: `codex/refactor-header-and-footer-layout`, `codex/update-footer-and-header-layout`
4. **Commit Messages**: Korean language, descriptive
   - Examples: "모바일 네비바 수정", "Refine header and footer layout"

### Build & Deploy Process

1. **Build Command**: `npm run build`
   - Generates static files in `dist/` directory
   - Vite bundles JavaScript and CSS
   - Base path set to `./` for flexible deployment (see `vite.config.js:4`)

2. **Deployment Target**: Google Cloud Storage bucket
   - Upload `dist/` contents to GCS bucket
   - Configure bucket for static website hosting
   - No server-side rendering or API endpoints

---

## Common Tasks & Patterns

### Adding a New Section/Tab

1. **Add navigation button** in header `<nav>` (around `src/main.js:23-29`)
   ```javascript
   <li><button type="button" class="nav-link" data-target="new-section">New Section</button></li>
   ```

2. **Create section HTML** in main content area
   ```javascript
   <section data-view="new-section" class="view">
     <section class="section">
       <div class="section-heading">
         <h2>Section Title</h2>
         <p>Description</p>
       </div>
       <!-- Content here -->
     </section>
   </section>
   ```

3. **Add styles** in `src/style.css`
   - Follow existing patterns for `.section`, `.section-heading`, etc.
   - Use consistent spacing and color scheme

### Modifying Styles

1. **Global Colors/Spacing**: Edit `:root` variables in `src/style.css:1-11`
2. **Component-Specific**: Find component class and edit directly
3. **Responsive Adjustments**: Look for media queries at bottom of CSS file
4. **Testing**: Always test on mobile (< 768px) and desktop (> 1024px)

### Adding Images

Images should be placed in `public/images/` directory:

1. **Hero Section Background**:
   - Add image: `public/images/hero.jpg`
   - Update `.hero` background in CSS or modify `src/main.js:51-53`

2. **Profile/Team Photos**:
   - Add images: `public/images/team-*.jpg`
   - Replace `.image-placeholder` elements with `<img>` tags
   - Or add `background-image` CSS to placeholders

3. **Reference Path**: Use `/images/filename.jpg` (Vite resolves from `public/`)

---

## Important Files Reference

### src/main.js
- **Lines 1-5**: Imports and setup
- **Lines 5-488**: Complete HTML structure as template literal
- **Lines 489-518**: Event listeners and view activation logic
- **Key Functions**:
  - `activateView(viewName)`: Lines 493-506 - Switches between tabs

### src/style.css
- **Lines 1-11**: CSS custom properties (theme variables)
- **Lines 13-45**: Global resets and base styles
- **Lines 47-155**: Header and navigation styles
- **Lines 156-300+**: Component-specific styles (hero, sections, cards, etc.)
- **Bottom section**: Media queries for responsive design

### index.html
- Simple entry point
- Minimal head (meta tags, title, favicon)
- Empty `#app` div for JavaScript injection
- Module script import: `/src/main.js`

### vite.config.js
- **Line 4**: `base: './'` - Relative paths for flexible deployment
- Minimal configuration, uses Vite defaults

---

## Known Issues & Technical Debt

### Current State (from fix.md)

1. **Header/Footer Compactness** (2024-06-22)
   - Recently reduced header to single-line layout
   - Adjusted mobile padding to reduce excessive height
   - Footer slimmed to one-line layout

2. **Color Palette Adjustment** (2024-06-21)
   - Moved from high-contrast black/white to softer blue palette
   - Header: dark navy (`rgba(30, 58, 138, 0.95)`)
   - Background: light gray (`#fafafa`)

### Potential Improvements

1. **Code Organization**: Consider splitting `main.js` into separate modules
   - HTML templates
   - Event handlers
   - Utility functions

2. **Image Placeholders**: Many `.image-placeholder` elements need real images
   - Hero section: `src/main.js:51`
   - Intro cards: `src/main.js:65, 76`
   - Profile cards: Team member photos
   - Advisory cards: Service images

3. **Accessibility**: Add keyboard navigation for tab switching (Arrow keys, Home, End)

4. **Performance**: Consider lazy loading for images when added

---

## AI Assistant Guidelines

### When Making Changes

1. **Always Read First**: Never modify files without reading them first
   - Read `src/main.js` to understand current HTML structure
   - Read `src/style.css` to understand styling patterns

2. **Maintain Consistency**:
   - Follow existing naming patterns (camelCase JS, kebab-case CSS)
   - Match existing code style (spacing, indentation)
   - Use Korean for user-facing text
   - Use English for code comments if needed

3. **Responsive Design**:
   - Test changes work on mobile and desktop
   - Use `clamp()` for responsive spacing
   - Check hamburger menu still functions on mobile

4. **Accessibility**:
   - Add ARIA labels for new interactive elements
   - Use semantic HTML elements
   - Ensure keyboard navigation works

5. **Git Workflow**:
   - Work on designated feature branch
   - Use descriptive commit messages
   - Push to remote only when requested
   - Never force push to main/master

### Common Requests

1. **"Add a new section"**: Follow "Adding a New Section/Tab" pattern above
2. **"Change colors"**: Edit `:root` variables in `style.css` first
3. **"Fix mobile layout"**: Check media queries and hamburger menu functionality
4. **"Add images"**: Place in `public/images/`, update references, add alt text
5. **"Update content"**: Modify template literal in `main.js`, maintain HTML structure

### Testing Checklist

Before considering a change complete:

- [ ] Run `npm run dev` and visually inspect changes
- [ ] Test on mobile width (< 768px)
- [ ] Test on desktop width (> 1024px)
- [ ] Check all tabs still navigate correctly
- [ ] Verify hamburger menu works on mobile
- [ ] Run `npm run build` to ensure no build errors
- [ ] Check console for JavaScript errors

---

## Dependencies

### Production Dependencies
None - Pure vanilla JavaScript

### Dev Dependencies
- **vite** (^5.2.0): Build tool and dev server
  - Fast HMR (Hot Module Replacement)
  - ES modules support
  - Optimized production builds

### Why No Framework?
- Simple site with limited interactivity
- Fast load times without framework overhead
- Easy deployment as static files
- Minimal build complexity

---

## Contact & Support

For questions about this codebase:
1. Check `readme.md` for project overview (Korean)
2. Check `fix.md` for recent changes and context
3. Review this file for development guidelines
4. Examine existing code patterns before making changes

**Site Contact**: contact@apsconsulting.kr
**Address**: 서울 서초구 반포대로 20, 정주빌딩 6층 1호

---

## Version History

- **Current**: v0.0.1 (from package.json)
- **Last Updated**: 2025-11-29 (CLAUDE.md created)
- **Recent Changes**: See `fix.md` for detailed change log

---

*This document is maintained for AI assistants working on this codebase. Keep it updated when making significant architectural changes.*
