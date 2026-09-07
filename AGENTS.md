# AGENTS.md

Guidance for AI agents and developers working in this codebase.

## Overview

Static photography portfolio site. Plain HTML5, CSS3, and vanilla JavaScript only — no frameworks, no build tools, no package manager, no dependencies. Deployed as a static site to AWS S3.

## Commands

There is no build, test, lint, or typecheck step. The only command used during development is the local preview server:

```bash
python3 -m http.server 8080
```

Validate changes by opening `http://localhost:8080` in a browser (refreshing as needed). To spot-check PHP-free syntax, you can also view files in a browser directly via the running server.

## File overview

| File | Purpose |
|------|---------|
| `index.html` | Home: hero slideshow, Featured Work marquee, about, highlights carousel, contact |
| `gallery.html` | Portfolio organized by session, filterable client-side |
| `pricing.html` | Package price sheet + notes |
| `expectations.html` | Process, tips, FAQ |
| `the-johnson-family.html` | Featured session detail + gallery lightbox |
| `ellas-senior-portraits.html` | Featured session detail + gallery lightbox |
| `viking-company-holiday-party.html` | Featured session detail + gallery lightbox |
| `css/style.css` | All styling in one file |
| `js/main.js` | All behavior in one file |
| `images/` | All assets, organized by page/section |
| `README.md` | Setup, image swapping, S3 deployment docs |

## Conventions

### HTML
- Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
- All pages share the same header/nav/footer markup; the current page marks its nav link with `class="nav-link active"`.
- Each page loads `css/style.css` and `js/main.js` at the bottom of `<body>`.
- **Images are NOT `<img>` tags.** They are `<div>`s with an inline style:
  ```html
  <div class="session-photo" style="background-image: url('images/gallery/johnson/1.jpg');"></div>
  ```
  The containing classes set `background-size: cover` and `background-position: center`.
- Keep `4-space` indentation. Event pages include a `.lightbox` block before the scripts.

### CSS
- All styles in `css/style.css`. No CSS-in-JS, no preprocessors.
- Section-based comment banners:
  ```
  /* ============================================================
     Section Name
     ============================================================ */
  ```
- Design tokens are CSS custom properties at the top of the file (`:root`): palette (`--color-*`), fonts (`--font-heading`, `--font-body`), and `--transition`.
- Use the existing tokens rather than hardcoding colors/fonts.
- Fonts are bundled locally under `fonts/` (woff2) and registered via `@font-face` at the top of `style.css`. Swap in new fonts by replacing files or updating the `src` paths; never hotlink font CDNs.
- Responsive breakpoints at 992px, 768px, and 480px — add/override rules inside the existing media queries.

### JavaScript (`js/main.js`)
- Single IIFE with `'use strict'`, ES5-compatible syntax (function expressions, `var`-free via `const`/`let` is fine, but avoid ES modules/arrow functions).
- Grouped into `initX()` functions, each with a section comment banner, called at the bottom:
  ```js
  /* ---------- Carousel ---------- */
  function initCarousel() { ... }
  initCarousel();
  ```
- Feature detection pattern: each `initX()` returns early if its target elements are absent, so the single `main.js` is shared across all pages safely.
- The lightbox reads the image URL out of each `.event-photo`'s inline `background-image` style via regex — keep that pattern if you change gallery markup.

### Images
- One directory per page/section, e.g. `images/johnson-family/`, `images/gallery/<session>/`.
- Named `hero.jpg`, `story.jpg`, `1.jpg`…`8.jpg`; featured thumbnails in `images/featured/`.
- The site must stay fully self-contained — never hotlink external image URLs. To swap in real photos, replace the file in place or update the inline `url('...')` path.

## Notes
- Content (names, dates, prices, copy) is placeholder example data; the business is "Melissa Smith Photography", contact `contact@melissasmithphotography.com`.
- No git repo is initialized in this directory.