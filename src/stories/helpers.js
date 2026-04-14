export function renderHTML(markup) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = markup.trim();
  return wrapper;
}
