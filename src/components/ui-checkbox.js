const checkboxTemplate = document.createElement("template");
checkboxTemplate.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      min-height: 3rem;
      align-items: center;
    }

    label {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      color: var(--color-on-surface);
      font: var(--type-body-medium);
    }

    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .box {
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 0.25rem;
      border: 2px solid var(--color-outline);
      background: var(--layer-surface);
      display: inline-grid;
      place-items: center;
      transition:
        background var(--motion-fast),
        border-color var(--motion-fast),
        color var(--motion-fast);
      color: transparent;
      flex: 0 0 auto;
    }

    .mark {
      font: 700 0.8rem / 1 var(--font-family-sans);
    }

    label:hover .box {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--layer-surface);
    }

    input:focus-visible + .box {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    input:checked + .box {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-on-primary);
    }

    input:disabled + .box {
      background: var(--state-disabled-surface);
      border-color: var(--state-disabled-content);
    }

    input:disabled ~ .label-text {
      color: var(--state-disabled-content);
    }

    label:has(input:disabled) {
      cursor: not-allowed;
    }
  </style>
  <label>
    <input type="checkbox" part="input" />
    <span class="box" part="box"><span class="mark">✓</span></span>
    <span class="label-text" part="label"></span>
  </label>
`;

export class MwCheckbox extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static get observedAttributes() { return ["checked", "disabled", "label", "name", "value"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(checkboxTemplate.content.cloneNode(true));
      this.shadowRoot.querySelector("input").addEventListener("change", (e) => {
        this.checked = e.target.checked;
        this._internals.setFormValue(this.checked ? (this.getAttribute("value") || "on") : null);
        this.dispatchEvent(new CustomEvent("change", {
          bubbles: true,
          composed: true,
          detail: { checked: this.checked },
        }));
      });
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  get checked() { return this.hasAttribute("checked"); }
  set checked(v) { v ? this.setAttribute("checked", "") : this.removeAttribute("checked"); }

  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"); }

  get label() { return this.getAttribute("label") ?? ""; }
  set label(v) { this.setAttribute("label", v); }

  get name() { return this.getAttribute("name") ?? ""; }
  set name(v) { this.setAttribute("name", v); }

  get value() { return this.getAttribute("value") ?? "on"; }
  set value(v) { this.setAttribute("value", v); }

  render() {
    const input = this.shadowRoot?.querySelector("input");
    const labelText = this.shadowRoot?.querySelector(".label-text");
    if (!input || !labelText) return;

    input.checked = this.checked;
    input.disabled = this.disabled;
    if (this.name) input.name = this.name;
    labelText.textContent = this.label || this.textContent?.trim() || "";

    this._internals.setFormValue(this.checked ? this.value : null);
    this._internals.setValidity({});
  }
}

customElements.define("mw-checkbox", MwCheckbox);
