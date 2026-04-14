import { renderHTML } from "./helpers.js";

export default {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tooltips surface brief contextual information on hover or focus. Wrap any interactive element with `mw-tooltip` and set `label` for the tip text. Four placements are available: `top` (default), `bottom`, `left`, `right`. Add the `rich` attribute for a larger, surface-styled tooltip supporting longer copy.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Text displayed in the tooltip.",
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Which side the tooltip appears on relative to the trigger.",
    },
    rich: {
      control: "boolean",
      description: "Rich tooltips use the surface style and support longer content.",
    },
  },
  args: {
    label: "More information",
    placement: "top",
    rich: false,
  },
  render: ({ label, placement, rich }) =>
    renderHTML(`
      <div style="padding:5rem;display:flex;justify-content:center;">
        <mw-tooltip
          label="${label}"
          placement="${placement}"
          ${rich ? "rich" : ""}
        >
          <mw-icon-button aria-label="Info">info</mw-icon-button>
        </mw-tooltip>
      </div>
    `),
};

export const Playground = {};

export const Placements = {
  parameters: {
    docs: {
      description: {
        story: "All four placement options. Hover or focus each button to see the tooltip.",
      },
    },
  },
  render: () => renderHTML(`
    <div style="padding:6rem;display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;">
      <mw-tooltip label="Top (default)">
        <mw-button variant="outlined">Top</mw-button>
      </mw-tooltip>
      <mw-tooltip label="Bottom" placement="bottom">
        <mw-button variant="outlined">Bottom</mw-button>
      </mw-tooltip>
      <mw-tooltip label="Left" placement="left">
        <mw-button variant="outlined">Left</mw-button>
      </mw-tooltip>
      <mw-tooltip label="Right" placement="right">
        <mw-button variant="outlined">Right</mw-button>
      </mw-tooltip>
    </div>
  `),
};

export const RichTooltip = {
  name: "Rich tooltip",
  parameters: {
    docs: {
      description: {
        story: "Rich tooltips use an elevated surface with more padding, suited for longer explanatory text.",
      },
    },
  },
  render: () => renderHTML(`
    <div style="padding:6rem;display:flex;justify-content:center;">
      <mw-tooltip
        label="Tonal palettes are generated from a single hue and chroma pair using the oklch color space, ensuring perceptually uniform lightness across all tones."
        rich
      >
        <mw-button variant="tonal">What are tonal palettes?</mw-button>
      </mw-tooltip>
    </div>
  `),
};

export const OnIconButton = {
  name: "On icon button",
  render: () => renderHTML(`
    <div style="padding:5rem;display:flex;gap:2rem;justify-content:center;">
      <mw-tooltip label="Add item">
        <mw-icon-button aria-label="Add">add</mw-icon-button>
      </mw-tooltip>
      <mw-tooltip label="Edit">
        <mw-icon-button aria-label="Edit">edit</mw-icon-button>
      </mw-tooltip>
      <mw-tooltip label="Delete">
        <mw-icon-button aria-label="Delete">delete</mw-icon-button>
      </mw-tooltip>
    </div>
  `),
};
