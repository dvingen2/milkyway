const chipTemplate = document.createElement("template");
chipTemplate.innerHTML = `
  <style>
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      min-height: 2rem;
      padding: 0.45rem 0.9rem;
      border-radius: var(--radius-full);
      border: 1px solid var(--color-outline-variant);
      background: var(--layer-surface-1);
      color: var(--color-on-surface-variant);
      cursor: pointer;
      font: var(--type-label-medium);
      white-space: nowrap;
      transition:
        background var(--motion-fast),
        color var(--motion-fast),
        border-color var(--motion-fast);
    }

    button:focus-visible {
      outline: 3px solid var(--state-focus);
      outline-offset: 2px;
    }

    button:hover {
      background:
        linear-gradient(0deg, var(--state-hover), var(--state-hover)),
        var(--layer-surface-1);
    }

    button.assist,
    button.suggestion {
      background: var(--layer-surface-1);
      color: var(--color-on-surface-variant);
    }

    button.assist {
      border-color: var(--color-outline);
    }

    button.suggestion {
      background:
        linear-gradient(0deg, rgb(from var(--color-primary) r g b / 0.08), rgb(from var(--color-primary) r g b / 0.08)),
        var(--layer-surface-1);
      color: var(--color-primary);
      border-color: rgb(from var(--color-primary) r g b / 0.16);
    }

    button.filter {
      background: var(--layer-surface);
      color: var(--color-on-surface);
    }

    button.filter.selected {
      color: var(--color-on-secondary-container);
      background:
        linear-gradient(0deg, var(--state-selection), var(--state-selection)),
        var(--color-secondary-container);
      border-color: transparent;
    }

    button.input {
      background: var(--color-secondary-container);
      color: var(--color-on-secondary-container);
      border-color: transparent;
    }

    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font: var(--type-label-large);
    }

    .trailing-dismiss {
      opacity: 0.75;
      transition: opacity var(--motion-fast);
    }

    .trailing-dismiss:hover {
      opacity: 1;
    }
  </style>
  <button type="button" part="chip"></button>
`;

const KINDS = ["assist", "filter", "input", "suggestion"];

export class DsChip extends HTMLElement {
  static get observedAttributes() {
    return ["selected", "kind", "leading-icon", "trailing-icon", "dismissible"];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(chipTemplate.content.cloneNode(true));
    }
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  get kind() { return this.getAttribute("kind") ?? "assist"; }
  set kind(v) { this.setAttribute("kind", v); }

  get selected() { return this.hasAttribute("selected"); }
  set selected(v) { v ? this.setAttribute("selected", "") : this.removeAttribute("selected"); }

  get dismissible() { return this.hasAttribute("dismissible"); }
  set dismissible(v) { v ? this.setAttribute("dismissible", "") : this.removeAttribute("dismissible"); }

  get leadingIcon() { return this.getAttribute("leading-icon") ?? ""; }
  set leadingIcon(v) { v ? this.setAttribute("leading-icon", v) : this.removeAttribute("leading-icon"); }

  get trailingIcon() { return this.getAttribute("trailing-icon") ?? ""; }
  set trailingIcon(v) { v ? this.setAttribute("trailing-icon", v) : this.removeAttribute("trailing-icon"); }

  render() {
    const button = this.shadowRoot?.querySelector("button");
    if (!button) return;

    const kind = KINDS.includes(this.kind) ? this.kind : "assist";
    const label = this.textContent?.trim() ?? "";
    const leadingIcon = this.leadingIcon;
    const trailingIcon = this.trailingIcon;
    const dismissible = this.dismissible;
    const selected = this.selected;

    button.className = `${kind} ${selected ? "selected" : ""}`.trim();
    button.setAttribute("aria-pressed", kind === "filter" ? String(selected) : "false");

    const leadingEl = (leadingIcon || (kind === "filter" && selected))
      ? `<span class="icon">${leadingIcon || "✓"}</span>`
      : "";
    const trailingEl = trailingIcon
      ? `<span class="icon">${trailingIcon}</span>`
      : (dismissible || kind === "input")
        ? `<span class="icon trailing-dismiss" data-dismiss>×</span>`
        : "";

    button.innerHTML = `${leadingEl}<span>${label}</span>${trailingEl}`;

    // Dismiss handler — re-attach after innerHTML reset
    const dismissBtn = button.querySelector("[data-dismiss]");
    if (dismissBtn) {
      dismissBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent("ds-dismiss", { bubbles: true, composed: true }));
      });
    }

    // Filter toggle
    if (kind === "filter") {
      button.addEventListener("click", () => {
        const next = !this.selected;
        this.selected = next;
        this.dispatchEvent(new CustomEvent("ds-change", {
          bubbles: true,
          composed: true,
          detail: { selected: next },
        }));
      }, { once: true });
    }
  }
}

customElements.define("ds-chip", DsChip);
