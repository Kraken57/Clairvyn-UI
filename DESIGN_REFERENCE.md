# UI/UX Design Guide - Updated Implementation

## 🎯 Design Philosophy

**Minimalist + Premium + Functional**

- Clean, uncluttered interfaces
- Subtle animations (not distracting)
- Dark mode native support
- Mobile-first responsive design
- Fast, snappy interactions
- Clear visual hierarchy

---

## 📱 Profile Modal (Mobile & Desktop)

### Mobile Layout (< 640px)
```
┌──────────────────────────────────┐
│ Profile                       ✕  │  ← Sticky header
├──────────────────────────────────┤
│                                  │
│         ┌──────────────┐         │
│         │   AVATAR     │         │
│         │    📷        │         │  ← Large 96px avatar
│         └──────────────┘         │
│  "Click to change photo"         │
│                                  │
│  Full Name                       │
│  ┌──────────────────────────┐   │
│  │ John Doe              │ │   │
│  └──────────────────────────┘   │
│                                  │
│  Email                           │
│  ┌──────────────────────────┐   │
│  │ john@example.com (gray)  │   │  ← Read-only
│  └──────────────────────────┘   │
│                                  │
│  ─────────────────────────────  │
│                                  │
│  ┌──────────────────────────┐   │
│  │  Save                    │   │  ← Primary (teal)
│  └──────────────────────────┘   │
│  ┌──────────────────────────┐   │
│  │ Sign Out                 │   │  ← Danger (red outline)
│  └──────────────────────────┘   │
│                                  │
└──────────────────────────────────┘
```

### Desktop Layout (≥ 640px)
```
                ┌──────────────────────────────┐
                │ Profile Settings         ✕  │  ← Centered
                ├──────────────────────────────┤
                │                              │
                │       ┌──────────────┐       │
                │       │   AVATAR     │       │
                │       │    📷        │       │
                │       └──────────────┘       │
                │  "Click to change photo"    │
                │                              │
                │  Full Name                  │
                │  ┌────────────────────┐    │
                │  │ [input field]  │ │    │
                │  └────────────────────┘    │
                │                              │
                │  Email                      │
                │  ┌────────────────────┐    │
                │  │ john@example.com   │    │
                │  └────────────────────┘    │
                │                              │
                │  ─────────────────────────  │
                │                              │
                │  [Save]  [Sign Out]         │
                │                              │
                └──────────────────────────────┘
```

### Animation Flow
```
1. Click Profile in Sidebar
   ↓ (200ms fade + scale)
   
2. Modal Appears
   Mobile: Slides up from bottom
   Desktop: Scales in from center
   
3. User Edits
   ↓
   
4. Click Save
   ↓ (fade out button, show "Saving...")
   
5. Success
   ↓ (green checkmark "Profile saved!")
   ↓ (wait 1500ms)
   ↓ (modal closes)
```

---

## 🎨 Color Scheme

### Light Mode
```
Backgrounds:
- Surface: #FFFFFF (white)
- Tint: #F8F5FF (soft violet)
- Hover: #EDE8FA (light violet)

Text:
- Primary: #1A1040 (deep violet-black)
- Secondary: #5B4D8A (muted violet)
- Muted: #8B7BAE (soft violet-gray)
- Placeholder: #A090C0 (light violet-gray)

Accents:
- Primary Action: #7C5CBF (violet)
- Hover: #5A3A9E (deep violet)
- Accent: #8B5CF6 (bright violet)
- Accent Dark: #6D28D9 (vivid violet)
- Success: #22A06B (green)
- Error: #DC2626 (red)
- Warning: #D97706 (amber)

Borders:
- Light: #D4C8F0 (soft lavender)
- Default: #B8A8E0 (muted lavender)
```

### Dark Mode
```
Backgrounds:
- Primary: #111827 (gray-900)
- Secondary: #1F2937 (gray-800)
- Hover: #374151 (gray-700)

Text:
- Primary: #F3F4F6 (gray-100)
- Secondary: #D1D5DB (gray-300)
- Disabled: #6B7280 (gray-500)

Accents:
- Primary Action: #0D9488 (teal-600) ← Same
- Hover: #14B8A6 (teal-500)
- Success: #10B981 (green-600) ← Same
- Error: #F87171 (red-500)
- Warning: #FBBF24 (amber-400)
```

---

## 🖼️ Component States

### Avatar Component
```
Default:
┌────────┐
│        │
│  USER  │ ← Gradient bg, white icon
│        │
└────────┘

With Image:
┌────────┐
│        │
│  [IMG] │ ← Shows user photo
│        │
└────────┘

Hover:
┌────────┐
│        │
│  [IMG] │  ← 2px ring glow (teal)
│        │
└────────┘
```

