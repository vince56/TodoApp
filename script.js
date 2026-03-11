const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

function createTodoItem(text) {
  const li = document.createElement("li");
  li.className = "todo-item";

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteButton);
  return li;
}

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
});
