const snackbarTemplate = document.createElement("template");
snackbarTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      position: fixed;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 400;
      pointer-events: none;
    }

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
      pointer-events: auto;
      white-space: nowrap;
      max-width: min(36rem, calc(100vw - 3rem));
      opacity: 0;
      transform: translateY(0.75rem) scale(0.97);
      transition:
        opacity var(--motion-fast),
        transform var(--motion-fast);
    }

    :host([visible]) .snackbar {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    .message { font: var(--type-body-medium); }

    .action {
      color: var(--color-inverse-primary);
      font: var(--type-label-large);
      background: transparent;
      border: 0;
      padding: 0 0.25rem;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .action:focus-visible {
      outline: 2px solid var(--color-inverse-primary);
      outline-offset: 2px;
      border-radius: 2px;
    }

    .action:empty { display: none; }
  </style>
  <div class="snackbar" part="snackbar">
    <span class="message" part="message"></span>
    <button class="action" part="action" type="button"></button>
  </div>
`;

/** @type {Array<{message: string, action?: string, duration?: number, onAction?: () => void}>} */
const _queue = [];
let _processing = false;

export class MwSnackbar extends HTMLElement {
  static get observedAttributes() { return ["message", "action"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(snackbarTemplate.content.cloneNode(true));
      this.shadowRoot.querySelector(".action").addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("mw-action", { bubbles: true, composed: true }));
        this._onAction?.();
        this._dismiss();
      });
    }
    this._render();
  }

  attributeChangedCallback() { if (this.shadowRoot) this._render(); }

  get message() { return this.getAttribute("message") ?? ""; }
  set message(v) { this.setAttribute("message", v); }

  get action() { return this.getAttribute("action") ?? ""; }
  set action(v) { this.setAttribute("action", v); }

  /**
   * Show a snackbar message immediately, queuing if another is already visible.
   * @param {string} message
   * @param {{ action?: string, duration?: number, onAction?: () => void }} [opts]
   */
  show(message, opts = {}) {
    _queue.push({ message, ...opts });
    if (!_processing) this._processQueue();
  }

  _processQueue() {
    if (_queue.length === 0) { _processing = false; return; }
    _processing = true;
    const { message, action = "", duration = 4000, onAction } = _queue.shift();

    this.message = message;
    this.action = action;
    this._onAction = onAction ?? null;

    // Show
    requestAnimationFrame(() => {
      this.setAttribute("visible", "");
    });

    this._dismissTimer = setTimeout(() => this._dismiss(), duration);
  }

  _dismiss() {
    clearTimeout(this._dismissTimer);
    this.removeAttribute("visible");

    this.dispatchEvent(new CustomEvent("mw-dismiss", { bubbles: true, composed: true }));

    // Wait for exit transition before processing next
    const delay = parseFloat(
      getComputedStyle(this).getPropertyValue("--motion-fast") || "150ms"
    ) || 150;
    setTimeout(() => this._processQueue(), delay + 50);
  }

  _render() {
    const message = this.shadowRoot?.querySelector(".message");
    const action = this.shadowRoot?.querySelector(".action");
    if (!message || !action) return;
    message.textContent = this.message;
    action.textContent = this.action;
  }
}

customElements.define("mw-snackbar", MwSnackbar);
