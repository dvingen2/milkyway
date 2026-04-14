/*
 * Milkyway — library entry point.
 *
 * Import this file to register all mw-* custom elements and import the
 * bundled stylesheet (when using a bundler that handles CSS imports).
 *
 * For consuming projects that import styles separately, import
 * "milkyway/tokens" for the CSS custom properties, then import
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

export { MwButton }           from "./components/ui-button.js";
export { MwDialog }           from "./components/ui-dialog.js";
export { MwBadge }            from "./components/ui-badge.js";
export { MwCard }             from "./components/ui-card.js";
export { MwChip }             from "./components/ui-chip.js";
export { MwDivider }          from "./components/ui-divider.js";
export { MwIconButton }       from "./components/ui-icon-button.js";
export { MwList }             from "./components/ui-list.js";
export { MwMenu }             from "./components/ui-menu.js";
export { MwNavigationRail }   from "./components/ui-navigation-rail.js";
export { MwProgress }         from "./components/ui-progress.js";
export { MwSnackbar }         from "./components/ui-snackbar.js";
export { MwTabs }             from "./components/ui-tabs.js";
export { MwTextField }        from "./components/ui-text-field.js";
export { MwTopAppBar }        from "./components/ui-top-app-bar.js";
export { MwCheckbox }         from "./components/ui-checkbox.js";
export { MwRadio }            from "./components/ui-radio.js";
export { MwSwitch }           from "./components/ui-switch.js";
export { MwFab }              from "./components/ui-fab.js";
export { MwExtendedFab }      from "./components/ui-extended-fab.js";
export { MwTooltip }          from "./components/ui-tooltip.js";
export { MwSlider }           from "./components/ui-slider.js";
export { MwSegmentedButton }  from "./components/ui-segmented-button.js";
export { MwSelect }           from "./components/ui-select.js";
export { MwNavigationBar }    from "./components/ui-navigation-bar.js";
export { MwBottomSheet }      from "./components/ui-bottom-sheet.js";
export { MwSideSheet }        from "./components/ui-side-sheet.js";
