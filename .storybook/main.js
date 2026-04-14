export default {
  stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.@(js|mjs)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
