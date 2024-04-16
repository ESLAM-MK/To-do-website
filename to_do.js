let todoForm = document.querySelector("#todo-form");
let todoInput = document.querySelector("#todo-input");
let todoList = document.querySelector("#todo-list");

// Function to retrieve tasks from localStorage
function getTasksFromLocalStorage() {
  // Retrieve tasks from localStorage or return an empty array if not found
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage(tasks) {
  // Convert tasks array to a JSON string and save it to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function() {
  const tasks = getTasksFromLocalStorage();

  // Populate the todo list with tasks from localStorage
  tasks.forEach(function(task) {
    addTaskToList(task);
  });
});

// Event listener for form submission
todoForm.addEventListener("submit", function(e) {
  e.preventDefault();

  if (todoInput.value === "") {
    alert("You cannot enter empty text");
    return;
  }

  // Add task to the todo list
  addTaskToList(todoInput.value);

  // Save tasks to localStorage
  const tasks = getTasksFromLocalStorage();
  tasks.push(todoInput.value);
  saveTasksToLocalStorage(tasks);

  // Clear the input field
  todoInput.value = "";
});

// Function to add task to the todo list
function addTaskToList(taskText) {
  // Create new task element
  const newTask = document.createElement("li");
  newTask.textContent = taskText;

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  // Append delete button to task
  newTask.appendChild(deleteButton);

  // Append task to the todo list
  todoList.appendChild(newTask);

  // Add event listener to delete button
  deleteButton.addEventListener("click", function() {
    // Remove task from todo list
    todoList.removeChild(newTask);

    // Remove task from localStorage
    const tasks = getTasksFromLocalStorage();
    const index = tasks.indexOf(taskText);
    if (index !== -1) {
      tasks.splice(index, 1);
      saveTasksToLocalStorage(tasks);
    }
  });
}