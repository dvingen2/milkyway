import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Icon Button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Icon buttons are compact action triggers for icon-only interactions. Four variants cover the emphasis range from `standard` (no container) to `filled`. Adding the `toggle` attribute makes the button stateful — it fires a `ds-toggle` event with `{selected}` in `detail` on each click.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "filled", "tonal", "outlined"],
      description: "Visual emphasis.",
    },
    icon: { control: "text", description: "Icon character or symbol slotted inside." },
    toggle: { control: "boolean", description: "Enables toggle (on/off) behavior." },
    selected: { control: "boolean", description: "Current toggle state. Requires `toggle`." },
    disabled: { control: "boolean", description: "Prevents interaction." },
    ariaLabel: { control: "text", name: "aria-label", description: "Accessible label (required — icon buttons have no visible text)." },
  },
  args: {
    variant: "standard",
    icon: "★",
    toggle: false,
    selected: false,
    disabled: false,
    ariaLabel: "Favorite",
  },
  render: ({ variant, icon, toggle, selected, disabled, ariaLabel }) =>
    renderHTML(
      `<mw-icon-button
        variant="${variant}"
        aria-label="${ariaLabel}"
        title="${ariaLabel}"
        ${toggle ? "toggle" : ""}
        ${selected ? "selected" : ""}
        ${disabled ? "disabled" : ""}
      >${icon}</mw-icon-button>`,
    ),
};

export const Playground = {};

export const AllVariants = {
  name: "All variants",
  render: () =>
    renderHTML(`
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
        <mw-icon-button variant="standard" aria-label="Standard" title="Standard">★</mw-icon-button>
        <mw-icon-button variant="filled" aria-label="Filled" title="Filled">★</mw-icon-button>
        <mw-icon-button variant="tonal" aria-label="Tonal" title="Tonal">★</mw-icon-button>
        <mw-icon-button variant="outlined" aria-label="Outlined" title="Outlined">★</mw-icon-button>
      </div>
    `),
};

export const ToggleStates = {
  name: "Toggle states",
  render: () =>
    renderHTML(`
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
        <mw-icon-button variant="standard" toggle selected aria-label="Saved" title="Saved">★</mw-icon-button>
        <mw-icon-button variant="filled" toggle aria-label="Pin" title="Pin">⌘</mw-icon-button>
        <mw-icon-button variant="tonal" toggle selected aria-label="Notifications on" title="Notifications on">◌</mw-icon-button>
        <mw-icon-button variant="outlined" toggle aria-label="Bookmark" title="Bookmark">◈</mw-icon-button>
      </div>
    `),
};

export const DisabledStates = {
  name: "Disabled",
  render: () =>
    renderHTML(`
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
        <mw-icon-button variant="standard" disabled aria-label="Disabled">★</mw-icon-button>
        <mw-icon-button variant="filled" disabled aria-label="Disabled">★</mw-icon-button>
        <mw-icon-button variant="tonal" disabled aria-label="Disabled">★</mw-icon-button>
        <mw-icon-button variant="outlined" disabled aria-label="Disabled">★</mw-icon-button>
      </div>
    `),
};

export const ToggleEvent = {
  name: "Toggle event",
  parameters: {
    docs: {
      description: {
        story: "Toggle buttons fire `ds-toggle` with `{selected}` on each click.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="display:flex;gap:1.5rem;align-items:center;">
        <mw-icon-button id="toggle-btn" variant="tonal" toggle aria-label="Notifications" title="Notifications">◌</mw-icon-button>
        <p id="toggle-output" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Notifications off
        </p>
      </div>
    `);

    el.querySelector("#toggle-btn").addEventListener("mw-toggle", (e) => {
      el.querySelector("#toggle-output").textContent =
        e.detail.selected ? "Notifications on" : "Notifications off";
    });

    return el;
  },
};
