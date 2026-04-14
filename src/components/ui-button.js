const buttonStyles = `
  <style>
    :host {
      display: inline-flex;
      min-height: 3rem;
      align-items: center;
      --button-color-error: var(--color-error);
    }

    button,
    a {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-height: 2.25rem;
      padding: 0 1rem;
      border-radius: 999px;
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      font: var(--type-label-large);
      white-space: nowrap;
      transition:
        transform var(--motion-fast),
        background var(--motion-fast),
        border-color var(--motion-fast),
        color var(--motion-fast),
        box-shadow var(--motion-fast);
    }

    button:hover,
    a:hover {
      transform: translateY(-1px);
    }

    button:focus-visible,
    a:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    button:active,
    a:active {
      transform: translateY(0);
    }

    .filled {
      background:
        linear-gradient(0deg, transparent, transparent),
        var(--color-primary);
      color: var(--color-on-primary);
      box-shadow: var(--shadow-1);
    }

    .filled:hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--color-primary);
    }

    .elevated {
      background:
        linear-gradient(0deg, transparent, transparent),
        var(--layer-surface);
      color: var(--color-primary);
      border-color: var(--color-elevation-stroke-strong);
      box-shadow: var(--shadow-1);
    }

    .elevated:hover {
      background:
        linear-gradient(0deg, rgb(from var(--color-primary) r g b / 0.08), rgb(from var(--color-primary) r g b / 0.08)),
        var(--layer-surface);
    }

    .tonal {
      background:
        linear-gradient(0deg, transparent, transparent),
        var(--color-secondary-container);
      color: var(--color-on-secondary-container);
    }

    .tonal:hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--color-secondary-container);
    }

    .outlined {
      background: transparent;
      color: var(--color-on-surface);
      border-color: var(--color-outline);
    }

    .outlined:hover {
      background: var(--state-hover);
    }

    .text {
      background: transparent;
      color: var(--color-primary);
      padding-inline: 0.75rem;
    }

    .text:hover {
      background: var(--state-hover);
    }

    .destructive {
      background: transparent;
      color: var(--button-color-error);
      padding-inline: 0.75rem;
    }

    .destructive:hover {
      background: rgb(from var(--button-color-error) r g b / 0.08);
    }

    .disabled {
      cursor: not-allowed;
      box-shadow: none;
      background: var(--state-disabled-surface);
      color: var(--state-disabled-content);
      border-color: transparent;
      transform: none;
    }
  </style>
`;

const VARIANTS = ["elevated", "filled", "tonal", "outlined", "text", "destructive"];

export class DsButton extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "href", "disabled"];
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

  get variant() { return this.getAttribute("variant") ?? "filled"; }
  set variant(v) { this.setAttribute("variant", v); }

  get href() { return this.getAttribute("href") ?? ""; }
  set href(v) { v ? this.setAttribute("href", v) : this.removeAttribute("href"); }

  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"); }

  render() {
    const variant = VARIANTS.includes(this.variant) ? this.variant : "filled";
    const href = this.getAttribute("href");
    const disabled = this.disabled;
    const label = this.textContent?.trim() ?? "";
    const ariaLabel = this.getAttribute("aria-label");
    const title = this.getAttribute("title");
    const tag = href && !disabled ? "a" : "button";

    this.shadowRoot.innerHTML = buttonStyles;
    const el = document.createElement(tag);
    el.className = `${variant} ${disabled ? "disabled" : ""}`.trim();
    el.part = "button";
    el.textContent = label;

    if (ariaLabel) el.setAttribute("aria-label", ariaLabel);
    if (title) el.title = title;

    if (tag === "a") {
      el.href = href;
    } else {
      el.type = "button";
      el.disabled = disabled;
    }

    this.shadowRoot.appendChild(el);
  }
}

customElements.define("ds-button", DsButton);
