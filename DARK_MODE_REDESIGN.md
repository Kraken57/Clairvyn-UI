# Dark Mode — Design Documentation

## Overview

Dark mode is available on the `/chatbot` route only. All other pages force `color-scheme: light only`.

## Color System

Full reference: `DARK_MODE_COLOR_PALETTE.md`

### Backgrounds (warm near-black)
| Token | Hex | Use |
|-------|-----|-----|
| `--dk-bg-shell` | `#1A1916` | Sidebar / outer shell |
| `--dk-bg-chat` | `#1F1D1A` | Chat area |
| `--dk-bg-surface` | `#242320` | Elevated cards |
| `--dk-bg-input` | `#2C2A27` | Input fields |
| `--dk-bg-hover` | `#2A2825` | Hover state |
| `--dk-bg-active` | `#2F2C28` | Active / pressed |

### Accent (violet)
| Token | Value | Use |
|-------|-------|-----|
| `--dk-accent` | `#9B7FD4` | Primary accent |
| `--dk-accent-deep` | `#7C5CBF` | Hover accent |
| `--dk-accent-muted` | `rgba(155,127,212,0.12)` | Tinted bg |
| `--dk-accent-border` | `rgba(155,127,212,0.25)` | Accent borders |
| `--dk-lavender` | `#C4B0F0` | Lavender highlight |

### Text (cream-warm)
| Token | Hex | Use |
|-------|-----|-----|
| `--dk-text-primary` | `#F0EBE0` | Headings |
| `--dk-text-secondary` | `#A8A090` | Body text |
| `--dk-text-muted` | `#6B6458` | Tertiary text |
| `--dk-text-placeholder` | `#5A5248` | Placeholders |

### Borders (glassmorphism)
| Token | Value | Use |
|-------|-------|-----|
| `--dk-border` | `rgba(255,255,255,0.07)` | Subtle |
| `--dk-border-mid` | `rgba(255,255,255,0.11)` | Medium |
| `--dk-border-strong` | `rgba(255,255,255,0.18)` | Strong |
| `--border` | `#3F3A33` (HSL: 35 10% 22%) | Solid |

### Scrollbars
| Token | Value |
|-------|-------|
| `--dk-scroll-thumb` | `rgba(155,127,212,0.25)` |
| `--dk-scroll-hover` | `rgba(155,127,212,0.45)` |

## CSS Structure

All dark-mode styles live in `app/globals.css` under the `.dark` selector.

```css
.dark {
  --background: 30 7% 12%;
  /* ... shadcn overrides ... */

  /* Clairvyn design tokens */
  --dk-bg-shell: #1A1916;
  --dk-bg-chat:  #1F1D1A;
  /* ... etc ... */
}
```

Elements are styled with `.dark .element-class` rules lower in the file.

## Adding New Dark-Mode Styles

```css
.dark .new-element {
  background: var(--dk-bg-surface);
  color: var(--dk-text-primary);
  border: 1px solid var(--dk-border-mid);
}

.dark .new-element:hover {
  background: var(--dk-bg-hover);
}
```

## Accessibility

| Text | Background | Ratio | Level |
|------|-----------|-------|-------|
| `#F0EBE0` | `#1F1D1A` | 13.2:1 | AAA |
| `#A8A090` | `#1F1D1A` | 6.7:1 | AA |
| `#9B7FD4` | `#1F1D1A` | 5.7:1 | AA |
| `#C4B0F0` | `#1F1D1A` | 9.2:1 | AAA |

## Testing

1. Navigate to `/chatbot`
2. Toggle dark mode in settings
3. Verify warm backgrounds, violet accents, cream text
4. Check scrollbar tinting
5. Confirm no pure gray or old blue/indigo remnants
