import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Text Field",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text fields capture free-form user input. The outlined variant (default) uses a border; the filled variant uses a bottom-only underline and a tinted background. Both support leading/trailing affixes, helper text, error state, multiline (textarea), and native form participation via `ElementInternals`.",
      },
    },
  },
  argTypes: {
    label: { control: "text", description: "Field label shown above the input." },
    value: { control: "text", description: "Current input value." },
    placeholder: { control: "text", description: "Hint shown when the field is empty." },
    variant: { control: "select", options: ["outlined", "filled"], description: "Visual style." },
    multiline: { control: "boolean", description: "Renders a `<textarea>` instead of `<input>`." },
    helper: { control: "text", description: "Supporting text below the field." },
    error: { control: "text", description: "Error message. When set, field and helper text turn red." },
    leading: { control: "text", description: "Affix or icon before the input." },
    trailing: { control: "text", description: "Affix or icon after the input." },
    disabled: { control: "boolean", description: "Prevents interaction." },
    required: { control: "boolean", description: "Marks the field as required for form validation." },
  },
  args: {
    label: "Token group",
    value: "Surface hierarchy",
    placeholder: "",
    variant: "outlined",
    multiline: false,
    helper: "",
    error: "",
    leading: "",
    trailing: "",
    disabled: false,
    required: false,
  },
  render: ({ label, value, placeholder, variant, multiline, helper, error, leading, trailing, disabled, required }) =>
    renderHTML(`
      <div style="width:20rem;">
        <ds-text-field
          label="${label}"
          value="${value}"
          placeholder="${placeholder}"
          variant="${variant}"
          helper="${helper}"
          error="${error}"
          leading="${leading}"
          trailing="${trailing}"
          ${multiline ? "multiline" : ""}
          ${disabled ? "disabled" : ""}
          ${required ? "required" : ""}
        ></ds-text-field>
      </div>
    `),
};

export const Playground = {};

export const Filled = {
  args: { label: "Filled field", value: "Primary container notes", variant: "filled" },
};

export const Multiline = {
  args: {
    label: "Documentation note",
    value: "Surface levels distinguish ambient base from primary and secondary content containers.",
    multiline: true,
  },
};

export const WithAffixes = {
  name: "With affixes",
  args: {
    label: "Token value",
    value: "47%",
    helper: "Lightness in oklch",
    leading: "L",
    trailing: "%",
  },
};

export const WithSupportText = {
  name: "With helper text",
  args: {
    label: "API token",
    value: "",
    placeholder: "sk-…",
    helper: "Find this in your account settings.",
    leading: "⚿",
  },
};

export const ErrorState = {
  name: "Error state",
  args: {
    label: "Surface token",
    value: "Surface-9",
    error: "Unknown surface level. Use Surface through Surface 4.",
    trailing: "!",
  },
};

export const Disabled = {
  args: {
    label: "Computed value",
    value: "oklch(47% 0.108 194)",
    helper: "Generated from key color components.",
    disabled: true,
  },
};

export const InAForm = {
  name: "In a form",
  parameters: {
    docs: {
      description: {
        story: "Text fields participate in native `<form>` submission. Submit to see collected values.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="max-width:28rem;display:grid;gap:1.5rem;">
        <form id="tf-form" style="display:grid;gap:1rem;">
          <ds-text-field name="name" label="Display name" placeholder="Your name" required></ds-text-field>
          <ds-text-field name="token" label="Token prefix" value="--color-" leading="--"></ds-text-field>
          <ds-text-field name="notes" label="Notes" multiline placeholder="Optional notes…"></ds-text-field>
          <ds-button variant="filled" type="submit">Save</ds-button>
        </form>
        <pre id="tf-output" style="padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);font-size:0.8rem;min-height:2rem;"></pre>
      </div>
    `);

    el.querySelector("#tf-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      el.querySelector("#tf-output").textContent = JSON.stringify(data, null, 2);
    });

    return el;
  },
};
