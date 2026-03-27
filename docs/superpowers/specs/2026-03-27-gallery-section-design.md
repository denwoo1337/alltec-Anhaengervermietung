# Gallery Section Design

**Date:** 2026-03-27
**Status:** Approved

## Overview

A new standalone gallery section placed directly after the "Aktueller Fuhrpark" (Fleet) section on the main page. It displays real-life rental photos in a 3-column grid with an expand/collapse feature and a full-screen lightbox on click.

## Sektion

- New `<section id="gallery">` added after `<Fleet />` in `src/App.tsx`
- Background: `#111111` (slightly lighter than Fleet's `#0e0e0e` for visual separation)
- Header: overline text "Galerie", large headline "EINDRÜCKE / VERMIETUNGEN" — same typographic pattern as Fleet header
- Padding and max-width consistent with Fleet section

## Image Conversion & Preparation

- Source: `Galerie/` folder in project root (33 images — 11 JPEG with double extensions like `.JPG.jpeg`, ~22 HEIC/heic)
- Conversion: one-time Node script `scripts/convert-gallery.mjs` using the already-installed `heic-convert` package (v2.x async API, returns a Buffer written via `fs.writeFile`)
- HEIC files: converted to JPEG via `heic-convert` and written to `public/galerie/`
- Non-HEIC files (`.jpg`, `.jpeg` regardless of case): copied as-is without re-encoding
- Output: all images land in `public/galerie/` as `.jpg`
- Filename normalization rule: lowercase the full filename, replace spaces with underscores, preserve all other characters including parentheses (e.g. `IMG_4599 (1).HEIC` → `img_4599_(1).jpg`). This avoids collisions between `IMG_4599.HEIC` and `IMG_4599 (1).HEIC`.
- The static image list is defined as an array in the Gallery component (paths like `/galerie/img_0912.jpg`)

## Grid & Expand

- Layout: `grid-cols-1 md:grid-cols-3`, fixed image height `h-52` with `object-cover object-center`
- Initially: 6 images visible (2 rows × 3 columns)
- Remaining images: wrapped in a Framer Motion `animate={{ height }}` block — collapses to `height: 0` when closed; must include `style={{ overflow: 'hidden' }}` to clip content (same pattern as the expandable panel in `TrailerCard`, which is an inline function inside `Fleet.tsx`)
- Expand button below grid:
  - Label: "Alle X Bilder anzeigen" (collapsed) / "Weniger anzeigen" (expanded)
  - Uses `CaretDown` icon from `@phosphor-icons/react`, rotates 180° when expanded
  - Styled consistently with the Details toggle in `TrailerCard` (inline in `Fleet.tsx`)
- Scroll behavior: no auto-scroll on expand (user stays in place)

## Lightbox

- Component: `src/components/GalleryLightbox.tsx`
- Trigger: clicking any gallery image opens lightbox at that image's index
- Overlay: `fixed inset-0` with `bg-black/90` and `backdrop-blur-sm`
- Image: centered, `max-w-[90vw] max-h-[85vh]`, `object-contain`
- Navigation:
  - Left/right arrow buttons using Phosphor `ArrowLeft` / `ArrowRight` icons
  - Wraps around (last → first, first → last)
- Close: ESC key, click on overlay background, or an explicit ✕ button top-right
- Animation: Framer Motion `AnimatePresence` with fade in/out (`opacity: 0 → 1`)
- Image counter: "3 / 33" shown below image in small zinc text

## Component Structure

```
src/
  components/
    Gallery.tsx          — main section: header, grid, expand logic, lightbox trigger
    GalleryLightbox.tsx  — fullscreen overlay with navigation
scripts/
  convert-gallery.mjs   — one-time HEIC→JPEG conversion script
public/
  galerie/              — converted/copied images served statically
```

## Integration

- `Gallery` imported and rendered in `src/App.tsx` between `<Fleet />` and `<Contact />`
- No changes to existing components required
- `useInView` from Framer Motion used for scroll-triggered entrance animation (same pattern as Fleet)
- **Navbar:** No "Galerie" link added to the Navbar — deliberate omission to keep navigation minimal
- **Accessibility:** Focus trapping inside the lightbox is out of scope for this iteration; ESC close and overlay-click close provide sufficient keyboard/pointer dismissal
