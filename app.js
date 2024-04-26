const inputEl = document.getElementById("todo-input");
const addBtnEl = document.getElementById("todo-add");
const listEl = document.getElementById("todo-list");

// { id: "", text: "", isCompleted: false }
let counter = 0;
let todos = [];

addBtnEl.addEventListener("click", function () {
  const inputValue = inputEl.value;

  inputEl.value = "";

  addTodo(inputValue);
  printTodos(todos);
});

function addTodo(text) {
  todos.push({
    id: counter++,
    text: text,
    isCompleted: false,
  });
}

function completeTodo(todoId) {
  const newTodos = todos.map(function (todo) {
    if (todo.id === todoId) {
      return {
        ...todo,
        isCompleted: true,
      };
    }

    return todo;
  });

  todos = newTodos;
}

function deleteTodo(todoId) {
  const newTodos = todos.filter(function (todo) {
    return todo.id !== todoId;
  });

  todos = newTodos;
}

function addClickListenerForCompleteButtons() {
  Array.from(document.getElementsByClassName("todo-complete")).forEach(
    function (button) {
      button.addEventListener("click", function () {
        const todoId = parseInt(button.dataset.id);

        completeTodo(todoId);
        printTodos(todos);
      });
    }
  );
}

function addClickListenerForDeleteButtons() {
  Array.from(document.getElementsByClassName("todo-delete")).forEach(function (
    button
  ) {
    button.addEventListener("click", function () {
      const todoId = parseInt(button.dataset.id);

      deleteTodo(todoId);
      printTodos(todos);
    });
  });
}

function printTodos(todos) {
  let result = "";

  todos.forEach(function (todo) {
    result += `
        <div class="todo-item ${todo.isCompleted ? "completed" : ""}">
            ${todo.text}
            <div>
                <button class="todo-complete" data-id="${todo.id}">✅</button>
                <button class="todo-delete" data-id="${todo.id}">🗑️</button>
            </div>
        </div>`;
  });

  listEl.innerHTML = result;

  addClickListenerForCompleteButtons();
  addClickListenerForDeleteButtons();
}
