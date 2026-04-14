const fabStyles = `
  <style>
    :host {
      display: inline-flex;
    }

    button {
      position: relative;
      display: inline-grid;
      place-items: center;
      border: 0;
      cursor: pointer;
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

    /* Sizes */
    button.small {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--radius-md);
      font-size: 1.25rem;
    }

    button.medium {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: var(--radius-lg);
      font-size: 1.5rem;
    }

    button.large {
      width: 6rem;
      height: 6rem;
      border-radius: var(--radius-xl);
      font-size: 2.25rem;
    }

    /* Color variants */
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

const SIZES = ["small", "medium", "large"];
const COLORS = ["surface", "primary", "secondary", "tertiary"];

export class MwFab extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color", "aria-label", "disabled"];
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

  get size() { return this.getAttribute("size") ?? "medium"; }
  set size(v) { this.setAttribute("size", v); }

  get color() { return this.getAttribute("color") ?? "primary"; }
  set color(v) { this.setAttribute("color", v); }

  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"); }

  render() {
    const size = SIZES.includes(this.size) ? this.size : "medium";
    const color = COLORS.includes(this.color) ? this.color : "primary";
    const disabled = this.disabled;
    const icon = this.textContent?.trim() ?? "";
    const ariaLabel = this.getAttribute("aria-label");

    this.shadowRoot.innerHTML = fabStyles;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `${size} ${color}`;
    btn.part = "button";
    btn.disabled = disabled;
    btn.textContent = icon;
    if (ariaLabel) btn.setAttribute("aria-label", ariaLabel);

    this.shadowRoot.appendChild(btn);
  }
}

customElements.define("mw-fab", MwFab);
