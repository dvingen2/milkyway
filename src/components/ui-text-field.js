const fieldTemplate = document.createElement("template");
fieldTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }

    label {
      display: grid;
      gap: 0.45rem;
      width: 100%;
    }

    .label-text {
      font: var(--type-label-medium);
      color: var(--color-on-surface-variant);
    }

    .field-wrap {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 0.75rem;
      padding: 0 1rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-outline);
      background: var(--layer-surface-1);
      transition:
        border-color var(--motion-fast),
        background var(--motion-fast),
        box-shadow var(--motion-fast);
    }

    .field-wrap:hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--layer-surface-1);
    }

    :host([variant="filled"]) .field-wrap {
      background: var(--layer-surface-2);
      border-color: transparent;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      box-shadow: inset 0 -1px 0 var(--color-outline);
    }

    :host([variant="filled"]) .field-wrap:hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--layer-surface-2);
    }

    :host([error]) .field-wrap {
      border-color: var(--color-error);
    }

    :host([variant="filled"][error]) .field-wrap {
      border-color: transparent;
      box-shadow: inset 0 -1px 0 var(--color-error);
    }

    .field-wrap:focus-within {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--state-focus);
    }

    :host([error]) .field-wrap:focus-within {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px rgb(from var(--color-error) r g b / 0.2);
    }

    input,
    textarea {
      border: 0;
      background: transparent;
      padding: 0.75rem 0;
      width: 100%;
      color: var(--color-on-surface);
      font: var(--type-body-large);
      outline: none;
      resize: vertical;
      min-width: 0;
    }

    :host([multiline]) .field-wrap {
      align-items: start;
    }

    :host([multiline]) input,
    :host([multiline]) textarea {
      padding: 0.95rem 0;
    }

    .affix {
      color: var(--color-on-surface-variant);
      font: var(--type-body-large);
      display: inline-flex;
      align-items: center;
      min-width: 1rem;
      flex-shrink: 0;
    }

    :host([multiline]) .affix {
      padding-top: 0.95rem;
      align-self: start;
    }

    .affix:empty {
      min-width: 0;
      padding: 0;
    }

    :host([error]) .affix.trailing {
      color: var(--color-error);
    }

    .support {
      font: var(--type-label-medium);
      color: var(--color-on-surface-variant);
    }

    :host([error]) .support {
      color: var(--color-error);
    }

    .support:empty { display: none; }

    .support-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 0.5rem;
    }

    .char-count {
      font: var(--type-label-medium);
      color: var(--color-on-surface-variant);
      white-space: nowrap;
      flex-shrink: 0;
    }

    :host([error]) .char-count {
      color: var(--color-error);
    }

    .char-count:empty { display: none; }
  </style>
  <label>
    <span class="label-text" part="label"></span>
    <div class="field-wrap" part="field-wrap">
      <span class="affix leading" part="leading"></span>
      <input class="input" part="input" />
      <span class="affix trailing" part="trailing"></span>
    </div>
    <div class="support-row">
      <span class="support" part="support"></span>
      <span class="char-count" part="char-count"></span>
    </div>
  </label>
`;

export class MwTextField extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static get observedAttributes() {
    return ["label", "value", "multiline", "variant", "helper", "error", "leading", "trailing", "placeholder", "name", "disabled", "required", "maxlength"];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(fieldTemplate.content.cloneNode(true));
    }
    this._setupInput();
    this.render();
  }

  _setupInput() {
    const multiline = this.hasAttribute("multiline");
    const fieldWrap = this.shadowRoot.querySelector(".field-wrap");
    const oldInput = this.shadowRoot.querySelector(".input");

    if ((multiline && oldInput.tagName === "INPUT") || (!multiline && oldInput.tagName === "TEXTAREA")) {
      const newInput = document.createElement(multiline ? "textarea" : "input");
      newInput.className = "input";
      newInput.part = "input";
      if (multiline) newInput.rows = 4;
      else newInput.type = "text";
      fieldWrap.replaceChild(newInput, oldInput);
    }

    const input = this.shadowRoot.querySelector(".input");
    input.addEventListener("input", () => {
      this._internals.setFormValue(input.value);
      this._updateCharCount();
      this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    });
    input.addEventListener("change", () => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot) return;
    // Rebuild input element if multiline changes
    if (name === "multiline") this._setupInput();
    this.render();
  }

  get label() { return this.getAttribute("label") ?? ""; }
  set label(v) { this.setAttribute("label", v); }

  get value() { return this.shadowRoot?.querySelector(".input")?.value ?? this.getAttribute("value") ?? ""; }
  set value(v) {
    const input = this.shadowRoot?.querySelector(".input");
    if (input) input.value = v;
    this.setAttribute("value", v);
    this._internals?.setFormValue(v);
  }

  get placeholder() { return this.getAttribute("placeholder") ?? ""; }
  set placeholder(v) { this.setAttribute("placeholder", v); }

  get helper() { return this.getAttribute("helper") ?? ""; }
  set helper(v) { this.setAttribute("helper", v); }

  get error() { return this.getAttribute("error") ?? ""; }
  set error(v) { v ? this.setAttribute("error", v) : this.removeAttribute("error"); }

  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"); }

  get required() { return this.hasAttribute("required"); }
  set required(v) { v ? this.setAttribute("required", "") : this.removeAttribute("required"); }

  get name() { return this.getAttribute("name") ?? ""; }
  set name(v) { this.setAttribute("name", v); }

  get maxlength() { return this.hasAttribute("maxlength") ? Number(this.getAttribute("maxlength")) : null; }
  set maxlength(v) { v != null ? this.setAttribute("maxlength", v) : this.removeAttribute("maxlength"); }

  _updateCharCount() {
    const charCount = this.shadowRoot?.querySelector(".char-count");
    if (!charCount) return;
    const max = this.maxlength;
    if (max == null) { charCount.textContent = ""; return; }
    const current = this.shadowRoot.querySelector(".input")?.value?.length ?? 0;
    charCount.textContent = `${current} / ${max}`;
  }

  render() {
    const labelText = this.shadowRoot?.querySelector(".label-text");
    const input = this.shadowRoot?.querySelector(".input");
    const leading = this.shadowRoot?.querySelector(".leading");
    const trailing = this.shadowRoot?.querySelector(".trailing");
    const support = this.shadowRoot?.querySelector(".support");
    if (!labelText || !input || !leading || !trailing || !support) return;

    labelText.textContent = this.label;
    if (input.value !== (this.getAttribute("value") ?? "")) {
      input.value = this.getAttribute("value") ?? "";
    }
    if (this.placeholder) input.placeholder = this.placeholder;
    input.disabled = this.disabled;
    if (this.name) input.name = this.name;
    if (this.required) input.required = true;
    if (this.maxlength != null) input.maxLength = this.maxlength;

    leading.textContent = this.getAttribute("leading") ?? "";
    trailing.textContent = this.error ? this.getAttribute("trailing") ?? "" : this.getAttribute("trailing") ?? "";

    const errorText = this.error;
    const helperText = this.helper;
    support.textContent = errorText || helperText;

    this._internals.setFormValue(input.value);
    this._updateCharCount();
    if (this.required && !input.value) {
      this._internals.setValidity({ valueMissing: true }, "This field is required", input);
    } else {
      this._internals.setValidity({});
    }
  }
}

customElements.define("mw-text-field", MwTextField);
