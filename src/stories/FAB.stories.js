import { renderHTML } from "./helpers.js";

export default {
  title: "Components/FAB",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Floating Action Buttons (FABs) represent the primary action on a screen. `mw-fab` is the icon-only variant; `mw-extended-fab` adds a label. Both come in four color roles and three sizes (FAB only). Place at the edge of the viewport, typically bottom-right.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Controls the button diameter. Only applies to `mw-fab`.",
    },
    color: {
      control: "select",
      options: ["surface", "primary", "secondary", "tertiary"],
      description: "Color role. `primary` uses the primary container, `surface` uses the elevated surface.",
    },
    icon: {
      control: "text",
      description: "Material Symbols icon name or any Unicode character.",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    size: "medium",
    color: "primary",
    icon: "add",
    disabled: false,
  },
  render: ({ size, color, icon, disabled }) =>
    renderHTML(`
      <mw-fab
        size="${size}"
        color="${color}"
        aria-label="Create new item"
        ${disabled ? "disabled" : ""}
      >${icon}</mw-fab>
    `),
};

export const Playground = {};

export const Sizes = {
  render: () => renderHTML(`
    <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
      <mw-fab size="small" color="primary" aria-label="Small">add</mw-fab>
      <mw-fab size="medium" color="primary" aria-label="Medium">add</mw-fab>
      <mw-fab size="large" color="primary" aria-label="Large">add</mw-fab>
    </div>
  `),
};

export const Colors = {
  render: () => renderHTML(`
    <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
      <mw-fab color="surface" aria-label="Surface">edit</mw-fab>
      <mw-fab color="primary" aria-label="Primary">add</mw-fab>
      <mw-fab color="secondary" aria-label="Secondary">share</mw-fab>
      <mw-fab color="tertiary" aria-label="Tertiary">favorite</mw-fab>
    </div>
  `),
};

export const ExtendedFAB = {
  name: "Extended FAB",
  parameters: {
    docs: {
      description: {
        story: "`mw-extended-fab` adds a text label alongside the icon. Use when the action needs more context.",
      },
    },
  },
  render: () => renderHTML(`
    <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
      <mw-extended-fab color="primary" icon="add" label="New document"></mw-extended-fab>
      <mw-extended-fab color="secondary" icon="edit" label="Edit"></mw-extended-fab>
      <mw-extended-fab color="tertiary" icon="share" label="Share"></mw-extended-fab>
      <mw-extended-fab color="surface" icon="navigate_next" label="Continue"></mw-extended-fab>
    </div>
  `),
};

export const Disabled = {
  render: () => renderHTML(`
    <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
      <mw-fab color="primary" aria-label="Disabled FAB" disabled>add</mw-fab>
      <mw-extended-fab color="primary" icon="add" label="Disabled" disabled></mw-extended-fab>
    </div>
  `),
};
