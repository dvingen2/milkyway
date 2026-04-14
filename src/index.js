/*
 * Surface System — library entry point.
 *
 * Import this file to register all ds-* custom elements and import the
 * bundled stylesheet (when using a bundler that handles CSS imports).
 *
 * For consuming projects that import styles separately, import
 * "surface-system/tokens" for the CSS custom properties, then import
 * this file for the component JS.
 *
 * Theming: override key color components before importing this file:
 *   :root {
 *     --_primary-h: 265;   (blue)
 *     --_primary-c: 0.14;
 *   }
 */

import "./styles/tokens.css";
import "./styles/components.css";

export { DsButton }           from "./components/ui-button.js";
export { DsDialog }           from "./components/ui-dialog.js";
export { DsBadge }            from "./components/ui-badge.js";
export { DsCard }             from "./components/ui-card.js";
export { DsChip }             from "./components/ui-chip.js";
export { DsDivider }          from "./components/ui-divider.js";
export { DsIconButton }       from "./components/ui-icon-button.js";
export { DsList }             from "./components/ui-list.js";
export { DsMenu }             from "./components/ui-menu.js";
export { DsNavigationRail }   from "./components/ui-navigation-rail.js";
export { DsProgress }         from "./components/ui-progress.js";
export { DsSnackbar }         from "./components/ui-snackbar.js";
export { DsTabs }             from "./components/ui-tabs.js";
export { DsTextField }        from "./components/ui-text-field.js";
export { DsTopAppBar }        from "./components/ui-top-app-bar.js";
export { DsCheckbox }         from "./components/ui-checkbox.js";
export { DsRadio }            from "./components/ui-radio.js";
export { DsSwitch }           from "./components/ui-switch.js";
