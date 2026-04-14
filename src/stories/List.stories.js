import { renderHTML } from "./helpers.js";

const defaultItems = [
  { leading: "★", headline: "Surface hierarchy", supporting: "Backdrop, Surface, Surface 1–4", trailing: "→" },
  { leading: "◉", headline: "State semantics", supporting: "Hover, focus, pressed, selection", trailing: "2", selected: true },
  { leading: "⌘", headline: "Component reference", supporting: "Button, chip, text field", trailing: "→" },
  { leading: "◫", headline: "Tonal palettes", supporting: "Primary, secondary, tertiary, neutral", trailing: "→" },
];

export default {
  title: "Components/List",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Lists display a vertical sequence of items, each with optional leading icon, headline, supporting text, trailing content, and a selected state. Selecting an item fires a `ds-select` custom event with `{index, item}` in `detail`. Items can be set via the `items` attribute (JSON) or the `items` JS property.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of `{headline, supporting?, leading?, trailing?, selected?, href?}` objects.",
    },
  },
  args: {
    items: defaultItems,
  },
  render: ({ items }) =>
    renderHTML(`
      <div style="width:24rem;">
        <ds-list items='${JSON.stringify(items)}'></ds-list>
      </div>
    `),
};

export const Playground = {};

export const HeadlineOnly = {
  name: "Headline only",
  args: {
    items: [
      { headline: "Foundations" },
      { headline: "Components" },
      { headline: "Patterns" },
      { headline: "Tokens" },
    ],
  },
};

export const WithSupportingText = {
  name: "With supporting text",
  args: { items: defaultItems },
};

export const WithLinks = {
  name: "Items as links",
  parameters: {
    docs: {
      description: {
        story: "Providing `href` renders the row as an `<a>` element instead of a `<button>`.",
      },
    },
  },
  args: {
    items: [
      { leading: "⌂", headline: "Overview", supporting: "Project summary", href: "#overview" },
      { leading: "◫", headline: "Tokens", supporting: "Color, type, spacing", href: "#tokens" },
      { leading: "⌘", headline: "Components", supporting: "Web component reference", href: "#components" },
    ],
  },
};

export const EventHandling = {
  name: "Selection event",
  parameters: {
    docs: {
      description: {
        story:
          "Each click fires a `ds-select` event with `{index, item}` in `detail`. This story logs it into the output below the list.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="display:grid;gap:1rem;width:24rem;">
        <ds-list id="demo-list" items='${JSON.stringify(defaultItems)}'></ds-list>
        <p id="output" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);min-height:1.5rem;">
          Click a row to see the event.
        </p>
      </div>
    `);
    el.querySelector("#demo-list").addEventListener("ds-select", (e) => {
      el.querySelector("#output").textContent =
        `ds-select: index ${e.detail.index} — "${e.detail.item.headline}"`;
    });
    return el;
  },
};
