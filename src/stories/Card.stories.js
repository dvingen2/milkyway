import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Card",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Cards group related content and actions into a contained surface. Three variants cover the full elevation range: `elevated` uses a drop shadow, `filled` uses a tonal background, and `outlined` uses a border. Slot any content directly inside — cards impose no opinion on internal layout.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "filled", "outlined"],
      description: "Surface treatment that determines how the card sits in the layer hierarchy.",
    },
  },
  args: { variant: "filled" },
  render: ({ variant }) =>
    renderHTML(`
      <div style="width:20rem;">
        <ds-card variant="${variant}">
          <p class="card-label">Card</p>
          <h3 style="margin:0;">${variant[0].toUpperCase() + variant.slice(1)} card</h3>
          <p style="margin:0;color:var(--color-on-surface-variant);">
            Cards group related information and actions into a clear surface.
          </p>
        </ds-card>
      </div>
    `),
};

export const Playground = {};

export const AllVariants = {
  name: "All variants",
  render: () =>
    renderHTML(`
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;max-width:56rem;">
        <ds-card variant="elevated">
          <p class="card-label">Elevated</p>
          <h3 style="margin:0;">Shadow</h3>
          <p style="margin:0;color:var(--color-on-surface-variant);">Lifted surface, highest visual weight.</p>
        </ds-card>
        <ds-card variant="filled">
          <p class="card-label">Filled</p>
          <h3 style="margin:0;">Tonal</h3>
          <p style="margin:0;color:var(--color-on-surface-variant);">Integrated into the surface hierarchy.</p>
        </ds-card>
        <ds-card variant="outlined">
          <p class="card-label">Outlined</p>
          <h3 style="margin:0;">Border</h3>
          <p style="margin:0;color:var(--color-on-surface-variant);">Low-emphasis grouping with boundary.</p>
        </ds-card>
      </div>
    `),
};

export const WithActions = {
  name: "With actions",
  parameters: {
    docs: {
      description: {
        story: "Cards commonly contain a title, body copy, and one or more action buttons.",
      },
    },
  },
  render: () =>
    renderHTML(`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;max-width:52rem;">
        <ds-card variant="elevated">
          <p class="card-label">Token group</p>
          <h3 style="margin:0;">Surface hierarchy</h3>
          <p style="margin:0.5rem 0 1rem;color:var(--color-on-surface-variant);">Six surface levels from backdrop to surface-4.</p>
          <div style="display:flex;gap:0.5rem;">
            <ds-button variant="filled">Open</ds-button>
            <ds-button variant="text">Learn more</ds-button>
          </div>
        </ds-card>
        <ds-card variant="outlined">
          <p class="card-label">Component</p>
          <h3 style="margin:0;">Text Field</h3>
          <p style="margin:0.5rem 0 1rem;color:var(--color-on-surface-variant);">Outlined and filled variants with support text and error states.</p>
          <div style="display:flex;gap:0.5rem;">
            <ds-button variant="tonal">View docs</ds-button>
          </div>
        </ds-card>
      </div>
    `),
};

export const WithChips = {
  name: "With chips",
  render: () =>
    renderHTML(`
      <div style="max-width:28rem;">
        <ds-card variant="outlined">
          <p class="card-label">Design token</p>
          <h3 style="margin:0;">Primary color</h3>
          <p style="margin:0.5rem 0 0.75rem;color:var(--color-on-surface-variant);">Used by buttons, focus rings, and active indicators.</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            <ds-chip kind="filter" selected>Color</ds-chip>
            <ds-chip kind="filter">Interactive</ds-chip>
            <ds-chip kind="filter">Semantic role</ds-chip>
          </div>
        </ds-card>
      </div>
    `),
};
