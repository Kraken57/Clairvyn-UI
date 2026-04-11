# Dark Mode Implementation

## Current Dark Mode Design

Dark mode is available on the `/chatbot` route only. Uses warm near-black backgrounds with violet accents.

### Color Palette

See `DARK_MODE_COLOR_PALETTE.md` for the full reference.

**Backgrounds:** `#1A1916` → `#1F1D1A` → `#242320` → `#2C2A27`
**Accent:** `#9B7FD4` (violet) / `#7C5CBF` (deep) / `#C4B0F0` (lavender)
**Text:** `#F0EBE0` (primary) / `#A8A090` (secondary) / `#6B6458` (muted)
**Borders:** `rgba(255,255,255,0.07)` → `0.11` → `0.18`
**Scrollbars:** Violet-tinted — `rgba(155,127,212,0.25)` / `0.45` hover

### Design Principles

- Warm tones (brown-black, not pure gray)
- Violet accent system for interactivity
- Cream/parchment text instead of pure white
- Glassmorphism-inspired borders (translucent white)
- WCAG AA+ contrast compliance
- Dark mode restricted to chatbot route only

### Files

| File | Purpose |
|------|---------|
| `app/globals.css` | `.dark` CSS variables and rules |
| `contexts/ThemeContext.tsx` | Toggle logic |
| `lib/documentTheme.ts` | Initialization |

**Status:** Production ready
