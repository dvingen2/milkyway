import { renderHTML } from "../helpers.js";

const surfaces = [
  ["Backdrop", "--layer-backdrop"],
  ["Surface", "--layer-surface"],
  ["Surface 1", "--layer-surface-1"],
  ["Surface 2", "--layer-surface-2"],
  ["Surface 3", "--layer-surface-3"],
  ["Surface 4", "--layer-surface-4"],
];

export default {
  title: "Foundations/Surfaces",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export const Hierarchy = {
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:2rem;">
          <div style="display:grid;gap:0.5rem;max-width:40rem;">
            <p class="eyebrow">Surfaces</p>
            <h2 style="margin:0;font:var(--type-headline-large);">Backdrop + surface + numbered levels</h2>
            <p class="lede">This is the active working model: ambient backdrop, primary surface, then higher-contrast layers for grouping and emphasis.</p>
          </div>
          <div style="display:grid;gap:1rem;">
            ${surfaces
              .map(
                ([name, token], index) => `
                  <div style="padding:${1 + index * 0.15}rem;border-radius:1.5rem;background:var(${token});border:1px solid var(--color-outline-variant);">
                    <div style="display:flex;justify-content:space-between;gap:1rem;align-items:center;">
                      <strong>${name}</strong>
                      <code>${token}</code>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `),
};
