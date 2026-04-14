const selectTemplate = document.createElement("template");
selectTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }

    .field {
      position: relative;
      display: grid;
    }

    label {
      font: var(--type-label-small);
      color: var(--color-on-surface-variant);
      margin-bottom: 0.375rem;
      padding-inline: 1rem;
    }

    .trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      height: 3.5rem;
      padding: 0 1rem;
      border-radius: var(--radius-xs);
      border: 1px solid var(--color-outline);
      background: var(--layer-surface-1);
      color: var(--color-on-surface);
      font: var(--type-body-large);
      cursor: pointer;
      text-align: left;
      transition:
        border-color var(--motion-fast),
        background var(--motion-fast);
    }

    .trigger:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
      border-color: var(--color-primary);
    }

    .trigger:not(:disabled):hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--layer-surface-1);
    }

    .trigger:disabled {
      cursor: not-allowed;
      opacity: 0.42;
    }

    .trigger-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .trigger-text.placeholder {
      color: var(--color-on-surface-variant);
    }

    .arrow {
      flex-shrink: 0;
      font-size: 1.25rem;
      line-height: 1;
      color: var(--color-on-surface-variant);
      transition: transform var(--motion-fast);
    }

    :host([open]) .arrow {
      transform: rotate(180deg);
    }

    .listbox-wrapper {
      position: absolute;
      top: calc(100% + 0.25rem);
      left: 0;
      right: 0;
      z-index: 200;
      border-radius: var(--radius-xs);
      background: var(--layer-surface-2);
      border: 1px solid var(--color-outline-variant);
      box-shadow: var(--shadow-2);
      overflow: hidden;
      max-height: 18rem;
      overflow-y: auto;
      display: none;
      animation: select-in var(--motion-fast) ease;
    }

    :host([open]) .listbox-wrapper {
      display: block;
    }

    @keyframes select-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0.375rem 0;
    }

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      font: var(--type-body-large);
      color: var(--color-on-surface);
      cursor: pointer;
      transition: background var(--motion-fast);
    }

    li:hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--layer-surface-2);
    }

    li[aria-selected="true"] {
      background:
        linear-gradient(0deg, var(--state-selection), var(--state-selection)),
        var(--color-secondary-container);
      color: var(--color-on-secondary-container);
    }

    li[aria-disabled="true"] {
      opacity: 0.42;
      cursor: not-allowed;
      pointer-events: none;
    }

    .check-icon {
      width: 1.25rem;
      font-size: 1rem;
      line-height: 1;
      text-align: center;
    }

    .supporting {
      font: var(--type-body-small);
      color: var(--color-on-surface-variant);
      padding-inline: 1rem;
      margin-top: 0.25rem;
    }

    .supporting.error {
      color: var(--color-error);
    }

    :host([error]) .trigger {
      border-color: var(--color-error);
    }

    :host([error]) label {
      color: var(--color-error);
    }
  </style>
  <div class="field" part="field">
    <label part="label"></label>
    <button class="trigger" type="button" part="trigger" aria-haspopup="listbox" aria-expanded="false">
      <span class="trigger-text placeholder" part="trigger-text"></span>
      <span class="arrow" aria-hidden="true">expand_more</span>
    </button>
    <div class="listbox-wrapper" part="listbox-wrapper">
      <ul role="listbox" part="listbox"></ul>
    </div>
    <span class="supporting" part="supporting"></span>
  </div>
