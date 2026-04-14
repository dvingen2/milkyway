import { renderHTML } from "../helpers.js";

export default {
  title: "Foundations/Theming",
  parameters: { layout: "fullscreen" },
};

/* ─────────────────────────────────────────────────────────────
 * Overview
 * Explains the cascade mechanism and three theming levels.
 * ───────────────────────────────────────────────────────────── */
export const Overview = {
  name: "Overview",
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:3rem;">

          <div style="display:grid;gap:0.5rem;max-width:44rem;">
            <p class="eyebrow">Theming</p>
            <h2 style="margin:0;font:var(--type-headline-large);">Customising Surface System</h2>
            <p class="lede">Surface System uses CSS <code>@layer</code> to give consuming projects automatic cascade priority. Any unlayered rule you write wins over library defaults — no <code>!important</code>, no selector battles.</p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));gap:1.5rem;">
            <ds-card variant="filled">
              <p class="card-label">How the cascade works</p>
              <p>All Surface System tokens live inside <code>@layer surface-system.tokens</code>. Because layered rules always lose to unlayered rules, any <code>:root { }</code> block in your own stylesheet overrides the library automatically.</p>
              <p style="margin-top:0.75rem;">This means a single CSS file with two or three overrides is all you need to retheme every component at once.</p>
            </ds-card>
            <ds-card variant="outlined">
              <p class="card-label">Three levels of control</p>
              <ol style="margin:0;padding-left:1.25rem;display:grid;gap:0.6rem;line-height:1.5;">
                <li><strong>Level 1 — Direct role override.</strong> Override semantic roles like <code>--color-primary</code> directly. Fastest path; no colour science required.</li>
                <li><strong>Level 2 — Key color components.</strong> Override <code>--_primary-h</code> and <code>--_primary-c</code> (oklch hue and chroma). The entire tonal palette recomputes automatically.</li>
                <li><strong>Level 3 — Individual palette tones.</strong> Override specific <code>--palette-primary-40</code> values for exact brand matches.</li>
              </ol>
            </ds-card>
            <ds-card variant="outlined">
              <p class="card-label">Getting started</p>
              <p>Copy <code>src/styles/theme-template.css</code> into your project and load it after the Surface System stylesheet:</p>
              <pre style="margin:0.75rem 0 0;padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);font-size:0.8rem;overflow-x:auto;line-height:1.6;">&lt;link rel="stylesheet" href="surface-system/styles"&gt;
