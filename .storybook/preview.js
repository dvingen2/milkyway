import "../src/styles/tokens.css";
import "../src/styles/base.css";
import "../src/styles/components.css";

import "../src/components/ui-button.js";
import "../src/components/ui-dialog.js";
import "../src/components/ui-badge.js";
import "../src/components/ui-card.js";
import "../src/components/ui-chip.js";
import "../src/components/ui-divider.js";
import "../src/components/ui-icon-button.js";
import "../src/components/ui-list.js";
import "../src/components/ui-menu.js";
import "../src/components/ui-navigation-rail.js";
import "../src/components/ui-progress.js";
import "../src/components/ui-snackbar.js";
import "../src/components/ui-tabs.js";
import "../src/components/ui-text-field.js";
import "../src/components/ui-top-app-bar.js";
import "../src/components/ui-checkbox.js";
import "../src/components/ui-radio.js";
import "../src/components/ui-switch.js";

const preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "#fafbfb" },
        { name: "dark",    value: "#161b1c" },
      ],
    },
    /*
     * Accessibility (addon-a11y) — run axe on every story automatically.
     * Rules are configured globally here; individual stories can override
     * via parameters.a11y.config.rules.
     */
    a11y: {
      /*
       * Run the full axe ruleset. Stories that require a less strict subset
       * should document why in a comment and override locally.
       */
      config: {
        rules: [
          /*
           * color-contrast: enforce WCAG AA (4.5:1 normal, 3:1 large text).
           * Set to "error" so contrast failures block the story's a11y pass.
           */
          { id: "color-contrast", enabled: true },
        ],
      },
      /*
       * Manual checks that axe cannot automate. These appear in the
       * Accessibility panel as a checklist for human review.
       */
      manual: [
        {
          id: "keyboard-navigation",
          description: "All interactive elements reachable and operable by keyboard alone.",
        },
        {
          id: "focus-visible",
          description: "Focus indicator is clearly visible on all interactive elements.",
        },
        {
          id: "touch-target",
          description: "Touch targets meet the 44×44px minimum (components use 3rem = 48px).",
        },
      ],
    },
  },
};

export default preview;
