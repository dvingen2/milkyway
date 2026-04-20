# Milkyway

A Material Design 3–aligned web component library. Zero dependencies, pure custom elements with shadow DOM, oklch-based design tokens, and Storybook documentation.

**[Live Storybook →](https://dvingen2.github.io/milkyway/)**

---

## Quick start

```html
<!-- 1. Load styles -->
<link rel="stylesheet" href="https://unpkg.com/milkyway/dist/milkyway.css">

<!-- 2. Load components -->
<script type="module" src="https://unpkg.com/milkyway/dist/milkyway.js"></script>

<!-- 3. Use -->
<mw-button variant="filled">Get started</mw-button>
<mw-text-field label="Email" placeholder="you@example.com"></mw-text-field>
```

---

## Installation

```bash
npm install milkyway
```

```js
// JS — registers all mw-* custom elements
import "milkyway";

// CSS — tokens + component base styles
import "milkyway/styles";
```

Or import only what you need:

```js
import { MwButton, MwTextField } from "milkyway/dist/milkyway.js";
```

---

## Components

| Component | Element | Description |
|---|---|---|
| Button | `mw-button` | Filled, elevated, tonal, outlined, text, destructive |
| Icon Button | `mw-icon-button` | Standard, filled, tonal, outlined; toggle variant |
| FAB | `mw-fab` | Floating action button — small, medium, large |
| Extended FAB | `mw-extended-fab` | FAB with label |
| Chip | `mw-chip` | Assist, filter, input, suggestion |
| Chip Group | `mw-chip-group` | Coordinates filter chips; single/multi select, scroll row |
| Segmented Button | `mw-segmented-button` | Horizontal toggle group, replaces radio in toolbars |
| Checkbox | `mw-checkbox` | Form-associated, `checked` / `indeterminate` |
| Radio | `mw-radio` | Form-associated |
| Switch | `mw-switch` | Form-associated toggle |
| Text Field | `mw-text-field` | Outlined + filled; multiline, icons, char count, validation |
| Select | `mw-select` | Custom listbox, keyboard nav, form-associated |
| Slider | `mw-slider` | Continuous or stepped; ticks, value display |
| Card | `mw-card` | Elevated, filled, outlined |
| Dialog | `mw-dialog` | Uses native `<dialog>`, focus trap, persistent mode |
| Bottom Sheet | `mw-bottom-sheet` | Slides up from bottom, scrim |
| Side Sheet | `mw-side-sheet` | Modal or standard; left/right; navigation drawer |
| List | `mw-list` | Single-line and two-line items with icons, trailing content |
| Menu | `mw-menu` | Dropdown with viewport-edge flip detection |
| Tabs | `mw-tabs` | Primary and secondary tab styles |
| Navigation Rail | `mw-navigation-rail` | Vertical destination switcher |
| Navigation Bar | `mw-navigation-bar` | Mobile bottom navigation, badge support |
| Top App Bar | `mw-top-app-bar` | Page header with title and action slots |
| Snackbar | `mw-snackbar` | Queued toasts, auto-dismiss, action button |
| Progress | `mw-progress` | Linear (determinate + indeterminate) and circular |
| Tooltip | `mw-tooltip` | Plain and rich; four placements |
| Divider | `mw-divider` | Horizontal rule using the outline-variant token |
| Badge | `mw-badge` | Dot or numeric badge overlay |

---

## Theming

All visual properties flow through CSS custom properties. Override them at `:root` in your own stylesheet — unlayered rules automatically win over the `@layer milkyway.tokens` layer.

### Key colors

The palette is generated from three hue+chroma pairs in the oklch color space:

```css
:root {
  /* Primary — default: violet */
  --_primary-h: 265;
  --_primary-c: 0.155;

  /* Secondary — default: muted violet */
  --_secondary-h: 265;
  --_secondary-c: 0.06;

  /* Tertiary — default: rose */
  --_tertiary-h: 350;
  --_tertiary-c: 0.10;
}
```

Change `--_primary-h` (0–360) and `--_primary-c` (0–0.4) to shift the entire primary palette without touching anything else.

### Dark mode

Dark mode is automatic via `prefers-color-scheme: dark`. Force it with `data-theme="dark"` on any ancestor:

```html
<body data-theme="dark"> … </body>
```

### High contrast

Respects `prefers-contrast: more`. Force with `data-contrast="high"`:

```html
<body data-contrast="high"> … </body>
```

### Motion

All transitions use CSS custom property tokens. Set them to `0ms` globally to disable all animation:

```css
:root {
  --motion-fast:   0ms;
  --motion-medium: 0ms;
  --motion-slow:   0ms;
}
```

`prefers-reduced-motion: reduce` automatically collapses all motion tokens to `0ms` inside the library.

---

## Form integration

`mw-checkbox`, `mw-radio`, `mw-switch`, `mw-text-field`, and `mw-select` are all `formAssociated`. They participate in native `<form>` submission and `FormData` without a wrapper:

```html
<form id="settings-form">
  <mw-text-field name="username" label="Username" required></mw-text-field>
  <mw-select name="role" label="Role" options='[{"label":"Admin"},{"label":"Editor"}]'></mw-select>
  <mw-checkbox name="newsletter" label="Subscribe to updates"></mw-checkbox>
  <mw-button type="submit">Save</mw-button>
</form>

<script>
  document.querySelector("#settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data)); // { username: "…", role: "…", newsletter: "on" }
  });
</script>
```

---

## Events reference

| Component | Event | `detail` |
|---|---|---|
| `mw-icon-button` | `mw-toggle` | `{ selected: boolean }` |
| `mw-chip` | `mw-change` | `{ selected: boolean }` |
| `mw-chip` | `mw-dismiss` | — |
| `mw-chip-group` | `mw-change` | `{ value: string[] }` |
| `mw-segmented-button` | `mw-change` | `{ value: string \| string[] }` |
| `mw-checkbox` | `change` | `{ checked: boolean }` |
| `mw-radio` | `change` | `{ checked: boolean }` |
| `mw-switch` | `change` | `{ checked: boolean }` |
| `mw-text-field` | `input` / `change` | (native) |
| `mw-select` | `mw-change` | `{ value: string, option: object }` |
| `mw-slider` | `mw-change` | `{ value: number }` |
| `mw-tabs` | `mw-change` | `{ index: number, tab: object }` |
| `mw-navigation-rail` | `mw-navigate` | `{ index: number, item: object }` |
| `mw-navigation-bar` | `mw-navigate` | `{ index: number, item: object }` |
| `mw-menu` | `mw-select` | `{ index: number, item: object }` |
| `mw-dialog` | `mw-close` | — |
| `mw-bottom-sheet` | `mw-close` | — |
| `mw-side-sheet` | `mw-close` | — |
| `mw-snackbar` | `mw-action` | — |
| `mw-snackbar` | `mw-dismiss` | — |

---

## CSS parts

Every component exposes `::part()` hooks for external styling without breaking encapsulation. Common parts:

```css
mw-button::part(button)        { border-radius: 0.25rem; }
mw-text-field::part(field-wrap){ border-radius: 0.5rem 0.5rem 0 0; }
mw-card::part(card)            { border-radius: 0; }
mw-dialog::part(dialog)        { max-width: 90vw; }
```

Full part lists are documented in Storybook under each component's **Docs** tab.

---

## Token reference

Key CSS custom properties available to consumer stylesheets:

```css
/* Color roles */
--color-primary             --color-on-primary
--color-primary-container   --color-on-primary-container
--color-secondary-container --color-on-secondary-container
--color-surface             --color-on-surface
--color-surface-variant     --color-on-surface-variant
--color-error               --color-on-error
--color-outline             --color-outline-variant

/* Semantic extras */
--color-success   --color-warning   --color-info

/* Surfaces (elevation) */
--layer-surface    --layer-surface-1   --layer-surface-2

/* Typography */
--type-display-large  --type-headline-large  --type-title-large
--type-title-medium   --type-body-large      --type-body-medium
--type-label-large    --type-label-medium    --type-label-small

/* Motion */
--motion-fast   --motion-medium   --motion-slow

/* Radius */
--radius-xs  --radius-sm  --radius-md  --radius-lg  --radius-xl  --radius-full

/* Shadows */
--shadow-1   --shadow-2   --shadow-3
```

Full token documentation is in Storybook → Foundations → Tokens.

---

## Development

```bash
git clone https://github.com/dvingen2/milkyway.git
cd milkyway
npm install

npm run dev          # Vite dev server  →  http://localhost:5173
npm run storybook    # Storybook        →  http://localhost:6006
npm run build:lib    # Build milkyway.js + milkyway.css → dist/
```
