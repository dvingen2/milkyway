import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Divider",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dividers separate sections of content. The full-bleed variant spans the entire container. `inset` is offset on the leading edge (typically aligned with list content). `middle` is inset on both sides. Use sparingly — white space usually communicates structure more cleanly.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["", "inset", "middle"],
      description: "`inset` offsets the leading end. `middle` offsets both ends. Default is full-bleed.",
    },
  },
  args: { variant: "" },
  render: ({ variant }) =>
    renderHTML(`
      <div style="width:24rem;display:grid;gap:1rem;">
        <p style="margin:0;">Before divider</p>
        <ds-divider${variant ? ` variant="${variant}"` : ""}></ds-divider>
        <p style="margin:0;">After divider</p>
      </div>
    `),
};

export const Playground = {};

export const AllVariants = {
  name: "All variants",
  render: () =>
    renderHTML(`
      <div style="display:grid;gap:2rem;width:24rem;">
        <div style="display:grid;gap:0.75rem;">
          <p style="font:var(--type-label-medium);color:var(--color-on-surface-variant);margin:0;">Full-bleed (default)</p>
          <ds-divider></ds-divider>
        </div>
        <div style="display:grid;gap:0.75rem;">
          <p style="font:var(--type-label-medium);color:var(--color-on-surface-variant);margin:0;">Inset</p>
          <ds-divider variant="inset"></ds-divider>
        </div>
        <div style="display:grid;gap:0.75rem;">
          <p style="font:var(--type-label-medium);color:var(--color-on-surface-variant);margin:0;">Middle</p>
          <ds-divider variant="middle"></ds-divider>
        </div>
      </div>
    `),
};

export const InList = {
  name: "In a list",
  parameters: {
    docs: {
      description: {
        story: "Dividers between list sections help users scan grouped content.",
      },
    },
  },
  render: () =>
    renderHTML(`
      <div style="width:24rem;background:var(--layer-surface);border-radius:var(--radius-md);border:1px solid var(--color-outline-variant);overflow:hidden;">
        <div style="padding:1rem;">
          <p style="font:var(--type-label-large);color:var(--color-on-surface-variant);margin:0;">Primary palette</p>
        </div>
        <ds-divider></ds-divider>
        <div style="padding:1rem;">
          <p style="margin:0;">Primary — <code>--color-primary</code></p>
        </div>
        <ds-divider variant="inset"></ds-divider>
        <div style="padding:1rem;">
          <p style="margin:0;">On Primary — <code>--color-on-primary</code></p>
        </div>
        <ds-divider variant="inset"></ds-divider>
        <div style="padding:1rem;">
          <p style="margin:0;">Primary Container — <code>--color-primary-container</code></p>
        </div>
      </div>
    `),
};
