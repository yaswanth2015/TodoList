const addButton = document.getElementById("add")
const input = document.getElementById("mainInput")
const todoList = document.getElementById("todoList")
const tasks = []
function render() {
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
    tasks.forEach((value, num, arr)=> {
        const div = document.createElement("div")
        div.className = "taskItem"
        div.innerHTML = getTaskComponent(value, num)
        todoList.appendChild(div)
    })
}

addButton.addEventListener("click", (e)=> {
    if(input.value === "") return
    tasks.push({
        title: input.value,
        isEditing: false,
        ischecked: false
    })
    input.value = ""
    render()
})




function getTaskComponent(taskItem, index) {
    
    return `
    <div style="display: flex; justify-content: space-between;">
        ${decideEditOrDetail(taskItem, index)}
        <div>
            <button type="button" class = "btn btn-m btn-warning" onclick=editOrSave(${index}) >${taskItem.isEditing ? "Save" : "Edit"}</button>
            <button type="button" class = "btn btn-m btn-danger" onclick=deleteNode(${index}) >Delete</button>
        </div>
    </div>
`
}

function decideEditOrDetail(taskItem, index) {
    if(taskItem.isEditing) {
        return `
            <input placeholder="Enter your Task" class = "taskInput" value = ${taskItem.title} id = "list-${index}"></Input>
        `
    } else {
        return `<div class="d-flex p-2">
        <input type="checkbox" onclick="checkedTask(${index})" ${taskItem.checked ? "checked" : ""} class="checkBox"/>
        <span>${taskItem.title}</span>
    </div>`
    }
}

function checkedTask(index) {
    tasks[index].checked = !tasks[index].checked
    render()
}




function editOrSave(index) {
    if(tasks[index].isEditing) {
        const inpt = document.getElementById(`list-${index}`)
        tasks[index].title = inpt.value
        inpt.value = ""
    }
    tasks[index].isEditing = !tasks[index].isEditing
    if (tasks[index].title === ""){
        tasks.splice(index,1)
    }
    render()
}

function deleteNode(index) {
    tasks.splice(index,1)
    render()
}