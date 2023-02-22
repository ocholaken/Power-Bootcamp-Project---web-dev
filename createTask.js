const firebaseConfig = {
  apiKey: "AIzaSyBEC8nZF1gLS8mEJiNfpxyiLfC79JqXkA0",
  authDomain: "task-man-c7972.firebaseapp.com",
  projectId: "task-man-c7972",
  storageBucket: "task-man-c7972.appspot.com",
  messagingSenderId: "1047263220371",
  appId: "1:1047263220371:web:1b0b88233ba16509e4b366",
  measurementId: "G-9VR0K26NHG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var totalItems;
var maxCode;
var code;

function storeTask(event) {
  event.preventDefault();

  var task = document.getElementById("task").value;
  var desc = document.getElementById("desc").value;
  document.getElementById("task").value = "";
  document.getElementById("desc").value = "";

  //  store data to firebase

  firebase
    .database()
    .ref("TaskList/" + code)
    .set({
      task: task,
      desc: desc,
      status: "pending",
    });

  document.getElementById("tasks-header").insertAdjacentHTML(
    "afterend",

    `
        <div class="Task-item" id="${code}">
          <div class="data" id="${task}" >
            <button class="done" id="done" onclick="changeStatus('${code}')" > <i class="far far-check-circle"></i> </button>
            <h2 class="Task">${task}</h2>
            <p class="desc">${desc}</p>
            <p id="status"></p>
          </div>
          <hr>
          <div class="buttons">
            <button class=" button edit" id="editData" onclick = "editData('${code}')" >EDIT TASK</button>
            <button class=" button delete" id="deleteData" onclick="deleteData('${code}')"  >DELETE TASK</button>
          </div>
        </div>
      `
  );
}

function deleteData(code) {
  firebase
    .database()
    .ref("TaskList/" + code)
    .remove();
  document.getElementById(code).remove();

  firebase
    .database()
    .ref("TotalTasks")
    .update({
      totalItems: totalItems - 1,
    });
}

// Edit Task

function editData(c) {
  document.getElementById("task").value = document
    .getElementById(c)
    .querySelector(".data")
    .querySelector(".Task").innerHTML;

  document.getElementById("desc").value = document
    .getElementById(c)
    .querySelector(".data")
    .querySelector(".desc").innerHTML;

  if (document.getElementById("addTask") !== null) {
    document.getElementById("addTask").remove();
  }
  document.getElementById("form-btns").innerHTML = `
    <button class="button update" id = "updateTask" onclick = "updateData('${c}')">󠀫󠀫<i class="fas fa-sync-alt"></i> UPDATE TASK</button>
    <button class="button cancel" id = "cancelTask" onclick = "cancelUpdation()"><i class="fas fa-ban"></i> CANCEL</button>
    `;
}

// Update Data and clear cancel and update task buttons
