const badgeTemplate = document.createElement("template");
badgeTemplate.innerHTML = `
  <style>
    :host { display: inline-flex; }
    .badge {
      min-width: 1.125rem;
      height: 1.125rem;
      padding: 0 0.375rem;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--color-error);
      color: var(--color-on-error);
      font: var(--type-label-medium);
    }
    .badge.dot {
      width: 0.5rem;
      min-width: 0.5rem;
      height: 0.5rem;
      padding: 0;
    }
  </style>
  <span class="badge" part="badge"></span>
`;

export class MwBadge extends HTMLElement {
  static get observedAttributes() { return ["value", "variant"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(badgeTemplate.content.cloneNode(true));
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  get value() { return this.getAttribute("value") ?? "1"; }
  set value(v) { this.setAttribute("value", v); }

  get variant() { return this.getAttribute("variant") ?? "numeric"; }
  set variant(v) { this.setAttribute("variant", v); }

  render() {
    const badge = this.shadowRoot?.querySelector(".badge");
    if (!badge) return;
    const variant = this.variant;
    badge.className = `badge ${variant === "dot" ? "dot" : ""}`.trim();
    badge.textContent = variant === "dot" ? "" : this.value;
  }
}

customElements.define("mw-badge", MwBadge);
