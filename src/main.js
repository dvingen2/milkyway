import "./components/ui-button.js";
import "./components/ui-dialog.js";
import "./components/ui-badge.js";
import "./components/ui-card.js";
import "./components/ui-chip.js";
import "./components/ui-divider.js";
import "./components/ui-icon-button.js";
import "./components/ui-list.js";
import "./components/ui-menu.js";
import "./components/ui-navigation-rail.js";
import "./components/ui-progress.js";
import "./components/ui-snackbar.js";
import "./components/ui-tabs.js";
import "./components/ui-text-field.js";
import "./components/ui-top-app-bar.js";
import "./components/ui-checkbox.js";
import "./components/ui-radio.js";
import "./components/ui-switch.js";
import "./components/ui-fab.js";
import "./components/ui-extended-fab.js";
import "./components/ui-tooltip.js";
import "./components/ui-slider.js";
import "./components/ui-segmented-button.js";
import "./components/ui-select.js";
import "./components/ui-navigation-bar.js";
import "./components/ui-bottom-sheet.js";
import "./components/ui-side-sheet.js";
import {
  colorRoles,
  colorCustomizationGuidance,
  componentPrinciples,
  componentReferences,
  keyColors,
  sections,
  stateLayers,
  tonalPalettes,
} from "./data/content.js";

const grid = document.querySelector("#project-grid");
const keyColorGrid = document.querySelector("#key-color-grid");
const tonalPaletteGrid = document.querySelector("#tonal-palette-grid");
const roleGrid = document.querySelector("#role-grid");
const stateGrid = document.querySelector("#state-grid");
const principleList = document.querySelector("#principle-list");
const componentReferenceList = document.querySelector("#component-reference-list");
const colorCustomizationList = document.querySelector("#color-customization-list");

if (grid) {
  grid.innerHTML = sections
    .map(
      (section) => `
        <mw-card variant="filled">
          <p class="eyebrow">Modul</p>
          <h3>${section.title}</h3>
          <p>${section.summary}</p>
          <div class="project-meta">
            ${section.tags.map((tag) => `<mw-chip kind="filter">${tag}</mw-chip>`).join("")}
          </div>
          <mw-button variant="text" href="#fundament">Utforsk dokumentasjonen</mw-button>
        </mw-card>
      `,
    )
    .join("");
}

if (keyColorGrid) {
  keyColorGrid.innerHTML = keyColors
    .map(
      (swatch) => `
        <mw-card variant="outlined">
          <div class="swatch-chip" style="background: var(${swatch.token});"></div>
          <div class="swatch-meta">
            <p class="swatch-name">${swatch.name}</p>
            <p class="swatch-value"><code>${swatch.token}</code></p>
            <p class="swatch-value">${swatch.value}</p>
            <p class="swatch-value">${swatch.purpose}</p>
          </div>
        </mw-card>
      `,
    )
    .join("");
}

if (tonalPaletteGrid) {
  tonalPaletteGrid.innerHTML = tonalPalettes
    .map(
      (palette) => `
        <mw-card variant="outlined">
          <div class="palette-header">
            <p class="swatch-name">${palette.name}</p>
            <p class="swatch-value"><code>${palette.prefix}*</code></p>
          </div>
          <div class="palette-tones">
            ${palette.tones
              .map(
                (tone) => `
                  <div class="palette-tone">
                    <div class="palette-tone-chip" style="background: var(${palette.prefix}${tone});"></div>
                    <span>${tone}</span>
                  </div>
                `,
              )
              .join("")}
          </div>
        </mw-card>
      `,
    )
    .join("");
}

if (roleGrid) {
  roleGrid.innerHTML = colorRoles
    .map(
      (role) => `
        <mw-card variant="outlined">
          <div class="role-swatch" style="background: var(${role.token}); color: var(${role.onToken});">
            <div class="role-swatch-label">${role.name}</div>
          </div>
          <div class="role-meta">
            <p class="role-name">${role.name}</p>
            <p class="role-value"><code>${role.token}</code></p>
            <p class="role-value">Foreground: <code>${role.onToken}</code></p>
          </div>
        </mw-card>
      `,
    )
    .join("");
}

if (stateGrid) {
  stateGrid.innerHTML = stateLayers
    .map(
      (state) => `
        <mw-card variant="outlined">
          <div class="state-preview">
            <div class="state-preview-shell">
              <div class="state-preview-base">Base surface</div>
              <div class="state-preview-top" style="background:
                linear-gradient(0deg, var(${state.token}), var(${state.token})),
                var(--layer-surface-1);">
                ${state.name} layer
              </div>
            </div>
          </div>
          <h3>${state.name}</h3>
          <p><code>${state.token}</code></p>
          <p>${state.description}</p>
        </mw-card>
      `,
    )
    .join("");
}

