# Fleet Expandable Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current bento-grid Fleet section (1 large + 2 small cards) with a uniform 3-column grid of equal-sized expandable cards that customers can open independently to compare trailers.

**Architecture:** A single `TrailerCard` component replaces `LargeCard` and `SmallCard`. Each card manages its own open/closed state via `useState`. The grid uses `align-items: start` so expanding one card does not affect others. Framer Motion `AnimatePresence` handles the expand/collapse animation.

**Tech Stack:** React 18, TypeScript, Tailwind v4, Framer Motion v12, `@phosphor-icons/react`

---

### Task 1: Update trailer data and types in Fleet.tsx

**Files:**
- Modify: `src/components/Fleet.tsx`

- [ ] **Step 1: Replace the `Trailer` type**

In `src/components/Fleet.tsx`, replace the existing `Spec`, `Pricing`, and `Trailer` types with:

```ts
type Spec = { label: string; value: string };
type PriceEntry = { label: string; price: string };

type Trailer = {
  id: number;
  name: string;
  model: string;
  tag: string;
  zulassung: string;
  keySpec: string;
  img: string;
  imgPosition: string;
  specs: Spec[];
  highlights: string[];
  pricing: PriceEntry[];
};
```

- [ ] **Step 2: Replace the `trailers` array**

Replace the existing `trailers` array (keep the same image imports at the top of the file):

```ts
const trailers: Trailer[] = [
  {
    id: 1,
    name: 'Auto-Transportanhänger',
    model: 'Z-Trailer AT30-21/48',
    tag: 'Verfügbar',
    zulassung: '3.000 kg',
    keySpec: 'Nutzlast 2.460 kg · Ladelänge 4,80 m',
    img: autoImg,
    imgPosition: 'center 55%',
    specs: [
      { label: 'Zulassung', value: '3.000 kg' },
      { label: 'Nutzlast', value: 'ca. 2.460 kg' },
      { label: 'Eigengewicht', value: 'ca. 540 kg' },
      { label: 'Ladebreite', value: '2,10 m' },
      { label: 'Ladelänge', value: '4,80 m' },
    ],
    highlights: ['Kippbar', '80 km/h zugelassen', 'Seilwinde optional', 'Rampen ausziehbar'],
    pricing: [
      { label: 'Tag', price: '65 €' },
      { label: 'Weiterer Tag', price: '50 €' },
      { label: 'Wochenende', price: '150 €' },
    ],
  },
  {
    id: 2,
    name: 'Planenanhänger',
    model: 'Humbaur HA752513',
    tag: 'Verfügbar',
    zulassung: '750 kg',
    keySpec: 'Nutzlast 520 kg · Klasse B genügt',
    img: planenImg,
    imgPosition: 'center 70%',
    specs: [
      { label: 'Zulassung', value: '750 kg ungebremst' },
      { label: 'Nutzlast', value: 'ca. 520 kg' },
      { label: 'Innenlänge', value: '251 cm' },
      { label: 'Innenbreite', value: '131 cm' },
      { label: 'Innenhöhe', value: '180 cm' },
    ],
    highlights: ['Klasse B genügt', '750 kg ungebremst', 'Hochplane'],
    pricing: [
      { label: 'Tag', price: '30 €' },
      { label: 'Weiterer Tag', price: '20 €' },
      { label: 'Wochenende', price: '70 €' },
    ],
  },
  {
    id: 3,
    name: 'Motorradanhänger',
    model: 'Humbaur HM752113',
    tag: 'Verfügbar',
    zulassung: '750 kg',
    keySpec: 'Nutzlast 500 kg · 3 Stellplätze',
    img: motorradImg,
    imgPosition: 'center 60%',
    specs: [
      { label: 'Zulassung', value: '750 kg ungebremst' },
      { label: 'Nutzlast', value: '500 kg' },
      { label: 'Innenlänge', value: '209 cm' },
      { label: 'Innenbreite', value: '136 cm' },
      { label: 'Stellplätze', value: '3' },
    ],
    highlights: ['3 Stellplätze', 'Rampe montiert', 'Zurrpunkte', '750 kg ungebremst'],
    pricing: [
      { label: 'Tag', price: '30 €' },
      { label: 'Weiterer Tag', price: '20 €' },
      { label: 'Wochenende', price: '70 €' },
    ],
  },
];
```

- [ ] **Step 3: Update the import line at the top of Fleet.tsx**

Add `useState` and `AnimatePresence` to imports. The top of the file should read:

