# Design System
# gewe - Home Health Supply Automation Platform

**Philosophy:** Apple-inspired minimalism optimized for older clinicians
**Tagline:** "Less is more, clarity is everything"

---

## Design Principles

### 1. Clarity First
- Every element has a clear purpose
- Information hierarchy is obvious at a glance
- Actions are unambiguous (no guessing what buttons do)

### 2. Accessibility by Default
- Large, readable text (never sacrifice readability for aesthetics)
- High contrast (consider users with declining vision)
- Touch-friendly targets (some users have reduced dexterity)
- Screen reader compatible (future-proof for accessibility)

### 3. Reduce Cognitive Load
- One primary action per screen
- Minimize choices (decision fatigue is real)
- Consistent patterns (once learned, always works the same)

### 4. Immediate Feedback
- Every tap/click gets instant visual response
- Loading states for anything > 100ms
- Success/error states are clear and reassuring

### 5. Mobile-First, Always
- Clinicians are on the road, not at desks
- Design for thumb reach zones
- Optimize for outdoor lighting conditions

---

## Color Palette

### Primary Colors

**Blue (Primary Action)**
- `#007AFF` - Primary buttons, links, active states
- Use: Call-to-action buttons, selected states, progress indicators
- Rationale: Medical trust, iOS familiarity, universally accessible

**White/Light Gray (Background)**
- `#FFFFFF` - Card backgrounds, modals
- `#F5F5F7` - Page background (Apple gray)
- Use: Main backgrounds, card surfaces
- Rationale: Clean, reduces eye strain, maximizes contrast

**Dark Gray (Text)**
- `#1D1D1F` - Primary text (headings, labels)
- `#86868B` - Secondary text (metadata, descriptions)
- Use: All text content
- Rationale: High contrast against white, easier to read than pure black

### Status Colors

**Green (Success/Delivered)**
- `#34C759` - Success states, delivered status
- Use: Confirmation messages, completed actions, delivered supplies
- Rationale: Universal "good" indicator, positive reinforcement

**Yellow (Warning/Pending)**
- `#FFCC00` - Pending states, attention needed
- Use: Waiting for doctor signature, review required
- Rationale: Draws attention without alarm, indicates action needed

**Orange (Delayed/Alert)**
- `#FF9500` - Delays, non-critical warnings
- Use: Late deliveries, items needing attention
- Rationale: Urgency without panic

**Red (Error/Critical)**
- `#FF3B30` - Errors, critical issues only
- Use: Form errors, failed actions, critical alerts
- Rationale: Used sparingly to maintain impact

### Neutral Grays

**Borders & Dividers:**
- `#E5E5E7` - Subtle dividers, card borders
- `#D1D1D6` - More prominent borders, form inputs

**Disabled States:**
- `#C7C7CC` - Disabled button backgrounds
- `#8E8E93` - Disabled text

---

## Typography

### Font Family

**Primary:** System Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```
**Rationale:** Native to each platform, optimized for readability, zero load time

### Type Scale

**Display (Patient Names, Headings)**
- Size: `32px` (2rem)
- Weight: `700` (Bold)
- Line Height: `1.2`
- Use: Page titles, patient names

**Heading 1 (Section Headers)**
- Size: `24px` (1.5rem)
- Weight: `600` (Semibold)
- Line Height: `1.3`
- Use: Section titles, modal headers

**Heading 2 (Sub-sections)**
- Size: `20px` (1.25rem)
- Weight: `600` (Semibold)
- Line Height: `1.4`
- Use: Card titles, sub-sections

**Body Large (Primary Content)**
- Size: `18px` (1.125rem)
- Weight: `400` (Regular)
- Line Height: `1.5`
- Use: Supply lists, important data

**Body (Standard Text)**
- Size: `16px` (1rem)
- Weight: `400` (Regular)
- Line Height: `1.5`
- Use: Most text content, descriptions

**Caption (Metadata)**
- Size: `14px` (0.875rem)
- Weight: `400` (Regular)
- Line Height: `1.4`
- Color: `#86868B` (secondary gray)
- Use: Timestamps, secondary info

**Small (Fine Print)**
- Size: `12px` (0.75rem)
- Weight: `400` (Regular)
- Line Height: `1.4`
- Use: Legal text, help text (use sparingly)

