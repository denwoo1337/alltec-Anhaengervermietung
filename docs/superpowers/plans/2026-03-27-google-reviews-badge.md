# Google Reviews Badge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a static clickable Google rating badge (4,8 ★ · 44 Rezensionen) to the Hero section, linking to the ALLTEC Google Maps page.

**Architecture:** Single edit to `src/components/Hero.tsx` — add a `motion.a` badge element inside the existing Framer Motion stagger container, between the CTA buttons and the scroll indicator.

**Tech Stack:** React 19, Framer Motion v12, Tailwind v4, @phosphor-icons/react

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/Hero.tsx` | Modify | Add `Star` import, insert badge `motion.a` between CTAs and scroll indicator |

---

## Task 1: Add Google Reviews Badge to Hero

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Add `Star` and `ArrowUpRight` to the phosphor import**

In `src/components/Hero.tsx`, update the existing import line:

```tsx
import { ArrowDown, Star, ArrowUpRight } from '@phosphor-icons/react';
```

- [ ] **Step 2: Insert the badge `motion.a` after the CTA block**

After the closing `</motion.div>` of the CTA flex row (line ~93) and before the scroll indicator `motion.div` (line ~96), insert:

```tsx
{/* Google rating badge */}
<motion.a
  variants={itemVariants}
  href="https://share.google/terGN8aPecS9CBDz6"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2 hover:bg-white/10 hover:border-white/[0.15] transition-all duration-200"
>
  <span className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={12} weight="fill" className="text-amber-400" />
    ))}
  </span>
  <span className="text-sm font-semibold text-white">4,8</span>
  <span className="text-zinc-600">·</span>
  <span className="text-xs text-zinc-400">44 Rezensionen auf Google</span>
  <ArrowUpRight size={12} className="text-zinc-500" />
</motion.a>
```

- [ ] **Step 3: Start dev server and verify visually**

```bash
npm run dev
```

Check in the browser:
- Badge appears between CTA buttons and scroll indicator
- Amber stars render correctly
- Text reads "4,8 · 44 Rezensionen auf Google"
- Badge has dark pill appearance with subtle border
- Hover state shows slightly brighter background
- Clicking opens Google Maps in a new tab
- Badge animates in with the existing stagger (fade up)
- Layout looks correct on mobile and desktop

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Google reviews badge to Hero section"
```
