const form       = document.getElementById("todo-form");
const input      = document.getElementById("todo-input");
const list       = document.getElementById("todo-list");
const listMeta   = document.getElementById("list-meta");
const emptyState = document.getElementById("empty-state");
const activeCountEl = document.getElementById("active-count");

let currentFilter = "all";

/* ── Helpers ─────────────────────────────────────────────────── */

function updateMeta() {
  const items     = list.querySelectorAll(".todo-item");
  const completed = list.querySelectorAll(".todo-item.completed");
  const active    = items.length - completed.length;

  const hasItems = items.length > 0;
  listMeta.hidden   = !hasItems;
  emptyState.hidden = hasItems;

  activeCountEl.textContent =
    active === 0 ? "All done! 🎉" : `${active} task${active !== 1 ? "s" : ""} left`;
}

function applyFilter() {
  const items = list.querySelectorAll(".todo-item");
  items.forEach((item) => {
    const done = item.classList.contains("completed");
    const show =
      currentFilter === "all" ||
      (currentFilter === "active" && !done) ||
      (currentFilter === "completed" && done);
    item.style.display = show ? "" : "none";
  });
}

/* ── Create item ─────────────────────────────────────────────── */

function createTodoItem(text) {
  const li = document.createElement("li");
  li.className = "todo-item";

  /* Checkbox */
  const checkbox = document.createElement("input");
  checkbox.type      = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.setAttribute("aria-label", `Mark "${text}" as complete`);
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    updateMeta();
    applyFilter();
  });

  /* Text */
  const span = document.createElement("span");
  span.className   = "todo-text";
  span.textContent = text;

  /* Delete button */
  const deleteButton = document.createElement("button");
  deleteButton.type      = "button";
  deleteButton.className = "delete-btn";
  deleteButton.setAttribute("aria-label", `Delete "${text}"`);
  deleteButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  deleteButton.addEventListener("click", () => {
    li.classList.add("removing");
    li.addEventListener("animationend", () => {
      li.remove();
      updateMeta();
      applyFilter();
    }, { once: true });
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  return li;
}

/* ── Form submit ─────────────────────────────────────────────── */

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  list.appendChild(createTodoItem(text));
  input.value = "";
  input.focus();
  updateMeta();
  applyFilter();
});

/* ── Filters ─────────────────────────────────────────────────── */

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    applyFilter();
  });
});

/* ── Init ────────────────────────────────────────────────────── */
updateMeta();
