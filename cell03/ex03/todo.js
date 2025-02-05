function setCookie(name, value) {
    document.cookie = `${name}=${encodeURIComponent(value)};path=/`;
}
function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [key, value] = cookie.split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return "";
}
function saveTasks() {
    let tasks = [];
    let taskElements = document.querySelectorAll(".task");
    for (let i = taskElements.length - 1; i >= 0; i--) {
        tasks.push(taskElements[i].textContent);
    }
    setCookie("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = getCookie("tasks");
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);
        for (let i = 0; i < tasks.length; i++) {
            createTask(tasks[i]);
        }
    }
}


function createTask(text) {
    let task = document.createElement("div");
    task.className = "task";
    task.textContent = text;
    task.onclick = () => {
        if (confirm("Delete this task?")) {
            task.remove();
            saveTasks();
        }
    };
    document.getElementById("ft_list").prepend(task);
}

document.getElementById("New").onclick = function () {
    let text = prompt("Enter your task:");
    if (text) {
        createTask(text);
        saveTasks();
    }
};


window.onload = loadTasks;