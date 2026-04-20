import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Chip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Chips are compact elements that can represent inputs, attributes, or actions. Four kinds: `assist` (default) triggers an action; `filter` is a toggle; `input` represents an entered value; `suggestion` surfaces a pre-made option. Wrap filter chips in `mw-chip-group` for coordinated selection.",
      },
    },
  },
  argTypes: {
    kind: {
      control: "select",
      options: ["assist", "filter", "input", "suggestion"],
      description: "Semantic variant.",
    },
    selected: {
      control: "boolean",
      description: "Selected state. Meaningful for `filter` chips.",
    },
    "leading-icon": {
      control: "text",
      description: "Icon shown before the label.",
    },
    dismissible: {
      control: "boolean",
      description: "Shows a dismiss (×) button. Fires `mw-dismiss` when clicked.",
    },
  },
  args: {
    kind: "assist",
    selected: false,
    "leading-icon": "",
    dismissible: false,
  },
  render: ({ kind, selected, "leading-icon": icon, dismissible }) =>
    renderHTML(`
      <mw-chip
        kind="${kind}"
        ${selected ? "selected" : ""}
        ${icon ? `leading-icon="${icon}"` : ""}
        ${dismissible ? "dismissible" : ""}
      >Label</mw-chip>
    `),
};

export const Playground = {};

export const AllKinds = {
  name: "All kinds",
  render: () => renderHTML(`
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
      <mw-chip kind="assist">Assist</mw-chip>
      <mw-chip kind="filter">Filter</mw-chip>
      <mw-chip kind="filter" selected>Filter (selected)</mw-chip>
      <mw-chip kind="input" dismissible>Input</mw-chip>
      <mw-chip kind="suggestion">Suggestion</mw-chip>
    </div>
  `),
};

export const WithIcons = {
  name: "With icons",
  render: () => renderHTML(`
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
      <mw-chip kind="assist" leading-icon="event">Add to calendar</mw-chip>
      <mw-chip kind="filter" leading-icon="place">Nearby</mw-chip>
      <mw-chip kind="filter" selected leading-icon="place">Nearby (on)</mw-chip>
    </div>
  `),
};

export const ChipGroup = {
  name: "Chip group (filter)",
  parameters: {
    docs: {
      description: {
        story:
          "`mw-chip-group` coordinates filter chips. Default is multi-select; add `single` for single-select. Fires `mw-change` with `detail.value` as an array of selected values.",
      },
    },
  },
  render: () => renderHTML(`
    <div style="display:grid;gap:1.5rem;max-width:32rem;">
      <div>
        <p style="font:var(--type-label-medium);color:var(--color-on-surface-variant);margin:0 0 0.5rem;">Multi-select (default)</p>
        <mw-chip-group id="multi-group" aria-label="Dietary preferences">
          <mw-chip kind="filter">Vegetarian</mw-chip>
          <mw-chip kind="filter" selected>Vegan</mw-chip>
          <mw-chip kind="filter">Gluten-free</mw-chip>
          <mw-chip kind="filter">Nut-free</mw-chip>
        </mw-chip-group>
      </div>
      <div>
        <p style="font:var(--type-label-medium);color:var(--color-on-surface-variant);margin:0 0 0.5rem;">Single-select</p>
        <mw-chip-group id="single-group" single aria-label="Sort order">
          <mw-chip kind="filter" value="newest" selected>Newest</mw-chip>
          <mw-chip kind="filter" value="popular">Most popular</mw-chip>
          <mw-chip kind="filter" value="price-asc">Price ↑</mw-chip>
          <mw-chip kind="filter" value="price-desc">Price ↓</mw-chip>
        </mw-chip-group>
      </div>
      <p id="group-out" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
        Click a chip to see mw-change…
      </p>
    </div>
  `),
};

export const ScrollRow = {
  name: "Scroll row",
  parameters: {
    docs: {
      description: {
        story: "Add `scroll` to `mw-chip-group` for a horizontal overflow row. Edges fade to hint at scroll.",
      },
    },
  },
  render: () => renderHTML(`
    <div style="max-width:22rem;">
      <mw-chip-group scroll aria-label="Categories">
        <mw-chip kind="filter" selected>All</mw-chip>
        <mw-chip kind="filter">Electronics</mw-chip>
        <mw-chip kind="filter">Clothing</mw-chip>
        <mw-chip kind="filter">Home & Garden</mw-chip>
        <mw-chip kind="filter">Sports</mw-chip>
        <mw-chip kind="filter">Books</mw-chip>
        <mw-chip kind="filter">Toys</mw-chip>
      </mw-chip-group>
    </div>
  `),
};

export const DismissEvent = {
  name: "mw-dismiss event",
  render: () => {
    const el = renderHTML(`
      <div style="display:grid;gap:0.75rem;">
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;" id="chip-container">
          <mw-chip kind="input" dismissible>React</mw-chip>
          <mw-chip kind="input" dismissible>TypeScript</mw-chip>
          <mw-chip kind="input" dismissible>CSS</mw-chip>
        </div>
        <p id="dismiss-out" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Click × to dismiss a chip…
        </p>
      </div>
    `);
    el.querySelector("#chip-container").addEventListener("mw-dismiss", (e) => {
      const label = e.target.textContent?.trim();
      e.target.remove();
      el.querySelector("#dismiss-out").textContent = `mw-dismiss — removed "${label}"`;
    });
    return el;
  },
};
