const railTemplate = document.createElement("template");
railTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    nav {
      display: grid;
      gap: 0.5rem;
      width: 6rem;
      padding: 0.75rem 0.5rem;
      border-radius: var(--radius-lg);
      background: var(--layer-surface);
      border: 1px solid var(--color-outline-variant);
      box-shadow: var(--shadow-1);
    }

    .item {
      display: grid;
      justify-items: center;
      gap: 0.35rem;
      min-height: 3.5rem;
      padding: 0.5rem 0.25rem;
      border-radius: var(--radius-full);
      border: 0;
      background: transparent;
      color: var(--color-on-surface-variant);
      font: var(--type-label-medium);
      text-decoration: none;
      cursor: pointer;
      transition:
        background var(--motion-fast),
        color var(--motion-fast);
    }

    .item:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    .item.active {
      color: var(--color-on-secondary-container);
      background:
        linear-gradient(0deg, var(--state-selection), var(--state-selection)),
        var(--color-secondary-container);
    }

    .item:not(.active):hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        transparent;
      color: var(--color-on-surface);
    }

    .icon {
      font: var(--type-title-medium);
      line-height: 1;
    }
  </style>
  <nav part="nav" aria-label="Main navigation"></nav>
`;

export class DsNavigationRail extends HTMLElement {
  static get observedAttributes() { return ["items"]; }

  /** @type {Array<{label: string, icon?: string, href?: string, active?: boolean}>|null} */
  _items = null;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(railTemplate.content.cloneNode(true));
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  /**
   * Get or set navigation items as an array.
   * Setting this property avoids JSON serialization — preferred over the
   * `items` attribute for programmatic use.
   */
  get items() {
    if (this._items !== null) return this._items;
    try { return JSON.parse(this.getAttribute("items") || "[]"); }
    catch { return []; }
  }

  set items(value) {
    this._items = value;
    this.render();
  }

  render() {
    const nav = this.shadowRoot?.querySelector("nav");
    if (!nav) return;

    nav.innerHTML = this.items
      .map((item, i) => {
        const tag = item.href ? "a" : "button";
        const attrs = [
          `class="item ${item.active ? "active" : ""}"`,
          `part="item"`,
          item.href ? `href="${item.href}"` : `type="button"`,
          item.active ? `aria-current="page"` : "",
          `data-index="${i}"`,
        ].filter(Boolean).join(" ");

        return `
          <${tag} ${attrs}>
            <span class="icon">${item.icon ?? "•"}</span>
            <span>${item.label ?? ""}</span>
          </${tag}>
        `;
      })
      .join("");

    nav.querySelectorAll("[data-index]").forEach((el) => {
      if (!el.getAttribute("href")) {
        el.addEventListener("click", () => {
          const index = Number(el.dataset.index);
          const item = this.items[index];
          this.dispatchEvent(new CustomEvent("ds-navigate", {
            bubbles: true,
            composed: true,
            detail: { index, item },
          }));
        });
      }
    });
  }
}

customElements.define("ds-navigation-rail", DsNavigationRail);