```ts
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';
import { CaretDown, ArrowRight } from '@phosphor-icons/react';
import autoImg from '../../brand_assets/3000kg_Autoanhänger.jpg';
import planenImg from '../../brand_assets/750kg_Planenanhänger.jpg';
import motorradImg from '../../brand_assets/750kg_Motorrad.jpg';
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Fleet.tsx
git commit -m "refactor(fleet): update Trailer type and data for expandable cards"
```

---

### Task 2: Write the TrailerCard component

**Files:**
- Modify: `src/components/Fleet.tsx`

- [ ] **Step 1: Delete `LargeCard` and `SmallCard` components**

Remove the entire `LargeCard` function and the entire `SmallCard` function (search by function name, not line number — line numbers shift after Task 1 edits). Keep `scrollToContact` (it is defined at module scope and is called directly inside `TrailerCard`), `containerVariants`, `itemVariants`, and the `Fleet` default export.

- [ ] **Step 2: Add the `TrailerCard` component**

Insert this component before the `Fleet` default export:

```tsx
function TrailerCard({
  trailer,
  delay,
  inView,
}: {
  trailer: Trailer;
  delay: number;
  inView: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#1c1c1c' }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={trailer.img}
          alt={trailer.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            objectPosition: trailer.imgPosition,
            transform: isOpen ? 'scale(1)' : undefined,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(28,28,28,1) 0%, rgba(28,28,28,0.2) 50%, transparent 80%)',
          }}
        />
        {/* Badges */}
        <span
          className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded"
          style={{
            background: 'rgba(17,17,17,0.85)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(6px)',
            color: '#a3e635',
          }}
        >
          {trailer.tag}
        </span>
        <span
          className="absolute top-3 right-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded"
          style={{
            background: 'rgba(17,17,17,0.85)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(6px)',
            color: '#e5e5e5',
          }}
        >
          {trailer.zulassung}
        </span>
      </div>

      {/* Collapsed header — always visible */}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-0.5">{trailer.model}</p>
          <h3 className="text-sm font-bold text-white tracking-tight mb-1">{trailer.name}</h3>
          <p className="text-xs text-zinc-500">{trailer.keySpec}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-black text-white leading-none">{trailer.pricing[0].price}</p>
          <p className="text-[10px] text-zinc-600 mb-1">/ Tag</p>
          <div
            className="flex items-center justify-end gap-1 text-[11px] font-semibold transition-colors duration-200"
            style={{ color: isOpen ? '#a3e635' : '#52525b' }}
          >
            <span>{isOpen ? 'Schließen' : 'Details'}</span>
            <CaretDown
              size={11}
              weight="bold"
              style={{
                transition: 'transform 0.35s ease',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Expandable detail panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-4 pb-4 pt-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Technische Daten */}
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-zinc-600 mb-2">
                Technische Daten
              </p>
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {trailer.specs.map(({ label, value }) => (
                  <div
                    key={label}
                    className="px-2.5 py-2 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-xs font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>

              {/* Ausstattung */}
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-zinc-600 mb-2">
                Ausstattung
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {trailer.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] text-zinc-400 px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.75rem' }} />

              {/* Preise */}
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-zinc-600 mb-2">
                Preise
              </p>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                {trailer.pricing.map(({ label, price }) => (
                  <div
                    key={label}
                    className="px-2 py-2 rounded-lg text-center"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm font-black text-white">{price}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToContact();
                }}
                className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-zinc-950 bg-white px-4 py-2.5 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 group/btn"
              >
                Jetzt anfragen
                <ArrowRight size={12} weight="bold" className="transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Fleet.tsx
git commit -m "feat(fleet): add TrailerCard expandable component"
```

---

### Task 3: Update the Fleet grid layout

**Files:**
- Modify: `src/components/Fleet.tsx`

- [ ] **Step 1: Replace the Bento Grid block in the `Fleet` component**

Find the `{/* Bento Grid */}` block and replace it with a uniform 3-column grid:

```tsx
{/* Uniform Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-start">
  {trailers.map((trailer, i) => (
    <TrailerCard
      key={trailer.id}
      trailer={trailer}
      delay={i * 0.12}
      inView={inView}
    />
  ))}
</div>
```

Also remove the destructure line `const [large, ...small] = trailers;` — it's no longer needed.

- [ ] **Step 2: Verify the dev server renders correctly**

```bash
npm run dev
```

Open the browser, navigate to the Fleet section. Verify:
- 3 cards render at equal width, same collapsed height
- Clicking a card expands it; the others stay at their collapsed height
- Multiple cards can be open simultaneously
- The "Jetzt anfragen" button scrolls to the contact section without toggling the card closed

- [ ] **Step 3: Commit**

```bash
git add src/components/Fleet.tsx
git commit -m "feat(fleet): replace bento grid with uniform expandable card grid"
```
