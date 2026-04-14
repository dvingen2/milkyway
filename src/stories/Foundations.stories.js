import { renderHTML } from "./helpers.js";

export default {
  title: "Foundations/Overview",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const Summary = {
  render: () =>
    renderHTML(`
      <section style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
        <div style="max-width:72rem;margin:0 auto;display:grid;gap:1.5rem;">
          <p class="eyebrow">Foundations</p>
          <h2 style="margin:0;font:var(--type-headline-large);">Surface System Foundations</h2>
          <p class="lede">
            The system is built around key colors, explicit tonal palettes, semantic roles, and separate state layers.
          </p>
          <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;">
            <article class="demo-card">
              <h3>Key to role chain</h3>
              <p>Key colors feed tonal palettes, roles remap those tones, and components consume only the semantic layer.</p>
            </article>
            <article class="demo-card">
              <h3>Backdrop + Surface</h3>
              <p>The primary working model is backdrop, surface, and numbered surface levels.</p>
            </article>
            <article class="demo-card">
              <h3>State Semantics</h3>
              <p>Hover, focus, pressed, selection, and activation are documented as separate layers.</p>
            </article>
          </div>
        </div>
      </section>
    `),
};
