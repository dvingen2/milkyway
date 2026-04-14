import { renderHTML } from "./helpers.js";

const defaultItems = JSON.stringify([
  { label: "Home", icon: "home", active: true },
  { label: "Search", icon: "search" },
  { label: "Favourites", icon: "favorite" },
  { label: "Profile", icon: "person" },
]);

export default {
  title: "Components/NavigationBar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The navigation bar is the mobile counterpart to `mw-navigation-rail`. It sits at the bottom of the viewport and supports two to five destinations. Active items receive a pill indicator. Items can carry a badge for unread counts. Fires `mw-navigate` with `detail.index` and `detail.item` when a button item is clicked.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of `{ label, icon?, href?, active?, badge? }` items.",
    },
  },
  args: {
    items: JSON.parse(defaultItems),
  },
  render: ({ items }) =>
    renderHTML(`
      <mw-navigation-bar items='${JSON.stringify(items)}'></mw-navigation-bar>
    `),
};

export const Playground = {};

export const WithBadges = {
  name: "With badges",
  parameters: {
    docs: {
      description: {
        story: "Add a `badge` value to any item to show an unread count. Use an empty string for a dot badge.",
      },
    },
  },
  render: () => renderHTML(`
    <mw-navigation-bar items='${JSON.stringify([
      { label: "Inbox", icon: "inbox", active: true, badge: "12" },
      { label: "Drafts", icon: "drafts", badge: "" },
      { label: "Sent", icon: "send" },
      { label: "Settings", icon: "settings" },
    ])}'></mw-navigation-bar>
  `),
};

export const ThreeItems = {
  name: "Three destinations",
  render: () => renderHTML(`
    <mw-navigation-bar items='${JSON.stringify([
      { label: "Home", icon: "home", active: true },
      { label: "Library", icon: "library_books" },
      { label: "Account", icon: "account_circle" },
    ])}'></mw-navigation-bar>
  `),
};

export const NavigateEvent = {
  name: "Navigate event",
  parameters: {
    docs: {
      description: {
        story: "Fires `mw-navigate` with `detail.index` and `detail.item` on every button click. Wire it to your router or state.",
      },
    },
  },
  render: () => {
    const items = [
      { label: "Home", icon: "home", active: true },
      { label: "Search", icon: "search" },
      { label: "Favourites", icon: "favorite" },
      { label: "Profile", icon: "person" },
    ];
    const el = renderHTML(`
      <div style="display:grid;gap:1rem;">
        <p id="nav-out" style="font:var(--type-body-medium);color:var(--color-on-surface-variant);padding:0 0.5rem;">
          Waiting for mw-navigate…
        </p>
        <mw-navigation-bar id="nav-bar" items='${JSON.stringify(items)}'></mw-navigation-bar>
      </div>
    `);
    el.querySelector("#nav-bar").addEventListener("mw-navigate", (e) => {
      el.querySelector("#nav-out").textContent =
        `mw-navigate — index: ${e.detail.index}, label: "${e.detail.item.label}"`;
    });
    return el;
  },
};
