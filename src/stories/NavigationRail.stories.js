import { renderHTML } from "./helpers.js";

const defaultItems = [
  { icon: "⌂", label: "Home", active: true },
  { icon: "◫", label: "Tokens" },
  { icon: "◎", label: "States" },
  { icon: "⌘", label: "Components" },
];

export default {
  title: "Components/Navigation Rail",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The navigation rail provides top-level navigation in medium-to-large layouts (tablets, desktop sidebars). Each item has an icon and a label. The active item uses the secondary container color. Clicking an item fires a `ds-navigate` event with `{index, item}` in `detail`. Items with `href` render as anchor elements.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of `{icon, label, active?, href?}` objects.",
    },
  },
  args: { items: defaultItems },
  render: ({ items }) =>
    renderHTML(`<mw-navigation-rail items='${JSON.stringify(items)}'></mw-navigation-rail>`),
};

export const Playground = {};

export const ThreeItems = {
  name: "Three items",
  args: {
    items: [
      { icon: "⌂", label: "Home", active: true },
      { icon: "◫", label: "Library" },
      { icon: "⚙", label: "Settings" },
    ],
  },
};

export const WithLinks = {
  name: "As anchor links",
  parameters: {
    docs: {
      description: {
        story: "Items with `href` render as `<a>` elements for native navigation semantics.",
      },
    },
  },
  args: {
    items: [
      { icon: "⌂", label: "Home", href: "#home", active: true },
      { icon: "◫", label: "Tokens", href: "#tokens" },
      { icon: "⌘", label: "Components", href: "#components" },
    ],
  },
};

export const InLayout = {
  name: "In page layout",
  parameters: {
    docs: {
      description: {
        story:
          "The rail sits at the left edge of the content area, letting users switch top-level sections without a full page navigation.",
      },
    },
  },
  render: () => {
    const sections = ["Home", "Tokens", "Components", "Settings"];

    const el = renderHTML(`
      <div style="display:grid;grid-template-columns:auto 1fr;gap:1rem;height:28rem;background:var(--layer-backdrop);padding:1rem;border-radius:var(--radius-lg);">
        <mw-navigation-rail id="demo-rail" items='${JSON.stringify(defaultItems)}'></mw-navigation-rail>
        <mw-card variant="filled" style="overflow:auto;">
          <p class="card-label" id="section-label">Home</p>
          <p style="color:var(--color-on-surface-variant);" id="section-body">Select a section in the rail.</p>
        </mw-card>
      </div>
    `);

    el.querySelector("#demo-rail").addEventListener("mw-navigate", (e) => {
      el.querySelector("#section-label").textContent = e.detail.item.label;
      el.querySelector("#section-body").textContent = `Showing content for: ${e.detail.item.label}`;
    });

    return el;
  },
};

export const EventHandling = {
  name: "Navigate event",
  render: () => {
    const el = renderHTML(`
      <div style="display:flex;gap:2rem;align-items:flex-start;">
        <mw-navigation-rail id="event-rail" items='${JSON.stringify(defaultItems)}'></mw-navigation-rail>
        <p id="output" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);padding-top:0.5rem;min-height:1.5rem;">
          Click a rail item to see the event.
        </p>
      </div>
    `);

    el.querySelector("#event-rail").addEventListener("mw-navigate", (e) => {
      el.querySelector("#output").textContent =
        `ds-navigate: index ${e.detail.index} — "${e.detail.item.label}"`;
    });

    return el;
  },
};
