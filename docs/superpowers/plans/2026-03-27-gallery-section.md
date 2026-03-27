# Gallery Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone gallery section after the Fleet section, showing rental photos in a 3-column grid with expand/collapse and a fullscreen lightbox.

**Architecture:** A one-time Node script converts/copies all 33 images from `Galerie/` to `public/galerie/`. Two new React components handle display: `Gallery.tsx` (section + grid + expand) and `GalleryLightbox.tsx` (fullscreen overlay). The component array of image paths is hardcoded after running the script.

**Tech Stack:** React 19, Vite, Tailwind v4, Framer Motion v12, @phosphor-icons/react, heic-convert v2.x (already installed)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `scripts/convert-gallery.mjs` | Create | One-time: convert HEIC → JPEG, copy JPEG, write all to `public/galerie/` |
| `public/galerie/` | Create (dir) | Static image serving via Vite |
| `src/components/GalleryLightbox.tsx` | Create | Fullscreen overlay, image nav, ESC/click close |
| `src/components/Gallery.tsx` | Create | Section header, 3-col grid, expand/collapse, lightbox trigger |
| `src/App.tsx` | Modify | Import and render `<Gallery />` between Fleet and Contact |

---

## Task 1: Image Conversion Script

**Files:**
- Create: `scripts/convert-gallery.mjs`

- [ ] **Step 1: Create the conversion script**

```js
// scripts/convert-gallery.mjs
import { readdir, readFile, writeFile, copyFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import convert from 'heic-convert';

const SRC = new URL('../Galerie/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const DEST = new URL('../public/galerie/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

function normalizeFilename(filename) {
  // Strip all known image extensions (handles double extensions like .JPG.jpeg)
  let base = filename.replace(/\.(heic|jpg|jpeg)/gi, '');
  base = base.toLowerCase().replace(/ /g, '_');
  return base + '.jpg';
}

async function main() {
  await mkdir(DEST, { recursive: true });
  const files = await readdir(SRC);

  for (const file of files) {
    const srcPath = join(SRC, file);
    const destName = normalizeFilename(file);
    const destPath = join(DEST, destName);
    const ext = extname(file).toLowerCase();

    if (ext === '.heic') {
      console.log(`Converting: ${file} → ${destName}`);
      const inputBuffer = await readFile(srcPath);
      const outputBuffer = await convert({ buffer: inputBuffer, format: 'JPEG', quality: 0.92 });
      await writeFile(destPath, Buffer.from(outputBuffer));
    } else {
      console.log(`Copying:    ${file} → ${destName}`);
      await copyFile(srcPath, destPath);
    }
  }

  console.log(`\nDone. ${files.length} images → public/galerie/`);
  console.log('\nImage array for Gallery.tsx:');
  const sorted = files.map(normalizeFilename).sort();
  console.log(JSON.stringify(sorted.map(f => `/galerie/${f}`), null, 2));
}

main().catch(console.error);
```

- [ ] **Step 2: Run the script**

```bash
node scripts/convert-gallery.mjs
```

Expected output: 33 lines of `Converting:` / `Copying:` entries, then a JSON array of paths.

- [ ] **Step 3: Verify output**

```bash
ls public/galerie/ | wc -l
```

Expected: `33`

- [ ] **Step 4: Copy the printed JSON array**

The script prints the sorted image path array to the console. Copy it — you'll paste it into `Gallery.tsx` in Task 3.

- [ ] **Step 5: Commit**

```bash
git add scripts/convert-gallery.mjs public/galerie/
git commit -m "feat(gallery): add conversion script and converted images"
```

---

## Task 2: GalleryLightbox Component

**Files:**
- Create: `src/components/GalleryLightbox.tsx`

This component receives: `images: string[]`, `initialIndex: number`, `onClose: () => void`.

- [ ] **Step 1: Create the component**

```tsx
// src/components/GalleryLightbox.tsx
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';

type Props = {
  images: string[];
  initialIndex: number;
  onClose: () => void;
};

export default function GalleryLightbox({ images, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-2"
        onClick={onClose}
        aria-label="Schließen"
      >
        <X size={24} weight="bold" />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 text-zinc-400 hover:text-white transition-colors p-3"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Vorheriges Bild"
      >
        <ArrowLeft size={28} weight="bold" />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Galerie Bild ${index + 1}`}
          className="object-contain rounded-lg shadow-2xl"
          style={{ maxWidth: '90vw', maxHeight: '85vh' }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Next */}
      <button
        className="absolute right-4 text-zinc-400 hover:text-white transition-colors p-3"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Nächstes Bild"
      >
        <ArrowRight size={28} weight="bold" />
      </button>

      {/* Counter */}
      <p
        className="absolute bottom-6 text-zinc-500 text-xs tracking-widest"
        onClick={(e) => e.stopPropagation()}
      >
        {index + 1} / {images.length}
      </p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

