const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    article {
      display: grid;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-outline-variant);
      background: var(--layer-surface-1);
      color: var(--color-on-surface);
      box-shadow: none;
      transition:
        box-shadow var(--motion-fast),
        background var(--motion-fast),
        border-color var(--motion-fast);
    }

    article.elevated {
      background: var(--layer-surface);
      box-shadow: var(--shadow-1);
      border-color: rgb(from var(--color-outline) r g b / 0.14);
    }

    article.filled {
      background: var(--layer-surface-2);
      border-color: transparent;
    }

    article.outlined {
      background: var(--layer-surface);
      border-color: var(--color-outline-variant);
    }

    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4) {
      margin: 0;
      color: var(--color-on-surface);
    }

    ::slotted(p),
    ::slotted(ul),
    ::slotted(ol) {
      margin: 0;
      color: var(--color-on-surface-variant);
    }

    ::slotted(ul),
    ::slotted(ol) {
      padding-left: 1.2rem;
    }

    ::slotted(.eyebrow),
    ::slotted(.card-label) {
      margin: 0;
    }
  </style>
  <article part="card">
    <slot></slot>
  </article>
`;

export class MwCard extends HTMLElement {
  static get observedAttributes() { return ["variant"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  get variant() { return this.getAttribute("variant") ?? "filled"; }
  set variant(v) { this.setAttribute("variant", v); }

  render() {
    const article = this.shadowRoot?.querySelector("article");
    if (!article) return;
    article.className = this.variant;
  }
}

customElements.define("mw-card", MwCard);
