import { material3Catalog, material3CategoryOrder } from "../../data/material3-catalog.js";
import { renderHTML } from "../helpers.js";

function statusColor(status) {
  switch (status) {
    case "implemented":
      return "var(--color-primary)";
    case "partial":
      return "var(--color-secondary)";
    default:
      return "var(--color-on-surface-variant)";
  }
}

function statusLabel(status) {
  switch (status) {
    case "implemented":
      return "Implemented";
    case "partial":
      return "Partial";
    default:
      return "Scaffold";
  }
}

function componentCard(component) {
  const variants = component.variants.map((variant) => `<span class="meta-pill">${variant}</span>`).join("");
  const storyLink = component.story
    ? `<p><strong>Current story:</strong> ${component.story}</p>`
    : "";

  return `
    <article class="component-reference-card">
      <div class="component-reference-header">
        <div>
          <p class="card-label">M3 Component</p>
          <h3>${component.name}</h3>
        </div>
        <p class="token-kicker" style="color:${statusColor(component.status)};">${statusLabel(component.status)}</p>
      </div>
      <div class="component-reference-body">
        <div class="component-reference-column">
          <article class="component-spec-block">
            <h4>Variants</h4>
            <div class="project-meta">${variants}</div>
          </article>
          <article class="component-spec-block">
            <h4>Scaffold Notes</h4>
            <p>${component.notes}</p>
            ${storyLink}
            <p><strong>Official source:</strong> <a href="${component.source}" target="_blank" rel="noreferrer">${component.source}</a></p>
          </article>
        </div>
      </div>
    </article>
  `;
}

export function renderMaterial3CatalogOverview() {
  const sections = material3CategoryOrder
    .map((key) => {
      const category = material3Catalog[key];
      const cards = category.components
        .map(
          (component) => `
            <article class="project-card">
              <p class="eyebrow">${category.title}</p>
              <h3>${component.name}</h3>
              <p>${component.notes}</p>
              <div class="project-meta">
                <span class="meta-pill">${statusLabel(component.status)}</span>
                ${component.variants.slice(0, 2).map((variant) => `<span class="meta-pill">${variant}</span>`).join("")}
              </div>
            </article>
          `,
        )
        .join("");

      return `
        <section class="section">
          <div class="section-heading">
            <p class="eyebrow">${category.title}</p>
            <h2>${category.summary}</h2>
          </div>
          <div class="project-grid">${cards}</div>
        </section>
      `;
    })
    .join("");

  return renderHTML(`
    <main style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
      <div style="max-width:80rem;margin:0 auto;display:grid;gap:3rem;">
        <section class="panel">
          <div class="section-heading">
            <p class="eyebrow">Material 3 Scaffold</p>
            <h2>Full M3 component taxonomy scaffolded into the system</h2>
            <p class="lede">
              This scaffold follows the official Material component categories and current Material Web documentation,
              while marking which pieces are already implemented, partially represented, or still only staged.
            </p>
          </div>
        </section>
        ${sections}
      </div>
    </main>
  `);
}

export function renderMaterial3Category(categoryKey) {
  const category = material3Catalog[categoryKey];
  const cards = category.components.map(componentCard).join("");

  return renderHTML(`
    <main style="padding:3rem;background:var(--layer-backdrop);color:var(--color-on-surface);">
      <div style="max-width:72rem;margin:0 auto;display:grid;gap:2rem;">
        <section class="panel">
          <div class="section-heading">
            <p class="eyebrow">${category.title}</p>
            <h2>${category.summary}</h2>
          </div>
        </section>
        <section class="component-reference-list">
          ${cards}
        </section>
      </div>
    </main>
  `);
}
