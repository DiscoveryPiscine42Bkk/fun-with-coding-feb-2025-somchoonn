$(document).ready(function () {
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
        $(".task").each(function () {
            tasks.push($(this).text());
        });
        setCookie("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let savedTasks = getCookie("tasks");
        if (savedTasks) {
            let tasks = JSON.parse(savedTasks);
            tasks.forEach(task => createTask(task));
        }
    }

    function createTask(text) {
        let task = $("<div></div>")
            .addClass("task")
            .text(text)
            .click(function () {
                if (confirm("Delete this task?")) {
                    $(this).remove();
                    saveTasks();
                }
            });

        $("#ft_list").prepend(task);
    }

    $("#New").click(function () {
        let text = prompt("Enter your task:");
        if (text) {
            createTask(text);
            saveTasks();
        }
    });

    loadTasks();
});