&lt;link rel="stylesheet" href="./theme.css"&gt;</pre>
              <p style="margin-top:0.75rem;">Uncomment the variables you want to change. Everything else inherits the library defaults.</p>
            </ds-card>
          </div>

        </div>
      </section>
    `),
};

/* ─────────────────────────────────────────────────────────────
 * Level 1 — Direct role override (live demo)
 * Three themed panels side-by-side to show the same components
 * rendered with different --color-primary overrides.
 * ───────────────────────────────────────────────────────────── */
export const Level1DirectRoleOverride = {
  name: "Level 1 — Direct role override",
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:2.5rem;">

          <div style="display:grid;gap:0.5rem;max-width:44rem;">
            <p class="eyebrow">Level 1</p>
            <h2 style="margin:0;font:var(--type-headline-large);">Direct role override</h2>
            <p class="lede">Override semantic roles in an unlayered <code>:root</code> block. Every component that consumes that role updates immediately — CSS custom properties pierce shadow DOM boundaries.</p>
          </div>

          <ds-card variant="outlined">
            <p class="card-label">Example</p>
            <pre style="margin:0;padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);font-size:0.8rem;overflow-x:auto;line-height:1.8;">/* theme.css — loaded after surface-system/styles */
:root {
  --color-primary:           oklch(52% 0.18 142); /* forest green  */
  --color-on-primary:        oklch(100% 0 0);
  --color-primary-container: oklch(86% 0.09 142);
  --color-on-primary-container: oklch(18% 0.14 142);
}</pre>
          </ds-card>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1.5rem;align-items:start;">

            <!-- Default theme -->
            <div style="display:grid;gap:1rem;">
              <p style="font:var(--type-label-large);color:var(--color-on-surface-variant);margin:0;">Default (teal)</p>
              <div style="display:grid;gap:0.75rem;padding:1.5rem;background:var(--layer-surface);border-radius:var(--radius-md);border:1px solid var(--color-outline-variant);">
                <ds-button variant="filled">Filled button</ds-button>
                <ds-button variant="tonal">Tonal button</ds-button>
                <ds-checkbox label="Accept terms"></ds-checkbox>
                <ds-switch label="Notifications"></ds-switch>
              </div>
            </div>

            <!-- Green override -->
            <div style="
              --color-primary: oklch(52% 0.18 142);
              --color-on-primary: oklch(100% 0 0);
              --color-primary-container: oklch(86% 0.09 142);
              --color-on-primary-container: oklch(18% 0.14 142);
              display:grid;gap:1rem;">
              <p style="font:var(--type-label-large);color:var(--color-on-surface-variant);margin:0;">Green override</p>
              <div style="display:grid;gap:0.75rem;padding:1.5rem;background:var(--layer-surface);border-radius:var(--radius-md);border:1px solid var(--color-outline-variant);">
                <ds-button variant="filled">Filled button</ds-button>
                <ds-button variant="tonal">Tonal button</ds-button>
                <ds-checkbox label="Accept terms"></ds-checkbox>
                <ds-switch label="Notifications"></ds-switch>
              </div>
            </div>

            <!-- Violet override -->
            <div style="
              --color-primary: oklch(50% 0.22 290);
              --color-on-primary: oklch(100% 0 0);
              --color-primary-container: oklch(88% 0.10 290);
              --color-on-primary-container: oklch(18% 0.16 290);
              display:grid;gap:1rem;">
              <p style="font:var(--type-label-large);color:var(--color-on-surface-variant);margin:0;">Violet override</p>
              <div style="display:grid;gap:0.75rem;padding:1.5rem;background:var(--layer-surface);border-radius:var(--radius-md);border:1px solid var(--color-outline-variant);">
                <ds-button variant="filled">Filled button</ds-button>
                <ds-button variant="tonal">Tonal button</ds-button>
                <ds-checkbox label="Accept terms"></ds-checkbox>
                <ds-switch label="Notifications"></ds-switch>
              </div>
            </div>

          </div>

          <ds-card variant="filled">
            <p class="card-label">Minimum viable override</p>
            <p>For most themes, overriding just the four primary variables is sufficient. Add the container pair for tonal buttons and selected chips.</p>
            <ul style="margin:0.5rem 0 0;padding-left:1.25rem;display:grid;gap:0.35rem;line-height:1.5;">
              <li><code>--color-primary</code> — filled button, focus rings, active indicators</li>
              <li><code>--color-on-primary</code> — label on filled primary surfaces</li>
              <li><code>--color-primary-container</code> — tonal button, selected chip background</li>
              <li><code>--color-on-primary-container</code> — label on tonal/container surfaces</li>
            </ul>
          </ds-card>

        </div>
      </section>
    `),
};

/* ─────────────────────────────────────────────────────────────
 * Level 2 — Key color components (live demo)
 * ───────────────────────────────────────────────────────────── */
