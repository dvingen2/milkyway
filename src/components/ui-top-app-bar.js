const topAppBarTemplate = document.createElement("template");
topAppBarTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }

    header {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      align-items: center;
      min-height: 4rem;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-lg);
      border: 1px solid rgb(from var(--color-outline) r g b / 0.16);
      background: rgb(from var(--layer-surface) r g b / 0.92);
      box-shadow: var(--shadow-1);
    }

    .slot {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
    }

    .title {
      font: var(--type-title-large);
      color: var(--color-on-surface);
    }

    ::slotted(.app-bar-support) {
      color: var(--color-on-surface-variant);
      font: var(--type-label-large);
      white-space: nowrap;
    }
  </style>
  <header part="header">
    <div class="slot leading"><slot name="leading"></slot></div>
    <div class="title" part="title"></div>
    <div class="slot trailing"><slot name="trailing"></slot></div>
  </header>
`;

export class MwTopAppBar extends HTMLElement {
  static get observedAttributes() { return ["headline"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(topAppBarTemplate.content.cloneNode(true));
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  get headline() { return this.getAttribute("headline") ?? ""; }
  set headline(v) { this.setAttribute("headline", v); }

  render() {
    const title = this.shadowRoot?.querySelector(".title");
    if (title) title.textContent = this.headline;
  }
}

customElements.define("mw-top-app-bar", MwTopAppBar);
