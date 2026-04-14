import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dialogs interrupt the user to request a decision or provide critical information. They use the native `<dialog>` element for a free focus trap and Escape-key handling. Dismissing fires a `mw-close` event. The `persistent` attribute disables backdrop-click and Escape dismissal for flows that require an explicit choice.",
      },
    },
  },
  argTypes: {
    headline: {
      control: "text",
      description: "Dialog title.",
    },
    icon: {
      control: "text",
      description: "Optional icon shown above the headline.",
    },
    persistent: {
      control: "boolean",
      description: "When true, clicking the backdrop or pressing Escape does not close the dialog.",
    },
  },
  args: {
    headline: "Confirm action",
    icon: "",
    persistent: false,
  },
};

export const Playground = {
  render: ({ headline, icon, persistent }) => {
    const el = renderHTML(`
      <div>
        <mw-button variant="filled" id="open-btn">Open dialog</mw-button>
        <mw-dialog
          id="demo-dialog"
          headline="${headline}"
          icon="${icon}"
          ${persistent ? "persistent" : ""}
        >
          <p>This is the dialog body. Place any content here — forms, descriptions, confirmations.</p>
          <div slot="actions">
            <mw-button variant="text" id="cancel-btn">Cancel</mw-button>
            <mw-button variant="filled" id="confirm-btn">Confirm</mw-button>
          </div>
        </mw-dialog>
      </div>
    `);

    const dialog = el.querySelector("#demo-dialog");
    el.querySelector("#open-btn").addEventListener("click", () => dialog.showModal());
    el.querySelector("#cancel-btn").addEventListener("click", () => dialog.close());
    el.querySelector("#confirm-btn").addEventListener("click", () => dialog.close());

    return el;
  },
};

export const WithIcon = {
  name: "With icon",
  render: () => {
    const el = renderHTML(`
      <div>
        <mw-button variant="filled" id="open-btn">Open dialog</mw-button>
        <mw-dialog id="demo-dialog" headline="Delete token group" icon="⚠">
          <p>This will permanently delete the <strong>Surface hierarchy</strong> token group and all 14 tokens it contains. This action cannot be undone.</p>
          <div slot="actions">
            <mw-button variant="text" id="cancel-btn">Cancel</mw-button>
            <mw-button variant="destructive" id="delete-btn">Delete permanently</mw-button>
          </div>
        </mw-dialog>
      </div>
    `);

    const dialog = el.querySelector("#demo-dialog");
    el.querySelector("#open-btn").addEventListener("click", () => dialog.showModal());
    el.querySelector("#cancel-btn").addEventListener("click", () => dialog.close());
    el.querySelector("#delete-btn").addEventListener("click", () => dialog.close());

    return el;
  },
};

export const WithForm = {
  name: "With form",
  parameters: {
    docs: {
      description: {
        story: "Dialogs can contain forms. Submit collects values and closes the dialog.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="display:grid;gap:1rem;">
        <mw-button variant="tonal" id="open-btn">New token group</mw-button>
        <mw-dialog id="form-dialog" headline="Create token group">
          <form id="token-form" style="display:grid;gap:1rem;">
            <mw-text-field name="name" label="Group name" placeholder="e.g. Surface hierarchy" required></mw-text-field>
            <mw-text-field name="prefix" label="Token prefix" placeholder="--color-" leading="--"></mw-text-field>
            <mw-text-field name="description" label="Description" multiline placeholder="Describe the purpose of this group…"></mw-text-field>
          </form>
          <div slot="actions">
            <mw-button variant="text" id="cancel-btn">Cancel</mw-button>
            <mw-button variant="filled" id="create-btn">Create</mw-button>
          </div>
        </mw-dialog>
        <pre id="form-output" style="padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);font-size:0.8rem;min-height:2rem;max-width:28rem;"></pre>
      </div>
    `);

    const dialog = el.querySelector("#form-dialog");
    el.querySelector("#open-btn").addEventListener("click", () => dialog.showModal());
    el.querySelector("#cancel-btn").addEventListener("click", () => dialog.close());
    el.querySelector("#create-btn").addEventListener("click", () => {
      const data = Object.fromEntries(new FormData(el.querySelector("#token-form")).entries());
      el.querySelector("#form-output").textContent = JSON.stringify(data, null, 2);
      dialog.close();
    });

    return el;
  },
};

export const Persistent = {
  name: "Persistent (no dismiss on Escape/backdrop)",
  parameters: {
    docs: {
      description: {
        story:
          "With `persistent`, the user must click an action button to dismiss. Use this for flows that require an explicit choice (e.g. unsaved changes warning).",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div>
        <mw-button variant="outlined" id="open-btn">Open persistent dialog</mw-button>
        <mw-dialog id="pers-dialog" headline="Unsaved changes" persistent>
          <p>You have unsaved changes to the <strong>Primary color</strong> token. What would you like to do?</p>
          <div slot="actions">
            <mw-button variant="text" id="discard-btn">Discard</mw-button>
            <mw-button variant="filled" id="save-btn">Save changes</mw-button>
          </div>
        </mw-dialog>
      </div>
    `);

    const dialog = el.querySelector("#pers-dialog");
    el.querySelector("#open-btn").addEventListener("click", () => dialog.showModal());
    el.querySelector("#discard-btn").addEventListener("click", () => dialog.close());
    el.querySelector("#save-btn").addEventListener("click", () => dialog.close());

    return el;
  },
};

export const CloseEvent = {
  name: "mw-close event",
  parameters: {
    docs: {
      description: {
        story: "Every dismissal (button, Escape, or backdrop click) fires `mw-close`. Use it to reset state or run cleanup.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="display:grid;gap:1rem;">
        <mw-button variant="filled" id="open-btn">Open dialog</mw-button>
        <mw-dialog id="event-dialog" headline="Close event demo">
          <p>Close this dialog any way you like — button, Escape key, or backdrop click.</p>
          <div slot="actions">
            <mw-button variant="text" id="close-btn">Close</mw-button>
          </div>
        </mw-dialog>
        <p id="close-output" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);min-height:1.5rem;">
          Waiting for mw-close…
        </p>
      </div>
    `);

    const dialog = el.querySelector("#event-dialog");
    el.querySelector("#open-btn").addEventListener("click", () => dialog.showModal());
    el.querySelector("#close-btn").addEventListener("click", () => dialog.close());
    el.querySelector("#event-dialog").addEventListener("mw-close", () => {
      el.querySelector("#close-output").textContent = `mw-close fired at ${new Date().toLocaleTimeString()}`;
    });

    return el;
  },
};
