# Dark Mode — CSS Token Reference

All dark mode tokens are defined in `app/globals.css` → `.dark` selector.
Dark mode is scoped to the `/chatbot` route only.

## CSS Custom Properties

### Shadcn Overrides (HSL)

```css
.dark {
  --background: 30 7% 12%;
  --foreground: 35 28% 89%;
  --card: 30 8% 19%;
  --card-foreground: 35 28% 89%;
  --popover: 30 7% 12%;
  --popover-foreground: 35 28% 89%;
  --primary: 35 28% 89%;
  --primary-foreground: 30 7% 12%;
  --secondary: 33 9% 18%;
  --secondary-foreground: 35 28% 89%;
  --muted: 33 9% 16%;
  --muted-foreground: 35 10% 55%;
  --accent: 33 9% 18%;
  --accent-foreground: 35 28% 89%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 35 28% 89%;
  --border: 35 10% 22%;
  --input: 25 9% 13%;
  --ring: 35 10% 35%;
}
```

### Clairvyn Design Tokens

```css
.dark {
  /* Backgrounds – warm near-black */
  --dk-bg-shell:   #1A1916;
  --dk-bg-chat:    #1F1D1A;
  --dk-bg-surface: #242320;
  --dk-bg-input:   #2C2A27;
  --dk-bg-hover:   #2A2825;
  --dk-bg-active:  #2F2C28;

  /* Accent – violet */
  --dk-accent:        #9B7FD4;
  --dk-accent-deep:   #7C5CBF;
  --dk-accent-muted:  rgba(155, 127, 212, 0.12);
  --dk-accent-border: rgba(155, 127, 212, 0.25);
  --dk-lavender:      #C4B0F0;

  /* Text – warm cream */
  --dk-text-primary:     #F0EBE0;
  --dk-text-secondary:   #A8A090;
  --dk-text-muted:       #6B6458;
  --dk-text-placeholder: #5A5248;

  /* Borders – glassmorphism */
  --dk-border:        rgba(255, 255, 255, 0.07);
  --dk-border-mid:    rgba(255, 255, 255, 0.11);
  --dk-border-strong: rgba(255, 255, 255, 0.18);
  --dk-border-solid:  #3F3A33;

  /* Scrollbars – violet-tinted */
  --dk-scroll-thumb: rgba(155, 127, 212, 0.25);
  --dk-scroll-hover: rgba(155, 127, 212, 0.45);
}
```

## Usage Examples

### Chat background
```css
.dark .chat-background {
  background-color: var(--dk-bg-shell);
}
```

### User message bubble
```css
.dark .chat-bubble-user {
  background-color: var(--dk-accent-deep);
  color: var(--dk-text-primary);
  border: 1px solid var(--dk-accent-border);
}
```

### Assistant message bubble
```css
.dark .chat-bubble-assistant {
  background-color: var(--dk-bg-surface);
  color: var(--dk-text-primary);
  border: 1px solid var(--dk-border-mid);
}
```

### Input area
```css
.dark .chat-input {
  background-color: var(--dk-bg-input);
  border: 1px solid var(--dk-border-mid);
  color: var(--dk-text-primary);
}
.dark .chat-input::placeholder {
  color: var(--dk-text-placeholder);
}
```

### Scrollbars
```css
.dark .scrollbar-main {
  scrollbar-color: var(--dk-scroll-thumb) transparent;
}
.dark .scrollbar-main::-webkit-scrollbar-thumb:hover {
  background-color: var(--dk-scroll-hover);
}
```

## Accessibility

| Text on `#1F1D1A` | Ratio | Level |
|--------------------|-------|-------|
| `#F0EBE0` primary | 13.2:1 | AAA |
| `#A8A090` secondary | 6.7:1 | AA |
| `#9B7FD4` accent | 5.7:1 | AA |
| `#C4B0F0` lavender | 9.2:1 | AAA |

See `DARK_MODE_COLOR_PALETTE.md` for the full authoritative token reference.
