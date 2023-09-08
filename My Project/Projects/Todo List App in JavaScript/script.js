"use strict";

let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come Back ;(";
});

window.addEventListener("focus", () => {
  document.title = docTitle;
});

// selectors
const todoInputs = document.querySelector(".todo-inputs");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");
let deleteAll = document.querySelector(".delete-all");

//event listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodos);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodos(e) {
  e.preventDefault();

  if (todoInputs.value.trim() === "") {
    // alert("Task cannot be empty");
    return;
  }

  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // new todo
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInputs.value;
  newTodo.contentEditable = false;
  todoDiv.appendChild(newTodo);

  // Checked button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-btn");
  editButton.addEventListener("click", function () {
    newTodo.contentEditable = true;
    newTodo.focus();
  });
  todoDiv.appendChild(editButton);

  newTodo.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents adding a new line
      if (newTodo.innerText.trim() === "") {
        alert("Task cannot be empty");
        newTodo.focus();
        return;
      }
      newTodo.contentEditable = false;
    }
  });

  // Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append list
  todoList.appendChild(todoDiv);
  todoInputs.value = "";
}

function deleteCheck(e) {
  const items = e.target;

  // Delete todo
  if (items.closest(".trash-btn")) {
    const todo = items.closest(".todo");
    todo.remove();
  }

  // Mark todo as complete
  if (items.closest(".complete-btn")) {
    const todo = items.closest(".todo");
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
function getTodos() {
  //check
  let todos = [];

  todos.forEach(function (todo) {
    //todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    // checked button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append list
    todoList.appendChild(todoDiv);
  });
}

// Adding a bounce animation on add button click
todoButton.addEventListener("click", function () {
  // Trigger the bounce animation
  this.classList.add("bounce");

  // Remove the bounce class after the animation completes (0.5s)
  setTimeout(() => {
    this.classList.remove("bounce");
  }, 500);
});

todoInputs.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTodos(event);
  }
});

deleteAll.onclick = function () {
  todoList.innerHTML = ""; // Clear the todos from UI
  // If you're storing tasks in local storage or any other storage, make sure to clear them too
  window.localStorage.removeItem("todos"); // Assuming "todos" is the key you're using to store them
};
