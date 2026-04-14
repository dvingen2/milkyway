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
        <ds-card variant="filled">
          <p class="eyebrow">Modul</p>
          <h3>${section.title}</h3>
          <p>${section.summary}</p>
          <div class="project-meta">
            ${section.tags.map((tag) => `<ds-chip kind="filter">${tag}</ds-chip>`).join("")}
          </div>
          <ds-button variant="text" href="#fundament">Utforsk dokumentasjonen</ds-button>
        </ds-card>
      `,
    )
    .join("");
}

if (keyColorGrid) {
  keyColorGrid.innerHTML = keyColors
    .map(
      (swatch) => `
        <ds-card variant="outlined">
          <div class="swatch-chip" style="background: var(${swatch.token});"></div>
          <div class="swatch-meta">
            <p class="swatch-name">${swatch.name}</p>
            <p class="swatch-value"><code>${swatch.token}</code></p>
            <p class="swatch-value">${swatch.value}</p>
            <p class="swatch-value">${swatch.purpose}</p>
          </div>
        </ds-card>
      `,
    )
    .join("");
}

if (tonalPaletteGrid) {
  tonalPaletteGrid.innerHTML = tonalPalettes
    .map(
      (palette) => `
        <ds-card variant="outlined">
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
        </ds-card>
      `,
    )
    .join("");
}

if (roleGrid) {
  roleGrid.innerHTML = colorRoles
    .map(
      (role) => `
        <ds-card variant="outlined">
          <div class="role-swatch" style="background: var(${role.token}); color: var(${role.onToken});">
            <div class="role-swatch-label">${role.name}</div>
          </div>
          <div class="role-meta">
            <p class="role-name">${role.name}</p>
            <p class="role-value"><code>${role.token}</code></p>
            <p class="role-value">Foreground: <code>${role.onToken}</code></p>
          </div>
        </ds-card>
      `,
    )
    .join("");
}

if (stateGrid) {
  stateGrid.innerHTML = stateLayers
    .map(
      (state) => `
        <ds-card variant="outlined">
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
        </ds-card>
      `,
    )
    .join("");
}

if (principleList) {
  principleList.innerHTML = componentPrinciples
    .map(
      (principle) => `
        <ds-card variant="outlined" class="principle-item">
          <h3>${principle.title}</h3>
          <p>${principle.body}</p>
        </ds-card>
      `,
    )
    .join("");
}

if (componentReferenceList) {
  const previews = {
    button: `
      <div class="component-preview-row">
        <ds-button variant="filled">Filled</ds-button>
        <ds-button variant="tonal">Tonal</ds-button>
        <ds-button variant="outlined">Outlined</ds-button>
        <ds-button variant="text">Text</ds-button>
        <ds-button variant="destructive">Destructive</ds-button>
      </div>
    `,
    "icon-button": `
      <div class="component-preview-row">
        <ds-icon-button variant="standard" toggle selected aria-label="Lagre" title="Lagre">★</ds-icon-button>
        <ds-icon-button variant="filled" aria-label="Opprett" title="Opprett">＋</ds-icon-button>
        <ds-icon-button variant="tonal" toggle aria-label="Varsler" title="Varsler">◌</ds-icon-button>
        <ds-icon-button variant="outlined" aria-label="Søk" title="Søk">⌕</ds-icon-button>
      </div>
    `,
    chip: `
      <div class="component-preview-row">
        <ds-chip kind="assist" leading-icon="⌘">Assist</ds-chip>
        <ds-chip kind="filter" selected>Valgt filter</ds-chip>
        <ds-chip kind="input" dismissible>Input token</ds-chip>
        <ds-chip kind="suggestion" leading-icon="◎">Suggestion</ds-chip>
      </div>
    `,
    "text-field": `
      <div class="component-preview-row" style="width: 100%;">
        <ds-text-field label="Token group" leading="◫" trailing="✓" helper="Alias layer" value="Surface hierarchy"></ds-text-field>
      </div>
      <div class="component-preview-row" style="width: 100%;">
        <ds-text-field label="Documentation note" multiline helper="Multiline note" value="Surface-nivåene skiller ambient base fra primære og sekundære innholdsflater."></ds-text-field>
      </div>
    `,
  };

  componentReferenceList.innerHTML = componentReferences
    .map(
        (component) => `
        <ds-card variant="elevated" class="component-reference-card">
          <div class="component-reference-header">
            <div>
              <p class="card-label">Component Reference</p>
              <h3>${component.name}</h3>
            </div>
            <p class="token-kicker"><code>${component.element}</code></p>
          </div>

          <div class="component-reference-meta">
            <ds-card variant="outlined" class="component-meta-card">
              <p class="component-meta-label">Purpose</p>
              <p>${component.purpose}</p>
            </ds-card>
            <ds-card variant="outlined" class="component-meta-card">
              <p class="component-meta-label">Variants</p>
              <p>${component.variants.length}</p>
            </ds-card>
            <ds-card variant="outlined" class="component-meta-card">
              <p class="component-meta-label">States</p>
              <p>${component.states.join(", ")}</p>
            </ds-card>
          </div>

          <div class="component-reference-body">
            <div class="component-reference-column">
              <ds-card variant="outlined" class="component-spec-block">
                <h4>Anatomy</h4>
                <ol class="component-anatomy-list">
                  ${component.anatomy.map((item) => `<li>${item}</li>`).join("")}
                </ol>
              </ds-card>
              <ds-card variant="outlined" class="component-spec-block">
                <h4>Variants</h4>
                <ul class="component-variant-list">
                  ${component.variants.map((item) => `<li>${item}</li>`).join("")}
                </ul>
              </ds-card>
              <ds-card variant="outlined" class="component-spec-block">
                <h4>State Intent</h4>
                <ul class="component-state-list">
                  ${component.states.map((item) => `<li>${item}</li>`).join("")}
                </ul>
              </ds-card>
            </div>

            <div class="component-reference-column">
              <ds-card variant="outlined" class="component-preview">
                <h4>Preview</h4>
                ${previews[component.preview] || ""}
              </ds-card>
            </div>
          </div>
        </ds-card>
      `,
    )
    .join("");
}

if (colorCustomizationList) {
  colorCustomizationList.innerHTML = colorCustomizationGuidance
    .map((item) => `<li>${item}</li>`)
    .join("");
}
