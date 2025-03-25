document.addEventListener("DOMContentLoaded", () => {
    loadTasks(); // to load tasks from the local storage when the page loads or reloads
    document.getElementById("addTaskBtn").addEventListener("click", addTask);
    document.getElementById("filter").addEventListener("change", filterTasks);
    adjustDropdownWidth(); // to adjust filter width dynamically depending on the length of the text within it
});

// to get stored tasks from local storage or initialize an empty array if no tasks are created
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//function to add a new task
function addTask() {
    const nameInput = document.getElementById("taskName"); // get name of task from task name field
    const descInput = document.getElementById("taskDesc"); // get desc of task from desc field

    if (!nameInput || !descInput) { // to ensure that the input fields exist
        console.error("Task input fields are missing!");
        return;
    }

    const name = nameInput.value.trim();
    const desc = descInput.value.trim();

    if (!name) { // to ensure that the task name is not empty
        alert("Task name cannot be empty!");
        return;
    }

    const task = { // create a new task object with a time stamp (unique id for the task)
        id: Date.now(), // unique id
        name,
        desc,
        completed: false, // task is set to not completed by default 
        important: false // task is set not important by default
    };

    tasks.push(task); // add the new task object to the tasks array
    saveTasks(); // save the new updates task array to the local storage

    displayTasks();

    // to clear the task name or desc field as soon as thetask is pushed to the task array
    nameInput.value = ""; 
    descInput.value = "";
}

// to save the functions into local storage by converting the tasks array to JSON
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// display tasks by loading them from the local storage
function loadTasks() {
    displayTasks(); // call the fuction to render task on the UI
}

// function to display all the tasks in the array
function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; 

    tasks.forEach(task => {
        const taskDiv = document.createElement("div"); // creating a task container
        taskDiv.classList.add("task");

        // add completed class if task is completed and important class if task is important
        if (task.completed) taskDiv.classList.add("completed"); 
        if (task.important) taskDiv.classList.add("important");

        //task content which includes the action buttons: completed, edit, delete and mark as important 
        taskDiv.innerHTML = `
            <span><strong>${task.name}</strong> <hr> ${task.desc || "No description"}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
                <button class="imp-btn ${task.important ? 'important' : 'not-important'}" 
                 onclick="toggleImportant(${task.id})">
                 ${task.important ? "❅" : "🔥"}
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskDiv);
    });
}

// to mark task as important using toggle
function toggleImportant(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, important: !task.important } : task // to toggle task as important
    );
    saveTasks(); // save the updates to local storage
    displayTasks(); //refreshing the UI
}

// to mark task as completed using toggle
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    displayTasks();
}

// funtion to edit an already existing task
function editTask(id) {
    const task = tasks.find(task => task.id === id); // find the task using its id
    const newName = prompt("Enter new task name:", task.name); // prompt the user for a new name and description
    const newDesc = prompt("Enter new task description:", task.desc);

    if (newName !== null) { //update the task details
        task.name = newName;
        task.desc = newDesc;
        saveTasks(); 
        displayTasks();
    }
}

// funtion to delete task from the array
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id); // remove task by filtering out the id of that task
    saveTasks();
    displayTasks();
}

// function to filter tasks
function filterTasks() {
    const filter = document.getElementById("filter").value;
    let filteredTasks = [...tasks]; // creating a copy of the tasks list

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed); // show only completed tasks
    } else if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed); // show only pending tasks
    } else if (filter === "important") {
        filteredTasks = tasks.filter(task => task.important); // show only important tasks
    }

    displayFilteredTasks(filteredTasks);
}

// funtion to display tasks based on selection by the user
function displayFilteredTasks(filteredTasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach(task => {
        const taskDiv = document.createElement("div"); //creating task container
        taskDiv.classList.add("task");

        if (task.completed) taskDiv.classList.add("completed");
        if (task.important) taskDiv.classList.add("important");

        taskDiv.innerHTML = `
            <span><strong>${task.name}</strong> <hr> ${task.desc}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
                <button class="imp-btn ${task.important ? 'important' : 'not-important'}" 
                 onclick="toggleImportant(${task.id})">
                 ${task.important ? "❅" : "🔥"}
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskDiv);
    });
}

// funtion to change the width of the filter box dynamically
function adjustDropdownWidth() {
    let selectElement = document.getElementById("filter");
    let selectedText = selectElement.options[selectElement.selectedIndex].text;

    // create a temporary span to measure the selected option text width
    let tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden"; // hide it
    tempSpan.style.position = "absolute"; // remove from layout
    tempSpan.style.whiteSpace = "nowrap"; // prevent wrapping
    tempSpan.innerText = selectedText;

    document.body.appendChild(tempSpan);
    filter.style.width = tempSpan.offsetWidth + 50 + "px"; // setting width based on the text size
    document.body.removeChild(tempSpan);
}
