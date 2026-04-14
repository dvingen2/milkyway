import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Chip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Chips are compact interactive elements with four distinct roles: `assist` (shortcuts/actions), `filter` (toggle-able criteria), `input` (dismissible values in a field), and `suggestion` (quick-fill options). Filter chips fire `ds-change` with `{selected}`. Input chips fire `ds-dismiss` when the × is clicked.",
      },
    },
  },
  argTypes: {
    kind: {
      control: "select",
      options: ["assist", "filter", "input", "suggestion"],
      description: "The semantic role of the chip, which determines its interaction model.",
    },
    label: {
      control: "text",
      description: "Chip label.",
    },
    selected: {
      control: "boolean",
      description: "Active/selected state. Applies to filter chips.",
    },
    dismissible: {
      control: "boolean",
      description: "Shows a × button. Applies to input chips.",
    },
  },
  args: {
    kind: "assist",
    label: "Assist chip",
    selected: false,
    dismissible: false,
  },
  render: ({ kind, label, selected, dismissible }) =>
    renderHTML(
      `<mw-chip kind="${kind}"${selected ? " selected" : ""}${dismissible ? " dismissible" : ""}>${label}</mw-chip>`,
    ),
};

export const Playground = {};

export const AllKinds = {
  name: "All kinds",
  render: () =>
    renderHTML(`
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
        <mw-chip kind="assist" leading-icon="⌘">Assist</mw-chip>
        <mw-chip kind="filter" selected>Filter (selected)</mw-chip>
        <mw-chip kind="filter">Filter (unselected)</mw-chip>
        <mw-chip kind="input" dismissible>Input token</mw-chip>
        <mw-chip kind="suggestion" leading-icon="◎">Suggestion</mw-chip>
      </div>
    `),
};

export const FilterGroup = {
  name: "Filter group",
  parameters: {
    docs: {
      description: {
        story: "Filter chips work as a group. Toggle them independently to combine criteria.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="display:grid;gap:1rem;max-width:32rem;">
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;" id="filter-group">
          <mw-chip kind="filter" selected data-filter="color">Color</mw-chip>
          <mw-chip kind="filter" data-filter="type">Typography</mw-chip>
          <mw-chip kind="filter" selected data-filter="spacing">Spacing</mw-chip>
          <mw-chip kind="filter" data-filter="motion">Motion</mw-chip>
          <mw-chip kind="filter" data-filter="elevation">Elevation</mw-chip>
        </div>
        <p id="filter-output" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Active: Color, Spacing
        </p>
      </div>
    `);

    const update = () => {
      const active = [...el.querySelectorAll("[data-filter][selected]")].map((c) => c.dataset.filter);
      el.querySelector("#filter-output").textContent =
        active.length ? `Active: ${active.join(", ")}` : "No filters active";
    };

    el.querySelector("#filter-group").addEventListener("mw-change", update);
    return el;
  },
};

export const InputTokens = {
  name: "Input tokens",
  parameters: {
    docs: {
      description: {
        story: "Input chips represent values added to a field. Dismissing one fires `ds-dismiss`.",
      },
    },
  },
  render: () => {
    const tokens = ["Surface", "Primary", "Secondary", "Tertiary"];

    const el = renderHTML(`
      <div style="display:grid;gap:0.75rem;max-width:32rem;">
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;padding:0.75rem;border:1px solid var(--color-outline);border-radius:var(--radius-sm);" id="token-list">
          ${tokens.map((t) => `<mw-chip kind="input" dismissible data-token="${t}">${t}</mw-chip>`).join("")}
        </div>
        <p id="token-output" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Tokens: ${tokens.join(", ")}
        </p>
      </div>
    `);

    const update = () => {
      const remaining = [...el.querySelectorAll("[data-token]")].map((c) => c.dataset.token);
      el.querySelector("#token-output").textContent =
        remaining.length ? `Tokens: ${remaining.join(", ")}` : "No tokens selected";
    };

    el.querySelector("#token-list").addEventListener("mw-dismiss", (e) => {
      e.target.remove();
      update();
    });

    return el;
  },
};