export const Level2KeyColorComponents = {
  name: "Level 2 — Key color components",
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:2.5rem;">

          <div style="display:grid;gap:0.5rem;max-width:44rem;">
            <p class="eyebrow">Level 2</p>
            <h2 style="margin:0;font:var(--type-headline-large);">Key color components</h2>
            <p class="lede">Override just the oklch hue and chroma for a palette. Every tone in that palette recomputes automatically, giving you a harmonious full-range scale from a single pair of values.</p>
          </div>

          <ds-card variant="outlined">
            <p class="card-label">Example — shift primary from teal to amber</p>
            <pre style="margin:0;padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);font-size:0.8rem;overflow-x:auto;line-height:1.8;">:root {
  --_primary-h: 80;    /* oklch hue: 0–360, 194 = teal (default), 80 = amber */
  --_primary-c: 0.14;  /* oklch chroma: 0 = grey, ~0.2 = vivid               */
}</pre>
          </ds-card>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));gap:1.5rem;align-items:start;">

            <div style="display:grid;gap:1rem;">
              <p style="font:var(--type-label-large);color:var(--color-on-surface-variant);margin:0;">Default palette (teal, h=194)</p>
              <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:0.35rem;">
                ${[10, 20, 40, 60, 80, 90, 95].map((t) => `
                  <div style="display:grid;gap:0.3rem;justify-items:center;">
                    <div style="width:100%;aspect-ratio:1;border-radius:var(--radius-sm);background:var(--palette-primary-${t});border:1px solid var(--color-outline-variant);"></div>
                    <span style="font:var(--type-label-small);color:var(--color-on-surface-variant);">${t}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <div style="--_primary-h:80;--_primary-c:0.14;display:grid;gap:1rem;">
              <p style="font:var(--type-label-large);color:var(--color-on-surface-variant);margin:0;">Amber override (h=80)</p>
              <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:0.35rem;">
                ${[10, 20, 40, 60, 80, 90, 95].map((t) => `
                  <div style="display:grid;gap:0.3rem;justify-items:center;">
                    <div style="width:100%;aspect-ratio:1;border-radius:var(--radius-sm);background:var(--palette-primary-${t});border:1px solid var(--color-outline-variant);"></div>
                    <span style="font:var(--type-label-small);color:var(--color-on-surface-variant);">${t}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <div style="--_primary-h:350;--_primary-c:0.17;display:grid;gap:1rem;">
              <p style="font:var(--type-label-large);color:var(--color-on-surface-variant);margin:0;">Rose override (h=350)</p>
              <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:0.35rem;">
                ${[10, 20, 40, 60, 80, 90, 95].map((t) => `
                  <div style="display:grid;gap:0.3rem;justify-items:center;">
                    <div style="width:100%;aspect-ratio:1;border-radius:var(--radius-sm);background:var(--palette-primary-${t});border:1px solid var(--color-outline-variant);"></div>
                    <span style="font:var(--type-label-small);color:var(--color-on-surface-variant);">${t}</span>
                  </div>
                `).join("")}
              </div>
            </div>

          </div>

          <ds-card variant="filled">
            <p class="card-label">Chroma guide</p>
            <p>In oklch, chroma is unbounded but practical values fall in a narrow range. All palette tones scale from the key chroma using per-tone factors, so you set one number for the whole scale.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:0.75rem;margin-top:0.75rem;">
              <div style="padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);">
                <strong>0</strong><br>Neutral grey (no hue)
              </div>
              <div style="padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);">
                <strong>0.03–0.06</strong><br>Muted, tonal
              </div>
              <div style="padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);">
                <strong>0.10–0.15</strong><br>Balanced brand color
              </div>
              <div style="padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);">
                <strong>0.18–0.25</strong><br>Vivid, expressive accent
              </div>
            </div>
          </ds-card>

        </div>
      </section>
    `),
};

/* ─────────────────────────────────────────────────────────────
 * Level 3 — Individual palette tones
 * ───────────────────────────────────────────────────────────── */
export const Level3IndividualTones = {
  name: "Level 3 — Individual palette tones",
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:2.5rem;">

          <div style="display:grid;gap:0.5rem;max-width:44rem;">
            <p class="eyebrow">Level 3</p>
            <h2 style="margin:0;font:var(--type-headline-large);">Individual palette tones</h2>
            <p class="lede">For exact brand colour matches — when a precise Pantone or sRGB value must appear at a specific tone — override individual palette variables. These feed directly into the semantic roles.</p>
          </div>

          <ds-card variant="outlined">
            <p class="card-label">Example</p>
            <pre style="margin:0;padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);font-size:0.8rem;overflow-x:auto;line-height:1.8;">:root {
  /* Exact brand red at the "40" key tone */
  --palette-primary-40: #c0392b;

  /* Manually derive light and dark tones for it */
  --palette-primary-80: #f5a498;
  --palette-primary-90: #fad4d0;
  --palette-primary-10: #3d0a06;
  --palette-primary-20: #6b1510;
}</pre>
          </ds-card>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));gap:1.5rem;">
            <ds-card variant="filled">
              <p class="card-label">Tone-to-role mapping</p>
              <p>The semantic roles reference palette tones at fixed positions. Override the tone to change the role everywhere it is used.</p>
              <div style="display:grid;gap:0.5rem;margin-top:0.75rem;font-size:0.9rem;">
                ${[
                  ["--palette-primary-40", "--color-primary", "Main brand, filled button"],
                  ["--palette-primary-80", "--color-primary (dark)", "Dark mode filled button"],
                  ["--palette-primary-90", "--color-primary-container", "Tonal button, selected chip"],
                  ["--palette-primary-10", "--color-on-primary-container", "Label on tonal surface"],
                ].map(([tone, role, usage]) => `
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.25rem 0.75rem;padding:0.5rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);">
                    <code style="font-size:0.75rem;">${tone}</code>
                    <code style="font-size:0.75rem;color:var(--color-on-surface-variant);">${role}</code>
                    <span style="grid-column:1/-1;color:var(--color-on-surface-variant);font-size:0.8rem;">${usage}</span>
                  </div>
                `).join("")}
              </div>
            </ds-card>
            <ds-card variant="outlined">
              <p class="card-label">When to use Level 3</p>
              <ul style="margin:0;padding-left:1.25rem;display:grid;gap:0.5rem;line-height:1.5;">
                <li>Legal/brand requirement for an exact hex or Pantone value</li>
                <li>A brand color that falls outside the perceptual range oklch naturally produces for a given hue</li>
                <li>A split palette where light and dark modes use different brand colors entirely</li>
                <li>Prototyping with a third-party palette (e.g. Tailwind, Radix, IBM Carbon)</li>
              </ul>
              <p style="margin-top:0.75rem;color:var(--color-on-surface-variant);">For most projects, Level 1 or Level 2 is sufficient and easier to maintain.</p>
            </ds-card>
          </div>

        </div>
      </section>
    `),
};

