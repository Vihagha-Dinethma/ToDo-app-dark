document.addEventListener("DOMContentLoaded", loadTasks);

    const addTaskButton = document.getElementById("add-task-button");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    addTaskButton.addEventListener("click", addTask);

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
      });
    }

    function addTask() {
      const taskText = taskInput.value;

      if (taskText === "") {

        return;
      }

      createTaskElement(taskText, false);
      saveTask({
        text: taskText, completed: false
      });
      taskInput.value = "";
    }

    function createTaskElement(taskText, completed) {
      const li = document.createElement("li");

      if (completed) {
        li.classList.add("complete");
      }

      li.innerHTML = `
      <span>${taskText}</span>
      <div>
      <button class="complete-button"><i class="fa-solid fa-check"></i></button><button class="delete"><i class="fa-solid fa-trash"></i></button>
      </div>
      `;

      const completeButton = li.querySelector(".complete-button");
      const deleteButton = li.querySelector(".delete");

      completeButton.addEventListener("click", () => {
        li.classList.toggle("complete");
        updateTaskStatus(taskText);
      });

      deleteButton.addEventListener("click", () => {
        li.remove();
        deleteTask(taskText);
      });

      taskList.appendChild(li);
    }

    function saveTask(task) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateTaskStatus(taskText) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const task = tasks.find(t => t.text === taskText);
      if (task) {
        task.completed = !task.completed;
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function deleteTask(taskText) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.filter(t => t.text !== taskText);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
