import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Progress Indicator",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Progress indicators communicate the status of ongoing processes. The linear variant suits page-level or form-level feedback. The circular variant suits compact spaces like buttons or list items. Both use `role=progressbar` and `aria-valuenow` for screen readers. Add `label` for a visible description and `show-percentage` to display the numeric percentage. Add `indeterminate` for operations with unknown duration.",
      },
    },
  },
  argTypes: {
    kind: {
      control: "select",
      options: ["linear", "circular"],
      description: "Visual form of the indicator.",
    },
    value: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
      description: "Progress from 0 to 1.",
    },
    label: {
      control: "text",
      description: "Visible label above the bar (linear) or beside the spinner (circular).",
    },
    "show-percentage": {
      control: "boolean",
      description: "Show the numeric percentage alongside the label (linear only).",
    },
    indeterminate: {
      control: "boolean",
      description: "Animate the bar continuously for unknown-duration operations.",
    },
  },
  args: {
    kind: "linear",
    value: 0.65,
    label: "",
    "show-percentage": false,
    indeterminate: false,
  },
  render: ({ kind, value, label, "show-percentage": showPct, indeterminate }) =>
    renderHTML(
      kind === "circular"
        ? `<mw-progress kind="circular" ${label ? `label="${label}"` : ""}></mw-progress>`
        : `<div style="width:24rem;"><mw-progress value="${value}" ${label ? `label="${label}"` : ""} ${showPct ? "show-percentage" : ""} ${indeterminate ? "indeterminate" : ""}></mw-progress></div>`,
    ),
};

export const Playground = {};

export const LinearDeterminate = {
  name: "Linear — determinate",
  render: () =>
    renderHTML(`
      <div style="display:grid;gap:1rem;width:24rem;">
        <mw-progress value="0.25"></mw-progress>
        <mw-progress value="0.5"></mw-progress>
        <mw-progress value="0.75"></mw-progress>
        <mw-progress value="1"></mw-progress>
      </div>
    `),
};

export const WithLabel = {
  name: "With label and percentage",
  render: () =>
    renderHTML(`
      <div style="display:grid;gap:1.5rem;width:24rem;">
        <mw-progress label="Uploading files" value="0.42" show-percentage></mw-progress>
        <mw-progress label="Processing" value="0.78" show-percentage></mw-progress>
        <mw-progress kind="circular" label="Syncing…"></mw-progress>
      </div>
    `),
};

export const Indeterminate = {
  name: "Indeterminate",
  parameters: {
    docs: {
      description: {
        story: "Use `indeterminate` when the operation duration is unknown.",
      },
    },
  },
  render: () =>
    renderHTML(`
      <div style="display:grid;gap:1.5rem;width:24rem;">
        <mw-progress indeterminate label="Loading…"></mw-progress>
        <div style="display:flex;gap:1.5rem;align-items:center;">
          <mw-progress kind="circular"></mw-progress>
          <span style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">Processing request…</span>
        </div>
      </div>
    `),
};

export const CircularIndeterminate = {
  name: "Circular — indeterminate",
  render: () =>
    renderHTML(`
      <div style="display:flex;gap:1.5rem;align-items:center;">
        <mw-progress kind="circular"></mw-progress>
        <mw-progress kind="circular" label="Loading…"></mw-progress>
      </div>
    `),
};

export const InContext = {
  name: "In context",
  parameters: {
    docs: {
      description: {
        story: "Typical placement inside a card while content loads.",
      },
    },
  },
  render: () =>
    renderHTML(`
      <div style="display:grid;gap:1.5rem;max-width:32rem;">
        <mw-card variant="outlined">
          <p class="card-label">Loading tokens</p>
          <mw-progress value="0.4"></mw-progress>
          <p style="margin:0.75rem 0 0;color:var(--color-on-surface-variant);font:var(--type-body-medium);">Fetching token definitions… 40%</p>
        </mw-card>
        <mw-card variant="outlined">
          <p class="card-label">Exporting</p>
          <div style="display:flex;gap:0.75rem;align-items:center;">
            <mw-progress kind="circular"></mw-progress>
            <span style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">Building dist…</span>
          </div>
        </mw-card>
      </div>
    `),
};

export const Animated = {
  name: "Animated progress",
  parameters: {
    docs: {
      description: {
        story: "Simulates a real operation filling the bar over time.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="display:grid;gap:1rem;max-width:32rem;">
        <mw-progress id="anim-bar" value="0"></mw-progress>
        <div style="display:flex;gap:0.75rem;">
          <mw-button variant="filled" id="start-btn">Start</mw-button>
          <mw-button variant="outlined" id="reset-btn">Reset</mw-button>
        </div>
      </div>
    `);

    let interval = null;
    const bar = el.querySelector("#anim-bar");

    el.querySelector("#start-btn").addEventListener("click", () => {
      clearInterval(interval);
      let v = 0;
      interval = setInterval(() => {
        v = Math.min(1, v + 0.02);
        bar.value = v;
        if (v >= 1) clearInterval(interval);
      }, 60);
    });

    el.querySelector("#reset-btn").addEventListener("click", () => {
      clearInterval(interval);
      bar.value = 0;
    });

    return el;
  },
};
