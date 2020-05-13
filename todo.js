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

  container.appendChild(delBtn);
  container.appendChild(div);

  delBtn.addEventListener("click", (event) => {
    deleteToDo(container);
  });

  return container;
}

function paintToDo(text) {
  // const li = document.createElement("li");
  // const delBtn = document.createElement("button");
  // delBtn.className = "del-btn";
  // delBtn.innerHTML =
  //   '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> \
  //   <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/> \
  //   </svg>';

  // const span = document.createElement("span");
  const newId = toDos.length + 1;
  // span.innerText = text;
  // li.appendChild(delBtn);
  // li.appendChild(span);
  // li.id = newId;
  const card = makeCard(text, newId);
  // toDoList.appendChild(li);
  toDoList.appendChild(card);

  // delBtn.addEventListener("click", (event) => {
  //   deleteToDo(li);
  // });

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
