const iconButtonStyles = `
  <style>
    :host {
      display: inline-flex;
      min-height: 3rem;
      align-items: center;
    }

    button {
      width: 3rem;
      height: 3rem;
      display: inline-grid;
      place-items: center;
      border: 1px solid var(--color-outline-variant);
      border-radius: 999px;
      background: var(--layer-surface-1);
      color: var(--color-on-surface);
      cursor: pointer;
      font: var(--type-title-large);
      transition:
        background var(--motion-fast),
        transform var(--motion-fast),
        border-color var(--motion-fast),
        color var(--motion-fast),
        box-shadow var(--motion-fast);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.42;
      transform: none;
      box-shadow: none;
    }

    button:not(:disabled):hover {
      transform: translateY(-1px);
    }

    button:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    button.standard {
      background: transparent;
      color: var(--color-on-surface-variant);
      border-color: var(--color-outline-variant);
    }

    button.standard:not(:disabled):hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--layer-surface);
    }

    button.filled {
      background: var(--color-primary);
      color: var(--color-on-primary);
      border-color: transparent;
      box-shadow: var(--shadow-1);
    }

    button.filled:not(:disabled):hover {
      background:
        linear-gradient(0deg, rgb(from var(--color-on-primary) r g b / 0.08), rgb(from var(--color-on-primary) r g b / 0.08)),
        var(--color-primary);
    }

    button.tonal {
      background: var(--color-secondary-container);
      color: var(--color-on-secondary-container);
      border-color: transparent;
    }

    button.tonal:not(:disabled):hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--color-secondary-container);
    }

    button.outlined {
      background: transparent;
      color: var(--color-on-surface);
      border-color: var(--color-outline);
    }

    button.outlined:not(:disabled):hover {
      background: var(--state-hover);
    }

    button[aria-pressed="true"] {
      border-color: transparent;
    }

    button.standard[aria-pressed="true"],
    button.outlined[aria-pressed="true"] {
      color: var(--color-on-secondary-container);
      background:
        linear-gradient(0deg, var(--state-selection), var(--state-selection)),
        var(--color-secondary-container);
    }

    button.filled[aria-pressed="true"] {
      background:
        linear-gradient(0deg, var(--state-activation), var(--state-activation)),
        var(--color-primary);
    }

    button.tonal[aria-pressed="true"] {
      background:
        linear-gradient(0deg, var(--state-selection), var(--state-selection)),
        var(--color-secondary-container);
    }
  </style>
`;

const VARIANTS = ["standard", "filled", "tonal", "outlined"];

export class MwIconButton extends HTMLElement {
  static get observedAttributes() {
    return ["aria-label", "title", "variant", "selected", "toggle", "disabled"];
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

  get variant() { return this.getAttribute("variant") ?? "standard"; }
  set variant(v) { this.setAttribute("variant", v); }

  get selected() { return this.hasAttribute("selected"); }
  set selected(v) { v ? this.setAttribute("selected", "") : this.removeAttribute("selected"); }

  get toggle() { return this.hasAttribute("toggle"); }
  set toggle(v) { v ? this.setAttribute("toggle", "") : this.removeAttribute("toggle"); }

  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"); }

  render() {
    const variant = VARIANTS.includes(this.variant) ? this.variant : "standard";
    const selected = this.selected;
    const toggle = this.toggle;
    const disabled = this.disabled;
    const icon = this.textContent?.trim() ?? "";
    const ariaLabel = this.getAttribute("aria-label");
    const title = this.getAttribute("title");

    this.shadowRoot.innerHTML = iconButtonStyles;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = variant;
    btn.part = "button";
    btn.disabled = disabled;

    if (toggle) {
      btn.setAttribute("aria-pressed", selected ? "true" : "false");
    }
    if (ariaLabel) btn.setAttribute("aria-label", ariaLabel);
    if (title) btn.title = title;
    btn.textContent = icon;

    if (toggle && !disabled) {
      btn.addEventListener("click", () => {
        const next = !this.selected;
        this.selected = next;
        this.dispatchEvent(new CustomEvent("mw-toggle", {
          bubbles: true,
          composed: true,
          detail: { selected: next },
        }));
      });
    }

    this.shadowRoot.appendChild(btn);
  }
}

customElements.define("mw-icon-button", MwIconButton);