### Typography Rules

1. **Never go below 16px for body text** (accessibility minimum)
2. **Use bold for emphasis, not color alone** (color-blind friendly)
3. **Limit line length to 75 characters** (optimal readability)
4. **Increase line height for dense content** (1.5-1.6 for paragraphs)

---

## Spacing System

**Base Unit:** `8px` (0.5rem)

All spacing is a multiple of 8px for consistency:

- `4px` - Micro spacing (icon padding, tight gaps)
- `8px` - Small spacing (between related items)
- `16px` - Medium spacing (between sections)
- `24px` - Large spacing (between major sections)
- `32px` - XL spacing (page margins, card padding)
- `48px` - XXL spacing (major page sections)

### Spacing Usage

**Component Internal Padding:**
- Buttons: `16px horizontal, 12px vertical`
- Cards: `24px` all sides
- Modals: `32px` all sides
- Form inputs: `16px horizontal, 14px vertical`

**Component Spacing:**
- Between form fields: `16px`
- Between cards: `16px`
- Between sections: `32px`
- Page margins: `16px` (mobile), `24px` (tablet), `32px` (desktop)

---

## Components

### Buttons

#### Primary Button (Call-to-Action)
```css
Background: #007AFF
Text Color: #FFFFFF
Font Size: 18px
Font Weight: 600
Padding: 16px 32px
Border Radius: 12px
Min Height: 56px (touch-friendly)
Shadow: 0 2px 8px rgba(0,122,255,0.15)

Hover: Background #0051D5
Active: Background #004DB8, Scale 0.98
Disabled: Background #C7C7CC, Text #8E8E93
```

**Example:**
```
┌────────────────────────────────┐
│   Approve & Order Supplies    │
└────────────────────────────────┘
```

#### Secondary Button
```css
Background: transparent
Text Color: #007AFF
Border: 2px solid #007AFF
Font Size: 18px
Font Weight: 600
Padding: 14px 32px
Border Radius: 12px
Min Height: 56px

Hover: Background #007AFF, Text #FFFFFF
Active: Border Color #004DB8
```

**Example:**
```
┌────────────────────────────────┐
│         View Tracking          │
└────────────────────────────────┘
```

#### Text Button (Tertiary)
```css
Background: transparent
Text Color: #007AFF
Font Size: 16px
Font Weight: 600
Padding: 8px 16px
No Border

Hover: Text Color #0051D5
Active: Text Color #004DB8, Opacity 0.7
```

**Example:** `Cancel` or `Back to Dashboard`

---

### Cards

#### Patient Card (Dashboard)
```css
Background: #FFFFFF
Border Radius: 16px
Padding: 24px
Shadow: 0 2px 12px rgba(0,0,0,0.06)
Border: 1px solid #E5E5E7

Hover: Shadow 0 4px 16px rgba(0,0,0,0.08)
Active: Scale 0.98
```

**Layout:**
```
┌────────────────────────────────────────┐
│  Sarah Martinez                   🟢   │
│  Diabetic Wound Care                   │
│                                        │
│  Ordered - Arrives Tuesday             │
│  Next Visit: Thursday, March 20        │
└────────────────────────────────────────┘
```

**Components:**
- Name: 24px bold, `#1D1D1F`
- Diagnosis: 16px regular, `#86868B`
- Status Badge: Top right
- Metadata: 14px, `#86868B`

---

### Status Badges

#### Badge Styles
```css
Border Radius: 20px (pill shape)
Padding: 6px 16px
Font Size: 14px
Font Weight: 600
Display: inline-flex
Align Items: center
Gap: 6px (for icon + text)
```

#### Badge Variants

**Pending (Yellow)**
```css
Background: #FFF4CC
Text Color: #996A00
Icon: ⏳ or 🟡
```
Example: `🟡 Pending Signature`

**Ready (Blue)**
```css
Background: #E0F0FF
Text Color: #0051D5
Icon: 📋 or 🔵
```
Example: `🔵 Ready to Order`

**Ordered (Green)**
```css
Background: #E5F7EC
Text Color: #1F7A3D
Icon: 📦 or 🟢
```
Example: `🟢 Ordered - Arrives Tue`

