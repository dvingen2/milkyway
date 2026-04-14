const dividerTemplate = document.createElement("template");
dividerTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }

    hr {
      margin: 0;
      width: 100%;
      border: 0;
      border-top: 1px solid var(--color-outline-variant);
    }

    hr.inset {
      width: calc(100% - 1.5rem);
      margin-left: 1.5rem;
    }

    hr.middle {
      width: calc(100% - 3rem);
      margin-left: 1.5rem;
      margin-right: 1.5rem;
    }
  </style>
  <hr part="divider" />
`;

export class MwDivider extends HTMLElement {
  static get observedAttributes() { return ["variant"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(dividerTemplate.content.cloneNode(true));
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  get variant() { return this.getAttribute("variant") ?? ""; }
  set variant(v) { this.setAttribute("variant", v); }

  render() {
    const hr = this.shadowRoot?.querySelector("hr");
    if (!hr) return;
    hr.className = this.variant;
  }
}

customElements.define("mw-divider", MwDivider);
