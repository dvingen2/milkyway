import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Selection Controls",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Selection controls — checkbox, radio, and switch — let users make choices and toggle settings. All three use `ElementInternals` for native form participation: they appear in `FormData`, respond to `form.reset()`, and participate in constraint validation. Each fires a `change` custom event with `{checked}` in `detail`.",
      },
    },
  },
};

/* ── Checkbox ──────────────────────────────────────────────── */

export const Checkbox = {
  parameters: {
    docs: {
      description: {
        story: "Checkboxes represent a binary on/off choice. Multiple checkboxes in a group are independent.",
      },
    },
  },
  argTypes: {
    label: { control: "text", description: "Visible label text." },
    checked: { control: "boolean", description: "Initial checked state." },
    disabled: { control: "boolean", description: "Prevents interaction." },
  },
  args: { label: "Accept terms", checked: false, disabled: false },
  render: ({ label, checked, disabled }) =>
    renderHTML(
      `<mw-checkbox label="${label}"${checked ? " checked" : ""}${disabled ? " disabled" : ""}></mw-checkbox>`,
    ),
};

export const CheckboxStates = {
  name: "Checkbox — all states",
  render: () =>
    renderHTML(`
      <div style="display:grid;gap:0.75rem;">
        <mw-checkbox label="Unchecked"></mw-checkbox>
        <mw-checkbox checked label="Checked"></mw-checkbox>
        <mw-checkbox label="Disabled unchecked" disabled></mw-checkbox>
        <mw-checkbox checked disabled label="Disabled checked"></mw-checkbox>
      </div>
    `),
};

/* ── Radio ─────────────────────────────────────────────────── */

export const Radio = {
  parameters: {
    docs: {
      description: {
        story:
          "Radios represent a single choice within a group. All radios sharing the same `name` are mutually exclusive.",
      },
    },
  },
  argTypes: {
    label: { control: "text", description: "Visible label text." },
    checked: { control: "boolean", description: "Initial selected state." },
    disabled: { control: "boolean", description: "Prevents interaction." },
  },
  args: { label: "Option A", checked: false, disabled: false },
  render: ({ label, checked, disabled }) =>
    renderHTML(
      `<mw-radio name="radio-playground" label="${label}"${checked ? " checked" : ""}${disabled ? " disabled" : ""}></mw-radio>`,
    ),
};

export const RadioGroup = {
  name: "Radio — group",
  render: () =>
    renderHTML(`
      <div style="display:grid;gap:0.75rem;">
        <mw-radio checked name="group-demo" label="Outlined (default)"></mw-radio>
        <mw-radio name="group-demo" label="Filled variant"></mw-radio>
        <mw-radio name="group-demo" label="Elevated variant"></mw-radio>
        <mw-radio disabled name="group-demo" label="Deprecated (disabled)"></mw-radio>
      </div>
    `),
};

/* ── Switch ─────────────────────────────────────────────────── */

export const Switch = {
  parameters: {
    docs: {
      description: {
        story:
          "Switches represent an immediate on/off toggle — settings that take effect without a submit action. Use `role=switch` semantics are provided automatically.",
      },
    },
  },
  argTypes: {
    label: { control: "text", description: "Visible label text." },
    checked: { control: "boolean", description: "Current on/off state." },
    disabled: { control: "boolean", description: "Prevents interaction." },
  },
  args: { label: "Enable notifications", checked: false, disabled: false },
  render: ({ label, checked, disabled }) =>
    renderHTML(
      `<mw-switch label="${label}"${checked ? " checked" : ""}${disabled ? " disabled" : ""}></mw-switch>`,
    ),
};

export const SwitchStates = {
  name: "Switch — all states",
  render: () =>
    renderHTML(`
      <div style="display:grid;gap:0.75rem;">
        <mw-switch label="Off"></mw-switch>
        <mw-switch checked label="On"></mw-switch>
        <mw-switch disabled label="Disabled off"></mw-switch>
        <mw-switch checked disabled label="Disabled on"></mw-switch>
      </div>
    `),
};

/* ── All together ───────────────────────────────────────────── */

export const InAForm = {
  name: "In a form",
  parameters: {
    docs: {
      description: {
        story:
          "All three controls participate in native `<form>` submission via `ElementInternals`. Submit the form to see the collected values in the output.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="max-width:28rem;display:grid;gap:1.5rem;">
        <form id="demo-form" style="display:grid;gap:1rem;">
          <mw-checkbox name="terms" label="Accept terms of service"></mw-checkbox>
          <fieldset style="border:0;padding:0;margin:0;display:grid;gap:0.5rem;">
            <legend style="font:var(--type-label-large);color:var(--color-on-surface-variant);margin-bottom:0.35rem;">Preferred export format</legend>
            <mw-radio name="format" value="css" label="CSS variables" checked></mw-radio>
            <mw-radio name="format" value="json" label="JSON tokens"></mw-radio>
            <mw-radio name="format" value="ts" label="TypeScript constants"></mw-radio>
          </fieldset>
          <mw-switch name="notifications" label="Email notifications"></mw-switch>
          <mw-button variant="filled" type="submit">Submit</mw-button>
        </form>
        <pre id="form-output" style="padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);font-size:0.8rem;min-height:2rem;"></pre>
      </div>
    `);

    el.querySelector("#demo-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      el.querySelector("#form-output").textContent = JSON.stringify(data, null, 2);
    });

    return el;
  },
};