### Input Fields
```
Default:
┌─────────────────────────────────┐
│ Placeholder text...             │
└─────────────────────────────────┘

Focused:
┌─────────────────────────────────┐
│ User typing...                  │ ← Teal ring
└─────────────────────────────────┘

Disabled:
┌─────────────────────────────────┐
│ john@example.com                │ ← Gray bg, opacity 50%
└─────────────────────────────────┘
```

### Button States
```
Save Button (Primary)
─────────────────────────────────
Idle:
[    Save Changes    ] ← Teal bg, white text

Hover:
[    Save Changes    ] ← Darker teal, scale 1.02

Active/Click:
[    Save Changes    ] ← Scale 0.98 (pressed)

Loading:
[  Saving... ⏳    ] ← Disabled, spinner

Success:
[    ✓ Saved    ] ← Green bg momentarily

────────────────────────────────
Sign Out Button (Danger)
────────────────────────────────
Idle:
[  Sign Out  ] ← Red outline, red text, transparent

Hover:
[  Sign Out  ] ← Light red background

Active:
[  Sign Out  ] ← Scale 0.98
```

### Messages
```
Error Message:
┌──────────────────────────────────┐
│ ⚠ File size must be less than 5MB │ ← Red bg, red text
└──────────────────────────────────┘
Duration: 3 seconds (auto-dismiss)

Success Message:
┌──────────────────────────────────┐
│ ✓ Profile saved!                  │ ← Green bg, green text
└──────────────────────────────────┘
Duration: 1.5 seconds (auto-dismiss)
```

---

## 🧭 Sidebar Navigation

### Sidebar Menu Items
```
┌─────────────────────────────────┐
│ New Chat                    [+]  │ ← Icon on left
├─────────────────────────────────┤
│ History                     [⏱]  │
├─────────────────────────────────┤
│ About                       [🌐] │  ← New items
├─────────────────────────────────┤
│ Pricing                     [$]  │
├─────────────────────────────────┤
│ Privacy                     [🔐] │
└─────────────────────────────────┘

Hover State:
┌─────────────────────────────────┐
│ New Chat                    [+]  │ ← Light gray bg
└─────────────────────────────────┘
```

### Profile Section (Sidebar)
```
Idle:
┌────┐
│IMG│  John Doe
└────┘  Signed in

Hover:
┌────┐
│IMG│ (with ring glow)
└────┘  John Doe
        Signed in

Opacity 80%
Ring: 2px teal
```

---

## 📊 Waitlist Modal

### For New Users (No Email)
```
┌──────────────────────────────────┐
│ Join the waitlist             ✕  │
├──────────────────────────────────┤
│                                  │
│ Be the first to know when the  │
│ Company plan is available.     │
│                                  │
│ Email                            │
│ ┌──────────────────────────┐   │
│ │ you@example.com        │ │   │
│ └──────────────────────────┘   │
│                                  │
│ ┌──────────────────────────┐   │
│ │  Join waitlist           │   │
│ └──────────────────────────┘   │
│                                  │
└──────────────────────────────────┘
```

### For Logged-In Users
```
┌──────────────────────────────────┐
│ Join the waitlist             ✕  │
├──────────────────────────────────┤
│                                  │
│ Be the first to know when the  │
│ Company plan is available.     │
│                                  │
│ ┌──────────────────────────┐   │
│ │  Join waitlist           │   │ ← No email field!
│ └──────────────────────────┘   │
│                                  │
│ ✓ You're on the list.            │ ← Success
│ We'll be in touch.               │
│                                  │
└──────────────────────────────────┘
```

---

## 🎬 Interaction Animations

### Modal Open (Desktop)
```
Timeline: 0ms → 300ms
Scale: 0.95 → 1.0
Opacity: 0 → 1
Y Position: -20px → 0px
Easing: Spring (stiffness: 300, damping: 25)
```

### Modal Open (Mobile)
```
Timeline: 0ms → 300ms
Y Position: 100% → 0%
Easing: Spring (stiffness: 300, damping: 25)
```

### Photo Upload
```
1. Click camera icon
   Scale: 1.0 → 1.1 (hover)
   
2. File selected
   Scale: 1.1 → 0.95 (click)
   
3. Upload complete
   Success message fades in
   Avatar updates with new photo
```

### Button Clicks
```
Hover: scale(1.02)
Click: scale(0.98)
Duration: 100ms
Easing: easeOut
```

---

## 📐 Spacing & Typography

### Typography Scale
```
Headings:
- H2 (Modal title): 18px, font-semibold, gray-900
- H3 (Section): 14px, font-semibold, gray-700

Body:
- Regular: 14px, font-medium, gray-900
- Secondary: 12px, font-normal, gray-500

Labels:
- Label: 14px, font-semibold, gray-700
- Helper: 12px, font-normal, gray-500
```

