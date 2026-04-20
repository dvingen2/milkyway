const chipGroupTemplate = document.createElement("template");
chipGroupTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }

    :host([scroll]) .group {
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      /* Fade out left/right edges to hint scrollability */
      -webkit-mask-image: linear-gradient(
        to right,
        transparent 0,
        black 1.5rem,
        black calc(100% - 1.5rem),
        transparent 100%
      );
      mask-image: linear-gradient(
        to right,
        transparent 0,
        black 1.5rem,
        black calc(100% - 1.5rem),
        transparent 100%
      );
    }

    :host([scroll]) .group::-webkit-scrollbar { display: none; }
  </style>
  <div class="group" role="group" part="group">
    <slot></slot>
  </div>
`;

/**
 * `mw-chip-group` wraps `mw-chip` elements to manage shared selection state.
 *
 * Modes:
 *   - `multi` (default) — any number of filter chips can be selected simultaneously.
 *   - `single` — selecting one chip deselects all others.
 *
 * Attributes:
 *   - `single`   — enforce single-select behaviour.
 *   - `scroll`   — horizontal scrollable row instead of wrapping.
 *   - `aria-label` — forwarded to the inner group element.
 *
 * Properties:
 *   - `value` (get) — string[] of currently selected chip values/labels.
 *
 * Events:
 *   - `mw-change` — `detail.value: string[]` — fires whenever selection changes.
 */
export class MwChipGroup extends HTMLElement {
  static get observedAttributes() { return ["single", "scroll", "aria-label"]; }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(chipGroupTemplate.content.cloneNode(true));
    }

    // Listen for filter-chip change events bubbling up through the slot
    this.addEventListener("mw-change", (e) => {
      if (e.target === this) return; // our own re-dispatch

      const chip = e.target;
      if (!chip?.classList && chip?.tagName !== "MW-CHIP") return;

      if (this.hasAttribute("single") && e.detail?.selected) {
        // Deselect all other chips
        this._chips().forEach((c) => {
          if (c !== chip) c.removeAttribute("selected");
        });
      }

      this.dispatchEvent(new CustomEvent("mw-change", {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      }));
    });

    this._syncLabel();
  }

  attributeChangedCallback(name) {
    if (name === "aria-label") this._syncLabel();
  }

  _syncLabel() {
    const group = this.shadowRoot?.querySelector(".group");
    if (!group) return;
    const label = this.getAttribute("aria-label");
    if (label) group.setAttribute("aria-label", label);
    else group.removeAttribute("aria-label");
  }

  _chips() {
    return [...this.querySelectorAll("mw-chip[kind='filter']")];
  }

  /** Returns an array of the selected chips' values (or labels if no value attr). */
  get value() {
    return this._chips()
      .filter((c) => c.hasAttribute("selected"))
      .map((c) => c.getAttribute("value") ?? c.textContent?.trim() ?? "");
  }

  /**
   * Programmatically set selected chips by value/label.
   * @param {string[]} values
   */
  set value(values) {
    this._chips().forEach((c) => {
      const v = c.getAttribute("value") ?? c.textContent?.trim() ?? "";
      const should = values.includes(v);
      if (should) c.setAttribute("selected", "");
      else c.removeAttribute("selected");
    });
  }
}

customElements.define("mw-chip-group", MwChipGroup);
