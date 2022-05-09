// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event Listeners
LoadEventListeners();

// Load All Event Listeners
function LoadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);  
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear all task events
    clearTasks.addEventListener('click', clearAllTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);  
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //=> Local storage can only store strings' so we are gonna use JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }

    tasks.forEach(function(task) {
        // CREATE li ELEMENT //
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task)); //=< We have changed this cuz we don't have taskInput we have task
    // Create new link element
    const link = document.createElement('a');
    // Add class 
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    })
}

// Add Task
function addTask(e) {
    //=> Let's make sure that there's actually a value here
    if(taskInput.value === '') {
        alert('Add a task');
    } 

    // CREATE li ELEMENT //
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class 
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //=> Local storage can only store strings' so we are gonna use JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
 
// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        //=> Confirmation
        if(confirm('Are You Sure?')) { 
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearAllTasks() {
    // First way
    // taskList.innerHTML = '';

    // Second way (Faster clear)
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksfromLocalStorage();
}

// CLear Tasks form LS
function clearTasksfromLocalStorage() {
    localStorage.clear();
}   

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}
