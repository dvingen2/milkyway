const sliderTemplate = document.createElement("template");
sliderTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }

    .wrapper {
      display: grid;
      gap: 0.5rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    label {
      font: var(--type-label-large);
      color: var(--color-on-surface);
    }

    .value-display {
      font: var(--type-label-medium);
      color: var(--color-on-surface-variant);
      min-width: 2rem;
      text-align: right;
    }

    .track-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      height: 2.75rem;
    }

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      background: transparent;
      cursor: pointer;
      outline: none;
    }

    input[type="range"]:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-radius: 999px;
    }

    input[type="range"]:disabled {
      cursor: not-allowed;
      opacity: 0.42;
    }

    input[type="range"]::-webkit-slider-runnable-track {
      height: 4px;
      border-radius: 999px;
      background: linear-gradient(
        to right,
        var(--color-primary) 0%,
        var(--color-primary) var(--_fill, 0%),
        var(--color-surface-variant) var(--_fill, 0%),
        var(--color-surface-variant) 100%
      );
    }

    input[type="range"]:disabled::-webkit-slider-runnable-track {
      background: linear-gradient(
        to right,
        var(--state-disabled-content) 0%,
        var(--state-disabled-content) var(--_fill, 0%),
        var(--state-disabled-surface) var(--_fill, 0%),
        var(--state-disabled-surface) 100%
      );
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background: var(--color-primary);
      margin-top: -0.525rem;
      transition:
        transform var(--motion-fast),
        box-shadow var(--motion-fast);
    }

    input[type="range"]:not(:disabled)::-webkit-slider-thumb:hover {
      transform: scale(1.15);
      box-shadow: 0 0 0 0.75rem rgb(from var(--color-primary) r g b / 0.08);
    }

    input[type="range"]:not(:disabled):active::-webkit-slider-thumb {
      transform: scale(1.2);
      box-shadow: 0 0 0 1rem rgb(from var(--color-primary) r g b / 0.12);
    }

    input[type="range"]:disabled::-webkit-slider-thumb {
      background: var(--state-disabled-content);
    }

    /* Firefox */
    input[type="range"]::-moz-range-track {
      height: 4px;
      border-radius: 999px;
      background: var(--color-surface-variant);
    }

    input[type="range"]::-moz-range-progress {
      height: 4px;
      border-radius: 999px;
      background: var(--color-primary);
    }

    input[type="range"]::-moz-range-thumb {
      border: none;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background: var(--color-primary);
      cursor: pointer;
    }

    .ticks {
      display: flex;
      justify-content: space-between;
      padding: 0 0.625rem;
      margin-top: -0.25rem;
    }

    .tick {
      font: var(--type-label-small);
      color: var(--color-on-surface-variant);
      text-align: center;
    }
  </style>
  <div class="wrapper" part="wrapper">
    <div class="header">
      <label part="label"></label>
      <span class="value-display" part="value" aria-live="polite"></span>
    </div>
    <div class="track-wrapper" part="track-wrapper">
      <input type="range" part="input">
    </div>
    <div class="ticks" part="ticks"></div>
  </div>
`;

export class MwSlider extends HTMLElement {
  static get observedAttributes() {
    return ["label", "min", "max", "step", "value", "disabled", "show-value", "ticks"];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(sliderTemplate.content.cloneNode(true));
      this._input = this.shadowRoot.querySelector("input");
      this._input.addEventListener("input", () => this._onInput());
      this._input.addEventListener("change", () => this._onChange());
    }
    this._sync();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._sync();
  }

  get value() { return Number(this.getAttribute("value") ?? this.getAttribute("min") ?? 0); }
  set value(v) { this.setAttribute("value", v); }

  get min() { return Number(this.getAttribute("min") ?? 0); }
  get max() { return Number(this.getAttribute("max") ?? 100); }
  get step() { return Number(this.getAttribute("step") ?? 1); }
  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(v) { v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"); }

  _sync() {
    const input = this.shadowRoot?.querySelector("input");
    if (!input) return;

    const label = this.shadowRoot.querySelector("label");
    const valueDisplay = this.shadowRoot.querySelector(".value-display");
    const ticks = this.shadowRoot.querySelector(".ticks");

    input.min = this.min;
    input.max = this.max;
    input.step = this.step;
    input.value = this.value;
    input.disabled = this.disabled;

    label.textContent = this.getAttribute("label") ?? "";
    label.hidden = !this.getAttribute("label");

    if (this.hasAttribute("show-value")) {
      valueDisplay.textContent = this.value;
    } else {
      valueDisplay.textContent = "";
    }

    this._updateFill(input);

    // Tick marks
    if (this.hasAttribute("ticks")) {
      const steps = Math.round((this.max - this.min) / this.step);
      const count = Math.min(steps + 1, 21);
      ticks.innerHTML = Array.from({ length: count }, (_, i) => {
        const val = this.min + (this.max - this.min) * (i / (count - 1));
        return `<span class="tick">${Math.round(val)}</span>`;
      }).join("");
    } else {
      ticks.innerHTML = "";
    }
  }

  _updateFill(input) {
    const pct = ((input.value - this.min) / (this.max - this.min)) * 100;
    input.style.setProperty("--_fill", `${pct}%`);
  }

  _onInput() {
    const input = this.shadowRoot.querySelector("input");
    this._updateFill(input);
    if (this.hasAttribute("show-value")) {
      this.shadowRoot.querySelector(".value-display").textContent = input.value;
    }
    this.dispatchEvent(new CustomEvent("mw-change", {
      bubbles: true,
      composed: true,
      detail: { value: Number(input.value) },
    }));
  }

  _onChange() {
    const input = this.shadowRoot.querySelector("input");
    this.setAttribute("value", input.value);
  }
}

customElements.define("mw-slider", MwSlider);
