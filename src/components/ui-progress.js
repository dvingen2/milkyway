const progressLinearTemplate = document.createElement("template");
progressLinearTemplate.innerHTML = `
  <style>
    :host { display: block; width: 100%; }

    .track {
      width: 100%;
      height: 0.5rem;
      border-radius: 999px;
      background: var(--color-secondary-container);
      overflow: hidden;
    }

    .bar {
      height: 100%;
      border-radius: 999px;
      background: var(--color-primary);
      width: 0%;
      transition: width var(--motion-medium);
    }
  </style>
  <div class="track" part="track" role="progressbar" aria-valuemin="0" aria-valuemax="1">
    <div class="bar" part="bar"></div>
  </div>
`;

const progressCircularTemplate = document.createElement("template");
progressCircularTemplate.innerHTML = `
  <style>
    :host { display: inline-block; }

    .circular {
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
  </style>
  <div class="circular" part="circular" role="progressbar" aria-label="Loading"></div>
`;

export class MwProgress extends HTMLElement {
  static get observedAttributes() { return ["value", "kind"]; }

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

  render() {
    const kind = this.kind;
    const currentKind = this.shadowRoot.dataset.kind;

    if (currentKind !== kind) {
      this.shadowRoot.innerHTML = "";
      const template = kind === "circular" ? progressCircularTemplate : progressLinearTemplate;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.dataset.kind = kind;
    }

    if (kind === "linear") {
      const bar = this.shadowRoot.querySelector(".bar");
      const track = this.shadowRoot.querySelector(".track");
      const v = Math.max(0, Math.min(1, this.value));
      if (bar) bar.style.width = `${v * 100}%`;
      if (track) {
        track.setAttribute("aria-valuenow", String(v));
      }
    }
  }
}

customElements.define("mw-progress", MwProgress);