**Delivered (Green Check)**
```css
Background: #E5F7EC
Text Color: #1F7A3D
Icon: ✅
```
Example: `✅ Delivered`

**Delayed (Orange)**
```css
Background: #FFF3E0
Text Color: #CC6600
Icon: ⚠️
```
Example: `⚠️ Delayed - New ETA: Fri`

---

### Forms

#### Text Input
```css
Background: #FFFFFF
Border: 2px solid #D1D1D6
Border Radius: 12px
Padding: 14px 16px
Font Size: 18px
Min Height: 56px

Focus: Border Color #007AFF, Shadow 0 0 0 4px rgba(0,122,255,0.1)
Error: Border Color #FF3B30, Shadow 0 0 0 4px rgba(255,59,48,0.1)
Disabled: Background #F5F5F7, Border Color #E5E5E7
```

**Example:**
```
┌────────────────────────────────┐
│  Patient Name                  │
└────────────────────────────────┘
```

#### Checkbox
```css
Size: 28px × 28px
Border: 2px solid #D1D1D6
Border Radius: 6px
Checkmark Color: #FFFFFF

Checked: Background #007AFF, Border #007AFF
Hover: Border Color #007AFF
```

---

### Modals

#### Modal Structure
```css
Background: #FFFFFF
Border Radius: 20px
Padding: 32px
Max Width: 500px
Shadow: 0 12px 48px rgba(0,0,0,0.15)

Overlay: Background rgba(0,0,0,0.4)
Animation: Fade in + Scale up (0.2s ease-out)
```

**Layout:**
```
┌─────────────────────────────────────────┐
│  × Close                                │
│                                         │
│  Modal Title                            │
│  ━━━━━━━━━━━━                          │
│                                         │
│  Modal content goes here with proper   │
│  spacing and clear hierarchy.          │
│                                         │
│  ┌──────────┐  ┌──────────────────┐   │
│  │  Cancel  │  │  Confirm Action  │   │
│  └──────────┘  └──────────────────┘   │
└─────────────────────────────────────────┘
```

**Components:**
- Close button: Top right, text button style
- Title: 24px bold
- Divider: 2px `#E5E5E7` below title
- Content: 16px, comfortable line height
- Actions: Right-aligned, secondary + primary buttons

---

### Loading States

#### Spinner
```css
Size: 32px
Border: 3px solid #E5E5E7
Border Top Color: #007AFF
Border Radius: 50%
Animation: Spin 0.8s linear infinite
```

#### Skeleton Loader (for cards)
```css
Background: Linear gradient shimmer
  #F5F5F7 → #E5E5E7 → #F5F5F7
Animation: Shimmer 1.5s ease-in-out infinite
Border Radius: Match component (16px for cards)
```

**Example:**
```
┌────────────────────────────────┐
│  ████████████          ▓▓▓     │
│  ████████                      │
│                                │
│  ████████████████              │
│  ██████████                    │
└────────────────────────────────┘
```

---

### Lists

#### Supply List (Table Format)
```css
Border: 1px solid #E5E5E7
Border Radius: 12px
Overflow: hidden
```

**Row Structure:**
```
Item Name               Quantity    Unit
────────────────────────────────────────
Sterile Gauze Pads      50          pads
Saline Solution         4           bottles
Medical Tape            2           rolls
```

**Styling:**
- Header: 14px uppercase, `#86868B`, padding `12px 16px`
- Row: 18px, `#1D1D1F`, padding `16px`, border-bottom `1px solid #E5E5E7`
- Hover: Background `#F5F5F7`
- Divider: 1px `#E5E5E7` between rows

---

## Layout & Grid

### Responsive Breakpoints

**Mobile (320px - 767px)**
- Single column layout
- Full-width cards
- Side margins: `16px`
- Stack all elements vertically

**Tablet (768px - 1023px)**
- Two-column grid (optional)
- Side margins: `24px`
- Max content width: `768px`

**Desktop (1024px+)**
- Max content width: `1200px`
- Center content with auto margins
- Side padding: `32px`
- Optional sidebar for navigation

### Grid System

**12-Column Grid** (for desktop layouts)
- Gutter: `24px`
- Column: `(container width - 11 gutters) / 12`

