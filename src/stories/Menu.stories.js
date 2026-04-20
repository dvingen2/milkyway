import { renderHTML } from "./helpers.js";

const defaultItems = [
  { label: "Foundations", supporting: "Tokens, hierarchy, semantics" },
  { label: "Components", supporting: "Reference and previews" },
  { label: "Export tokens", supporting: "Download JSON or CSS" },
  { label: "Delete group", supporting: "Irreversible", danger: true },
];

export default {
  title: "Components/Menu",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Menus present a list of choices in a surface that temporarily overlays the UI. The trigger button opens and closes the menu. Items support an optional supporting-text line and a `danger` flag for destructive actions. Selecting an item fires a `mw-select` event with `{index, item}` in `detail`. Uses `role=menu` + `role=menuitem` ARIA.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Trigger button label.",
    },
    items: {
      control: "object",
      description: "Array of `{label, supporting?, href?, danger?}` objects.",
    },
  },
  args: {
    label: "Open menu",
    items: defaultItems,
  },
  render: ({ label, items }) =>
    renderHTML(`
      <div style="padding:3rem;">
        <mw-menu label="${label}" items='${JSON.stringify(items)}'></mw-menu>
      </div>
    `),
};

export const Playground = {};

export const SimpleActions = {
  name: "Simple actions",
  args: {
    label: "Actions",
    items: [
      { label: "Edit" },
      { label: "Duplicate" },
      { label: "Archive" },
      { label: "Delete", danger: true },
    ],
  },
};

export const WithSupportingText = {
  name: "With supporting text",
  args: { label: "Open menu", items: defaultItems },
};

export const EventHandling = {
  name: "Selection event",
  parameters: {
    docs: {
      description: {
        story:
          "Selecting an item fires `mw-select` with `{index, item}` in `detail`. Open the menu and click an item to see it below.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="padding:3rem;display:grid;gap:1rem;align-items:start;">
        <mw-menu id="demo-menu" label="Open menu" items='${JSON.stringify(defaultItems)}'></mw-menu>
        <p id="output" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);min-height:1.5rem;">
          Select a menu item to see the event.
        </p>
      </div>
    `);

    el.querySelector("#demo-menu").addEventListener("mw-select", (e) => {
      el.querySelector("#output").textContent =
        `mw-select: index ${e.detail.index} — "${e.detail.item.label}"`;
    });

    return el;
  },
};
