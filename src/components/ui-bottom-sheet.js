const bottomSheetTemplate = document.createElement("template");
bottomSheetTemplate.innerHTML = `
  <style>
    :host {
      display: contents;
    }

    dialog {
      all: unset;
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      z-index: 300;
      pointer-events: none;
    }

    dialog[open] {
      pointer-events: auto;
    }

    .scrim {
      position: absolute;
      inset: 0;
      background: rgb(from var(--color-scrim, #000) r g b / 0.32);
      opacity: 0;
      transition: opacity var(--motion-medium);
    }

    dialog[open] .scrim {
      opacity: 1;
    }

    .sheet {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 40rem;
      max-height: 90dvh;
      border-radius: var(--radius-xl) var(--radius-xl) 0 0;
      background: var(--layer-surface-1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(100%);
      transition: transform var(--motion-medium);
      box-shadow: var(--shadow-3);
    }

    dialog[open] .sheet {
      transform: translateY(0);
    }

    .handle-wrap {
      display: flex;
      justify-content: center;
      padding: 0.75rem 0 0;
      flex-shrink: 0;
    }

    .handle {
      width: 2rem;
      height: 0.25rem;
      border-radius: 999px;
      background: var(--color-on-surface-variant);
      opacity: 0.4;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.75rem 1.5rem 0.25rem;
      flex-shrink: 0;
    }

    .headline {
      font: var(--type-title-large);
      color: var(--color-on-surface);
    }

    .close-btn {
      display: inline-grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 999px;
      border: 0;
      background: transparent;
      color: var(--color-on-surface-variant);
      font-size: 1.25rem;
      cursor: pointer;
      flex-shrink: 0;
      transition: background var(--motion-fast);
    }

    .close-btn:hover {
      background: var(--state-hover);
    }

    .close-btn:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    .body {
      padding: 0.75rem 1.5rem 1.5rem;
      overflow-y: auto;
      flex: 1;
    }
  </style>
  <dialog part="dialog">
    <div class="scrim" part="scrim"></div>
    <div class="sheet" part="sheet">
      <div class="handle-wrap" aria-hidden="true">
        <div class="handle"></div>
      </div>
      <div class="header" part="header">
        <span class="headline" part="headline"></span>
        <button class="close-btn" type="button" aria-label="Close" part="close-button">close</button>
      </div>
      <div class="body" part="body">
        <slot></slot>
      </div>
    </div>
  </dialog>
`;

export class MwBottomSheet extends HTMLElement {
  static get observedAttributes() { return ["headline", "open"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(bottomSheetTemplate.content.cloneNode(true));

      const dialog = this.shadowRoot.querySelector("dialog");
      const scrim = this.shadowRoot.querySelector(".scrim");
      const closeBtn = this.shadowRoot.querySelector(".close-btn");

      scrim.addEventListener("click", () => this.close());
      closeBtn.addEventListener("click", () => this.close());

      dialog.addEventListener("keydown", (e) => {
        if (e.key === "Escape") { e.preventDefault(); this.close(); }
      });
    }
    this._sync();
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot) return;
    if (name === "headline") this._syncHeadline();
    if (name === "open") this._syncOpen();
  }

  get open() { return this.hasAttribute("open"); }
  set open(v) { v ? this.setAttribute("open", "") : this.removeAttribute("open"); }

  show() { this.open = true; }

  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("mw-close", {
      bubbles: true, composed: true,
    }));
  }

  _sync() {
    this._syncHeadline();
    this._syncOpen();
  }

  _syncHeadline() {
    const el = this.shadowRoot?.querySelector(".headline");
    if (!el) return;
    const headline = this.getAttribute("headline") ?? "";
    el.textContent = headline;
    el.hidden = !headline;

    const header = this.shadowRoot.querySelector(".header");
    const hasClose = !this.hasAttribute("no-close-button");
    header.hidden = !headline && !hasClose;
  }

  _syncOpen() {
    const dialog = this.shadowRoot?.querySelector("dialog");
    if (!dialog) return;
    if (this.open) {
      dialog.setAttribute("open", "");
      // Trap focus inside sheet
      const sheet = this.shadowRoot.querySelector(".sheet");
      const focusable = sheet.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    } else {
      dialog.removeAttribute("open");
    }
  }
}

customElements.define("mw-bottom-sheet", MwBottomSheet);