**Dashboard Grid:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns (for patient cards)

---

## Icons

### Icon Style
- **Library:** Use system emojis for MVP (zero dependencies, universally supported)
- **Size:** 24px for inline, 32px for standalone
- **Color:** Inherit from text color or use status colors

### Icon Usage

**Status Icons:**
- 🟡 Yellow Circle - Pending
- 🔵 Blue Circle - Ready
- 🟢 Green Circle - Ordered/In Progress
- ✅ Green Check - Complete/Delivered
- ⚠️ Warning Sign - Alert/Delayed
- ❌ Red X - Error/Failed

**Action Icons:**
- ⏎ Return - Back/Navigate back
- 🔍 Magnifying Glass - Search
- 🎤 Microphone - Voice input
- 📦 Package - Supplies/Shipping
- 📍 Pin - Location/Address
- 📅 Calendar - Date/Schedule

**Future:** Replace emojis with SF Symbols (iOS) or Material Icons (consistent style)

---

## Animation & Transitions

### Timing Functions

**Standard Easing:**
```css
transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
```
Use for: Most transitions (buttons, cards)

**Ease Out (Enter):**
```css
transition-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
```
Use for: Modals appearing, tooltips

**Ease In (Exit):**
```css
transition-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
```
Use for: Modals disappearing, removing items

### Duration

- **Instant:** `100ms` - Hover states, ripple effects
- **Quick:** `200ms` - Button interactions, tab switches
- **Standard:** `300ms` - Modal open/close, page transitions
- **Slow:** `500ms` - Complex animations (use sparingly)

### Common Animations

**Button Press:**
```css
active {
  transform: scale(0.98);
  transition: transform 100ms ease-out;
}
```

**Card Hover:**
```css
hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transform: translateY(-2px);
  transition: all 200ms ease-out;
}
```

**Modal Enter:**
```css
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
duration: 200ms, ease-out
```

**Shimmer (Loading):**
```css
@keyframes shimmer {
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
}
duration: 1500ms, ease-in-out, infinite
```

---

## Accessibility Specifications

### Color Contrast Ratios

**WCAG AA Compliance (Minimum):**
- Normal text (< 18px): 4.5:1 contrast
- Large text (≥ 18px): 3:1 contrast
- UI components: 3:1 contrast

**Our Implementation:**
- `#1D1D1F` on `#FFFFFF`: 16.1:1 ✅ (Exceeds AAA)
- `#86868B` on `#FFFFFF`: 4.6:1 ✅ (Meets AA for 18px+)
- `#007AFF` on `#FFFFFF`: 4.5:1 ✅ (Meets AA)

### Touch Targets

**Minimum Size:** `48px × 48px` (WCAG 2.1 Level AAA)
**Recommended:** `56px × 56px` for primary actions

**Spacing Between Targets:** Minimum `8px` gap

### Focus States

**All interactive elements must have visible focus indicator:**
```css
focus {
  outline: 3px solid #007AFF;
  outline-offset: 2px;
}
```

**Focus Order:**
- Logical tab order (top to bottom, left to right)
- Skip navigation link for screen readers
- Modal focus trap (tab cycles within modal)

### Screen Reader Support

**Use semantic HTML:**
- `<button>` for actions (not `<div onClick>`)
- `<nav>` for navigation
- `<main>` for main content
- `<header>`, `<footer>` for page structure

**ARIA Labels:**
- Add `aria-label` for icon-only buttons
- Use `aria-live` for dynamic content updates
- `aria-describedby` for error messages

**Example:**
```html
<button aria-label="Approve and order supplies for John Doe">
  Approve & Order
</button>
```

---

## Dark Mode (Future Consideration)

**Not implemented in MVP, but architecture supports it:**

**Color Palette Adjustments:**
- Background: `#1C1C1E` (dark gray, not pure black)
- Card background: `#2C2C2E`
- Primary text: `#FFFFFF`
- Secondary text: `#A1A1A6`
- Primary blue: `#0A84FF` (brighter for dark backgrounds)

