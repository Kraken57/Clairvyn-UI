# Dark Mode Implementation Status

## Current Palette

Dark mode tokens defined in `app/globals.css` → `.dark` selector.  
Scoped to `/chatbot` route only.

| Category | Tokens |
|----------|--------|
| Backgrounds | `#1A1916` shell / `#1F1D1A` chat / `#242320` surface / `#2C2A27` input |
| Accent | `#9B7FD4` primary / `#7C5CBF` deep / `#C4B0F0` lavender |
| Text | `#F0EBE0` primary / `#A8A090` secondary / `#6B6458` muted |
| Borders | `rgba(255,255,255, 0.07/0.11/0.18)` glassmorphism |
| Scrollbars | `rgba(155,127,212, 0.25/0.45)` violet-tinted |

## Files

- `app/globals.css` — All dark mode CSS (`.dark` selector + `--dk-*` tokens)
- `contexts/ThemeContext.tsx` — Dark mode toggle logic
- `lib/documentTheme.ts` — Dark mode initialization
- `components/TypingIndicator.tsx` — Animated loading dots (dark/light aware)

## Testing

```
npm run dev
# Navigate to /chatbot
# Toggle dark mode in settings
# Verify warm backgrounds + violet accents
```

See `DARK_MODE_COLOR_PALETTE.md` for the full token reference.
