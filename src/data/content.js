export const sections = [
  {
    title: "Fundament",
    summary:
      "Beskriver teorien bak systemet: key color components i OKLCH, tonale skalaer, surface-hierarki og semantiske roller.",
    tags: ["Teori", "Tokens", "Surface"],
  },
  {
    title: "State Semantics",
    summary:
      "Dokumenterer hvordan hover, focus, pressed, selection og activation holdes adskilt og meningsfulle.",
    tags: ["Interaction", "States", "Semantikk"],
  },
  {
    title: "Component Reference",
    summary:
      "Samler komponentenes anatomy, varianter, previews og state-intensjon i et lesbart referansebibliotek.",
    tags: ["Components", "Web components", "Dokumentasjon"],
  },
  {
    title: "Roadmap",
    summary:
      "Synliggjør åpne beslutninger og neste iterasjoner: motion, videre komponentutvidelser og forenkling av begrepsapparatet.",
    tags: ["Governance", "Iteration", "Todo"],
  },
];

export const keyColors = [
  { name: "Primary key", token: "--key-primary", value: "Computed from --_primary-h / --_primary-c", purpose: "Brand anchor" },
  { name: "Secondary key", token: "--key-secondary", value: "Computed from --_secondary-h / --_secondary-c", purpose: "Supporting accent" },
  { name: "Tertiary key", token: "--key-tertiary", value: "Computed from --_tertiary-h / --_tertiary-c", purpose: "Expressive accent" },
  { name: "Neutral key", token: "--key-neutral", value: "Computed from --_neutral-h / --_neutral-c", purpose: "Ambient base" },
  { name: "Neutral variant key", token: "--key-neutral-variant", value: "Computed from --_neutral-variant-h / --_neutral-variant-c", purpose: "Surface detail" },
  { name: "Error key", token: "--key-error", value: "Computed from --_error-h / --_error-c", purpose: "Critical feedback" },
];

export const tonalPalettes = [
  { name: "Primary", prefix: "--palette-primary-", tones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 100] },
  { name: "Secondary", prefix: "--palette-secondary-", tones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 100] },
  { name: "Tertiary", prefix: "--palette-tertiary-", tones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 100] },
  { name: "Neutral", prefix: "--palette-neutral-", tones: [0, 10, 20, 30, 40, 50, 60, 80, 90, 95, 98, 100] },
  { name: "Neutral variant", prefix: "--palette-neutral-variant-", tones: [0, 10, 20, 30, 40, 50, 60, 80, 90, 95, 98, 100] },
  { name: "Error", prefix: "--palette-error-", tones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 100] },
];

export const colorRoles = [
  { name: "Primary", token: "--color-primary", onToken: "--color-on-primary" },
  { name: "Primary Container", token: "--color-primary-container", onToken: "--color-on-primary-container" },
  { name: "Secondary", token: "--color-secondary", onToken: "--color-on-secondary" },
  { name: "Secondary Container", token: "--color-secondary-container", onToken: "--color-on-secondary-container" },
  { name: "Tertiary", token: "--color-tertiary", onToken: "--color-on-tertiary" },
  { name: "Error", token: "--color-error", onToken: "--color-on-error" },
  { name: "Success", token: "--color-success", onToken: "--color-on-success" },
  { name: "Warning", token: "--color-warning", onToken: "--color-on-warning" },
  { name: "Info", token: "--color-info", onToken: "--color-on-info" },
  { name: "Background", token: "--color-background", onToken: "--color-on-background" },
  { name: "Backdrop", token: "--layer-backdrop", onToken: "--color-on-surface" },
  { name: "Surface", token: "--layer-surface", onToken: "--color-on-surface" },
  { name: "Surface 1", token: "--layer-surface-1", onToken: "--color-on-surface" },
  { name: "Surface 2", token: "--layer-surface-2", onToken: "--color-on-surface" },
  { name: "Surface 3", token: "--layer-surface-3", onToken: "--color-on-surface" },
  { name: "Surface 4", token: "--layer-surface-4", onToken: "--color-on-surface" },
  { name: "Inverse Surface", token: "--color-inverse-surface", onToken: "--color-inverse-on-surface" },
];

export const colorCustomizationGuidance = [
  "Edit the OKLCH key components in <code>src/styles/tokens/color-keys.css</code> when adapting the system to a new product.",
  "Adjust explicit tonal values in <code>src/styles/tokens/tonal-palettes.css</code> only if you want to break out of the generated palette model or create a more custom bi-polar scale.",
  "Keep semantic roles stable in <code>src/styles/tokens/color-roles.css</code> so components do not need to change when brand colors change.",
  "Use <code>src/styles/tokens/color-modes.css</code> to remap tones for light or dark modes rather than redefining roles per component.",
  "Use <code>src/styles/theme-template.css</code> as the consumer-facing override template for direct role overrides, OKLCH key overrides, or exact palette-tone overrides.",
  "High-contrast remapping now exists in <code>src/styles/tokens/color-modes.css</code>; low-contrast tuning is still the more open color todo.",
];

