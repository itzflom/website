# Bunga Tole Florist Website

Single-page site for Bunga Tole Florist (Pasar Kembang, Cikini, Jakarta Pusat).
Built as a reusable template for future small-business clients: plain HTML,
CSS, and vanilla JS. No frameworks, no build step, no npm dependencies.

**Status: demo, not yet approved by the business owner.** `index.html` has
`<meta name="robots" content="noindex">` in the `<head>`. Remove that line
once the client signs off and the site should go live/be indexed.

## Folder structure

| File / folder | Purpose |
|---|---|
| `index.html` | Markup only. Every section is an empty container with `data-hook` attributes. No business copy is written here. |
| `theme.css` | Every color, font, and spacing value, as CSS custom properties (`:root` block). This is the palette/type system. |
| `styles.css` | Layout and component styles. Only ever references `var(--...)` from `theme.css`, never a hardcoded color or font. |
| `content.js` | **A single `CONTENT` object holding all text, contact info, and image paths.** Business name, tagline, phone/WhatsApp, address, hours, about copy, products/gallery, footer, UI labels. |
| `app.js` | Reads `CONTENT` and renders it into `index.html`. Also builds the WhatsApp deep link, the Google Maps embed URL, the sticky button's scroll behavior, and the IntersectionObserver fade-ins. Contains no business copy. |
| `/images` | Photography. See **Photo placeholders** below. |

## Reskinning this template for a new client

You should only ever need to touch **`content.js`**, **`theme.css`**, and
**`/images`**. `index.html`, `styles.css`, and `app.js` are structural and
client-agnostic.

1. **`content.js`**: replace every field: business name, tagline, phone/WhatsApp
   number, address, hours, about copy, and the `products` array. This is the
   only place page copy lives.
2. **`/images`**: drop in the new client's photos using the same filenames
   already referenced in `content.js` (`hero.jpg`, `about.jpg`,
   `gallery-1.jpg` … `gallery-6.jpg`), or edit the `image` paths in
   `content.js` to point at new filenames.
3. **`theme.css`**: change `--color-accent` (and `--color-bg` / `--color-text`
   if the brand isn't near-monochrome) for the new palette. Change
   `--font-display` if the client wants a different heading font. If so,
   also update the Google Fonts `<link>` in `index.html`'s `<head>` to load
   that font instead of Fraunces.
4. **`index.html` `<head>`**: update `<title>` and `<meta name="description">`
   to match the new business. This is the one deliberate exception to "no
   hardcoded content": search engines and link-preview bots that don't run
   JavaScript need real values in the raw HTML. `app.js` also syncs these two
   tags from `content.js` at runtime for anything that does execute JS, so
   keep both in sync.
5. **Google Maps**: driven entirely by `content.js`'s `address.mapsEmbedQuery`
   and `address.mapsLinkQuery`. No API key needed (uses the key-free
   `google.com/maps?...&output=embed` format).
6. **`noindex`**: remove the robots meta tag in `index.html` when the new
   client's site is approved and ready to go live.

## Photo placeholders

The images currently in `/images` are free-license stock photography
downloaded from Unsplash (Unsplash License, free for commercial and
non-commercial use, no attribution required), resized and compressed for
mobile performance. They're placeholders standing in for real photos of the
shop, its flowers, and its arrangements. Swap them before this goes live.

| File | Source (Unsplash CDN) |
|---|---|
| `hero.jpg` | images.unsplash.com/photo-1582794543139-8ac9cb0f7b11 |
| `about.jpg` | images.unsplash.com/photo-1769772301243-c2bf7cc2d26d |
| `gallery-1.jpg` | images.unsplash.com/photo-1589095181425-c038b3871b6a |
| `gallery-2.jpg` | images.unsplash.com/photo-1595467959554-9ffcbf37f10f |
| `gallery-3.jpg` | images.unsplash.com/photo-1717528611006-11ccceb5b530 |
| `gallery-4.jpg` | images.unsplash.com/photo-1602285415607-faa4007a0bca |
| `gallery-5.jpg` | images.unsplash.com/photo-1531879385813-f8d895f4580b |
| `gallery-6.jpg` | images.unsplash.com/photo-1771150157261-ef2b715cf780 |

## Local preview

No build step, no install. Either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static server, e.g. `python -m http.server 8080`
  or `npx serve`, then visit `http://localhost:8080`

## Deploying to GitHub Pages

1. `git init`, commit, and push this folder to your GitHub repo's `main` branch.
2. On GitHub: **Settings → Pages → Source: Deploy from a branch → Branch:
   `main`, folder: `/ (root)` → Save.**
3. The site goes live at `https://<username>.github.io/<repo>/` within a
   minute or two.

## Performance & accessibility notes

- No JS framework, no animation library. Motion is limited to
  opacity/transform CSS transitions triggered by `IntersectionObserver`.
- Gallery images use `loading="lazy"`; the hero image loads eagerly with
  `fetchpriority="high"` since it's above the fold and is the page's LCP
  element.
- `prefers-reduced-motion: reduce` disables fade-ins and transitions.
- All images have descriptive `alt` text, sourced from `content.js`.
- Focus states (`:focus-visible`) are styled for keyboard navigation.
