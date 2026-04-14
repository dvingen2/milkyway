const tooltipTemplate = document.createElement("template");
tooltipTemplate.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      position: relative;
    }

    .trigger {
      display: contents;
    }

    .tip {
      position: absolute;
      bottom: calc(100% + 0.5rem);
      left: 50%;
      transform: translateX(-50%) translateY(4px);
      padding: 0.3rem 0.625rem;
      border-radius: var(--radius-xs, 4px);
      background: var(--color-inverse-surface);
      color: var(--color-inverse-on-surface);
      font: var(--type-body-small);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition:
        opacity var(--motion-fast),
        transform var(--motion-fast);
      z-index: 100;
    }

    .tip.rich {
      white-space: normal;
      max-width: 18rem;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-sm);
      background: var(--layer-surface-2);
      color: var(--color-on-surface);
      box-shadow: var(--shadow-2);
      border: 1px solid var(--color-outline-variant);
    }

    :host([visible]) .tip,
    .tip.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* Placement variants */
    :host([placement="bottom"]) .tip {
      bottom: auto;
      top: calc(100% + 0.5rem);
      transform: translateX(-50%) translateY(-4px);
    }

    :host([placement="bottom"]) .tip.show,
    :host([placement="bottom"][visible]) .tip {
      transform: translateX(-50%) translateY(0);
    }

    :host([placement="left"]) .tip {
      bottom: auto;
      top: 50%;
      left: auto;
      right: calc(100% + 0.5rem);
      transform: translateY(-50%) translateX(4px);
    }

    :host([placement="left"]) .tip.show,
    :host([placement="left"][visible]) .tip {
      transform: translateY(-50%) translateX(0);
    }

    :host([placement="right"]) .tip {
      bottom: auto;
      top: 50%;
      left: calc(100% + 0.5rem);
      transform: translateY(-50%) translateX(-4px);
    }

    :host([placement="right"]) .tip.show,
    :host([placement="right"][visible]) .tip {
      transform: translateY(-50%) translateX(0);
    }
  </style>
  <span class="trigger" part="trigger">
    <slot></slot>
  </span>
  <span class="tip" role="tooltip" part="tip"></span>
`;

export class MwTooltip extends HTMLElement {
  static get observedAttributes() { return ["label", "placement", "rich"]; }

  #tip = null;
  #showTimeout = null;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(tooltipTemplate.content.cloneNode(true));
    }

    this.#tip = this.shadowRoot.querySelector(".tip");
    this._updateLabel();

    const trigger = this.shadowRoot.querySelector(".trigger");
    trigger.addEventListener("mouseenter", () => this.#show());
    trigger.addEventListener("mouseleave", () => this.#hide());
    trigger.addEventListener("focusin", () => this.#show());
    trigger.addEventListener("focusout", () => this.#hide());
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot) return;
    if (name === "label") this._updateLabel();
    if (name === "rich") this._updateLabel();
  }

  get label() { return this.getAttribute("label") ?? ""; }
  set label(v) { this.setAttribute("label", v); }

  _updateLabel() {
    if (!this.#tip) return;
    this.#tip.textContent = this.label;
    this.#tip.classList.toggle("rich", this.hasAttribute("rich"));
    const id = `tip-${Math.random().toString(36).slice(2, 8)}`;
    this.#tip.id = id;
  }

  #show() {
    clearTimeout(this.#showTimeout);
    this.#showTimeout = setTimeout(() => {
      this.#tip?.classList.add("show");
    }, 100);
  }

  #hide() {
    clearTimeout(this.#showTimeout);
    this.#tip?.classList.remove("show");
  }
}

customElements.define("mw-tooltip", MwTooltip);
