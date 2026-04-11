# Dark Mode Color Palette — Authoritative Reference

Source of truth: `app/globals.css` → `.dark` selector  
Scope: `/chatbot` route only

---

## Shadcn HSL Overrides

```css
.dark {
  --background:            30 7% 12%;
  --foreground:            35 28% 89%;
  --card:                  30 8% 19%;
  --card-foreground:       35 28% 89%;
  --popover:               30 7% 12%;
  --popover-foreground:    35 28% 89%;
  --primary:               35 28% 89%;
  --primary-foreground:    30 7% 12%;
  --secondary:             33 9% 18%;
  --secondary-foreground:  35 28% 89%;
  --muted:                 33 9% 16%;
  --muted-foreground:      35 10% 55%;
  --accent:                33 9% 18%;
  --accent-foreground:     35 28% 89%;
  --destructive:           0 62.8% 30.6%;
  --destructive-foreground:35 28% 89%;
  --border:                35 10% 22%;
  --input:                 25 9% 13%;
  --ring:                  35 10% 35%;
}
```

---

## Clairvyn Design Tokens

### Backgrounds (warm near-black)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--dk-bg-shell` | `#1A1916` | 26, 25, 22 | Page shell / sidebar |
| `--dk-bg-chat` | `#1F1D1A` | 31, 29, 26 | Chat area background |
| `--dk-bg-surface` | `#242320` | 36, 35, 32 | Cards, assistant bubbles |
| `--dk-bg-input` | `#2C2A27` | 44, 42, 39 | Input fields |
| `--dk-bg-hover` | `#2A2825` | 42, 40, 37 | Hover state |
| `--dk-bg-active` | `#2F2C28` | 47, 44, 40 | Active/pressed state |

### Accent (violet)

| Token | Value | Usage |
|-------|-------|-------|
| `--dk-accent` | `#9B7FD4` | Primary accent color |
| `--dk-accent-deep` | `#7C5CBF` | User message bubbles |
| `--dk-accent-muted` | `rgba(155,127,212, 0.12)` | Tinted surfaces |
| `--dk-accent-border` | `rgba(155,127,212, 0.25)` | Accent borders |
| `--dk-lavender` | `#C4B0F0` | Highlight text / links |

### Text (warm cream)

| Token | Hex | Contrast on `#1F1D1A` | Usage |
|-------|-----|----------------------|-------|
| `--dk-text-primary` | `#F0EBE0` | 13.2:1 AAA | Headings, body text |
| `--dk-text-secondary` | `#A8A090` | 6.7:1 AA | Labels, descriptions |
| `--dk-text-muted` | `#6B6458` | 3.4:1 | Disabled / decorative |
| `--dk-text-placeholder` | `#5A5248` | 2.7:1 | Input placeholders |

### Borders (glassmorphism)

| Token | Value | Usage |
|-------|-------|-------|
| `--dk-border` | `rgba(255,255,255, 0.07)` | Subtle dividers |
| `--dk-border-mid` | `rgba(255,255,255, 0.11)` | Cards, bubbles |
| `--dk-border-strong` | `rgba(255,255,255, 0.18)` | Emphasized borders |
| `--dk-border-solid` | `#3F3A33` | Solid fallback |

### Scrollbars (violet-tinted)

| Token | Value |
|-------|-------|
| `--dk-scroll-thumb` | `rgba(155,127,212, 0.25)` |
| `--dk-scroll-hover` | `rgba(155,127,212, 0.45)` |

---

## Accessibility

| Text | Background | Ratio | Level |
|------|-----------|-------|-------|
| `#F0EBE0` | `#1F1D1A` | 13.2:1 | AAA |
| `#A8A090` | `#1F1D1A` | 6.7:1 | AA |
| `#9B7FD4` | `#1F1D1A` | 5.7:1 | AA |
| `#C4B0F0` | `#1F1D1A` | 9.2:1 | AAA |
| `#F0EBE0` | `#242320` | 12.0:1 | AAA |
| `#9B7FD4` | `#1A1916` | 6.1:1 | AA |

---

## Quick Development Reference

```css
/* Use tokens in new dark mode elements */
.dark .new-element {
  background-color: var(--dk-bg-surface);
  color: var(--dk-text-primary);
  border: 1px solid var(--dk-border-mid);
}
.dark .new-element:hover {
  background-color: var(--dk-bg-hover);
}
```

## Performance Notes

- Solid colors are fastest to render
- No complex gradients = better performance
- OLED displays benefit from high black content
- Recommended for:
  - Mobile devices (battery life)
  - Long viewing sessions (eye strain)
  - High-contrast preferences
