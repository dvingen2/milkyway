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
    return renderHTML(`<ds-button variant="${variant}"${hrefAttr}${disabledAttr}>${label}</ds-button>`);
  },
};

export const Playground = {};

export const AllVariants = {
  name: "All variants",
  render: () =>
    renderHTML(`
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
        <ds-button variant="filled">Filled</ds-button>
        <ds-button variant="elevated">Elevated</ds-button>
        <ds-button variant="tonal">Tonal</ds-button>
        <ds-button variant="outlined">Outlined</ds-button>
        <ds-button variant="text">Text</ds-button>
        <ds-button variant="destructive">Destructive</ds-button>
      </div>
    `),
};

export const DisabledStates = {
  name: "Disabled",
  render: () =>
    renderHTML(`
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
        <ds-button variant="filled" disabled>Filled</ds-button>
        <ds-button variant="elevated" disabled>Elevated</ds-button>
        <ds-button variant="tonal" disabled>Tonal</ds-button>
        <ds-button variant="outlined" disabled>Outlined</ds-button>
        <ds-button variant="text" disabled>Text</ds-button>
        <ds-button variant="destructive" disabled>Destructive</ds-button>
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
        <ds-button variant="filled" href="#overview">Go to overview</ds-button>
        <ds-button variant="outlined" href="#tokens">Browse tokens</ds-button>
        <ds-button variant="text" href="#components">All components</ds-button>
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
        <ds-card variant="outlined">
          <p class="card-label">Publish changes</p>
          <p style="color:var(--color-on-surface-variant);">Review your token changes before publishing to production.</p>
          <div style="display:flex;gap:0.75rem;margin-top:0.75rem;flex-wrap:wrap;">
            <ds-button variant="filled">Publish</ds-button>
            <ds-button variant="outlined">Preview</ds-button>
            <ds-button variant="text">Cancel</ds-button>
          </div>
        </ds-card>
        <ds-card variant="outlined">
          <p class="card-label">Delete token group</p>
          <p style="color:var(--color-on-surface-variant);">This action cannot be undone.</p>
          <div style="display:flex;gap:0.75rem;margin-top:0.75rem;flex-wrap:wrap;">
            <ds-button variant="destructive">Delete permanently</ds-button>
            <ds-button variant="text">Cancel</ds-button>
          </div>
        </ds-card>
      </div>
    `),
};