### Spacing
```
Padding (Interior):
- Modal: 24px (6 units)
- Sections: 24px
- Input: 10px horizontal, 8px vertical

Gaps (Between elements):
- Sections: 24px
- Inputs: 16px
- Buttons: 12px

Border Radius:
- Modal: 24px (mobile top), 12px (desktop)
- Inputs: 12px
- Buttons: 12px
- Avatar: 12px
```

---

## 🌙 Dark Mode Implementation

### Strategy
```
Use Tailwind dark: prefix
- dark:bg-gray-900
- dark:text-white
- dark:border-gray-700

Theme detection:
- system preference (prefers-color-scheme)
- localStorage override
- Context provider (ThemeContext.tsx)
```

### Dark Mode Colors
```
Primary Actions: Same teal (0D9488)
Error Text: Red-400 (instead of red-600)
Secondary Text: Gray-300 (instead of gray-500)
Borders: Gray-700 (instead of gray-300)
Backgrounds: Gray-900 (instead of white)
```

---

## ♿ Accessibility

### ARIA Labels
```
<button aria-label="Close modal">
  <X className="w-5 h-5" />
</button>

<input
  aria-label="Full name"
  type="text"
  placeholder="Your name"
/>
```

### Keyboard Navigation
```
Tab: Move through form fields
Enter: Submit form
Escape: Close modal
Space: Activate button
```

### Focus States
```
All interactive elements have visible focus ring:
focus:ring-2 focus:ring-[#7C5CBF] focus:ring-offset-2
```

### Color Contrast
```
Text on white: #1A1040 (4.5:1 ratio)
Text on violet: White/light (7:1+ ratio)
Disabled text: #D1D5DB on white (2:1 ratio - acceptable for disabled)
```

---

## 🚀 Performance

### Optimizations
```
1. Modal: Lazy rendered (only mount when open)
2. Animations: GPU accelerated (transform, opacity)
3. Images: Responsive (srcset not needed for avatars)
4. Forms: Debounced validation (if added)
5. Bundle: Only include used icons
```

### Load Times
```
Target:
- Modal open: < 100ms
- Form submit: < 500ms response
- Photo upload: < 3s for 5MB file
- Page navigation: < 200ms redirect
```

---

## 📱 Responsive Breakpoints

### Tailwind Breakpoints
```
sm: 640px   - Tablets
md: 768px   - Small laptops
lg: 1024px  - Laptops
xl: 1280px  - Desktops
2xl: 1536px - Large screens
```

### Modal Behavior
```
< 640px (Mobile):
- Bottom sheet layout
- Full width minus padding
- Slide up animation
- Touch-friendly buttons (48px min height)

≥ 640px (Desktop):
- Center modal
- Max width 500px
- Fade + scale animation
- Standard button sizing
```

---

## 🎯 Brand Consistency

### Clairvyn Brand Colors (White / Light Mode)
```
Primary:   #7C5CBF (Violet – for hero, links, buttons)
Hover:     #5A3A9E (Deep Violet – for interactive hover)
Secondary: #9B7FD4 (Soft Violet – for secondary elements)
Accent:    #8B5CF6 (Bright Violet – for badges, highlights)
Dark Text: #1A1040 (Deep Violet-Black – for headings)
Light:     #F8F5FF (Soft Violet – for backgrounds)
Tint:      #EDE8FA (Lavender – for tinted surfaces)
Success:   #22A06B (Green – for success)
Error:     #DC2626 (Red – for error)
Warning:   #D97706 (Amber – for warning)
```

### Font Family
```
Body: Inter
Heading: Inter (with font-weight adjustments)
Special: Caveat (for decorative)

Load strategy: Google Fonts (preloaded)
```

---

## 🔍 Visual Hierarchy

### Emphasis Levels
```
Level 1 (Most important):
- Large avatars
- Primary action buttons
- Modal titles
- User names

Level 2 (Important):
- Labels
- Secondary buttons
- Descriptions

Level 3 (Context):
- Helper text
- Disabled state
- Secondary information
```

### Visual Weight
```
Using:
- Font weight (semibold vs normal)
- Color intensity (primary vs secondary text)
- Size differences (18px vs 14px)
- Contrast (white on dark vs gray on light)
```

---

## ✅ Design Checklist

### Verified
- [x] Mobile responsive (tested at 375px, 768px, 1024px)
- [x] Dark mode fully supported
- [x] Color contrast meets WCAG AA
- [x] Touch targets 48px+ on mobile
- [x] Animations smooth and not distracting
- [x] Loading states clear
- [x] Error states obvious
- [x] Success feedback immediate
- [x] Navigation intuitive
- [x] Minimalist, premium aesthetic

---

**Design Implementation: Complete & Production Ready**
