import { renderHTML } from "../helpers.js";

const spaces = ["--space-1", "--space-2", "--space-3", "--space-4", "--space-5", "--space-6"];
const radii = ["--radius-sm", "--radius-md", "--radius-lg", "--radius-full"];

export default {
  title: "Foundations/Layout",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export const SpacingAndRadius = {
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:2rem;">
          <div style="display:grid;gap:0.5rem;max-width:40rem;">
            <p class="eyebrow">Layout</p>
            <h2 style="margin:0;font:var(--type-headline-large);">Spacing and shape decisions</h2>
            <p class="lede">Spacing is tokenized globally. Shape is intentionally light-touch for now, with a few reusable radii and full pills where interaction wants it.</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;">
            <mw-card variant="outlined">
              <p class="card-label">Spacing scale</p>
              <div style="display:grid;gap:0.75rem;">
                ${spaces
                  .map(
                    (token) => `
                      <div style="display:grid;gap:0.35rem;">
                        <strong>${token}</strong>
                        <div style="height:0.75rem;width:var(${token});background:var(--color-primary);border-radius:999px;"></div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </mw-card>
            <mw-card variant="filled">
              <p class="card-label">Radii</p>
              <div style="display:grid;gap:0.75rem;">
                ${radii
                  .map(
                    (token) => `
                      <div style="display:grid;gap:0.35rem;">
                        <strong>${token}</strong>
                        <div style="height:3rem;background:var(--layer-surface-2);border-radius:var(${token});border:1px solid var(--color-outline-variant);"></div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </mw-card>
          </div>
        </div>
      </section>
    `),
};
