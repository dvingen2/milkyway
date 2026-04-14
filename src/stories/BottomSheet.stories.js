import { renderHTML } from "./helpers.js";

export default {
  title: "Components/BottomSheet",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Bottom sheets slide up from the bottom of the viewport, presenting secondary content or actions without fully navigating away. Call `.show()` / `.close()` or set the `open` attribute. A scrim appears behind the sheet; clicking it dismisses. Fires `mw-close` on every dismissal.",
      },
    },
  },
  argTypes: {
    headline: {
      control: "text",
      description: "Heading shown in the sheet header. Leave empty to hide the header.",
    },
    open: {
      control: "boolean",
      description: "Whether the sheet is currently visible.",
    },
  },
  args: {
    headline: "Share via",
    open: false,
  },
};

export const Playground = {
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;">
        <mw-button id="open-btn" variant="filled">Open bottom sheet</mw-button>
        <mw-bottom-sheet id="sheet" headline="Share via">
          <div style="display:grid;gap:0.75rem;padding:0.5rem 0;">
            <mw-list items='[
              {"label":"Copy link","icon":"link"},
              {"label":"Send via email","icon":"email"},
              {"label":"Message","icon":"message"}
            ]'></mw-list>
          </div>
        </mw-bottom-sheet>
      </div>
    `);
    el.querySelector("#open-btn").addEventListener("click", () => {
      el.querySelector("#sheet").show();
    });
    return el;
  },
};

export const WithActions = {
  name: "With action list",
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;">
        <mw-button variant="tonal" id="act-btn">File options</mw-button>
        <mw-bottom-sheet id="act-sheet" headline="File options">
          <mw-list items='[
            {"label":"Rename","icon":"edit"},
            {"label":"Move to folder","icon":"folder"},
            {"label":"Download","icon":"download"},
            {"label":"Delete","icon":"delete"}
          ]'></mw-list>
        </mw-bottom-sheet>
      </div>
    `);
    el.querySelector("#act-btn").addEventListener("click", () => {
      el.querySelector("#act-sheet").show();
    });
    return el;
  },
};

export const NoHeader = {
  name: "No header",
  parameters: {
    docs: {
      description: {
        story: "Omit `headline` to hide the header entirely. The drag handle remains. Tapping the scrim closes the sheet.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;">
        <mw-button variant="outlined" id="no-hdr-btn">Open (no header)</mw-button>
        <mw-bottom-sheet id="no-hdr-sheet">
          <div style="padding:0.5rem 0;">
            <p style="font:var(--type-body-large);color:var(--color-on-surface);padding:0 1.5rem 0.75rem;">
              Rate your experience
            </p>
            <mw-list items='[
              {"label":"Excellent","icon":"sentiment_very_satisfied"},
              {"label":"Good","icon":"sentiment_satisfied"},
              {"label":"Fair","icon":"sentiment_neutral"},
              {"label":"Poor","icon":"sentiment_dissatisfied"}
            ]'></mw-list>
          </div>
        </mw-bottom-sheet>
      </div>
    `);
    el.querySelector("#no-hdr-btn").addEventListener("click", () => {
      el.querySelector("#no-hdr-sheet").show();
    });
    return el;
  },
};

export const CloseEvent = {
  name: "mw-close event",
  parameters: {
    docs: {
      description: {
        story: "Every dismissal fires `mw-close`. Use it to run cleanup or update your view model.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;display:grid;gap:0.75rem;max-width:20rem;">
        <mw-button variant="filled" id="ev-btn">Open sheet</mw-button>
        <p id="close-out" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Waiting for mw-close…
        </p>
        <mw-bottom-sheet id="ev-sheet" headline="Actions">
          <mw-list items='[{"label":"Option A","icon":"star"},{"label":"Option B","icon":"bolt"}]'></mw-list>
        </mw-bottom-sheet>
      </div>
    `);
    el.querySelector("#ev-btn").addEventListener("click", () => {
      el.querySelector("#ev-sheet").show();
    });
    el.querySelector("#ev-sheet").addEventListener("mw-close", () => {
      el.querySelector("#close-out").textContent =
        `mw-close fired at ${new Date().toLocaleTimeString()}`;
    });
    return el;
  },
};
