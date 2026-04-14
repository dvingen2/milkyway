const sideSheetTemplate = document.createElement("template");
sideSheetTemplate.innerHTML = `
  <style>
    :host {
      display: contents;
    }

    /* Modal variant */
    dialog {
      all: unset;
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: stretch;
      justify-content: flex-end;
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

    /* Standard/persistent variant: no scrim, no modal */
    :host([variant="standard"]) dialog,
    :host([variant="modal"]) dialog {
      /* both use the same template; scrim hidden for standard */
    }

    :host([variant="standard"]) .scrim {
      display: none;
    }

    /* Side from left for navigation drawer */
    :host([side="left"]) dialog {
      justify-content: flex-start;
    }

    .sheet {
      position: relative;
      z-index: 1;
      width: min(24rem, 90vw);
      height: 100%;
      background: var(--layer-surface-1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateX(100%);
      transition: transform var(--motion-medium);
      box-shadow: var(--shadow-3);
    }

    :host([side="left"]) .sheet {
      transform: translateX(-100%);
      border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    }

    :host(:not([side="left"])) .sheet {
      border-radius: var(--radius-lg) 0 0 var(--radius-lg);
    }

    dialog[open] .sheet {
      transform: translateX(0);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 1.25rem 1.5rem 0.75rem;
      flex-shrink: 0;
      border-bottom: 1px solid var(--color-outline-variant);
    }

    .headline {
      font: var(--type-title-large);
      color: var(--color-on-surface);
      flex: 1;
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
      padding: 1rem 0;
      overflow-y: auto;
      flex: 1;
    }
  </style>
  <dialog part="dialog">
    <div class="scrim" part="scrim"></div>
    <div class="sheet" part="sheet" role="dialog" aria-modal="true">
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

export class MwSideSheet extends HTMLElement {
  static get observedAttributes() { return ["headline", "open", "variant", "side"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(sideSheetTemplate.content.cloneNode(true));

      const scrim = this.shadowRoot.querySelector(".scrim");
      const closeBtn = this.shadowRoot.querySelector(".close-btn");
      const dialog = this.shadowRoot.querySelector("dialog");

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

  /** "modal" (default) or "standard" */
  get variant() { return this.getAttribute("variant") ?? "modal"; }

  /** "right" (default) or "left" */
  get side() { return this.getAttribute("side") ?? "right"; }

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
    // Update sheet aria-label from headline
    const sheet = this.shadowRoot?.querySelector(".sheet");
    if (sheet) {
      const headline = this.getAttribute("headline") ?? "";
      if (headline) sheet.setAttribute("aria-label", headline);
    }
  }

  _syncHeadline() {
    const el = this.shadowRoot?.querySelector(".headline");
    if (!el) return;
    el.textContent = this.getAttribute("headline") ?? "";
  }

  _syncOpen() {
    const dialog = this.shadowRoot?.querySelector("dialog");
    if (!dialog) return;
    if (this.open) {
      dialog.setAttribute("open", "");
      const focusable = this.shadowRoot.querySelector(".sheet").querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    } else {
      dialog.removeAttribute("open");
    }
  }
}

customElements.define("mw-side-sheet", MwSideSheet);
