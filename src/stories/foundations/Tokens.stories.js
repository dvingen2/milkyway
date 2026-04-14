import { colorCustomizationGuidance, colorRoles, keyColors, tonalPalettes } from "../../data/content.js";
import { renderHTML } from "../helpers.js";

export default {
  title: "Foundations/Tokens",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export const ColorRoles = {
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:2rem;">
          <div style="display:grid;gap:0.5rem;max-width:40rem;">
            <p class="eyebrow">Tokens</p>
            <h2 style="margin:0;font:var(--type-headline-large);">Key colors, tonal palettes, and semantic roles</h2>
            <p class="lede">Key colors are inputs. Tonal palettes are explicit outputs. Semantic roles are the stable interface consumed by components.</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;">
            <ds-card variant="filled">
              <p class="card-label">Key colors</p>
              <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;">
                ${keyColors
                  .map(
                    (swatch) => `
                      <div style="display:grid;gap:0.5rem;">
                        <div style="min-height:4rem;border-radius:0.75rem;background:var(${swatch.token});border:1px solid var(--color-outline-variant);"></div>
                        <div style="display:grid;gap:0.15rem;">
                          <strong>${swatch.name}</strong>
                          <span><code>${swatch.token}</code></span>
                          <span>${swatch.purpose}</span>
                        </div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </ds-card>
            <ds-card variant="outlined">
              <p class="card-label">Tonal palettes</p>
              <div style="display:grid;gap:0.75rem;">
                ${tonalPalettes
                  .map(
                    (palette) => `
                      <div style="display:grid;gap:0.35rem;">
                        <strong>${palette.name}</strong>
                        <div style="display:grid;grid-template-columns:repeat(13,minmax(0,1fr));gap:0.25rem;">
                          ${palette.tones
                            .map(
                              (tone) => `
                                <div style="display:grid;gap:0.2rem;justify-items:center;">
                                  <div style="width:100%;min-height:1.75rem;border-radius:999px;background:var(${palette.prefix}${tone});border:1px solid var(--color-outline-variant);"></div>
                                  <span style="font:var(--type-label-small);color:var(--color-on-surface-variant);">${tone}</span>
                                </div>
                              `,
                            )
                            .join("")}
                        </div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </ds-card>
            <ds-card variant="outlined">
              <p class="card-label">Semantic roles</p>
              <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;">
                ${colorRoles
                  .map(
                    (role) => `
                      <div style="display:grid;gap:0.5rem;">
                        <div style="min-height:4rem;border-radius:0.75rem;background:var(${role.token});color:var(${role.onToken});border:1px solid var(--color-outline-variant);padding:0.75rem;display:flex;align-items:end;">
                          ${role.name}
                        </div>
                        <div style="display:grid;gap:0.15rem;">
                          <strong>${role.name}</strong>
                          <span><code>${role.token}</code></span>
                        </div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </ds-card>
          </div>
          <ds-card variant="outlined">
            <p class="card-label">Customization</p>
            <ol style="margin:0;padding-left:1.2rem;display:grid;gap:0.55rem;">
              ${colorCustomizationGuidance.map((item) => `<li>${item}</li>`).join("")}
            </ol>
          </ds-card>
        </div>
      </section>
    `),
};