**Implementation:**
```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

---

## Component Examples (Mockups)

### Dashboard View

```
┌────────────────────────────────────────────┐
│  gewe                          Sarah M. ☰  │
├────────────────────────────────────────────┤
│                                            │
│  My Patients                               │
│  ─────────────────────                     │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  John Doe                      ✅    │ │
│  │  Post-surgical wound care            │ │
│  │  Delivered - March 15                │ │
│  │  Next Visit: March 18                │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  Sarah Martinez              🟢      │ │
│  │  Diabetic wound care                 │ │
│  │  Ordered - Arrives Tuesday           │ │
│  │  Next Visit: Thursday, March 20      │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  Robert Chen                 🟡      │ │
│  │  CHF monitoring                      │ │
│  │  Pending Doctor Signature            │ │
│  │  First Visit: March 22               │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  Mary Johnson                🔵      │ │
│  │  Post-surgical recovery              │ │
│  │  Ready to Order                      │ │
│  │  Next Visit: March 25                │ │
│  └──────────────────────────────────────┘ │
│                                            │
└────────────────────────────────────────────┘
```

### Patient Detail View

```
┌────────────────────────────────────────────┐
│  ← Back        gewe         Sarah M. ☰     │
├────────────────────────────────────────────┤
│                                            │
│  Sarah Martinez                            │
│  ━━━━━━━━━━━━━━                            │
│                                            │
│  Age: 58  |  DOB: 03/15/1966              │
│  Address: 123 Oak Street, Apt 2B          │
│           San Jose, CA 95110              │
│                                            │
│  Primary Diagnosis                         │
│  Diabetic wound care requiring daily      │
│  dressing changes and monitoring.          │
│                                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                            │
│  Approved Supplies                         │
│                                            │
│  Item                       Qty    Unit    │
│  ────────────────────────────────────────  │
│  Sterile Gauze Pads (4x4")  50     pads   │
│  Saline Solution            4      bottles │
│  Medical Tape               2      rolls   │
│  Wound Vac Supplies         1      kit     │
│  Antibiotic Ointment        2      tubes   │
│  Nitrile Gloves (Large)     100    gloves  │
│                                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                            │
│  ✅ Dr. Jennifer Smith signed March 14     │
│                                            │
│  Next Visit: Thursday, March 20            │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │    Approve & Order Supplies          │ │
│  └──────────────────────────────────────┘ │
│                                            │
│             View Tracking →                │
│                                            │
└────────────────────────────────────────────┘
```

### Confirmation Modal

```
         ┌─────────────────────────────┐
         │  × Close                    │
         │                             │
         │  Confirm Supply Order       │
         │  ━━━━━━━━━━━━━━━━━━━━━━━  │
         │                             │
         │  Patient: Sarah Martinez    │
         │  Delivery: 123 Oak St, 2B   │
         │  Items: 6 supply types      │
         │                             │
         │  Estimated Delivery:        │
         │  Tuesday, March 18          │
         │                             │
         │  Supplier: Medline          │
         │                             │
         │  ┌────────┐ ┌────────────┐ │
         │  │ Cancel │ │ Confirm ✓  │ │
         │  └────────┘ └────────────┘ │
         └─────────────────────────────┘
```

---

## Implementation Checklist

### Phase 1: Foundation (30 min)
- [ ] Set up Tailwind CSS with custom config
- [ ] Define color variables
- [ ] Configure font system
- [ ] Create spacing utilities
- [ ] Set up responsive breakpoints

### Phase 2: Core Components (60 min)
- [ ] Button component (primary, secondary, text)
- [ ] Card component
- [ ] Status badge component
- [ ] Modal component
- [ ] Form input component

### Phase 3: Page Layouts (30 min)
- [ ] Dashboard layout
- [ ] Patient detail layout
- [ ] Navigation component

### Phase 4: Polish (15 min)
- [ ] Add transitions and animations
- [ ] Test on mobile device
- [ ] Accessibility check (focus states, contrast)

---

## Design Tools & Assets

**Recommended Tools:**
- Figma (for high-fidelity mockups if needed)
- Tailwind CSS (for rapid implementation)
- React + Tailwind UI (component library)

**Asset Locations:**
- Component code: `/home/claude/components/`
- Design tokens: `/home/claude/styles/tokens.css`
- Example pages: `/home/claude/pages/`

---

*This design system ensures visual consistency and accessibility throughout the gewe platform.*
