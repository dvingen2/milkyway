const navBarTemplate = document.createElement("template");
navBarTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }

    nav {
      display: flex;
      align-items: stretch;
      width: 100%;
      height: 5rem;
      background: var(--layer-surface);
      border-top: 1px solid var(--color-outline-variant);
      box-shadow: 0 -1px 4px rgb(from var(--color-shadow) r g b / 0.08);
    }

    .item {
      flex: 1;
      display: grid;
      justify-items: center;
      align-content: center;
      gap: 0.25rem;
      padding: 0.5rem 0.25rem;
      border: 0;
      background: transparent;
      color: var(--color-on-surface-variant);
      font: var(--type-label-medium);
      text-decoration: none;
      cursor: pointer;
      position: relative;
      transition:
        color var(--motion-fast);
    }

    .item:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: -2px;
      border-radius: var(--radius-sm);
    }

    .item.active {
      color: var(--color-on-secondary-container);
    }

    .indicator {
      position: absolute;
      top: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 4rem;
      height: 2rem;
      border-radius: 999px;
      background: transparent;
      transition: background var(--motion-fast);
    }

    .item.active .indicator {
      background: var(--color-secondary-container);
    }

    .item:not(.active):hover .indicator {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        transparent;
    }

    .icon-wrap {
      position: relative;
      z-index: 1;
      font: var(--type-title-medium);
      line-height: 1;
      height: 2rem;
      display: flex;
      align-items: center;
    }

    .badge {
      position: absolute;
      top: 0;
      right: -0.375rem;
      min-width: 1rem;
      height: 1rem;
      padding: 0 0.25rem;
      border-radius: 999px;
      background: var(--color-error);
      color: var(--color-on-error);
      font: var(--type-label-small);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .item-label {
      position: relative;
      z-index: 1;
      font: var(--type-label-medium);
    }
  </style>
  <nav part="nav" aria-label="Main navigation"></nav>
`;

export class MwNavigationBar extends HTMLElement {
  static get observedAttributes() { return ["items"]; }

  _items = null;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(navBarTemplate.content.cloneNode(true));
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  /**
   * Items: Array<{ label: string, icon?: string, href?: string, active?: boolean, badge?: string|number }>
   */
  get items() {
    if (this._items !== null) return this._items;
    try { return JSON.parse(this.getAttribute("items") || "[]"); }
    catch { return []; }
  }

  set items(v) {
    this._items = v;
    this.render();
  }

  render() {
    const nav = this.shadowRoot?.querySelector("nav");
    if (!nav) return;

    nav.innerHTML = this.items.map((item, i) => {
      const tag = item.href ? "a" : "button";
      const attrs = [
        `class="item ${item.active ? "active" : ""}"`,
        `part="item"`,
        item.href ? `href="${item.href}"` : `type="button"`,
        item.active ? `aria-current="page"` : "",
        `data-index="${i}"`,
      ].filter(Boolean).join(" ");

      const badge = item.badge != null
        ? `<span class="badge">${item.badge}</span>`
        : "";

      return `
        <${tag} ${attrs}>
          <span class="indicator" aria-hidden="true"></span>
          <span class="icon-wrap">
            <span aria-hidden="true">${item.icon ?? "•"}</span>
            ${badge}
          </span>
          <span class="item-label">${item.label ?? ""}</span>
        </${tag}>
      `;
    }).join("");

    nav.querySelectorAll("[data-index]").forEach((el) => {
      if (!el.getAttribute("href")) {
        el.addEventListener("click", () => {
          const index = Number(el.dataset.index);
          const item = this.items[index];
          this.dispatchEvent(new CustomEvent("mw-navigate", {
            bubbles: true, composed: true,
            detail: { index, item },
          }));
        });
      }
    });
  }
}

customElements.define("mw-navigation-bar", MwNavigationBar);
