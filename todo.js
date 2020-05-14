const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(li) {
  // const btn = event.target;
  // const li = btn.parentNode.parentNode;
  const delId = li.id;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(delId);
  });

  toDos = cleanToDos;
  saveToDos();
}

function makeCard(text, id) {
  const container = document.createElement("div");
  container.id = id;
  container.className = "container";

  const delBtn = document.createElement("button");
  delBtn.className = "del-btn";
  delBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"> \
    <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/> \
    </svg>';
  const div = document.createElement("div");
  div.innerHTML = text;
  div.id = "todo-text";
  div.style.display = "flex";

  const divInput = document.createElement("div");
  divInput.id = "todo-input-div";
  divInput.style.display = "none";
  divInput.style.flex = "1";
  divInput.style.marginRight = "5px";

  const todoInput = document.createElement("input");
  todoInput.id = "todo-input";
  todoInput.value = text;
  todoInput.className = "todo-input";
  divInput.appendChild(todoInput);

  const writeBtn = document.createElement("button");
  writeBtn.className = "write-btn";
  writeBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"> \
    <path d="M9.963 8.261c-.566-.585-.536-1.503.047-2.07l5.948-5.768c.291-.281.664-.423 1.035-.423.376 0 .75.146 1.035.44l-8.065 7.821zm-9.778 14.696c-.123.118-.185.277-.185.436 0 .333.271.607.607.607.152 0 .305-.057.423-.171l.999-.972-.845-.872-.999.972zm8.44-11.234l-3.419 3.314c-1.837 1.781-2.774 3.507-3.64 5.916l1.509 1.559c2.434-.79 4.187-1.673 6.024-3.455l3.418-3.315-3.892-4.019zm9.97-10.212l-8.806 8.54 4.436 4.579 8.806-8.538c.645-.626.969-1.458.969-2.291 0-2.784-3.373-4.261-5.405-2.29z"/> \
    </svg>';

  container.appendChild(delBtn);
  container.appendChild(div);
  container.appendChild(divInput);
  container.appendChild(writeBtn);

  delBtn.addEventListener("click", (event) => {
    const divText = container.querySelector("#todo-text");
    const divInput = container.querySelector("#todo-input-div");

    if (divInput.style.display == "none") {
      deleteToDo(container);
    } else {
      divInput.style.display = "none";
      divText.style.display = "flex";
    }
  });

  writeBtn.addEventListener("click", (event) => {
    const divText = container.querySelector("#todo-text");
    const divInput = container.querySelector("#todo-input-div");
    const todoInput = container.querySelector("#todo-input");

    if (divInput.style.display == "none") {
      divInput.style.display = "flex";
      divText.style.display = "none";
    } else {
      divInput.style.display = "none";
      divText.style.display = "flex";
      divText.innerHTML = todoInput.value;
      updateToDo(id, todoInput.value);
    }
  });

  return container;
}

function updateToDo(id, text) {
  console.log(id, text);

  const found = toDos.find((todo) => todo.id === id);

  if (found) {
    found.text = text;
    saveToDos();
  }
}

function paintToDo(text) {
  const newId = toDos.length + 1;
  const card = makeCard(text, newId);
  toDoList.appendChild(card);

  const toToObj = {
    text: text,
    id: newId,
  };
  toDos.push(toToObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
