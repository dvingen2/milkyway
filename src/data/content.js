export const sections = [
  {
    title: "Fundament",
    summary:
      "Beskriver teorien bak systemet: brand palette, tonale skalaer, surface-hierarki og semantiske roller.",
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
  { name: "Primary key", token: "--key-primary", value: "hsl(178 53% 36%)", purpose: "Brand anchor" },
  { name: "Secondary key", token: "--key-secondary", value: "hsl(188 20% 38%)", purpose: "Supporting accent" },
  { name: "Tertiary key", token: "--key-tertiary", value: "hsl(280 39% 52%)", purpose: "Expressive accent" },
  { name: "Neutral key", token: "--key-neutral", value: "hsl(193 10% 50%)", purpose: "Ambient base" },
  { name: "Neutral variant key", token: "--key-neutral-variant", value: "hsl(190 10% 52%)", purpose: "Surface detail" },
  { name: "Error key", token: "--key-error", value: "hsl(2 68% 44%)", purpose: "Critical feedback" },
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
  "Edit key colors in <code>src/styles/tokens/color-keys.css</code> when adapting the system to a new product.",
  "Adjust explicit tonal values in <code>src/styles/tokens/tonal-palettes.css</code> if you want a different chroma model or a bi-polar palette.",
  "Keep semantic roles stable in <code>src/styles/tokens/color-roles.css</code> so components do not need to change when brand colors change.",
  "Use <code>src/styles/tokens/color-modes.css</code> to remap tones for light or dark modes rather than redefining roles per component.",
  "Treat explicit low-contrast and high-contrast remaps as the next color todo. The role layer is ready, but the contrast tables are not finalized yet.",
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
];
