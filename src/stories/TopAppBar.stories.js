import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Top App Bar",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The top app bar is the primary navigation and branding surface at the top of a screen. It provides slots for a leading action (typically a menu or back button), a title, and trailing actions (icons, badges). Uses frosted-glass surface with a subtle shadow to sit above content.",
      },
    },
  },
  argTypes: {
    headline: {
      control: "text",
      description: "Page or section title rendered in the bar.",
    },
  },
  args: {
    headline: "Milkyway",
  },
  render: ({ headline }) =>
    renderHTML(`
      <div style="padding:1.5rem;">
        <mw-top-app-bar headline="${headline}">
          <mw-icon-button slot="leading" aria-label="Menu">☰</mw-icon-button>
          <mw-icon-button slot="trailing" aria-label="Search">⌕</mw-icon-button>
        </mw-top-app-bar>
      </div>
    `),
};

export const Playground = {};

export const WithBadge = {
  name: "With badge",
  render: () =>
    renderHTML(`
      <div style="padding:1.5rem;">
        <mw-top-app-bar headline="Notifications">
          <mw-icon-button slot="leading" aria-label="Back">←</mw-icon-button>
          <div slot="trailing" style="position:relative;display:inline-flex;">
            <mw-icon-button variant="standard" aria-label="Filter">◧</mw-icon-button>
            <mw-badge value="2" style="position:absolute;top:-0.25rem;right:-0.25rem;"></mw-badge>
          </div>
        </mw-top-app-bar>
      </div>
    `),
};

export const WithSupportLabel = {
  name: "With support label",
  render: () =>
    renderHTML(`
      <div style="padding:1.5rem;">
        <mw-top-app-bar headline="Token editor">
          <mw-icon-button slot="leading" aria-label="Back">←</mw-icon-button>
          <span slot="trailing" class="app-bar-support">12 tokens</span>
          <mw-icon-button slot="trailing" aria-label="More options">⋯</mw-icon-button>
        </mw-top-app-bar>
      </div>
    `),
};

export const NoLeadingAction = {
  name: "No leading action",
  render: () =>
    renderHTML(`
      <div style="padding:1.5rem;">
        <mw-top-app-bar headline="Overview">
          <mw-icon-button slot="trailing" aria-label="Settings">⚙</mw-icon-button>
          <mw-icon-button slot="trailing" aria-label="Account">◎</mw-icon-button>
        </mw-top-app-bar>
      </div>
    `),
};

export const InPageLayout = {
  name: "In page layout",
  parameters: {
    docs: {
      description: {
        story:
          "Typical usage: top app bar above scrollable content, paired with a navigation rail for side navigation.",
      },
    },
  },
  render: () =>
    renderHTML(`
      <div style="display:grid;grid-template-rows:auto 1fr;height:32rem;background:var(--layer-backdrop);">
        <div style="padding:1rem 1rem 0;">
          <mw-top-app-bar headline="Design tokens">
            <mw-icon-button slot="leading" aria-label="Menu">☰</mw-icon-button>
            <mw-icon-button slot="trailing" aria-label="Search">⌕</mw-icon-button>
          </mw-top-app-bar>
        </div>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:1rem;padding:1rem;overflow:hidden;">
          <mw-navigation-rail items='[
            {"icon":"⌂","label":"Home","active":true},
            {"icon":"◫","label":"Tokens"},
            {"icon":"⌘","label":"Components"}
          ]'></mw-navigation-rail>
          <mw-card variant="filled" style="overflow:auto;">
            <p class="card-label">Content area</p>
            <p style="color:var(--color-on-surface-variant);">Main content goes here.</p>
          </mw-card>
        </div>
      </div>
    `),
};
