const snackbarTemplate = document.createElement("template");
snackbarTemplate.innerHTML = `
  <style>
    :host { display: block; width: 100%; }

    .snackbar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
      justify-content: space-between;
      min-height: 3rem;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      background: var(--color-inverse-surface);
      color: var(--color-inverse-on-surface);
      box-shadow: var(--shadow-2);
    }

    .message { font: var(--type-body-medium); }

    .action {
      color: var(--color-inverse-primary);
      font: var(--type-label-large);
      background: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
    }

    .action:empty { display: none; }
  </style>
  <div class="snackbar" part="snackbar">
    <span class="message" part="message"></span>
    <button class="action" part="action" type="button"></button>
  </div>
`;

export class DsSnackbar extends HTMLElement {
  static get observedAttributes() { return ["message", "action"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(snackbarTemplate.content.cloneNode(true));
      this.shadowRoot.querySelector(".action").addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("ds-action", { bubbles: true, composed: true }));
      });
    }
    this.render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this.render(); }

  get message() { return this.getAttribute("message") ?? ""; }
  set message(v) { this.setAttribute("message", v); }

  get action() { return this.getAttribute("action") ?? ""; }
  set action(v) { this.setAttribute("action", v); }

  render() {
    const message = this.shadowRoot?.querySelector(".message");
    const action = this.shadowRoot?.querySelector(".action");
    if (!message || !action) return;
    message.textContent = this.message;
    action.textContent = this.action;
  }
}

customElements.define("ds-snackbar", DsSnackbar);
