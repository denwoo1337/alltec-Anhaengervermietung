# Fleet Section — Expandable Equal Cards

**Date:** 2026-03-27
**Status:** Approved

## Goal

Replace the current bento grid (LargeCard + SmallCard components) with a uniform 3-column grid where all cards are visually equal. Each card expands independently on click to reveal full trailer details. Cards can all be open simultaneously for customer comparison.

## Layout

- **Grid:** 3 equal columns, Tailwind `grid-cols-1 md:grid-cols-3 items-start` — expanding one card does not affect the height of others
- **Collapsed state (all cards):** Photo (fixed `h-40`) + badges + model number + name + keySpec line + price per day + toggle
- **Expanded state:** Card grows downward independently, revealing structured detail sections
- **Toggle behavior:** Each card toggles independently via local `useState`. No shared state. Multiple cards can be open simultaneously.

## Data Model

Remove `LargeCard`, `SmallCard`, `large: boolean`, and `description` from `Fleet.tsx`. Replace with a single `TrailerCard` component and updated `Trailer` type:

```ts
type Spec = { label: string; value: string };
type PriceEntry = { label: string; price: string };

type Trailer = {
  id: number;
  name: string;
  model: string;
  tag: string;
  zulassung: string;       // shown in top-right badge + first spec row
  keySpec: string;         // one-line summary shown in collapsed state e.g. "Nutzlast 2.460 kg · Ladelänge 4,80 m"
  img: string;
  imgPosition: string;
  specs: Spec[];           // full list for expanded Technische Daten grid
  highlights: string[];    // tags for Ausstattung section
  pricing: PriceEntry[];   // Tag / Weiterer Tag / Wochenende
};
```

## Trailer Data

### Auto-Transportanhänger
```ts
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
}
```

### Planenanhänger
```ts
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
}
```

### Motorradanhänger
```ts
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
}
```

## Card Structure

### Collapsed (always visible)
1. Image `h-40 object-cover` — hover scale disabled when open
2. Top-left badge: `trailer.tag` (lime green)
3. Top-right badge: `trailer.zulassung`
4. Model number (muted, uppercase, small)
5. Name (bold, white)
6. `trailer.keySpec` line (muted)
7. Price per day (large, bold) + `CaretDown` icon (rotates 180° when open, turns lime)

### Expanded (animated, below collapsed)
1. Section label **TECHNISCHE DATEN** + 2-col spec grid (`trailer.specs`)
2. Section label **AUSSTATTUNG** + pill tags (`trailer.highlights`)
3. Horizontal divider
4. Section label **PREISE** + 3-col pricing grid (`trailer.pricing`)
5. CTA button "Jetzt anfragen →" → `scrollToContact()`

## Animation

### Expand/Collapse
Use `AnimatePresence initial={false}` + conditional render:

```tsx
<AnimatePresence initial={false}>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ overflow: 'hidden' }}
    >
      {/* expanded content */}
    </motion.div>
  )}
</AnimatePresence>
```

`overflow: hidden` must be on the `motion.div` itself (not a parent). `initial={false}` on `AnimatePresence` prevents exit animation on first render.

### Toggle arrow
Use Phosphor `CaretDown` icon. Apply CSS `rotate` transition:
```tsx
<CaretDown
  size={13}
  weight="bold"
  style={{ transition: 'transform 0.35s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
/>
```

### Card entrance animation
Preserve existing stagger: `useInView` on the section ref, `motion.div` per card with `initial={{ opacity: 0, y: 24 }}` animated in with increasing `delay` per index.

## Mobile
On `grid-cols-1` (mobile), all three cards can still be open simultaneously — the long scroll is acceptable. No auto-scroll or snap behavior required.

## Cleanup
- Remove `LargeCard` component
- Remove `SmallCard` component
- Remove `containerVariants`, `itemVariants` if only used by removed components (keep if still used by section header)
- Remove `large: boolean` from `Trailer` type
- Remove `description` from `Trailer` type
