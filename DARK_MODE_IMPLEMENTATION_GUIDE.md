# Dark Mode Implementation Guide

## Overview

The chatbot dark mode uses a warm near-black + violet accent palette.
All tokens defined in `app/globals.css` → `.dark` selector.
Dark mode is **only available on `/chatbot` route**.

## Quick Start

### To Enable Dark Mode
1. Navigate to `/chatbot`
2. Click the settings button (gear icon)
3. Toggle "Dark mode" switch
4. Changes apply immediately

### Preference Storage
Saved to `localStorage` key `chatbot-dark-mode`.

## CSS Structure

All dark mode styles use the `.dark` prefix in `app/globals.css`:

```css
.dark .chat-background    { background-color: var(--dk-bg-shell); }
.dark .chat-bubble-user   { background-color: var(--dk-accent-deep); }
.dark .chat-bubble-assistant { background-color: var(--dk-bg-surface); }
.dark .chat-input         { background-color: var(--dk-bg-input); }
```

## Current Color Reference

### Backgrounds (warm near-black)
| Token | Value | Usage |
|-------|-------|-------|
| `--dk-bg-shell` | `#1A1916` | Page shell |
| `--dk-bg-chat` | `#1F1D1A` | Chat area |
| `--dk-bg-surface` | `#242320` | Cards, bubbles |
| `--dk-bg-input` | `#2C2A27` | Input fields |
| `--dk-bg-hover` | `#2A2825` | Hover state |
| `--dk-bg-active` | `#2F2C28` | Active state |

### Accent (violet)
| Token | Value | Usage |
|-------|-------|-------|
| `--dk-accent` | `#9B7FD4` | Primary accent |
| `--dk-accent-deep` | `#7C5CBF` | User bubbles |
| `--dk-accent-muted` | `rgba(155,127,212,0.12)` | Tinted surfaces |
| `--dk-accent-border` | `rgba(155,127,212,0.25)` | Accent borders |
| `--dk-lavender` | `#C4B0F0` | Highlight text |

### Text (warm cream)
| Token | Value | Usage |
|-------|-------|-------|
| `--dk-text-primary` | `#F0EBE0` | Headings, body |
| `--dk-text-secondary` | `#A8A090` | Subtle labels |
| `--dk-text-muted` | `#6B6458` | Disabled text |
| `--dk-text-placeholder` | `#5A5248` | Placeholders |

### Borders (glassmorphism)
| Token | Value |
|-------|-------|
| `--dk-border` | `rgba(255,255,255, 0.07)` |
| `--dk-border-mid` | `rgba(255,255,255, 0.11)` |
| `--dk-border-strong` | `rgba(255,255,255, 0.18)` |
| `--dk-border-solid` | `#3F3A33` |

### Scrollbars (violet-tinted)
| Token | Value |
|-------|-------|
| `--dk-scroll-thumb` | `rgba(155,127,212, 0.25)` |
| `--dk-scroll-hover` | `rgba(155,127,212, 0.45)` |

## Adding New Dark Mode Styles

### Method 1: Using CSS custom properties
```css
.dark .new-element {
  background-color: var(--dk-bg-surface);
  color: var(--dk-text-primary);
  border: 1px solid var(--dk-border-mid);
}

.dark .new-element:hover {
  background-color: var(--dk-bg-hover);
}
```

### Method 2: Using Tailwind dark mode
```jsx
<div className="bg-white dark:bg-[var(--dk-bg-surface)]">
  Content
</div>
```

## Styling Guidelines

### Shadows — keep subtle
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
```

### Borders — use tokens
```css
border: 1px solid var(--dk-border-mid);
```

### Text — match approved palette
```css
color: var(--dk-text-primary);   /* main text */
color: var(--dk-text-secondary); /* subtle */
color: var(--dk-text-muted);     /* disabled */
```

## Troubleshooting

### Dark Mode Not Applying
1. Check if on `/chatbot` route
2. Verify `.dark` prefix is used
3. Check localStorage: `localStorage.getItem("chatbot-dark-mode")`
4. Clear browser cache and reload

### Styles Not Overriding Tailwind
Use CSS specificity: `.dark .element { ... }` or `!important` as last resort.

## File Locations

| File | Purpose |
|------|---------|
| `app/globals.css` | All dark mode styles (`.dark` selector) |
| `contexts/ThemeContext.tsx` | Dark mode toggle logic |
| `lib/documentTheme.ts` | Dark mode initialization |
| `DARK_MODE_COLOR_PALETTE.md` | Complete token reference |

## Common Tasks

### Add a New Element to Dark Mode
```css
.dark .new-feature {
  background-color: var(--dk-bg-surface);
  color: var(--dk-text-primary);
  border: 1px solid var(--dk-border-mid);
}

.dark .new-feature:hover {
  background-color: var(--dk-bg-hover);
}
```

### Create an Accent Button
```css
.dark .btn-accent {
  background-color: var(--dk-accent-deep);
  color: var(--dk-text-primary);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
}

.dark .btn-accent:hover {
  background-color: var(--dk-accent);
}
```

### Highlight an Important Message
```css
.dark .message-important {
  background-color: var(--dk-bg-surface);
  border-left: 3px solid var(--dk-accent);
  padding: 12px;
  color: var(--dk-text-primary);
}
```

## Related Files

- `app/chatbot/page.tsx` — Main chatbot component
- `tailwind.config.ts` — Tailwind configuration
- `DARK_MODE_COLOR_PALETTE.md` — Full color reference

---

**Last Updated:** April 6, 2026
**Status:** ✅ Complete and stable
**Maintainer:** Development Team
