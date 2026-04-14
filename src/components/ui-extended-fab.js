const extFabStyles = `
  <style>
    :host {
      display: inline-flex;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0 1.25rem;
      height: 3.5rem;
      border-radius: var(--radius-lg);
      border: 0;
      cursor: pointer;
      font: var(--type-label-large);
      white-space: nowrap;
      transition:
        transform var(--motion-fast),
        background var(--motion-fast),
        box-shadow var(--motion-fast);
    }

    button:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    button:not(:disabled):hover {
      transform: translateY(-2px);
    }

    button:not(:disabled):active {
      transform: translateY(0);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.42;
      box-shadow: none;
      transform: none;
    }

    .icon {
      font: var(--type-title-medium);
      line-height: 1;
    }

    button.surface {
      background: var(--layer-surface-2);
      color: var(--color-primary);
      box-shadow: var(--shadow-2);
    }

    button.surface:not(:disabled):hover {
      background:
        linear-gradient(0deg, rgb(from var(--color-primary) r g b / 0.08), rgb(from var(--color-primary) r g b / 0.08)),
        var(--layer-surface-2);
    }

    button.primary {
      background: var(--color-primary-container);
      color: var(--color-on-primary-container);
      box-shadow: var(--shadow-2);
    }

    button.primary:not(:disabled):hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--color-primary-container);
    }

    button.secondary {
      background: var(--color-secondary-container);
      color: var(--color-on-secondary-container);
      box-shadow: var(--shadow-2);
    }

    button.secondary:not(:disabled):hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--color-secondary-container);
    }

    button.tertiary {
      background: var(--color-tertiary-container);
      color: var(--color-on-tertiary-container);
      box-shadow: var(--shadow-2);
    }

    button.tertiary:not(:disabled):hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--color-tertiary-container);
    }
  </style>
`;

const COLORS = ["surface", "primary", "secondary", "tertiary"];

export class MwExtendedFab extends HTMLElement {
  static get observedAttributes() {
    return ["label", "icon", "color", "aria-label", "disabled"];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  get label() { return this.getAttribute("label") ?? ""; }
  set label(v) { this.setAttribute("label", v); }

  get icon() { return this.getAttribute("icon") ?? ""; }
  set icon(v) { v ? this.setAttribute("icon", v) : this.removeAttribute("icon"); }

  get color() { return this.getAttribute("color") ?? "primary"; }
  set color(v) { this.setAttribute("color", v); }

  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"); }

  render() {
    const color = COLORS.includes(this.color) ? this.color : "primary";
    const disabled = this.disabled;
    const label = this.label;
    const icon = this.icon;
    const ariaLabel = this.getAttribute("aria-label");

    this.shadowRoot.innerHTML = extFabStyles;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = color;
    btn.part = "button";
    btn.disabled = disabled;
    if (ariaLabel) btn.setAttribute("aria-label", ariaLabel);

    if (icon) {
      const iconEl = document.createElement("span");
      iconEl.className = "icon";
      iconEl.setAttribute("aria-hidden", "true");
      iconEl.textContent = icon;
      btn.appendChild(iconEl);
    }

    const labelEl = document.createElement("span");
    labelEl.textContent = label;
    btn.appendChild(labelEl);

    this.shadowRoot.appendChild(btn);
  }
}

customElements.define("mw-extended-fab", MwExtendedFab);
