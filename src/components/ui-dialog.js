const dialogTemplate = document.createElement("template");
dialogTemplate.innerHTML = `
  <style>
    :host {
      display: contents;
    }

    dialog {
      padding: 0;
      border: none;
      border-radius: var(--radius-lg);
      background: var(--layer-surface);
      color: var(--color-on-surface);
      box-shadow: var(--shadow-3);
      width: min(36rem, calc(100vw - 3rem));
      max-height: calc(100vh - 6rem);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    dialog::backdrop {
      background: rgb(from var(--color-on-surface) r g b / 0.32);
      backdrop-filter: blur(2px);
      animation: backdrop-in var(--motion-medium) ease forwards;
    }

    @keyframes backdrop-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    dialog[open] {
      animation: dialog-in var(--motion-medium) cubic-bezier(0.2, 0, 0, 1) forwards;
    }

    @keyframes dialog-in {
      from { opacity: 0; transform: translateY(0.5rem) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    dialog:not([open]) {
      display: none;
    }

    .dialog-inner {
      display: grid;
      gap: 0;
      overflow: hidden;
    }

    .dialog-header {
      display: grid;
      gap: 0.35rem;
      padding: 1.5rem 1.5rem 1rem;
      border-bottom: 1px solid var(--color-outline-variant);
    }

    .dialog-header:has(.dialog-icon:empty) {
      padding-top: 1.5rem;
    }

    .dialog-icon {
      font: var(--type-headline-medium);
      color: var(--color-primary);
      line-height: 1;
    }

    .dialog-icon:empty {
      display: none;
    }

    .dialog-headline {
      margin: 0;
      font: var(--type-title-large);
      color: var(--color-on-surface);
    }

    .dialog-body {
      padding: 1rem 1.5rem;
      overflow-y: auto;
      overscroll-behavior: contain;
      font: var(--type-body-medium);
      color: var(--color-on-surface-variant);
      flex: 1;
    }

    .dialog-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--color-outline-variant);
    }

    .dialog-actions:empty {
      display: none;
    }
  </style>
  <dialog part="dialog">
    <div class="dialog-inner">
      <div class="dialog-header" part="header">
        <span class="dialog-icon" part="icon"></span>
        <h2 class="dialog-headline" part="headline" id="dialog-headline"></h2>
      </div>
      <div class="dialog-body" part="body">
        <slot></slot>
      </div>
      <div class="dialog-actions" part="actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </dialog>
`;

export class MwDialog extends HTMLElement {
  static get observedAttributes() {
    return ["headline", "icon", "open", "persistent"];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(dialogTemplate.content.cloneNode(true));
      this._setupListeners();
    }
    this.render();
  }

  _setupListeners() {
    const dialog = this.shadowRoot.querySelector("dialog");

    // Close on native cancel (Escape key)
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      if (!this.persistent) this._dismiss();
    });

    // Close on backdrop click
    dialog.addEventListener("click", (e) => {
      if (!this.persistent && e.target === dialog) {
        this._dismiss();
      }
    });
  }

  _dismiss() {
    this.removeAttribute("open");
    this.dispatchEvent(new CustomEvent("mw-close", {
      bubbles: true,
      composed: true,
    }));
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot) return;
    if (name === "open") {
      const dialog = this.shadowRoot.querySelector("dialog");
      if (this.hasAttribute("open")) {
        if (!dialog.open) dialog.showModal();
      } else {
        if (dialog.open) dialog.close();
      }
    } else {
      this.render();
    }
  }

  /** Open the dialog. */
  showModal() {
    this.setAttribute("open", "");
  }

  /** Close the dialog programmatically. */
  close() {
    this._dismiss();
  }

  get headline() { return this.getAttribute("headline") ?? ""; }
  set headline(v) { this.setAttribute("headline", v); }

  get icon() { return this.getAttribute("icon") ?? ""; }
  set icon(v) { this.setAttribute("icon", v); }

  get persistent() { return this.hasAttribute("persistent"); }
  set persistent(v) { v ? this.setAttribute("persistent", "") : this.removeAttribute("persistent"); }

  render() {
    const headlineEl = this.shadowRoot?.querySelector(".dialog-headline");
    const iconEl = this.shadowRoot?.querySelector(".dialog-icon");
    if (!headlineEl || !iconEl) return;

    headlineEl.textContent = this.headline;
    headlineEl.id = "dialog-headline";
    iconEl.textContent = this.icon;

    const dialog = this.shadowRoot.querySelector("dialog");
    dialog.setAttribute("aria-labelledby", "dialog-headline");
  }
}

customElements.define("mw-dialog", MwDialog);
