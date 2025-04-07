// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        addTaskToDOM(task, index);
    });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        addTaskToDOM(taskText, tasks.length - 1);
        taskInput.value = "";
    }
}

function addTaskToDOM(taskText, index) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks(); // Refresh list
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskText = tasks[index];
    const taskList = document.getElementById("taskList");
    const li = taskList.children[index];
    li.innerHTML = `
        <input type="text" value="${taskText}" id="editInput${index}">
        <button onclick="saveTask(${index})">Save</button>
        <button onclick="cancelEdit(${index})">Cancel</button>
    `;
}

function saveTask(index) {
    const newTaskText = document.getElementById(`editInput${index}`).value.trim();
    if (newTaskText !== "") {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index] = newTaskText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function cancelEdit(index) {
    loadTasks();
}

// Add task on Enter key
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});