const segTemplate = document.createElement("template");
segTemplate.innerHTML = `
  <style>
    :host {
      display: inline-flex;
    }

    .group {
      display: inline-flex;
      border: 1px solid var(--color-outline);
      border-radius: 999px;
      overflow: hidden;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-width: 4rem;
      padding: 0 1rem;
      height: 2.5rem;
      border: 0;
      border-right: 1px solid var(--color-outline);
      border-radius: 0;
      background: transparent;
      color: var(--color-on-surface);
      font: var(--type-label-large);
      cursor: pointer;
      white-space: nowrap;
      transition:
        background var(--motion-fast),
        color var(--motion-fast);
    }

    button:last-child {
      border-right: 0;
    }

    button:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: -3px;
    }

    button:not(:disabled):not(.selected):hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        transparent;
      color: var(--color-on-surface);
    }

    button.selected {
      background:
        linear-gradient(0deg, var(--state-selection), var(--state-selection)),
        var(--color-secondary-container);
      color: var(--color-on-secondary-container);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.42;
    }

    .check {
      font-size: 1rem;
      line-height: 1;
      width: 0;
      overflow: hidden;
      transition: width var(--motion-fast);
    }

    button.selected .check {
      width: 1.25rem;
    }
  </style>
  <div class="group" role="group" part="group">
  </div>
`;

export class MwSegmentedButton extends HTMLElement {
  static get observedAttributes() { return ["options", "value", "multi"]; }

  _options = null;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(segTemplate.content.cloneNode(true));
    }
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  /**
   * Options: Array<{ label: string, value: string, icon?: string, disabled?: boolean }>
   */
  get options() {
    if (this._options !== null) return this._options;
    try { return JSON.parse(this.getAttribute("options") || "[]"); }
    catch { return []; }
  }

  set options(v) {
    this._options = v;
    this.render();
  }

  /**
   * Current selected value(s).
   * Single-select: string. Multi-select: array of strings (set as JSON).
   */
  get value() {
    const raw = this.getAttribute("value") ?? "";
    if (this.multi) {
      try { return JSON.parse(raw); }
      catch { return raw ? [raw] : []; }
    }
    return raw;
  }

  set value(v) {
    this.setAttribute("value", this.multi ? JSON.stringify(v) : v);
  }

  get multi() { return this.hasAttribute("multi"); }
  set multi(v) { v ? this.setAttribute("multi", "") : this.removeAttribute("multi"); }

  _isSelected(optValue) {
    if (this.multi) {
      const vals = Array.isArray(this.value) ? this.value : [this.value];
      return vals.includes(optValue);
    }
    return this.value === optValue;
  }

  render() {
    const group = this.shadowRoot?.querySelector(".group");
    if (!group) return;

    const ariaLabel = this.getAttribute("aria-label");
    if (ariaLabel) group.setAttribute("aria-label", ariaLabel);

    group.innerHTML = this.options.map((opt) => {
      const selected = this._isSelected(opt.value ?? opt.label);
      return `
        <button
          type="button"
          class="${selected ? "selected" : ""}"
          data-value="${opt.value ?? opt.label}"
          ${opt.disabled ? "disabled" : ""}
          aria-pressed="${selected}"
          part="segment"
        >
          <span class="check" aria-hidden="true">✓</span>
          ${opt.icon ? `<span class="icon" aria-hidden="true">${opt.icon}</span>` : ""}
          <span>${opt.label}</span>
        </button>
      `;
    }).join("");

    group.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => this._select(btn.dataset.value));
    });
  }

  _select(val) {
    if (this.multi) {
      const current = Array.isArray(this.value) ? [...this.value] : [];
      const idx = current.indexOf(val);
      if (idx === -1) current.push(val);
      else current.splice(idx, 1);
      this.value = current;
      this.dispatchEvent(new CustomEvent("mw-change", {
        bubbles: true, composed: true, detail: { value: current },
      }));
    } else {
      this.value = val;
      this.dispatchEvent(new CustomEvent("mw-change", {
        bubbles: true, composed: true, detail: { value: val },
      }));
    }
    this.render();
  }
}

customElements.define("mw-segmented-button", MwSegmentedButton);
