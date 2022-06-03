// HTML Templates.

// Template for contents of task card.
export function cardTemplate(id, name, due, col, isDone){
    col = col === "No colour" ? "nocol" : col;
    let dueDate = due  === "-" ? "-" : `by ${due}`;
    let checked = isDone ? "checked" : "";

    let template = `<label for=\"task-${id}\" class=\"checkbox-container justify-center align-center\">` +
                    `   <input type=\"checkbox\" id=\"task-${id}\"${checked}/>` + 
                        `<span class=\"checkmark justify-center align-center\"><span class=\"check\"></span></span>` + 
                    `</label>` + 
                    `<div class=\"card-content\">` + 
                        `<p class=\"card-title\">${name}</p>` + 
                        `<p class=\"card-detail\"><span class=\"col-tag ${col}\"></span>${dueDate}</p>`
                    '</div>';

    return template;
}

// Template for contents of kanban card.
export function kbCardTemplate(task){

    let name = task.getName();
    let due = task.getDisplayDueString();
    let dueDate = due  === "-" ? "-" : `by ${due}`;
    let priority = task.getPriorityString();
    let priorityText = priority.substring(0, 1).toUpperCase() + priority.substring(1);
    let time = task.getTimeString();
    let col= task.getColorString() 
    col= col === "No colour" ? "nocol" : col;


    let template = `<p class=\"kb-card-title\">${name}</p>` + 
                    `<p class=\"mid-card-detail align-center"><span class="priority ${priority}">${priorityText}` +
                    `</span><span class="seperator"></span>${time}</p>` +
                    `<p class="card-detail"><span class="col-tag ${col}"></span>${dueDate}</p>`;

    return template;
}

// Template for contents of kanban column.
export function kbColTemplate(colName){
    let template = `<div class="no-drag col-top justify-space-between align-center">` + 
                        `<p>${colName}</p>` + 
                        `<div class="col-icon-wrapper">` +
                            `<span class="material-symbols-outlined icon edit">edit</span>` +
                            `<span class="material-symbols-outlined icon del">delete</span>` +
                        `</div>` +
                    `</div>`;
    return template;

}

// Template for contents of reading card.
export function rdgTemplate(id, name, collection, isRead){
    col = collection ? collection.getColorString() :"nocol";
    colName = collection ? collection.getName(): "-";
    let checked = isRead ? "checked" : "";
    isRead = isRead ? "" : "is-hide";

    let template = `<label for="read-${id}" class="checkbox-container justify-center align-center">` +
                        `<input type="checkbox" id="read-${id}" ${checked}/>` +
                        `<span class="checkmark justify-center align-center"><span class="check"></span></span>` +
                    `</label>` +
                    `<div class="card-content">` +
                        `<p class="card-title">${name}</p>` +
                        `<div class="detail-wrapper align-center">` +
                            `<p class="card-detail"><span class="col-tag ${col}"></span>${colName}</p>` +
                            `<span class="seperator ${isRead}"></span>` +
                            `<p class="card-detail ${isRead}"><span class="material-symbols-outlined detail-icon">done_all</span>Read</p>` +
                        `</div>` +
                    `</div>`;

    return template;

}

// Template for contents of collection.
export function cltTemplate(name){
    let template = `<div class="label-wrapper justify-space-between align-center">` +
                        `<div class="label justify-start align-center">` +
                            `<p>${name}</p>` +
                            `<div class="label-icon-wrapper">` +
                                `<span class="material-symbols-outlined icon edit">edit</span>` +
                                `<span class="material-symbols-outlined icon del">delete</span>` +
                            `</div> ` +             
                        `</div>` +
                        `<div class="open-all">` +
                            `<p class="open-link justify-center align-center"><span class="material-symbols-outlined open-all-icon">open_in_new</span><span class ="open-all-text">Open all readings</span></p>` +
                        `</div>` +
                    `</div>`;

    return template;
}