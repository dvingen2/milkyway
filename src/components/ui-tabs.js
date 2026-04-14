const tabsTemplate = document.createElement("template");
tabsTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }

    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      padding: 0.25rem;
      border-radius: var(--radius-full);
      background: var(--layer-surface-1);
      border: 1px solid var(--color-outline-variant);
    }

    .tab {
      min-height: 3rem;
      padding: 0 1rem;
      border-radius: var(--radius-full);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: var(--color-on-surface-variant);
      font: var(--type-label-large);
      background: transparent;
      text-decoration: none;
      border: 0;
      cursor: pointer;
      transition:
        background var(--motion-fast),
        color var(--motion-fast);
    }

    .tab:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    .tab.active {
      color: var(--color-on-secondary-container);
      background:
        linear-gradient(0deg, var(--state-selection), var(--state-selection)),
        var(--color-secondary-container);
    }

    .tab-icon {
      color: inherit;
      font: var(--type-title-small);
    }
  </style>
  <div class="tabs" part="tabs" role="tablist"></div>
`;

export class MwTabs extends HTMLElement {
  static get observedAttributes() { return ["items"]; }

  /** @type {Array<{label: string, href?: string, icon?: string, active?: boolean}>|null} */
  _items = null;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(tabsTemplate.content.cloneNode(true));
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  get items() {
    if (this._items !== null) return this._items;
    try { return JSON.parse(this.getAttribute("items") || "[]"); }
    catch { return []; }
  }

  set items(value) {
    this._items = value;
    this.render();
  }

  /** Activate a tab by index, updating active state and firing ds-change. */
  select(index) {
    if (this._items) {
      this._items = this._items.map((item, i) => ({ ...item, active: i === index }));
    } else {
      try {
        const parsed = JSON.parse(this.getAttribute("items") || "[]");
        this._items = parsed.map((item, i) => ({ ...item, active: i === index }));
      } catch { return; }
    }
    this.render();
    this.dispatchEvent(new CustomEvent("mw-change", {
      bubbles: true,
      composed: true,
      detail: { index, item: this.items[index] },
    }));
  }

  render() {
    const tabs = this.shadowRoot?.querySelector(".tabs");
    if (!tabs) return;

    tabs.innerHTML = this.items
      .map((item, i) => {
        const tag = item.href ? "a" : "button";
        const attrs = [
          `class="tab ${item.active ? "active" : ""}"`,
          `part="tab"`,
          `role="tab"`,
          `aria-selected="${item.active ? "true" : "false"}"`,
          item.href ? `href="${item.href}"` : `type="button"`,
          item.active ? `aria-current="page"` : "",
          `data-index="${i}"`,
        ].filter(Boolean).join(" ");

        return `
          <${tag} ${attrs}>
            ${item.icon ? `<span class="tab-icon">${item.icon}</span>` : ""}
            <span>${item.label ?? ""}</span>
          </${tag}>
        `;
      })
      .join("");

    tabs.querySelectorAll("[data-index]").forEach((el) => {
      if (!el.getAttribute("href")) {
        el.addEventListener("click", () => this.select(Number(el.dataset.index)));
      }
    });
  }
}

customElements.define("mw-tabs", MwTabs);