export const stateLayers = [
  {
    name: "Hover",
    token: "--state-hover",
    description: "Lett respons som bekrefter at en flate kan brukes uten å endre identitet.",
  },
  {
    name: "Focus",
    token: "--state-focus",
    description: "Tydelig oppmerksomhetslag for tastatur og navigasjon, nært knyttet til primary.",
  },
  {
    name: "Pressed",
    token: "--state-pressed",
    description: "Kortvarig handlingssignal som viser nedtrykk og lokal energi i interaksjonen.",
  },
  {
    name: "Selection",
    token: "--state-selection",
    description: "Vedvarende valgt tilstand med secondary-bias for å skille den fra handling.",
  },
  {
    name: "Activation",
    token: "--state-activation",
    description: "For toggled on, aktiv kontroll eller en midlertidig kommanderende tilstand.",
  },
];

export const componentPrinciples = [
  {
    title: "Semantikk før styling",
    body: "Komponentene bør be om roller som primary, surface eller outline, ikke rå hex-verdier.",
  },
  {
    title: "Primitives er globale",
    body: "Spacing, typografi og overflatehierarki holdes som tokens på rot-nivå slik at systemet er portabelt.",
  },
  {
    title: "Komponenter kapsler atferd",
    body: "Web components er et godt sted for interaksjon, fokusbehandling og konsistent markup.",
  },
  {
    title: "Dokumentasjonen er testbenken",
    body: "Dokumentasjonen er produktet og skal selv være testbenk for tokens, komponenter og mønstre.",
  },
];