---

## Task 3: Gallery Component

**Files:**
- Create: `src/components/Gallery.tsx`

- [ ] **Step 1: Create the component with the image array from the script output**

Replace the `IMAGES` array content with the JSON array printed by the conversion script in Task 1, Step 4.

```tsx
// src/components/Gallery.tsx
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CaretDown } from '@phosphor-icons/react';
import GalleryLightbox from './GalleryLightbox';

// Paste the path array printed by scripts/convert-gallery.mjs here:
const IMAGES: string[] = [
  // e.g. '/galerie/09ca22b3-06b9-46b0-949a-71dfb90169dd.jpg',
  // ... all 33 paths
];

const INITIAL_COUNT = 6;

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const initialImages = IMAGES.slice(0, INITIAL_COUNT);
  const remainingImages = IMAGES.slice(INITIAL_COUNT);

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  return (
    <section id="gallery" className="py-28 lg:py-40" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4">
            Galerie
          </p>
          <h2
            className="font-black tracking-tighter leading-none text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
          >
            EINDRÜCKE /
            <br />
            <span className="text-zinc-400">VERMIETUNGEN</span>
          </h2>
        </motion.div>

        {/* Initial 6 images — always visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          {initialImages.map((src, i) => (
            <GalleryImage
              key={src}
              src={src}
              index={i}
              inView={inView}
              delay={i * 0.07}
              onClick={openLightbox}
            />
          ))}
        </div>

        {/* Remaining images — animated expand */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mt-3 lg:mt-4">
            {remainingImages.map((src, i) => (
              <GalleryImage
                key={src}
                src={src}
                index={INITIAL_COUNT + i}
                inView={inView}
                delay={i * 0.04}
                onClick={openLightbox}
              />
            ))}
          </div>
        </motion.div>

        {/* Expand / Collapse button */}
        {remainingImages.length > 0 && (
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: expanded ? '#a3e635' : '#52525b' }}
            >
              <span>
                {expanded
                  ? 'Weniger anzeigen'
                  : `Alle ${IMAGES.length} Bilder anzeigen`}
              </span>
              <CaretDown
                size={12}
                weight="bold"
                style={{
                  transition: 'transform 0.35s ease',
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            images={IMAGES}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryImage({
  src,
  index,
  inView,
  delay,
  onClick,
}: {
  src: string;
  index: number;
  inView: boolean;
  delay: number;
  onClick: (index: number) => void;
}) {
  return (
    <motion.div
      className="relative h-52 overflow-hidden rounded-xl cursor-pointer group"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      onClick={() => onClick(index)}
    >
      <img
        src={src}
        alt={`Galerie Bild ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.35)' }}
      >
        <span className="text-white text-xs font-semibold tracking-widest uppercase">Ansehen</span>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Note on the expand animation**

The remaining images sit in a `motion.div` with `animate={{ height: 'auto' | 0, opacity: 1 | 0 }}` and `style={{ overflow: 'hidden' }}`. This is the standard Framer Motion collapse pattern — `height: 0` + `overflow: hidden` clips the content, and `opacity` fades it in/out. The inner grid restores the 3-column layout with the same gap as the initial grid, plus a top margin so the rows flow seamlessly.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

---

## Task 4: Integrate Gallery into App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the import**

In `src/App.tsx`, add after the `Fleet` import:

```tsx
import Gallery from './components/Gallery';
```

- [ ] **Step 2: Render Gallery between Fleet and Contact**

```tsx
function MainPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Fleet />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Start the dev server and do a visual check**

```bash
npm run dev
```

Verify:
- Gallery section appears below Fleet
- 6 images render in 3 columns
- "Alle X Bilder anzeigen" button visible
- Clicking expand shows remaining images
- Clicking any image opens lightbox
- Arrow keys navigate images in lightbox
- ESC closes lightbox
- Clicking overlay background closes lightbox

- [ ] **Step 4: Verify TypeScript + build**

```bash
npx tsc --noEmit && npm run build
```

Expected: no errors, build succeeds.

- [ ] **Step 5: Final commit**

```bash
git add src/components/Gallery.tsx src/components/GalleryLightbox.tsx src/App.tsx
git commit -m "feat(gallery): add gallery section with lightbox and expand/collapse"
```
