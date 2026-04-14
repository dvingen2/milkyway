import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Buttons initiate actions. Surface System provides six variants covering the full emphasis range — from high-emphasis filled through to destructive. When given an `href`, the button renders as an `<a>` element with full keyboard and activation semantics preserved.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "elevated", "tonal", "outlined", "text", "destructive"],
      description: "Visual emphasis. Use `filled` for the primary action, `text` for the lowest emphasis.",
    },
    label: {
      control: "text",
      description: "Button label content.",
    },
    href: {
      control: "text",
      description: "When set, renders as an `<a>` element instead of `<button>`.",
    },
    disabled: {
      control: "boolean",
      description: "Prevents interaction and reduces visual prominence.",
    },
  },
  args: {
    variant: "filled",
    label: "Action",
    href: "",
    disabled: false,
  },
  render: ({ variant, label, href, disabled }) => {
    const hrefAttr = href ? ` href="${href}"` : "";
    const disabledAttr = disabled ? " disabled" : "";
    return renderHTML(`<mw-button variant="${variant}"${hrefAttr}${disabledAttr}>${label}</mw-button>`);
  },
};

export const Playground = {};

export const AllVariants = {
  name: "All variants",
  render: () =>
    renderHTML(`
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
        <mw-button variant="filled">Filled</mw-button>
        <mw-button variant="elevated">Elevated</mw-button>
        <mw-button variant="tonal">Tonal</mw-button>
        <mw-button variant="outlined">Outlined</mw-button>
        <mw-button variant="text">Text</mw-button>
        <mw-button variant="destructive">Destructive</mw-button>
      </div>
    `),
};

export const DisabledStates = {
  name: "Disabled",
  render: () =>
    renderHTML(`
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
        <mw-button variant="filled" disabled>Filled</mw-button>
        <mw-button variant="elevated" disabled>Elevated</mw-button>
        <mw-button variant="tonal" disabled>Tonal</mw-button>
        <mw-button variant="outlined" disabled>Outlined</mw-button>
        <mw-button variant="text" disabled>Text</mw-button>
        <mw-button variant="destructive" disabled>Destructive</mw-button>
      </div>
    `),
};

export const AsLink = {
  name: "As link",
  parameters: {
    docs: {
      description: {
        story:
          "When `href` is set the button renders as `<a>`. The visual appearance is identical — use this for navigation rather than form actions.",
      },
    },
  },
  render: () =>
    renderHTML(`
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
        <mw-button variant="filled" href="#overview">Go to overview</mw-button>
        <mw-button variant="outlined" href="#tokens">Browse tokens</mw-button>
        <mw-button variant="text" href="#components">All components</mw-button>
      </div>
    `),
};

export const EmphasisHierarchy = {
  name: "Emphasis hierarchy",
  parameters: {
    docs: {
      description: {
        story:
          "Use one primary action per view, supporting actions at lower emphasis. The destructive variant should appear only for irreversible operations.",
      },
    },
  },
  render: () =>
    renderHTML(`
      <div style="display:grid;gap:1.5rem;max-width:32rem;">
        <mw-card variant="outlined">
          <p class="card-label">Publish changes</p>
          <p style="color:var(--color-on-surface-variant);">Review your token changes before publishing to production.</p>
          <div style="display:flex;gap:0.75rem;margin-top:0.75rem;flex-wrap:wrap;">
            <mw-button variant="filled">Publish</mw-button>
            <mw-button variant="outlined">Preview</mw-button>
            <mw-button variant="text">Cancel</mw-button>
          </div>
        </mw-card>
        <mw-card variant="outlined">
          <p class="card-label">Delete token group</p>
          <p style="color:var(--color-on-surface-variant);">This action cannot be undone.</p>
          <div style="display:flex;gap:0.75rem;margin-top:0.75rem;flex-wrap:wrap;">
            <mw-button variant="destructive">Delete permanently</mw-button>
            <mw-button variant="text">Cancel</mw-button>
          </div>
        </mw-card>
      </div>
    `),
};
