import { stateLayers } from "../../data/content.js";
import { renderHTML } from "../helpers.js";

export default {
  title: "Foundations/States",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export const Layers = {
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:2rem;">
          <div style="display:grid;gap:0.5rem;max-width:40rem;">
            <p class="eyebrow">States</p>
            <h2 style="margin:0;font:var(--type-headline-large);">Interactive and persistent state layers</h2>
            <p class="lede">Hover and focus are feedback layers. Selection and activation are meaning-bearing layers with distinct intent.</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;">
            ${stateLayers
              .map(
                (state) => `
                  <mw-card variant="outlined">
                    <p class="card-label">${state.name}</p>
                    <div style="min-height:5rem;border-radius:0.75rem;background:
                      linear-gradient(0deg, var(${state.token}), var(${state.token})),
                      var(--layer-surface-1);border:1px solid var(--color-outline-variant);"></div>
                    <p><code>${state.token}</code></p>
                    <p>${state.description}</p>
                  </mw-card>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `),
};
