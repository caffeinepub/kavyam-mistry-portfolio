# Kavyam Mistry Portfolio

## Current State
The portfolio page (`Portfolio` component in `App.tsx`) has a plain `bg-black` background with scroll reveal sections. There is no animated background layer.

## Requested Changes (Diff)

### Add
- `HerobrineStormBackground` component: full-screen fixed background with:
  - Canvas-based animated lightning storm (bright, dramatic bolts, random strikes, flickering sky flash)
  - Herobrine pixel-art figure image rendered over the storm, centered/bottom-anchored, large and imposing
  - Dark storm clouds animated (CSS or canvas)
  - Rain particle effect (canvas)
  - Glowing white-eye effect on Herobrine

### Modify
- `App.tsx` `Portfolio` component: add `<HerobrineStormBackground />` as the first child inside the root div, behind all content. Root div gets `relative` positioning.

### Remove
- Nothing

## Implementation Plan
1. Create `src/frontend/src/components/HerobrineStormBackground.tsx`
   - Full-screen fixed canvas (`position: fixed, inset: 0, z-index: 0`)
   - Canvas draws: dark gradient sky, animated rain, dramatic lightning bolts with sky flash
   - Herobrine image overlaid via `<img>` tag (fixed, bottom-center, large ~40vh height)
   - Glowing white-eye pulse animation via CSS keyframes
   - Lightning strikes: random interval 800-3000ms, multi-branch bolt drawn on canvas, sky flashes white/purple briefly
2. Update `App.tsx`: import and render `<HerobrineStormBackground />` inside `Portfolio` root div with `relative` class, all content wrapped in `relative z-10`
