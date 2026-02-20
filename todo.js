let todoItemsContainer = document.getElementById("todoItemsContainer");
let addBtn = document.getElementById("addButton");
let saveBtn = document.getElementById("saveButton");

function getLocalStorage() {
    let value = localStorage.getItem("todoList");
    let parseValue = JSON.parse(value);
    if (value === null) {
        return [];
    } else {
        return parseValue;
    }
}

let todoList = getLocalStorage();
let todoCount = todoList.length;

saveBtn.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onStatusChnage(checkboxId, labelId) {
    inputEle = document.getElementById(checkboxId);
    labelEle = document.getElementById(labelId);
    labelEle.classList.toggle("checked");
}

function onDelete(todoId) {
    deleteTodoId = document.getElementById(todoId);
    todoItemsContainer.removeChild(deleteTodoId);

    let deletedIndex = todoList.findIndex(function(each) {
        let eachIndex = "todo" + each.uniquId;
        if (eachIndex === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletedIndex, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));

}

function createAndAppendTodo(todo) {
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    let todoId = "todo" + todo.uniquId;
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    let checkboxId = "checkbox" + todo.uniquId;
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    inputElement.onclick = function() {
        onStatusChnage(checkboxId, labelId);
    }

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    let labelId = "label" + todo.uniquId;
    labelElement.id = labelId;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIconContainer.onclick = function() {
        onDelete(todoId);
    }
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

addBtn.onclick = function() {
    let userElement = document.getElementById("todoUserInput");
    let userValue = userElement.value;
    if (userValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todoCount = todoCount + 1;
    let newtodo = {
        text: userValue,
        uniquId: todoCount
    }
    todoList.push(newtodo);
    createAndAppendTodo(newtodo);
};