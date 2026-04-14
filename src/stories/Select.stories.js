import { renderHTML } from "./helpers.js";

const fruits = JSON.stringify([
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Dragonfruit", value: "dragonfruit" },
  { label: "Elderberry", value: "elderberry" },
]);

export default {
  title: "Components/Select",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A styled select dropdown built with a custom listbox. Use it as a form control companion to `mw-text-field`. Fires `mw-change` with `detail.value` and `detail.option` when the user picks an item. Keyboard navigation follows ARIA listbox patterns: Arrow keys move focus, Enter/Space select, Escape closes.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Field label shown above the trigger.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when no value is selected.",
    },
    value: {
      control: "text",
      description: "Currently selected value.",
    },
    supporting: {
      control: "text",
      description: "Supporting text below the field.",
    },
    error: {
      control: "boolean",
      description: "Error state — turns label and border red.",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    label: "Favourite fruit",
    placeholder: "Choose one",
    value: "",
    supporting: "",
    error: false,
    disabled: false,
  },
  render: ({ label, placeholder, value, supporting, error, disabled }) =>
    renderHTML(`
      <div style="max-width:20rem;padding:1rem;">
        <mw-select
          label="${label}"
          placeholder="${placeholder}"
          options='${fruits}'
          ${value ? `value="${value}"` : ""}
          ${supporting ? `supporting="${supporting}"` : ""}
          ${error ? "error" : ""}
          ${disabled ? "disabled" : ""}
        ></mw-select>
      </div>
    `),
};

export const Playground = {};

export const WithValue = {
  name: "With pre-selected value",
  render: () => renderHTML(`
    <div style="max-width:20rem;padding:1rem;">
      <mw-select
        label="Favourite fruit"
        options='${fruits}'
        value="cherry"
      ></mw-select>
    </div>
  `),
};

export const Supporting = {
  name: "With supporting text",
  render: () => renderHTML(`
    <div style="max-width:20rem;padding:1rem;">
      <mw-select
        label="Region"
        placeholder="Select your region"
        options='[{"label":"Europe","value":"eu"},{"label":"North America","value":"na"},{"label":"Asia Pacific","value":"apac"}]'
        supporting="Determines your data residency."
      ></mw-select>
    </div>
  `),
};

export const ErrorState = {
  name: "Error state",
  render: () => renderHTML(`
    <div style="max-width:20rem;padding:1rem;">
      <mw-select
        label="Category"
        placeholder="Required"
        options='${fruits}'
        supporting="Please select a category."
        error
      ></mw-select>
    </div>
  `),
};

export const ChangeEvent = {
  name: "Change event",
  parameters: {
    docs: {
      description: {
        story: "Fires `mw-change` with `detail.value` (the option's value string) and `detail.option` (the full option object).",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="max-width:20rem;padding:1rem;display:grid;gap:0.75rem;">
        <mw-select
          id="demo-select"
          label="Favourite fruit"
          placeholder="Choose one"
          options='${fruits}'
        ></mw-select>
        <p id="out" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Waiting for mw-change…
        </p>
      </div>
    `);
    el.querySelector("#demo-select").addEventListener("mw-change", (e) => {
      el.querySelector("#out").textContent = `mw-change — value: "${e.detail.value}"`;
    });
    return el;
  },
};

export const Disabled = {
  render: () => renderHTML(`
    <div style="max-width:20rem;padding:1rem;">
      <mw-select
        label="Disabled select"
        options='${fruits}'
        value="apple"
        disabled
      ></mw-select>
    </div>
  `),
};
