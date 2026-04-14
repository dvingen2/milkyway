import { renderHTML } from "./helpers.js";

const defaultItems = [
  { label: "Foundations", active: true },
  { label: "Components" },
  { label: "Patterns" },
];

export default {
  title: "Components/Tabs",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tabs organize content into parallel sections. Only one tab is active at a time. Clicking a tab fires a `ds-change` event with `{index, item}` in `detail`. The `select(index)` method activates a tab programmatically. Items can be passed as the `items` attribute (JSON) or the `items` JS property.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of `{label, active?}` objects.",
    },
  },
  args: { items: defaultItems },
  render: ({ items }) =>
    renderHTML(`
      <div style="width:36rem;">
        <ds-tabs items='${JSON.stringify(items)}'></ds-tabs>
      </div>
    `),
};

export const Playground = {};

export const TwoTabs = {
  name: "Two tabs",
  args: {
    items: [
      { label: "Overview", active: true },
      { label: "Settings" },
    ],
  },
};

export const ManyTabs = {
  name: "Many tabs",
  args: {
    items: [
      { label: "All", active: true },
      { label: "Color" },
      { label: "Typography" },
      { label: "Spacing" },
      { label: "Motion" },
      { label: "Elevation" },
    ],
  },
};

export const WithContentPanel = {
  name: "With content panel",
  parameters: {
    docs: {
      description: {
        story:
          "Typical usage: tab bar above a content region. The `ds-change` event drives which panel is visible.",
      },
    },
  },
  render: () => {
    const panels = [
      "<p>Foundations cover color, type, spacing and motion tokens that underpin the whole system.</p>",
      "<p>Components are the building blocks — buttons, chips, text fields, cards and more.</p>",
      "<p>Patterns describe how components combine into higher-level UI solutions.</p>",
    ];

    const el = renderHTML(`
      <div style="width:36rem;display:grid;gap:0;">
        <ds-tabs id="demo-tabs" items='${JSON.stringify(defaultItems)}'></ds-tabs>
        <div id="panel" style="padding:1.5rem;background:var(--layer-surface);border:1px solid var(--color-outline-variant);border-top:0;border-radius:0 0 var(--radius-md) var(--radius-md);">
          ${panels[0]}
        </div>
      </div>
    `);

    el.querySelector("#demo-tabs").addEventListener("ds-change", (e) => {
      el.querySelector("#panel").innerHTML = panels[e.detail.index] ?? "";
    });

    return el;
  },
};

export const ProgrammaticSelect = {
  name: "Programmatic select",
  parameters: {
    docs: {
      description: {
        story: "The `select(index)` method activates a tab without user interaction.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="display:grid;gap:1rem;width:36rem;">
        <ds-tabs id="prog-tabs" items='${JSON.stringify(defaultItems)}'></ds-tabs>
        <div style="display:flex;gap:0.5rem;">
          <ds-button variant="outlined" data-idx="0">Tab 1</ds-button>
          <ds-button variant="outlined" data-idx="1">Tab 2</ds-button>
          <ds-button variant="outlined" data-idx="2">Tab 3</ds-button>
        </div>
      </div>
    `);

    const tabs = el.querySelector("#prog-tabs");
    el.querySelectorAll("[data-idx]").forEach((btn) => {
      btn.addEventListener("click", () => tabs.select(Number(btn.dataset.idx)));
    });

    return el;
  },
};
