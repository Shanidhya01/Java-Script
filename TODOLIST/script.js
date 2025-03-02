document.addEventListener("DOMContentLoaded", () => {
    const todoinput = document.getElementById("taskinput");
    const addtaskbutton = document.getElementById("addTaskButton");
    const tasklist = document.getElementById("tasklist");

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task)); 

    // Add task button event listener
    addtaskbutton.addEventListener("click", () => {
        const tasktext = todoinput.value.trim();
        if (tasktext === "") return;

        const newTask = {
            id: Date.now(),
            text: tasktext,
            completed: false
        };
        tasks.push(newTask);
        renderTask(newTask);
        saveTasks();
        todoinput.value = "";
    });

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Render a task
    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-button">Delete</button>
        `;

        // Toggle completed state on click
        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return; // Ignore button clicks
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        // Delete button event listener
        li.querySelector(".delete-button").addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the click from bubbling up to the li
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        });

        tasklist.appendChild(li);
    }
});