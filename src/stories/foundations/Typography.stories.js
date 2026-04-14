import { renderHTML } from "../helpers.js";

const styles = [
  ["Display Large", "var(--type-display-large)"],
  ["Display Medium", "var(--type-display-medium)"],
  ["Display Small", "var(--type-display-small)"],
  ["Headline Large", "var(--type-headline-large)"],
  ["Headline Medium", "var(--type-headline-medium)"],
  ["Headline Small", "var(--type-headline-small)"],
  ["Title Large", "var(--type-title-large)"],
  ["Title Medium", "var(--type-title-medium)"],
  ["Title Small", "var(--type-title-small)"],
  ["Body Large", "var(--type-body-large)"],
  ["Body Medium", "var(--type-body-medium)"],
  ["Body Small", "var(--type-body-small)"],
  ["Label Large", "var(--type-label-large)"],
  ["Label Medium", "var(--type-label-medium)"],
  ["Label Small", "var(--type-label-small)"],
];

export default {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export const Ramp = {
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:2rem;">
          <div style="display:grid;gap:0.5rem;max-width:40rem;">
            <p class="eyebrow">Typography</p>
            <h2 style="margin:0;font:var(--type-headline-large);">MD3 ramp, system fonts, zero letter-spacing</h2>
            <p class="lede">The ramp follows the Material 3 sizing model, but this system intentionally strips all letter-spacing.</p>
          </div>
          <ds-card variant="filled">
            <div style="display:grid;gap:1rem;">
              ${styles
                .map(
                  ([label, value]) => `
                    <div style="display:grid;gap:0.25rem;padding-bottom:0.75rem;border-bottom:1px solid var(--color-outline-variant);">
                      <span style="font:var(--type-label-medium);color:var(--color-primary);">${label}</span>
                      <span style="font:${value};">The quick brown fox jumps over the calm surface.</span>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </ds-card>
        </div>
      </section>
    `),
};
