import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Snackbar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Snackbars provide brief, non-blocking feedback about an operation. They appear at the bottom of the screen and disappear automatically. An optional action label lets users undo or follow up on the operation. Snackbars use the inverse surface so they stand out on any background.",
      },
    },
  },
  argTypes: {
    message: {
      control: "text",
      description: "The feedback message. Keep it short — one sentence.",
    },
    action: {
      control: "text",
      description: "Optional action label (e.g. 'Undo', 'Retry'). When empty, no action button is rendered.",
    },
  },
  args: {
    message: "Token changes saved.",
    action: "Undo",
  },
  render: ({ message, action }) =>
    renderHTML(`
      <div style="width:28rem;">
        <mw-snackbar message="${message}" action="${action}"></mw-snackbar>
      </div>
    `),
};

export const Playground = {};

export const MessageOnly = {
  name: "Message only",
  args: { message: "All changes published.", action: "" },
};

export const WithAction = {
  name: "With action",
  args: { message: "Component deleted.", action: "Undo" },
};

export const LongMessage = {
  name: "Long message",
  args: {
    message: "Your design token export is ready. Check your downloads folder.",
    action: "Open",
  },
};

export const EventHandling = {
  name: "Action event",
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
      <div style="display:grid;gap:1rem;width:28rem;">
        <mw-snackbar message="Token group moved to archive." action="Undo" id="demo-snackbar"></mw-snackbar>
        <p id="event-output" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);min-height:1.5rem;">
          Click "Undo" to see the event fire.
        </p>
      </div>
    `);
    el.querySelector("#demo-snackbar").addEventListener("mw-action", () => {
      el.querySelector("#event-output").textContent = "mw-action event fired — undo logic would run here.";
    });
    return el;
  },
};
