const menuTemplate = document.createElement("template");
menuTemplate.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      position: relative;
    }

    details {
      position: relative;
    }

    summary {
      list-style: none;
      min-height: 3rem;
      padding: 0 1rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: 999px;
      border: 1px solid var(--color-outline-variant);
      background: rgb(from var(--layer-surface-1) r g b / 0.88);
      color: var(--color-on-surface);
      cursor: pointer;
      font: var(--type-label-large);
      user-select: none;
      transition: background var(--motion-fast);
    }

    summary::-webkit-details-marker { display: none; }
    summary::marker { display: none; }

    summary:hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        rgb(from var(--layer-surface-1) r g b / 0.88);
    }

    summary:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    .menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      min-width: 15rem;
      display: grid;
      gap: 0.25rem;
      padding: 0.5rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-outline-variant);
      background: var(--layer-surface);
      box-shadow: var(--shadow-2);
      z-index: 20;
    }

    .menu-item {
      display: grid;
      gap: 0.15rem;
      width: 100%;
      padding: 0.85rem 1rem;
      border: 0;
      border-radius: calc(var(--radius-md) - 0.25rem);
      background: transparent;
      color: var(--color-on-surface);
      text-align: left;
      text-decoration: none;
      font: var(--type-body-medium);
      cursor: pointer;
      transition: background var(--motion-fast);
    }

    .menu-item:hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--layer-surface);
    }

    .menu-item:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    .menu-item.danger { color: var(--color-error); }

    .supporting {
      color: var(--color-on-surface-variant);
      font: var(--type-body-small);
    }
  </style>
  <details part="details">
    <summary part="trigger"></summary>
    <div class="menu" part="menu" role="menu"></div>
  </details>
`;

export class MwMenu extends HTMLElement {
  static get observedAttributes() { return ["label", "items"]; }

  /** @type {Array<{label: string, supporting?: string, href?: string, danger?: boolean}>|null} */
  _items = null;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(menuTemplate.content.cloneNode(true));
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  get label() { return this.getAttribute("label") ?? "Menu"; }
  set label(v) { this.setAttribute("label", v); }

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
    const summary = this.shadowRoot?.querySelector("summary");
    const menu = this.shadowRoot?.querySelector(".menu");
    const details = this.shadowRoot?.querySelector("details");
    if (!summary || !menu || !details) return;

    summary.textContent = this.label;

    menu.innerHTML = this.items
      .map((item, i) => {
        const classes = `menu-item ${item.danger ? "danger" : ""}`.trim();
        const body = `
          <span>${item.label ?? ""}</span>
          ${item.supporting ? `<span class="supporting">${item.supporting}</span>` : ""}
        `;
        if (item.href) {
          return `<a class="${classes}" part="item" href="${item.href}" role="menuitem" data-index="${i}">${body}</a>`;
        }
        return `<button class="${classes}" part="item" type="button" role="menuitem" data-index="${i}">${body}</button>`;
      })
      .join("");

    menu.querySelectorAll(".menu-item").forEach((el) => {
      el.addEventListener("click", () => {
        details.removeAttribute("open");
        const index = Number(el.dataset.index);
        this.dispatchEvent(new CustomEvent("mw-select", {
          bubbles: true,
          composed: true,
          detail: { index, item: this.items[index] },
        }));
      });
    });
  }
}

customElements.define("mw-menu", MwMenu);
