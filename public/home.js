$("h1").hide()
$("h1").show(1000)

let todoList = $(".todo-list")

function displayTodo(todoData) {
    let todoItem = $('<li><label><input type="checkbox" class="todo-checkbox"><span class="todo-text"></span></label></li>')
    let todoItemText = todoItem.find(".todo-text")
    let todoItemCheckbox = todoItem.find(".todo-checkbox")

    // update todo item completion on server
    todoItemCheckbox.on("click", async (event) => {
        let currentItemStatus = todoItemCheckbox.prop('checked')
        await $.post(`/todos/${todoData.id}/completed`, {completed: currentItemStatus})
    })

    todoItemText.html(todoData.task)

    // set checkbox checked if todo is completed and unchecked if it's uncompleted
    todoItemCheckbox.prop('checked', todoData.completed)

    todoList.append(todoItem)
}

async function getAndDisplayTodos() {
    try {
        let data = await $.getJSON("/todos");
        for (let i = 0; i < data.length; i++) {
            let todoItemData = data[i]
            displayTodo(todoItemData)
        }
    } catch (e) {
        console.log(e);
    }
}

async function addTodoItem() {
    try {
        let addTaskInput = $("#add-task-text")
        let newItemText = addTaskInput.val()
        let newTodoData = await $.post("/todos", {task: newItemText})
        displayTodo(newTodoData)
    } catch (e) {
        console.log(e);
    }
}

getAndDisplayTodos()
$("#add-task-button").on("click", addTodoItem)