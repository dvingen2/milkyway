import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Snackbar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Snackbars surface brief, low-priority messages at the bottom of the screen. Call `.show(message, opts)` to display one. Multiple calls are queued — each message waits for the previous to dismiss before appearing. Optional `action` label fires `mw-action` when clicked. Auto-dismisses after `duration` ms (default 4000). Fires `mw-dismiss` on exit.",
      },
    },
  },
  argTypes: {
    message: {
      control: "text",
      description: "Main message text.",
    },
    action: {
      control: "text",
      description: "Optional action button label. Leave empty to hide.",
    },
  },
  args: {
    message: "Changes saved",
    action: "",
  },
};

export const Playground = {
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;display:grid;gap:0.75rem;max-width:20rem;">
        <mw-button variant="filled" id="show-btn">Show snackbar</mw-button>
        <mw-snackbar id="snack"></mw-snackbar>
      </div>
    `);
    el.querySelector("#show-btn").addEventListener("click", () => {
      el.querySelector("#snack").show("Changes saved");
    });
    return el;
  },
};

export const WithAction = {
  name: "With action",
  parameters: {
    docs: {
      description: {
        story:
          "Clicking the action button fires a `mw-action` custom event that bubbles and composes through shadow DOM. Wire it up to undo logic, navigation, or whatever the action implies.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;display:grid;gap:0.75rem;max-width:20rem;">
        <mw-button variant="filled" id="act-btn">Delete item</mw-button>
        <p id="event-output" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Waiting for mw-action…
        </p>
        <mw-snackbar id="act-snack"></mw-snackbar>
      </div>
    `);
    el.querySelector("#act-btn").addEventListener("click", () => {
      el.querySelector("#act-snack").show("Item deleted", { action: "Undo" });
    });
    el.querySelector("#act-snack").addEventListener("mw-action", () => {
      el.querySelector("#event-output").textContent = "mw-action event fired — undo logic would run here.";
    });
    return el;
  },
};

export const Queue = {
  name: "Queue",
  parameters: {
    docs: {
      description: {
        story:
          "Multiple `.show()` calls are queued. Each message waits for the previous to dismiss before appearing.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;display:grid;gap:0.75rem;max-width:22rem;">
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <mw-button variant="filled" id="q1">Message 1</mw-button>
          <mw-button variant="outlined" id="q2">Message 2</mw-button>
          <mw-button variant="tonal" id="q3">Message 3</mw-button>
          <mw-button variant="outlined" id="qall">Queue all three</mw-button>
        </div>
        <mw-snackbar id="q-snack"></mw-snackbar>
      </div>
    `);
    const snack = el.querySelector("#q-snack");
    el.querySelector("#q1").addEventListener("click", () => snack.show("First message"));
    el.querySelector("#q2").addEventListener("click", () => snack.show("Second message", { duration: 3000 }));
    el.querySelector("#q3").addEventListener("click", () => snack.show("Third message", { action: "OK" }));
    el.querySelector("#qall").addEventListener("click", () => {
      snack.show("First message");
      snack.show("Second message", { duration: 2500 });
      snack.show("Third — with action", { action: "Got it", duration: 5000 });
    });
    return el;
  },
};

export const DismissEvent = {
  name: "mw-dismiss event",
  parameters: {
    docs: {
      description: {
        story: "Fires `mw-dismiss` whenever the snackbar exits — after auto-timeout or after an action click.",
      },
    },
  },
  render: () => {
    const el = renderHTML(`
      <div style="padding:1rem;display:grid;gap:0.75rem;max-width:20rem;">
        <mw-button variant="filled" id="d-btn">Show snackbar</mw-button>
        <p id="d-out" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);">
          Waiting for mw-dismiss…
        </p>
        <mw-snackbar id="d-snack"></mw-snackbar>
      </div>
    `);
    el.querySelector("#d-btn").addEventListener("click", () => {
      el.querySelector("#d-snack").show("Auto-dismisses in 4 s");
    });
    el.querySelector("#d-snack").addEventListener("mw-dismiss", () => {
      el.querySelector("#d-out").textContent =
        `mw-dismiss fired at ${new Date().toLocaleTimeString()}`;
    });
    return el;
  },
};
