const listTemplate = document.createElement("template");
listTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }

    .list {
      display: grid;
      gap: 0;
      width: 100%;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-outline-variant);
      background: var(--layer-surface);
      overflow: hidden;
    }

    .item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 0.875rem;
      align-items: center;
      min-height: 3.5rem;
      padding: 0.875rem 1rem;
      color: var(--color-on-surface);
      background: var(--layer-surface);
      border: 0;
      width: 100%;
      text-align: left;
      font: var(--type-body-large);
      cursor: default;
      transition: background var(--motion-fast);
    }

    .item[data-interactive] {
      cursor: pointer;
    }

    .item + .item {
      border-top: 1px solid var(--color-outline-variant);
    }

    .item:hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--layer-surface);
    }

    .item.selected {
      background:
        linear-gradient(0deg, var(--state-selection), var(--state-selection)),
        var(--layer-surface);
    }

    .leading,
    .trailing {
      color: var(--color-on-surface-variant);
      display: inline-flex;
      align-items: center;
      min-width: 1rem;
    }

    .content {
      display: grid;
      gap: 0.2rem;
    }

    .headline {
      font: var(--type-body-large);
      color: var(--color-on-surface);
    }

    .supporting {
      font: var(--type-body-medium);
      color: var(--color-on-surface-variant);
    }
  </style>
  <div class="list" part="list"></div>
`;

export class MwList extends HTMLElement {
  static get observedAttributes() { return ["items"]; }

  /** @type {Array<{headline: string, supporting?: string, leading?: string, trailing?: string, selected?: boolean}>} */
  _items = null;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(listTemplate.content.cloneNode(true));
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

  render() {
    const list = this.shadowRoot?.querySelector(".list");
    if (!list) return;

    list.innerHTML = this.items
      .map((item, i) => {
        const interactive = item.href || item.action;
        const tag = item.href ? "a" : "div";
        const attrs = [
          `class="item ${item.selected ? "selected" : ""}"`,
          `part="item"`,
          item.href ? `href="${item.href}"` : "",
          interactive ? `data-interactive data-index="${i}"` : "",
          item.selected ? `aria-selected="true"` : "",
        ].filter(Boolean).join(" ");

        return `
          <${tag} ${attrs}>
            <span class="leading">${item.leading ?? ""}</span>
            <span class="content">
              <span class="headline">${item.headline ?? ""}</span>
              ${item.supporting ? `<span class="supporting">${item.supporting}</span>` : ""}
            </span>
            <span class="trailing">${item.trailing ?? ""}</span>
          </${tag}>
        `;
      })
      .join("");

    list.querySelectorAll("[data-interactive]").forEach((el) => {
      el.addEventListener("click", () => {
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

customElements.define("mw-list", MwList);