if (principleList) {
  principleList.innerHTML = componentPrinciples
    .map(
      (principle) => `
        <mw-card variant="outlined" class="principle-item">
          <h3>${principle.title}</h3>
          <p>${principle.body}</p>
        </mw-card>
      `,
    )
    .join("");
}

if (componentReferenceList) {
  const previews = {
    button: `
      <div class="component-preview-row">
        <mw-button variant="filled">Filled</mw-button>
        <mw-button variant="tonal">Tonal</mw-button>
        <mw-button variant="outlined">Outlined</mw-button>
        <mw-button variant="text">Text</mw-button>
        <mw-button variant="destructive">Destructive</mw-button>
      </div>
    `,
    "icon-button": `
      <div class="component-preview-row">
        <mw-icon-button variant="standard" toggle selected aria-label="Lagre" title="Lagre">★</mw-icon-button>
        <mw-icon-button variant="filled" aria-label="Opprett" title="Opprett">＋</mw-icon-button>
        <mw-icon-button variant="tonal" toggle aria-label="Varsler" title="Varsler">◌</mw-icon-button>
        <mw-icon-button variant="outlined" aria-label="Søk" title="Søk">⌕</mw-icon-button>
      </div>
    `,
    chip: `
      <div class="component-preview-row">
        <mw-chip kind="assist" leading-icon="⌘">Assist</mw-chip>
        <mw-chip kind="filter" selected>Valgt filter</mw-chip>
        <mw-chip kind="input" dismissible>Input token</mw-chip>
        <mw-chip kind="suggestion" leading-icon="◎">Suggestion</mw-chip>
      </div>
    `,
    "text-field": `
      <div class="component-preview-row" style="width: 100%;">
        <mw-text-field label="Token group" leading="◫" trailing="✓" helper="Alias layer" value="Surface hierarchy"></mw-text-field>
      </div>
      <div class="component-preview-row" style="width: 100%;">
        <mw-text-field label="Documentation note" multiline helper="Multiline note" value="Surface-nivåene skiller ambient base fra primære og sekundære innholdsflater."></mw-text-field>
      </div>
    `,
  };

  componentReferenceList.innerHTML = componentReferences
    .map(
        (component) => `
        <mw-card variant="elevated" class="component-reference-card">
          <div class="component-reference-header">
            <div>
              <p class="card-label">Component Reference</p>
              <h3>${component.name}</h3>
            </div>
            <p class="token-kicker"><code>${component.element}</code></p>
          </div>

          <div class="component-reference-meta">
            <mw-card variant="outlined" class="component-meta-card">
              <p class="component-meta-label">Purpose</p>
              <p>${component.purpose}</p>
            </mw-card>
            <mw-card variant="outlined" class="component-meta-card">
              <p class="component-meta-label">Variants</p>
              <p>${component.variants.length}</p>
            </mw-card>
            <mw-card variant="outlined" class="component-meta-card">
              <p class="component-meta-label">States</p>
              <p>${component.states.join(", ")}</p>
            </mw-card>
          </div>

          <div class="component-reference-body">
            <div class="component-reference-column">
              <mw-card variant="outlined" class="component-spec-block">
                <h4>Anatomy</h4>
                <ol class="component-anatomy-list">
                  ${component.anatomy.map((item) => `<li>${item}</li>`).join("")}
                </ol>
              </mw-card>
              <mw-card variant="outlined" class="component-spec-block">
                <h4>Variants</h4>
                <ul class="component-variant-list">
                  ${component.variants.map((item) => `<li>${item}</li>`).join("")}
                </ul>
              </mw-card>
              <mw-card variant="outlined" class="component-spec-block">
                <h4>State Intent</h4>
                <ul class="component-state-list">
                  ${component.states.map((item) => `<li>${item}</li>`).join("")}
                </ul>
              </mw-card>
            </div>

            <div class="component-reference-column">
              <mw-card variant="outlined" class="component-preview">
                <h4>Preview</h4>
                ${previews[component.preview] || ""}
              </mw-card>
            </div>
          </div>
        </mw-card>
      `,
    )
    .join("");
}

if (colorCustomizationList) {
  colorCustomizationList.innerHTML = colorCustomizationGuidance
    .map((item) => `<li>${item}</li>`)
    .join("");
}
