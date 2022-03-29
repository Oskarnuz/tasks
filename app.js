document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(e) {
    // Declare variables for input the form values
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    let task = {
        title, //title: title (Nueva funcion de .js)
        description //description: description
    };
    /* Evaluated if the form has information and add new values, saving in the localStorage, converting to JSON (returning string ) */
    if (localStorage.getItem("tasks") === null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
// Deleted the values that was already saved in the array and that is still displayed in the form
    getTasks();
    document.getElementById('formTask').reset();
    e.preventDefault();
}
// Convert the string of the JSON to values and it's displayed in the DOM
function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <p>${title} - ${description}
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
          </p>
        </div>
      </div>`;
  }
}
// Create the function to delete the values saved in the form (Array)
function deleteTask(title) {
    console.log(title)
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].title == title) {
        tasks.splice(i, 1);
      }
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
  }

getTasks();