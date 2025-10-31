# Pathfinder 2e Encounter Builder - Design Guidelines

## Design Approach

**Reference-Based with Strong Thematic Identity**: This application draws from tabletop RPG aesthetics, specifically mimicking hand-drawn character sheets and parchment paper. The design prioritizes the tactile, analog feel of traditional gaming while maintaining digital usability.

**Core Design Principle**: Create a digital experience that feels like working with physical game master notes - warm, approachable, and slightly imperfect by design.

---

## Typography

**Primary Font**: Kalam (Google Fonts) - handwritten cursive style
- Apply to ALL elements for consistent hand-drawn aesthetic
- Headings: Font weight 700, slight text shadows for depth
- Body text: Font weight 400
- Interactive elements: Font weight 700 (bold) for emphasis
- Number inputs: Bold, center-aligned for readability

**Hierarchy**:
- H1: 2.25rem (36px), bold, color #8B4513 (brown), 3px shadow
- H2: 1.25rem (20px), semi-bold, color #2D1B69 (pf-dark), 2px shadow  
- H3: 1.125rem (18px), medium weight, color #2D1B69, 1px shadow
- Body: 1rem (16px), regular weight

---

## Color Palette

**Background Colors**:
- Page background: #d4b896 (warm parchment) with grid overlay pattern
- Card backgrounds: #fefefe (off-white paper)
- Input backgrounds: #fff (pure white)
- Alternate sections: #F9FAFB (light gray)

**Brand Colors**:
- Primary Dark (pf-dark): #2D1B69 (deep purple)
- Accent Gold (pf-gold): #FFD700 
- Accent Red (pf-red): #8B0000
- Brown accent: #8B4513

**Threat Level Colors** (backgrounds with matching borders):
- Trivial: #f0f9ff (light blue) / border #0369a1
- Low: #f0fdf4 (light green) / border #166534
- Moderate: #fffbeb (light yellow) / border #d97706
- Severe: #fef2f2 (light red) / border #dc2626
- Extreme: #3f0a0a (dark red) / text #fca5a5

**Interactive Elements**:
- Default buttons: #fff background, #333 border
- Primary action: #2D1B69 background, white text
- Secondary actions: #F3F4F6 background, #374151 text

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently
- Component padding: p-6 (1.5rem)
- Section gaps: gap-6 to gap-8
- Element spacing: space-y-4 for vertical stacks
- Button spacing: space-x-2 for horizontal groups

**Grid Structure**:
- Desktop (lg+): 3-column grid - 1 column sidebar (config) + 2 columns main (stats/export)
- Tablet/Mobile: Single column stack

**Container**: 
- Max-width: Container mx-auto with px-4 horizontal padding
- Vertical rhythm: py-8 for page sections

---

## Component Design

### Cards & Panels
- Background: #fefefe (off-white)
- Border: 3px solid #333 (hand-drawn weight)
- Border radius: 15px (rounded-lg)
- Box shadow: 4px 4px 8px rgba(0,0,0,0.3) for depth
- Slight rotation transforms (0.1-0.4deg) for hand-drawn feel

### Buttons
- All buttons: 3px solid #333 border, 12px border radius
- Box shadow: 3px 3px 6px rgba(0,0,0,0.2)
- Hover: scale(1.05) transform + enhanced shadow (5px 5px 10px)
- Font weight: Bold for all button text
- Increment/decrement: 32px × 32px (w-8 h-8), centered text

### Form Inputs
- Border: 2px solid #333
- Border radius: 8px
- Background: #fff
- Focus state: 3px shadow with #2D1B69 at 20% opacity
- Number inputs: Center-aligned, bold text

### Monster Role Cards
- Border-left: 4px solid #2D1B69 accent
- Slight hover lift: translateY(-2px)
- Role indicators: Emoji icons (🗡️ ⚔️ 👑 🏆 💀)

### Status Indicators
- Threat assessment badges with colored backgrounds
- 2px borders matching text color
- Small rotation for hand-drawn effect
- Text: Bold, center-aligned

---

## Visual Effects

**Hand-Drawn Aesthetic**:
- Subtle element rotations: -0.4deg to 0.4deg randomly applied
- All borders: Solid (not smooth), slightly heavier weight
- Text shadows on all headings for depth
- No smooth scrolling - instant scroll for authentic feel

**Background Texture**:
- Linear gradients creating grid lines (90deg and 0deg)
- Radial gradient for subtle paper texture
- Background size: 25px × 25px grid
- Fixed attachment for stability

**Shadows & Depth**:
- Cards: 4px 4px 8px rgba(0,0,0,0.3)
- Buttons: 3px 3px 6px rgba(0,0,0,0.2)
- Hover states: Enhanced to 5px 5px 10px rgba(0,0,0,0.3)
- Text shadows: 1-3px based on hierarchy

---

## Interaction Patterns

### Party Configuration
- Side-by-side layout: Label on left, controls on right
- Decrement/increment buttons flanking number input
- Immediate visual feedback on all changes

### Monster Composition
- Vertical stack of role cards
- Each card: Icon + label on left, controls on right
- Real-time XP calculation display
- Clear visual separation with spacing

### Statistics Display
- Tabular layout for monster stats
- Grouped by role with visual separators
- Compact stat presentation: "Fort: +X | Ref: +Y | Will: +Z"
- Damage ranges on single line

### Templates
- Button list format
- Template name clearly visible
- XP value as secondary info
- Hover state for selection

---

## Responsive Behavior

**Desktop (lg+)**: 
- 3-column grid (1 + 2 split)
- Full stats table visible
- All controls horizontal

**Tablet (md)**:
- Single column stack
- Cards maintain full width
- Reduced padding to p-4

**Mobile**:
- Single column only
- Compact spacing
- Slight rotation effects maintained
- Touch-friendly button sizes (minimum 44px hit targets)

---

## Images

**No images required** - This is a pure utility application. The visual interest comes entirely from the hand-drawn styling, borders, shadows, and parchment texture background. The emoji icons (🗡️ ⚔️ 👑 🏆 💀) serve as visual markers for monster roles.

---

## Accessibility

- Maintain strong color contrast (AA minimum)
- All interactive elements have visible focus states
- Form labels clearly associated with inputs
- Semantic HTML structure throughout
- Keyboard navigation support for all controls