/* ─────────────────────────────────────────────────────────────
 * Dark mode
 * ───────────────────────────────────────────────────────────── */
export const DarkMode = {
  name: "Dark mode",
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:2.5rem;">

          <div style="display:grid;gap:0.5rem;max-width:44rem;">
            <p class="eyebrow">Dark mode</p>
            <h2 style="margin:0;font:var(--type-headline-large);">Overriding in dark mode</h2>
            <p class="lede">Surface System ships its own dark-mode remapping inside a layer. Unlayered dark overrides in your theme automatically take precedence.</p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));gap:1.5rem;">

            <ds-card variant="outlined">
              <p class="card-label">System preference</p>
              <pre style="margin:0;padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);font-size:0.8rem;overflow-x:auto;line-height:1.8;">@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-primary: oklch(80% 0.12 265);
    --color-on-primary: oklch(20% 0.18 265);
    --layer-surface: #161616;
  }
}</pre>
              <p style="margin-top:0.75rem;color:var(--color-on-surface-variant);">Scoping with <code>:not([data-theme="light"])</code> lets a manual toggle override the media query.</p>
            </ds-card>

            <ds-card variant="outlined">
              <p class="card-label">Manual data-theme toggle</p>
              <pre style="margin:0;padding:0.75rem;background:var(--layer-surface-2);border-radius:var(--radius-sm);font-size:0.8rem;overflow-x:auto;line-height:1.8;">[data-theme="dark"] {
  --color-primary: oklch(80% 0.12 265);
  --color-on-primary: oklch(20% 0.18 265);
  --layer-surface: #161616;
}</pre>
              <p style="margin-top:0.75rem;color:var(--color-on-surface-variant);">Set <code>document.documentElement.dataset.theme = "dark"</code> or <code>"light"</code> to toggle programmatically.</p>
            </ds-card>

            <ds-card variant="filled">
              <p class="card-label">Why both patterns</p>
              <p>If you only set roles in <code>:root</code>, those values apply in both modes — the system's own dark remapping is in a lower-priority layer and cannot override your unlayered rules.</p>
              <p style="margin-top:0.75rem;">Use the media query pattern when you want automatic dark mode. Use the data-attribute pattern when you need a user-controlled toggle that persists across system preference changes.</p>
            </ds-card>

          </div>

        </div>
      </section>
    `),
};

/* ─────────────────────────────────────────────────────────────
 * Color role reference
 * ───────────────────────────────────────────────────────────── */
const roleReference = [
  { token: "--color-primary",              onToken: "--color-on-primary",              usedBy: "Filled button, focus rings, checkbox, switch, text-field focus border, active tab/chip indicator" },
  { token: "--color-on-primary",           onToken: null,                              usedBy: "Label on filled primary surfaces" },
  { token: "--color-primary-container",    onToken: "--color-on-primary-container",    usedBy: "Tonal button, selected chip/filter background, switch track" },
  { token: "--color-on-primary-container", onToken: null,                              usedBy: "Label on primary container surfaces" },
  { token: "--color-secondary",            onToken: "--color-on-secondary",            usedBy: "Active tab/nav indicator, selection state layer" },
  { token: "--color-secondary-container",  onToken: "--color-on-secondary-container",  usedBy: "Filter chip selected, input chip" },
  { token: "--color-tertiary",             onToken: "--color-on-tertiary",             usedBy: "Decorative highlights, card accent labels" },
  { token: "--color-error",                onToken: "--color-on-error",                usedBy: "Destructive button, text-field error state, error badge" },
  { token: "--color-error-container",      onToken: "--color-on-error-container",      usedBy: "Error tonal surface (badge, inline alert)" },
  { token: "--layer-backdrop",             onToken: null,                              usedBy: "Page/app background" },
  { token: "--layer-surface",              onToken: "--color-on-surface",              usedBy: "Card base, dialog background" },
  { token: "--layer-surface-1",            onToken: "--color-on-surface",              usedBy: "Text field background, list row" },
  { token: "--layer-surface-2",            onToken: "--color-on-surface",              usedBy: "Filled text field, switch track" },
  { token: "--layer-surface-3",            onToken: "--color-on-surface",              usedBy: "Elevated card, navigation rail" },
  { token: "--layer-surface-4",            onToken: "--color-on-surface",              usedBy: "Top app bar, modal overlay surface" },
  { token: "--color-on-surface",           onToken: null,                              usedBy: "All body copy, input values, icon fills" },
  { token: "--color-on-surface-variant",   onToken: null,                              usedBy: "Labels, placeholders, helper text, affix icons" },
  { token: "--color-outline",              onToken: null,                              usedBy: "Text field border, switch border, divider" },
  { token: "--color-outline-variant",      onToken: null,                              usedBy: "Subtle divider, card border in outlined variant" },
];

export const ColorRoleReference = {
  name: "Color role reference",
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:2.5rem;">

          <div style="display:grid;gap:0.5rem;max-width:44rem;">
            <p class="eyebrow">Reference</p>
            <h2 style="margin:0;font:var(--type-headline-large);">Color role reference</h2>
            <p class="lede">Every semantic role, what it looks like at the current theme, and which components consume it. Override any of these in an unlayered <code>:root</code> block to retheme those components.</p>
          </div>

          <div style="display:grid;gap:0.5rem;">
            ${roleReference.map((role) => `
              <div style="
                display:grid;
                grid-template-columns:2.5rem 14rem 1fr;
                align-items:center;
                gap:1rem;
                padding:0.6rem 1rem;
                background:var(--layer-surface);
                border-radius:var(--radius-sm);
                border:1px solid var(--color-outline-variant);">
                <div style="
                  width:2.5rem;
                  height:2.5rem;
                  border-radius:var(--radius-sm);
                  background:var(${role.token});
                  border:1px solid var(--color-outline-variant);
                  flex-shrink:0;"></div>
                <code style="font-size:0.8rem;word-break:break-all;">${role.token}</code>
                <span style="color:var(--color-on-surface-variant);font-size:0.875rem;">${role.usedBy}</span>
              </div>
            `).join("")}
          </div>

        </div>
      </section>
    `),
};
