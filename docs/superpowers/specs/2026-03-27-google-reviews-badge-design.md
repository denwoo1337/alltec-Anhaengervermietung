# Google Reviews Badge — Design Spec

**Date:** 2026-03-27
**Status:** Approved

## Overview

Add a static Google rating badge to the Hero section of the ALLTEC Anhängervermietung one-pager. The badge displays the business's 4.8-star rating and 44 reviews, links to Google Maps, and matches the existing dark design system.

## Placement

Inserted as a new `motion.a` item inside the existing `containerVariants` stagger in `Hero.tsx`, positioned **between the CTAs and the scroll indicator** (after the CTA flex row, before the `mt-16` scroll arrow block). This keeps it in natural reading flow without disrupting the headline hierarchy.

## Visual Design

A compact inline pill:

```
★★★★★  4,8  ·  44 Rezensionen auf Google  ↗
```

- **Container:** `inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2` — left-aligned, no centering wrapper
- **Stars:** 5× `Star` icons (`weight="fill"`) from `@phosphor-icons/react`, `text-amber-400`, size 12px
- **Rating text:** `"4,8"` in `text-sm font-semibold text-white`
- **Separator:** `·` in `text-zinc-600`
- **Label:** `"44 Rezensionen auf Google"` in `text-xs text-zinc-400`
- **Arrow icon:** `ArrowUpRight` from `@phosphor-icons/react`, size 12, `text-zinc-500`
- **Hover:** subtle brightness lift (`hover:bg-white/10`, `hover:border-white/15`), `transition-all duration-200`

## Behaviour

- Rendered as an `<a>` tag wrapping the pill
- `href`: Google Maps share URL for ALLTEC (`https://share.google/terGN8aPecS9CBDz6`)
- `target="_blank" rel="noopener noreferrer"`
- Animated via existing `itemVariants` (fade up, stagger delay from container)

## Implementation

**File to edit:** `src/components/Hero.tsx`

**Changes:**
1. Import `ArrowUpRight` from `@phosphor-icons/react` (add to existing import)
2. Add the badge `<motion.a>` block after the CTA `motion.div` and before the scroll indicator `motion.div`

No new files needed.

## Non-Goals

- No live API calls
- No review cards or testimonial text
- No changes to other components
