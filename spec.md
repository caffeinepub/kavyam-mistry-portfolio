# Kavyam Mistry Portfolio

## Current State
A Minecraft-themed portfolio with custom username/password authentication. Login.tsx is the login page. CustomAuthWrapper handles routing between login/register/portfolio/owner pages. Portfolio sections are individual components (AboutMeSection, ExperienceSection, etc.).

## Requested Changes (Diff)

### Add
- MinecraftCursorEffect component: enchanting table floating particles + Minecraft block pixels that appear/fade on cursor movement, shown only on Login page
- ScrollReveal wrapper/hook for portfolio sections: 3D depth zoom-in effect + glitch/distortion effect when sections scroll into view

### Modify
- Login.tsx: integrate MinecraftCursorEffect component
- App.tsx portfolio sections: wrap each section with scroll reveal animation

### Remove
- Nothing removed

## Implementation Plan
1. Create MinecraftCursorEffect.tsx — canvas overlay on login page tracking mouse, emitting enchanting table rune particles and pixelated block particles that fade out
2. Add the cursor effect to Login.tsx
3. Create useScrollReveal hook using IntersectionObserver
4. Add CSS keyframes for 3D depth (perspective + scale/translateZ) and glitch (clip-path distortion + color shift) animations
5. Wrap each portfolio section in App.tsx with scroll reveal div
