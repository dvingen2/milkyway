const switchTemplate = document.createElement("template");
switchTemplate.innerHTML = `
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

    .track {
      width: 3.25rem;
      height: 2rem;
      border-radius: 999px;
      border: 2px solid var(--color-outline);
      background: var(--layer-surface-2);
      padding: 0.125rem;
      display: inline-flex;
      align-items: center;
      transition:
        background var(--motion-fast),
        border-color var(--motion-fast);
      flex: 0 0 auto;
    }

    .thumb {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 999px;
      background: var(--color-outline);
      transition:
        transform var(--motion-fast),
        background var(--motion-fast);
    }

    label:hover .track {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--layer-surface-2);
    }

    input:focus-visible + .track {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    input:checked + .track {
      background: var(--color-primary-container);
      border-color: var(--color-primary);
    }

    input:checked + .track .thumb {
      background: var(--color-primary);
      transform: translateX(1.25rem);
    }

    input:disabled ~ .label-text {
      color: var(--state-disabled-content);
    }

    label:has(input:disabled) {
      cursor: not-allowed;
    }
  </style>
  <label>
    <input type="checkbox" role="switch" part="input" />
    <span class="track" part="track"><span class="thumb" part="thumb"></span></span>
    <span class="label-text" part="label"></span>
  </label>
`;

export class MwSwitch extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static get observedAttributes() { return ["checked", "disabled", "label", "name", "value"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(switchTemplate.content.cloneNode(true));
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

customElements.define("mw-switch", MwSwitch);
