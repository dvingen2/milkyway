const progressLinearTemplate = document.createElement("template");
progressLinearTemplate.innerHTML = `
  <style>
    :host { display: block; width: 100%; }

    .wrapper {
      display: grid;
      gap: 0.375rem;
    }

    .top-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 0.5rem;
    }

    .label-text {
      font: var(--type-label-medium);
      color: var(--color-on-surface-variant);
    }

    .pct-text {
      font: var(--type-label-medium);
      color: var(--color-on-surface-variant);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .top-row:empty { display: none; }
    .label-text:empty { display: none; }
    .pct-text:empty { display: none; }

    .track {
      width: 100%;
      height: 0.5rem;
      border-radius: 999px;
      background: var(--color-secondary-container);
      overflow: hidden;
      position: relative;
    }

    .bar {
      height: 100%;
      border-radius: 999px;
      background: var(--color-primary);
      width: 0%;
      transition: width var(--motion-medium);
    }

    /* Indeterminate animation */
    :host([indeterminate]) .bar {
      width: 40%;
      animation: indeterminate-linear 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes indeterminate-linear {
      0%   { transform: translateX(-100%); }
      50%  { transform: translateX(150%); }
      100% { transform: translateX(150%); }
    }
  </style>
  <div class="wrapper" part="wrapper">
    <div class="top-row" part="top-row">
      <span class="label-text" part="label"></span>
      <span class="pct-text" part="percentage" aria-live="polite"></span>
    </div>
    <div class="track" part="track" role="progressbar" aria-valuemin="0" aria-valuemax="1">
      <div class="bar" part="bar"></div>
    </div>
  </div>
`;

const progressCircularTemplate = document.createElement("template");
progressCircularTemplate.innerHTML = `
  <style>
    :host { display: inline-flex; align-items: center; gap: 0.75rem; }

    .circular {
      flex-shrink: 0;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 999px;
      border: 0.25rem solid var(--color-secondary-container);
      border-top-color: var(--color-primary);
      box-sizing: border-box;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .circular-label {
      font: var(--type-label-medium);
      color: var(--color-on-surface-variant);
    }

    .circular-label:empty { display: none; }
  </style>
  <div class="circular" part="circular" role="progressbar" aria-label="Loading"></div>
  <span class="circular-label" part="label"></span>
`;

export class MwProgress extends HTMLElement {
  static get observedAttributes() { return ["value", "kind", "label", "show-percentage", "indeterminate"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  get value() { return Number(this.getAttribute("value") ?? "0"); }
  set value(v) { this.setAttribute("value", String(v)); }

  get kind() { return this.getAttribute("kind") ?? "linear"; }
  set kind(v) { this.setAttribute("kind", v); }

  get label() { return this.getAttribute("label") ?? ""; }
  set label(v) { v ? this.setAttribute("label", v) : this.removeAttribute("label"); }

  get indeterminate() { return this.hasAttribute("indeterminate"); }
  set indeterminate(v) { v ? this.setAttribute("indeterminate", "") : this.removeAttribute("indeterminate"); }

  render() {
    const kind = this.kind;
    const currentKind = this.shadowRoot.dataset.kind;

    if (currentKind !== kind) {
      this.shadowRoot.innerHTML = "";
      const template = kind === "circular" ? progressCircularTemplate : progressLinearTemplate;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.dataset.kind = kind;
    }

    const labelText = this.label;
    const v = Math.max(0, Math.min(1, this.value));

    if (kind === "linear") {
      const bar = this.shadowRoot.querySelector(".bar");
      const track = this.shadowRoot.querySelector(".track");
      const labelEl = this.shadowRoot.querySelector(".label-text");
      const pctEl = this.shadowRoot.querySelector(".pct-text");

      if (!this.indeterminate && bar) bar.style.width = `${v * 100}%`;
      if (track) {
        if (!this.indeterminate) {
          track.setAttribute("aria-valuenow", String(v));
        } else {
          track.removeAttribute("aria-valuenow");
          track.setAttribute("aria-label", labelText || "Loading");
        }
      }
      if (labelEl) labelEl.textContent = labelText;
      if (pctEl) {
        pctEl.textContent = (this.hasAttribute("show-percentage") && !this.indeterminate)
          ? `${Math.round(v * 100)}%`
          : "";
      }
    } else {
      const labelEl = this.shadowRoot.querySelector(".circular-label");
      if (labelEl) labelEl.textContent = labelText;
    }
  }
}

customElements.define("mw-progress", MwProgress);
