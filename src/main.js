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
import "./components/ui-chip-group.js";
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
const componentFamilySidebarNav = document.querySelector("#component-family-sidebar-nav");
const componentFamilyJumpList = document.querySelector("#component-family-jump-list");

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
  const componentFamilies = [
    {
      key: "action",
      title: "Action",
      summary: "Handlinger som driver flyt, opprettelse, bekreftelse eller raske kommandoer.",
      previews: ["button", "icon-button", "fab", "menu"],
    },
    {
      key: "selection",
      title: "Selection",
      summary: "Komponenter for valg, filtrering, toggles og eksplisitte input-beslutninger.",
      previews: ["chip", "selection-controls", "select", "segmented-button"],
    },
    {
      key: "containment",
      title: "Containment",
      summary: "Flater og strukturer som grupperer, separerer og organiserer innhold.",
      previews: ["card", "divider", "list"],
    },
    {
      key: "navigation",
      title: "Navigation",
      summary: "Komponenter som orienterer brukeren mellom seksjoner, destinasjoner og nivåer.",
      previews: ["top-app-bar", "tabs", "navigation-rail", "navigation-bar"],
    },
    {
      key: "feedback",
      title: "Feedback",
      summary: "Systemrespons som status, progress, korte meldinger og lokal hjelp i kontekst.",
      previews: ["badge", "snackbar", "progress", "tooltip"],
    },
    {
      key: "overlays",
      title: "Overlays",
      summary: "Temporære flater som løfter innhold eller handlinger over den aktive visningen.",
      previews: ["dialog", "bottom-sheet", "side-sheet"],
    },
  ];

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
    "selection-controls": `
      <div class="component-preview-row" style="align-items: flex-start; flex-direction: column;">
        <mw-checkbox checked label="Publish tokens"></mw-checkbox>
        <mw-radio checked name="component-reference-radio" label="CSS variables"></mw-radio>
        <mw-switch checked label="High contrast"></mw-switch>
      </div>
    `,
    select: `
      <div class="component-preview-row" style="width: 100%;">
        <mw-select
          label="Documentation mode"
          placeholder="Choose one"
          value="storybook"
          options='[{"label":"Storybook","value":"storybook"},{"label":"Static docs","value":"site"},{"label":"Both surfaces","value":"both"}]'
          supporting="Select remains role-driven and form-friendly."
        ></mw-select>
      </div>
    `,
    "segmented-button": `
      <div class="component-preview-row">
        <mw-segmented-button
          aria-label="View mode"
          value="components"
          options='[{"label":"Foundations","value":"foundations"},{"label":"Components","value":"components"},{"label":"Patterns","value":"patterns"}]'
        ></mw-segmented-button>
      </div>
    `,
    fab: `
      <div class="component-preview-row">
        <mw-fab color="primary" aria-label="Add item">add</mw-fab>
        <mw-fab color="surface" size="small" aria-label="Edit item">edit</mw-fab>
        <mw-extended-fab color="secondary" icon="share" label="Share"></mw-extended-fab>
      </div>
    `,
    badge: `
      <div class="component-preview-row">
        <div style="position: relative; display: inline-flex;">
          <mw-icon-button aria-label="Notifications">notifications</mw-icon-button>
          <mw-badge value="4" style="position: absolute; top: -0.2rem; right: -0.2rem;"></mw-badge>
        </div>
        <mw-badge value=""></mw-badge>
        <mw-badge value="12"></mw-badge>
      </div>
    `,
    card: `
      <div class="component-preview-row" style="width: 100%; align-items: stretch;">
        <mw-card variant="filled" style="min-width: 10rem;">
          <p class="card-label">Filled</p>
          <p>Default surface for grouped content.</p>
        </mw-card>
        <mw-card variant="outlined" style="min-width: 10rem;">
          <p class="card-label">Outlined</p>
          <p>Quiet separation with visible edge.</p>
        </mw-card>
        <mw-card variant="elevated" style="min-width: 10rem;">
          <p class="card-label">Elevated</p>
          <p>Extra emphasis via shadow.</p>
        </mw-card>
      </div>
    `,
    divider: `
      <div class="component-preview-row" style="width: 100%; flex-direction: column; align-items: stretch; gap: 0.75rem;">
        <span>Section header</span>
        <mw-divider></mw-divider>
        <span>Inset row</span>
        <mw-divider inset></mw-divider>
      </div>
    `,
    list: `
      <div class="component-preview-row" style="width: 100%;">
        <mw-list items='[
          {"label":"Foundations","icon":"layers","supporting":"Tokens and hierarchy"},
          {"label":"Components","icon":"widgets","supporting":"Reference and previews"},
          {"label":"Theming","icon":"palette","supporting":"Override surfaces and roles"}
        ]'></mw-list>
      </div>
    `,
    menu: `
      <div class="component-preview-row">
        <mw-menu
          label="Actions"
          items='[
            {"label":"Inspect tokens","supporting":"Open foundations"},
            {"label":"Export CSS","supporting":"Download variables"},
            {"label":"Delete draft","supporting":"Irreversible","danger":true}
          ]'
        ></mw-menu>
      </div>
    `,
    dialog: `
      <div class="component-preview-row">
        <mw-button variant="filled">Open dialog</mw-button>
        <mw-chip kind="assist">Native &lt;dialog&gt;</mw-chip>
        <mw-chip kind="filter" selected>mw-close</mw-chip>
        <mw-chip kind="suggestion">Persistent optional</mw-chip>
      </div>
    `,
    "bottom-sheet": `
      <div class="component-preview-row">
        <mw-button variant="tonal">Open bottom sheet</mw-button>
        <mw-chip kind="assist">Mobile actions</mw-chip>
        <mw-chip kind="suggestion">Scrim + handle</mw-chip>
      </div>
    `,
    "side-sheet": `
      <div class="component-preview-row">
        <mw-button variant="outlined">Open side sheet</mw-button>
        <mw-chip kind="assist">Modal or standard</mw-chip>
        <mw-chip kind="suggestion">Left or right</mw-chip>
      </div>
    `,
    "top-app-bar": `
      <div class="component-preview-row" style="width: 100%;">
        <mw-top-app-bar headline="Milkyway">
          <mw-icon-button slot="leading" aria-label="Menu">☰</mw-icon-button>
          <mw-icon-button slot="trailing" aria-label="Search">⌕</mw-icon-button>
        </mw-top-app-bar>
      </div>
    `,
    tabs: `
      <div class="component-preview-row" style="width: 100%;">
        <mw-tabs items='[
          {"label":"Overview","active":true},
          {"label":"Components"},
          {"label":"Roadmap"}
        ]'></mw-tabs>
      </div>
    `,
    "navigation-rail": `
      <div class="component-preview-row">
        <mw-navigation-rail items='[
          {"icon":"⌂","label":"Home","active":true},
          {"icon":"◫","label":"Tokens"},
          {"icon":"⌘","label":"Components"}
        ]'></mw-navigation-rail>
      </div>
    `,
    "navigation-bar": `
      <div class="component-preview-row" style="width: 100%;">
        <mw-navigation-bar items='[
          {"label":"Home","icon":"home","active":true},
          {"label":"Search","icon":"search"},
          {"label":"Docs","icon":"library_books","badge":"3"},
          {"label":"Profile","icon":"person"}
        ]'></mw-navigation-bar>
      </div>
    `,
    snackbar: `
      <div class="component-preview-row" style="width: 100%;">
        <mw-snackbar message="Tokens saved." action="Undo"></mw-snackbar>
      </div>
    `,
    progress: `
      <div class="component-preview-row" style="width: 100%;">
        <div style="display: grid; gap: 0.75rem; width: min(100%, 18rem);">
          <mw-progress value="0.62"></mw-progress>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <mw-progress kind="circular"></mw-progress>
            <span>Publishing build…</span>
          </div>
        </div>
      </div>
    `,
    tooltip: `
      <div class="component-preview-row" style="padding-block: 1.5rem;">
        <mw-tooltip label="Contextual help for a compact action.">
          <mw-icon-button aria-label="Info">info</mw-icon-button>
        </mw-tooltip>
        <mw-tooltip label="Rich tips can explain a token decision." rich>
          <mw-button variant="outlined">Rich tooltip</mw-button>
        </mw-tooltip>
      </div>
    `,
  };

  const familyNavMarkup = componentFamilies
    .map(
      (family) => `
        <a class="component-family-link" href="#components-${family.key}">
          <span class="component-family-link-title">${family.title}</span>
          <span class="component-family-link-meta">${family.summary}</span>
        </a>
      `,
    )
    .join("");

  if (componentFamilySidebarNav) {
    componentFamilySidebarNav.innerHTML = `<div class="component-family-nav-list">${familyNavMarkup}</div>`;
  }

  if (componentFamilyJumpList) {
    componentFamilyJumpList.innerHTML = `<div class="component-family-nav-list component-family-nav-list-inline">${familyNavMarkup}</div>`;
  }

  const renderComponentCard = (component) => `
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
      `;

  componentReferenceList.innerHTML = componentFamilies
    .map((family) => {
      const items = componentReferences.filter((component) => family.previews.includes(component.preview));
      if (!items.length) return "";
      return `
        <section class="component-family-group" id="components-${family.key}" data-family="${family.key}">
          <div class="component-family-header">
            <div>
              <p class="eyebrow">Component Family</p>
              <h3>${family.title}</h3>
            </div>
            <p class="component-family-summary">${family.summary}</p>
          </div>
          <div class="component-family-list">
            ${items.map((component) => renderComponentCard(component)).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

if (colorCustomizationList) {
  colorCustomizationList.innerHTML = colorCustomizationGuidance
    .map((item) => `<li>${item}</li>`)
    .join("");
}
