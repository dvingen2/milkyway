import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Badge",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badges communicate dynamic information — unread counts, status dots, or notification counts — attached to icons or avatars. They use the error color family by default, drawing immediate visual attention.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "Numeric or text label shown inside the badge. Ignored when `variant` is `dot`.",
    },
    variant: {
      control: "select",
      options: ["numeric", "dot"],
      description: "`numeric` shows the value label. `dot` renders a small indicator with no label.",
    },
  },
  args: {
    value: "4",
    variant: "numeric",
  },
  render: ({ value, variant }) =>
    renderHTML(
      `<ds-badge value="${value}" variant="${variant}"></ds-badge>`,
    ),
};

export const Playground = {};

export const Numeric = {
  args: { value: "12", variant: "numeric" },
};

export const Dot = {
  args: { variant: "dot" },
};

export const HighCount = {
  name: "Large count",
  args: { value: "99+", variant: "numeric" },
};

export const OnAnIcon = {
  name: "On an icon button",
  parameters: {
    docs: {
      description: {
        story:
          "Badges are typically overlaid on icons using `position: absolute` in the consuming layout. This story shows the badge alongside an icon button as a reference.",
      },
    },
  },
  render: () =>
    renderHTML(`
      <div style="display:inline-flex;align-items:flex-start;gap:1.5rem;">
        <div style="position:relative;display:inline-flex;">
          <ds-icon-button variant="standard" aria-label="Notifications">◌</ds-icon-button>
          <ds-badge value="3" style="position:absolute;top:-0.25rem;right:-0.25rem;"></ds-badge>
        </div>
        <div style="position:relative;display:inline-flex;">
          <ds-icon-button variant="standard" aria-label="Messages">✉</ds-icon-button>
          <ds-badge variant="dot" style="position:absolute;top:0.125rem;right:0.125rem;"></ds-badge>
        </div>
        <div style="position:relative;display:inline-flex;">
          <ds-icon-button variant="tonal" aria-label="Alerts">⚑</ds-icon-button>
          <ds-badge value="99+" style="position:absolute;top:-0.25rem;right:-0.5rem;"></ds-badge>
        </div>
      </div>
    `),
};

export const InAppBar = {
  name: "In top app bar",
  render: () =>
    renderHTML(`
      <div style="width:48rem;">
        <ds-top-app-bar headline="Notifications">
          <ds-icon-button slot="leading" aria-label="Menu">☰</ds-icon-button>
          <div slot="trailing" style="position:relative;display:inline-flex;">
            <ds-icon-button variant="standard" aria-label="Alerts">◌</ds-icon-button>
            <ds-badge value="5" style="position:absolute;top:-0.25rem;right:-0.25rem;"></ds-badge>
          </div>
        </ds-top-app-bar>
      </div>
    `),
};
