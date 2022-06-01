
// import Task from './task.js';

export function cardTemplate(id, name, due, col, isDone){
    // console.log("MY COL", col);
    col = col === "No colour" ? "nocol" : col;
    let dueDate = due  === "-" ? "-" : `by ${due}`;
    let checked = isDone ? "checked" : "";
    let template = 
    // `<div class=\"unchecked-card\" id =\"t${id}\"></div>` + 
    `<label for=\"task-${id}\" class=\"checkbox-container justify-center align-center\">` +
        `<input type=\"checkbox\" id=\"task-${id}\"${checked}/>` + 
        `<span class=\"checkmark justify-center align-center\"><span class=\"check\"></span></span>` + 
    `</label>` + 
    `<div class=\"card-content\">` + 
    `<p class=\"card-title\">${name}</p>` + 
    `<p class=\"card-detail\"><span class=\"col-tag ${col}\"></span>${dueDate}</p>`
    '</div>';

    return template;
    // '</div>';

    // const checkboxContainer = document.createElement("label");
    // checkboxContainer.classList.add("checkbox-container");
}

export function kbCardTemplate(task){
    let id = task.getId();
    let name = task.getName();
    let due = task.getDisplayDueString();
    let dueDate = due  === "-" ? "-" : `by ${due}`;
    let priority = task.getPriorityString();
    let time = task.getTimeString();
    let col= task.getColorString() 
    col= col === "No colour" ? "nocol" : col;


    let template = `<p class=\"kb-card-title\">${name}</p>` + 
                    `<p class=\"mid-card-detail align-center"><span class="priority ${priority}">High` +
                    `</span><span class="seperator"></span>${time}</p>` +
                    `<p class="card-detail"><span class="col-tag ${col}"></span>${dueDate}</p>`;

    return template;
}

export function kbColTemplate(colName){
    let template = `<div class="col-top justify-space-between align-center">` + 
                    `<p>${colName}</p>` + 
                    `<div class="col-icon-wrapper">` +
                    `<span class="material-symbols-outlined icon edit">edit</span>` +
                    `<span class="material-symbols-outlined icon del">delete</span>` +
                    `</div></div>`;
    return template;

}