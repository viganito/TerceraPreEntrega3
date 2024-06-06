let tasks = [];


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        const newTask = {
            id: Date.now(),
            name: taskName,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
        saveTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    saveTasks();
}

function toggleTaskStatus(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
    saveTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus(${task.id})">
            <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
            <button onclick="deleteTask(${task.id})">Eliminar</button>
        `;
        taskList.appendChild(listItem);
    });
}


function searchTask(query) {
    return tasks.filter(task => task.name.includes(query));
}


function isTaskCompleted(task) {
    return task.completed ? 'Completada' : 'Pendiente';
}


function cloneTasks() {
    return [...tasks];
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        tasks = savedTasks;
        renderTasks();
    }
}


document.addEventListener('DOMContentLoaded', loadTasks);