export const componentReferences = [
  {
    name: "Button",
    element: "<mw-button>",
    purpose: "Primær handlingskomponent for navigasjon, valg og eksplisitte kommandoer i dokumentasjonen.",
    anatomy: [
      "Container med shape, surface og state layers",
      "Label som bærer handlingen",
      "Valgfri lenkeoppførsel via href",
    ],
    variants: [
      "Filled for høy prioritet",
      "Tonal for middels tyngde",
      "Outlined for sekundær handling",
      "Text for lav vekt og mindre horisontal padding",
      "Destructive som text-lignende handling på error-rollen",
    ],
    states: ["Enabled", "Hovered", "Focused", "Pressed", "Disabled"],
    preview: "button",
  },
  {
    name: "Icon Button",
    element: "<mw-icon-button>",
    purpose: "Kompakt kontroll for sekundære handlinger der ikon alene er tilstrekkelig og tydelig.",
    anatomy: [
      "Sirkulær surface som favner ikonets hit area",
      "Ikon eller tegn som primær markør",
      "ARIA-label som semantisk navn",
      "Valgfri toggle-semantikk for vedvarende valgt tilstand",
    ],
    variants: ["Standard", "Filled", "Tonal", "Outlined", "Toggle via selected/aria-pressed"],
    states: ["Enabled", "Hovered", "Focused", "Pressed", "Selected", "Disabled"],
    preview: "icon-button",
  },
  {
    name: "Chip",
    element: "<mw-chip>",
    purpose: "Lettvektskomponent for filtrering, merking eller dokumentasjonsstatus med tydelig selection state.",
    anatomy: [
      "Lavprofil-container med outline eller tonal flate",
      "Kort tekstlabel",
      "Valgfri leading/trailing affordance",
      "Selection layer når valgt",
    ],
    variants: ["Assist", "Filter", "Input", "Suggestion"],
    states: ["Enabled", "Hovered", "Focused", "Selected", "Dismissive hint"],
    preview: "chip",
  },
  {
    name: "Text Field",
    element: "<mw-text-field>",
    purpose: "Inndatafelt for korte eller lengre tekstverdier i eksempler, playgrounds og komponentdokumentasjon.",
    anatomy: [
      "Label som beskriver forventet innhold",
      "Input eller textarea som interaksjonsflate",
      "Helper/error-linje som støtter lesing og validering",
      "Leading/trailing affordances ved behov",
      "Outline og focus ring som veileder brukeren",
    ],
    variants: ["Outlined", "Filled", "Single-line", "Multiline"],
    states: ["Enabled", "Hovered", "Focused", "Disabled", "Error"],
    preview: "text-field",
  },
  {
    name: "Selection Controls",
    element: "<mw-checkbox> / <mw-radio> / <mw-switch>",
    purpose: "Form controls for binary toggles, mutually exclusive choices og umiddelbare settinger.",
    anatomy: [
      "Kontrollmarkør med tydelig checked eller selected state",
      "Label som utvider touch target og forklarer valget",
      "Native form participation via ElementInternals",
    ],
    variants: ["Checkbox", "Radio", "Switch"],
    states: ["Enabled", "Checked", "Selected", "Focused", "Disabled"],
    preview: "selection-controls",
  },
  {
    name: "Select",
    element: "<mw-select>",
    purpose: "Velg én verdi fra en liste når fritekst ikke er ønskelig og valgene bør holdes eksplisitte.",
    anatomy: [
      "Label over triggerflaten",
      "Trigger med valgt verdi eller placeholder",
      "Listbox-popup med tastaturnavigasjon",
      "Supporting eller error-tekst under feltet",
    ],
    variants: ["Default", "With placeholder", "Supporting text", "Error"],
    states: ["Closed", "Open", "Focused", "Selected", "Disabled", "Error"],
    preview: "select",
  },
  {
    name: "Segmented Button",
    element: "<mw-segmented-button>",
    purpose: "Grupperer nære, horisontale valg der brukeren skal veksle mellom et lite sett alternativer.",
    anatomy: [
      "Segmentgruppe med delt container",
      "Individuelle segmenter med label og valgfritt ikon",
      "Selection indicator som markerer aktivt segment",
    ],
    variants: ["Single select", "Multi select", "With icons"],
    states: ["Enabled", "Selected", "Focused", "Pressed", "Disabled"],
    preview: "segmented-button",
  },
  {
    name: "FAB",
    element: "<mw-fab> / <mw-extended-fab>",
    purpose: "Flytende handlingsknapp for den viktigste handlingen i en visning eller et arbeidsområde.",
    anatomy: [
      "Hevet kapsel eller sirkel med tydelig aksentrolle",
      "Ikon som primær affordance",
      "Valgfri label i extended variant",
    ],
    variants: ["Small", "Medium", "Large", "Extended", "Surface / Primary / Secondary / Tertiary"],
    states: ["Enabled", "Hovered", "Focused", "Pressed", "Disabled"],
    preview: "fab",
  },
  {
    name: "Badge",
    element: "<mw-badge>",
    purpose: "Kompakt status- eller antallsmarkør som festes til ikonografi eller navigasjonselementer.",
    anatomy: [
      "Liten container med sterk kontrast mot hosten",
      "Valgfri numerisk eller punkt-basert verdi",
      "Plasseres typisk absolutt mot et annet element",
    ],
    variants: ["Number badge", "Dot badge", "Embedded with icon"],
    states: ["Visible", "Hidden by absence", "Dense overlay"],
    preview: "badge",
  },
  {
    name: "Card",
    element: "<mw-card>",
    purpose: "Generisk container for dokumentasjonsmoduler, innholdsgrupper og sammensatte komponenteksempler.",
    anatomy: [
      "Surface basert på ett av systemets hierarkinivåer",
      "Indre padding og shape",
      "Valgfri outline eller elevation",
    ],
    variants: ["Filled", "Outlined", "Elevated"],
    states: ["Resting", "Grouped with content", "Elevated emphasis"],
    preview: "card",
  },
  {
    name: "Divider",
    element: "<mw-divider>",
    purpose: "Visuell separator mellom innholdsblokker, listeelementer eller soner med ulik funksjon.",
    anatomy: [
      "Tynn linje på outline-variant-rollen",
      "Valgfri inset for å respektere innrykk eller leading content",
    ],
    variants: ["Full width", "Inset"],
    states: ["Neutral separator"],
    preview: "divider",
  },
  {
    name: "List",
    element: "<mw-list>",
    purpose: "Presenterer rekker av navigasjon, valg eller handlinger i et strukturert og skannbart mønster.",
    anatomy: [
      "Listecontainer",
      "Rader med ikon, label og valgfri supporting text",
      "Interaktiv state layer per rad",
    ],
    variants: ["Navigation list", "Action list", "Supporting text"],
    states: ["Enabled", "Hovered", "Focused", "Pressed", "Active row"],
    preview: "list",
  },
  {
    name: "Menu",
    element: "<mw-menu>",
    purpose: "Temporær action-surface for små sett valg som springer ut fra en trigger i kontekst.",
    anatomy: [
      "Triggerknapp",
      "Popup-surface med menuitem-roller",
      "Valgfri supporting text og danger-markering per item",
    ],
    variants: ["Simple actions", "Supporting text", "Danger item"],
    states: ["Closed", "Open", "Focused item", "Selected item"],
    preview: "menu",
  },
  {
    name: "Dialog",
    element: "<mw-dialog>",
    purpose: "Modal avbrytelse for beslutninger, bekreftelser eller korte arbeidsflyter som krever fokusert oppmerksomhet.",
    anatomy: [
      "Native dialog-shell med scrim og fokusfelle",
      "Headline og valgfritt ikon",
      "Body content",
      "Action area i eget slot",
    ],
    variants: ["Default", "With icon", "Form dialog", "Persistent"],
    states: ["Closed", "Open", "Dismissed", "Persistent lock"],
    preview: "dialog",
  },
  {
    name: "Bottom Sheet",
    element: "<mw-bottom-sheet>",
    purpose: "Temporær mobilnær overflate for sekundære handlinger eller ekstra innhold uten full navigasjon.",
    anatomy: [
      "Sheet som glir opp fra nederkant",
      "Scrim bak sheetet",
      "Valgfri header med drag handle og headline",
      "Scrollable innholdsområde",
    ],
    variants: ["With headline", "No header", "Action list"],
    states: ["Closed", "Open", "Dismissed"],
    preview: "bottom-sheet",
  },
  {
    name: "Side Sheet",
    element: "<mw-side-sheet>",
    purpose: "Sideoverflate for filtre, detaljer eller navigasjon som bør ligge ved siden av hovedinnholdet.",
    anatomy: [
      "Sheet som kommer inn fra høyre eller venstre",
      "Valgfri scrim i modal variant",
      "Header med headline og close affordance",
      "Body region for lister eller detaljinnhold",
    ],
    variants: ["Modal", "Standard", "Right side", "Left side"],
    states: ["Closed", "Open", "Dismissed"],
    preview: "side-sheet",
  },
  {
    name: "Top App Bar",
    element: "<mw-top-app-bar>",
    purpose: "Primær navigasjons- og merkevareflate øverst i en visning eller en dokumentasjonsside.",
    anatomy: [
      "Headline i sentrum av komposisjonen",
      "Leading slot for meny eller tilbake",
      "Trailing slot for ikoner, badge eller support label",
    ],
    variants: ["Default", "With badge", "With support label", "No leading action"],
    states: ["Resting", "Layered above content"],
    preview: "top-app-bar",
  },
  {
    name: "Tabs",
    element: "<mw-tabs>",
    purpose: "Bytter mellom parallelle innholdssoner uten å forlate gjeldende kontekst.",
    anatomy: [
      "Tab list",
      "Individuelle tab-knapper",
      "Aktiv indikator og relasjon til innholdspanel",
    ],
    variants: ["Two tabs", "Many tabs", "With content panel"],
    states: ["Enabled", "Active", "Focused", "Programmatically selected"],
    preview: "tabs",
  },
  {
    name: "Navigation Rail",
    element: "<mw-navigation-rail>",
    purpose: "Vertikal primærnavigasjon for mellomstore og større layouter der mobil bar blir for kompakt.",
    anatomy: [
      "Rail container",
      "Destinations med ikon og label",
      "Aktiv indikator på valgt destinasjon",
    ],
    variants: ["Default destinations", "Compact side navigation"],
    states: ["Enabled", "Active", "Hovered", "Focused"],
    preview: "navigation-rail",
  },
  {
    name: "Navigation Bar",
    element: "<mw-navigation-bar>",
    purpose: "Mobil bunnnavigasjon for to til fem toppnivå-destinasjoner.",
    anatomy: [
      "Bar-container nederst",
      "Destinations med ikon og label",
      "Aktiv pill-indikator og valgfri badge",
    ],
    variants: ["Three destinations", "Four destinations", "With badges"],
    states: ["Enabled", "Active", "Focused", "Navigated"],
    preview: "navigation-bar",
  },
  {
    name: "Snackbar",
    element: "<mw-snackbar>",
    purpose: "Kort, ikke-blokkerende feedback for systemhendelser og fullførte handlinger.",
    anatomy: [
      "Inverse surface som skiller seg fra bakgrunnen",
      "Kort meldingstekst",
      "Valgfri action-knapp",
    ],
    variants: ["Message only", "With action", "Long message"],
    states: ["Visible", "Auto-dismissed", "Action clicked"],
    preview: "snackbar",
  },
  {
    name: "Progress Indicator",
    element: "<mw-progress>",
    purpose: "Kommuniserer fremdrift eller ventetid i lineær eller sirkulær form.",
    anatomy: [
      "Track og aktiv progress fill for linear",
      "Sirkulær spinner for indeterminate compact usage",
      "ARIA progressbar semantics",
    ],
    variants: ["Linear determinate", "Circular indeterminate", "In context"],
    states: ["Idle", "Loading", "Complete"],
    preview: "progress",
  },
  {
    name: "Tooltip",
    element: "<mw-tooltip>",
    purpose: "Kort hjelpetekst for kontekst, presisering eller lavfrekvent forklaring nær en trigger.",
    anatomy: [
      "Trigger element i light DOM",
      "Tooltip bubble med placement",
      "Valgfri rich style for lengre forklaring",
    ],
    variants: ["Top", "Bottom", "Left", "Right", "Rich"],
    states: ["Hidden", "Shown on hover", "Shown on focus"],
    preview: "tooltip",
  },
];
