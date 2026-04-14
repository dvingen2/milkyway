import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Slider",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sliders let users select a value from a continuous or stepped range. Add `label` for an accessible label above the track, `show-value` to display the current value, and `ticks` to render tick marks at each step. Fires `mw-change` on every input event with `detail.value`.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label shown above the slider.",
    },
    min: {
      control: "number",
      description: "Minimum value.",
    },
    max: {
      control: "number",
      description: "Maximum value.",
    },
    step: {
      control: "number",
      description: "Step increment.",
    },
    value: {
      control: "number",
      description: "Current value.",
    },
    "show-value": {
      control: "boolean",
      description: "Display the current value alongside the label.",
    },
    ticks: {
      control: "boolean",
      description: "Show tick marks at each step.",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    label: "Volume",
    min: 0,
    max: 100,
    step: 1,
    value: 40,
    "show-value": false,
    ticks: false,
    disabled: false,
  },
  render: ({ label, min, max, step, value, "show-value": showValue, ticks, disabled }) =>
    renderHTML(`
      <div style="max-width:24rem;padding:1rem;">
        <mw-slider
          label="${label}"
          min="${min}"
          max="${max}"
          step="${step}"
          value="${value}"
          ${showValue ? "show-value" : ""}
          ${ticks ? "ticks" : ""}
          ${disabled ? "disabled" : ""}
        ></mw-slider>
      </div>
    `),
};

export const Playground = {};

export const WithValue = {
  name: "With value display",
  render: () => renderHTML(`
    <div style="max-width:24rem;padding:1rem;">
      <mw-slider label="Brightness" value="65" show-value></mw-slider>
    </div>
  `),
};

export const Stepped = {
  name: "Stepped with ticks",
  render: () => renderHTML(`
    <div style="max-width:24rem;padding:1rem;">
      <mw-slider label="Rating" min="1" max="5" step="1" value="3" show-value ticks></mw-slider>
    </div>
  `),
};

export const ChangeEvent = {
  name: "Change event",
  parameters: {
    docs: {
      description: {
        story: "Every drag fires `mw-change` with `detail.value`. Wire it up to reactive state or form submission.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="max-width:24rem;padding:1rem;display:grid;gap:0.75rem;">
        <mw-slider id="demo-slider" label="Temperature" value="20" min="0" max="40" show-value></mw-slider>
        <p id="event-out" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Waiting for mw-change…
        </p>
      </div>
    `);
    el.querySelector("#demo-slider").addEventListener("mw-change", (e) => {
      el.querySelector("#event-out").textContent = `mw-change fired — value: ${e.detail.value}`;
    });
    return el;
  },
};

export const Disabled = {
  render: () => renderHTML(`
    <div style="max-width:24rem;padding:1rem;">
      <mw-slider label="Disabled" value="50" disabled></mw-slider>
    </div>
  `),
};
