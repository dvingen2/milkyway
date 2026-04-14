import { renderHTML } from "./helpers.js";

export default {
  title: "Components/SideSheet",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Side sheets slide in from the right (default) or left. Use `side=\"left\"` for navigation drawers. The default `variant` is `modal` — a scrim appears and clicking it closes the sheet. Add `variant=\"standard\"` for a persistent panel with no scrim. Fires `mw-close` on dismissal.",
      },
    },
  },
  argTypes: {
    headline: {
      control: "text",
      description: "Header title.",
    },
    variant: {
      control: "select",
      options: ["modal", "standard"],
      description: "`modal` shows a scrim; `standard` is persistent with no scrim.",
    },
    side: {
      control: "select",
      options: ["right", "left"],
      description: "Which edge the sheet slides in from.",
    },
    open: {
      control: "boolean",
    },
  },
  args: {
    headline: "Filters",
    variant: "modal",
    side: "right",
    open: false,
  },
};

export const Playground = {
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;">
        <mw-button id="open-ss" variant="filled">Open side sheet</mw-button>
        <mw-side-sheet id="ss" headline="Filters">
          <mw-list items='[
            {"label":"Price: Low to High","icon":"sort"},
            {"label":"Price: High to Low","icon":"sort"},
            {"label":"Newest first","icon":"new_releases"},
            {"label":"Best rated","icon":"star"}
          ]'></mw-list>
        </mw-side-sheet>
      </div>
    `);
    el.querySelector("#open-ss").addEventListener("click", () => {
      el.querySelector("#ss").show();
    });
    return el;
  },
};

export const NavigationDrawer = {
  name: "Navigation drawer (left)",
  parameters: {
    docs: {
      description: {
        story: "Set `side=\"left\"` for a navigation drawer. The sheet slides in from the left.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;">
        <mw-button id="open-nav" variant="tonal">Open navigation</mw-button>
        <mw-side-sheet id="nav-drawer" headline="Milkyway" side="left">
          <mw-list items='[
            {"label":"Home","icon":"home"},
            {"label":"Components","icon":"widgets"},
            {"label":"Foundations","icon":"layers"},
            {"label":"Settings","icon":"settings"}
          ]'></mw-list>
        </mw-side-sheet>
      </div>
    `);
    el.querySelector("#open-nav").addEventListener("click", () => {
      el.querySelector("#nav-drawer").show();
    });
    return el;
  },
};

export const Standard = {
  name: "Standard (persistent)",
  parameters: {
    docs: {
      description: {
        story: "`variant=\"standard\"` removes the scrim. The sheet stays open until explicitly closed. Useful for detail panels on wide viewports.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;display:flex;gap:1rem;align-items:flex-start;">
        <div style="flex:1;min-height:12rem;">
          <p style="font:var(--type-body-large);color:var(--color-on-surface-variant);">
            Main content area
          </p>
          <mw-button id="open-std" variant="outlined">Toggle detail panel</mw-button>
        </div>
      </div>
      <mw-side-sheet id="std-sheet" headline="Item detail" variant="standard" style="--sheet-width:18rem;"></mw-side-sheet>
    `);
    el.querySelector("#open-std").addEventListener("click", () => {
      const sheet = el.querySelector("#std-sheet");
      sheet.open ? sheet.close() : sheet.show();
    });
    return el;
  },
};

export const CloseEvent = {
  name: "mw-close event",
  parameters: {
    docs: {
      description: {
        story: "Fires `mw-close` whenever the sheet is dismissed via the close button, scrim click, or Escape key.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;display:grid;gap:0.75rem;max-width:20rem;">
        <mw-button id="ev-open" variant="filled">Open side sheet</mw-button>
        <p id="ss-out" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Waiting for mw-close…
        </p>
        <mw-side-sheet id="ev-sheet" headline="Detail">
          <div style="padding:0 1.5rem;">
            <p style="font:var(--type-body-large);">Some content here.</p>
          </div>
        </mw-side-sheet>
      </div>
    `);
    el.querySelector("#ev-open").addEventListener("click", () => {
      el.querySelector("#ev-sheet").show();
    });
    el.querySelector("#ev-sheet").addEventListener("mw-close", () => {
      el.querySelector("#ss-out").textContent =
        `mw-close fired at ${new Date().toLocaleTimeString()}`;
    });
    return el;
  },
};