`;

export class MwSelect extends HTMLElement {
  static get observedAttributes() {
    return ["label", "placeholder", "value", "options", "disabled", "supporting", "error"];
  }

  _options = null;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(selectTemplate.content.cloneNode(true));

      const trigger = this.shadowRoot.querySelector(".trigger");
      trigger.addEventListener("click", () => this._toggle());
      trigger.addEventListener("keydown", (e) => this._onTriggerKey(e));

      this.shadowRoot.querySelector("ul").addEventListener("keydown", (e) => this._onListKey(e));

      document.addEventListener("click", (e) => {
        if (!this.contains(e.target) && !this.shadowRoot.contains(e.target)) {
          this._close();
        }
      });
    }
    this._sync();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._sync();
  }

  get options() {
    if (this._options !== null) return this._options;
    try { return JSON.parse(this.getAttribute("options") || "[]"); }
    catch { return []; }
  }

  set options(v) {
    this._options = v;
    this._sync();
  }

  get value() { return this.getAttribute("value") ?? ""; }
  set value(v) { v ? this.setAttribute("value", v) : this.removeAttribute("value"); }

  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"); }

  _sync() {
    const label = this.shadowRoot?.querySelector("label");
    const trigger = this.shadowRoot?.querySelector(".trigger");
    const triggerText = this.shadowRoot?.querySelector(".trigger-text");
    const supporting = this.shadowRoot?.querySelector(".supporting");
    const ul = this.shadowRoot?.querySelector("ul");
    if (!trigger) return;

    label.textContent = this.getAttribute("label") ?? "";
    label.hidden = !this.getAttribute("label");

    // Update trigger text
    const selected = this.options.find((o) => (o.value ?? o.label) === this.value);
    const placeholder = this.getAttribute("placeholder") ?? "Select an option";
    triggerText.textContent = selected ? selected.label : placeholder;
    triggerText.classList.toggle("placeholder", !selected);

    trigger.disabled = this.disabled;
    trigger.setAttribute("aria-expanded", this.hasAttribute("open") ? "true" : "false");

    // Supporting text
    const supportingText = this.getAttribute("supporting") ?? "";
    supporting.textContent = supportingText;
    supporting.hidden = !supportingText;
    supporting.classList.toggle("error", this.hasAttribute("error"));

    // Build list
    ul.innerHTML = this.options.map((opt) => {
      const val = opt.value ?? opt.label;
      const isSelected = val === this.value;
      return `
        <li
          role="option"
          aria-selected="${isSelected}"
          ${opt.disabled ? 'aria-disabled="true"' : ""}
          data-value="${val}"
          tabindex="-1"
        >
          <span class="check-icon" aria-hidden="true">${isSelected ? "✓" : ""}</span>
          <span>${opt.label}</span>
        </li>
      `;
    }).join("");

    ul.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => this._selectValue(li.dataset.value));
    });
  }

  _toggle() {
    if (this.disabled) return;
    if (this.hasAttribute("open")) this._close();
    else this._open();
  }

  _open() {
    this.setAttribute("open", "");
    this.shadowRoot.querySelector(".trigger").setAttribute("aria-expanded", "true");
    // Focus first/selected item
    const items = this.shadowRoot.querySelectorAll("li:not([aria-disabled])");
    const selected = [...items].find((li) => li.getAttribute("aria-selected") === "true") ?? items[0];
    selected?.focus();
  }

  _close() {
    this.removeAttribute("open");
    this.shadowRoot.querySelector(".trigger")?.setAttribute("aria-expanded", "false");
  }

  _selectValue(val) {
    const prev = this.value;
    this.value = val;
    this._close();
    this.shadowRoot.querySelector(".trigger").focus();
    if (val !== prev) {
      const opt = this.options.find((o) => (o.value ?? o.label) === val);
      this.dispatchEvent(new CustomEvent("mw-change", {
        bubbles: true, composed: true,
        detail: { value: val, option: opt },
      }));
    }
  }

  _onTriggerKey(e) {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      this._open();
    } else if (e.key === "Escape") {
      this._close();
    }
  }

  _onListKey(e) {
    const items = [...this.shadowRoot.querySelectorAll("li:not([aria-disabled])")];
    const current = this.shadowRoot.activeElement ?? document.activeElement;
    const idx = items.indexOf(current);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[Math.min(idx + 1, items.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idx <= 0) { this._close(); this.shadowRoot.querySelector(".trigger").focus(); }
      else items[idx - 1]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (current?.dataset?.value) this._selectValue(current.dataset.value);
    } else if (e.key === "Escape") {
      this._close();
      this.shadowRoot.querySelector(".trigger").focus();
    }
  }
}

customElements.define("mw-select", MwSelect);
