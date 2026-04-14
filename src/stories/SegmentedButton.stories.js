import { renderHTML } from "./helpers.js";

const days = JSON.stringify([
  { label: "Mon", value: "mon" },
  { label: "Tue", value: "tue" },
  { label: "Wed", value: "wed" },
  { label: "Thu", value: "thu" },
  { label: "Fri", value: "fri" },
]);

export default {
  title: "Components/SegmentedButton",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Segmented buttons group two to five related choices. In single-select mode (default) selecting one deselects the rest, making it a good alternative to radio buttons in horizontal layouts. In `multi` mode each segment toggles independently. Fires `mw-change` with `detail.value` (string for single, array for multi).",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "Currently selected value (single) or JSON array (multi).",
    },
    multi: {
      control: "boolean",
      description: "Allow multiple segments to be selected simultaneously.",
    },
  },
  args: {
    value: "mon",
    multi: false,
  },
  render: ({ value, multi }) =>
    renderHTML(`
      <mw-segmented-button
        options='${days}'
        value="${value}"
        ${multi ? "multi" : ""}
        aria-label="Days of the week"
      ></mw-segmented-button>
    `),
};

export const Playground = {};

export const SingleSelect = {
  name: "Single select",
  render: () => renderHTML(`
    <div style="display:flex;flex-direction:column;gap:1.5rem;align-items:flex-start;">
      <mw-segmented-button
        options='[{"label":"Day","value":"day"},{"label":"Week","value":"week"},{"label":"Month","value":"month"},{"label":"Year","value":"year"}]'
        value="week"
        aria-label="View period"
      ></mw-segmented-button>
    </div>
  `),
};

export const MultiSelect = {
  name: "Multi select",
  parameters: {
    docs: {
      description: {
        story: "Add `multi` to allow independent toggling of each segment.",
      },
    },
  },
  render: () => renderHTML(`
    <mw-segmented-button
      options='${days}'
      value='["mon","wed","fri"]'
      multi
      aria-label="Repeat on days"
    ></mw-segmented-button>
  `),
};

export const WithIcons = {
  name: "With icons",
  render: () => renderHTML(`
    <mw-segmented-button
      options='[{"label":"List","value":"list","icon":"list"},{"label":"Grid","value":"grid","icon":"grid_view"},{"label":"Map","value":"map","icon":"map"}]'
      value="list"
      aria-label="View layout"
    ></mw-segmented-button>
  `),
};

export const ChangeEvent = {
  name: "Change event",
  parameters: {
    docs: {
      description: {
        story: "Fires `mw-change` with the selected value. In multi mode, `detail.value` is an array.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="display:grid;gap:1rem;">
        <mw-segmented-button
          id="seg"
          options='${days}'
          value="mon"
          aria-label="Days"
        ></mw-segmented-button>
        <p id="out" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Waiting for mw-change…
        </p>
      </div>
    `);
    el.querySelector("#seg").addEventListener("mw-change", (e) => {
      el.querySelector("#out").textContent = `mw-change — value: "${e.detail.value}"`;
    });
    return el;
  },
};
