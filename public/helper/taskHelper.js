import {cardTemplate, kbCardTemplate, rdgTemplate, kbColTemplate} from './template.js';
// Helper functions for tasks and readings.

const COMPLETED_ID = 2;
const UPCOMING_ID = 0;  

/* USYD CODE CITATION ACKNOWLEDGEMENT
* I declare that the following lines of code have been copied from the
* website titled: "Javascript DOM Remove All Children of an Element"
* with only minor changes and it is not my own work. 
* 
* Original URL
* https://attacomsian.com/blog/javascript-dom-remove-all-children-of-an-element
* Last access June, 2022
*/

// Remove all kanban cards from every column in Kanban.
export function clearKanban(columns){

    for (let col of columns.children){
        while(col.children.length > 1){
            col.removeChild(col.lastChild);
        }
    }
    
}
/* end of copied code */

// Remove all tasks in Task List.
export function clearTaskList(){

    let kbCard = document.querySelectorAll(".kb-card"); // Select all kanban task cards.

    // Update the column the task is currently at,
    // and update the status of the task if the column it is currently at
    // is a column where markAllChecked is true.
    if(kbCard){
        for (let card of kbCard){
            let taskObj = tl.findTask(card.id);
            let parentId = card.parentElement.id.split("-")[1];
            let columnObj = kb.findColumn(parentId);
            taskObj.setColumn(parentId);

            // If the column is markAllChecked then all the tasks inside that was not done becomes done.
            // Else it has the same status as before.
            taskObj.setStatus(columnObj.getMarkAllChecked() ? true : taskObj.getStatus());

        }
    }

    let prevTasks = document.querySelectorAll(".istask");

    // Remove all tasks in task list.
    if (prevTasks){
        for (let t of prevTasks){
            t.remove();
        }
    }
}

// Load tasks in kanban board.
export function loadTasksInKb(tl){
    
    // For every task in list create a kanban card.
    for (let task of tl.list){
        let col = task.getColumn();
        let kbCard = document.createElement('div');
        kbCard.classList.add("kb-card");
        kbCard.id = task.getId();
        kbCard.innerHTML = kbCardTemplate(task);


        // If task is new, then task will be initially placed in completed column or in upcoming column.
        if(col === -1){
            task.setColumn(task.getStatus() ? COMPLETED_ID : UPCOMING_ID);
        }

        // If completed column is deleted,
        // then all completed task in tasklist will initially placed in upcoming column.
        if (task.getColumn() === COMPLETED_ID && kb.findColumn(COMPLETED_ID) === undefined){
            task.setColumn(UPCOMING_ID);
        }

        let parent = document.querySelector(`#c-${task.getColumn()}`)
        parent.append(kbCard);

    }

}

// Update task counter.
export function updateCounter(isCompleted, isAdded, upcomingCounter, completedCounter){
    let counter = isCompleted ? completedCounter : upcomingCounter;
    let num = Number(counter.innerText);

    // Increment counter if task is added.
    if (isAdded){
        num++;

    // Decrement counter if not.
    }else{
        num--;
    }

    counter.innerText = num.toString(); // update counter display.
    return 1;
}

// Closes Modal.
export function closeModalHandler (component){
    component.classList.remove("is-active");
}

// Opens Modal.
export function openModalHandler(component){
    component.classList.add("is-active");
}

// Create a new task or reading element.
export function createNewTaskElement(task, upcomingList, completedList, isTask){

    const taskCard = document.createElement("div");
    taskCard.classList.add("unchecked-card");

    // Create a new task element.
    if (isTask){
        taskCard.id =`t${task.getId()}`;
        taskCard.classList.add("istask");

    // Create a new reading element.
    }else{
        taskCard.id =`r${task.getId()}`;
        taskCard.classList.add("isreading");
    }
    createTaskContent(taskCard, task, upcomingList, completedList, isTask); // Append element to list.

}

// Update task or reading element properties.
export function updateTaskElement(task, upcomingList, completedList, upcomingCounter, completedCounter, completedIsHidden, isTask){

    let taskCardComp = null;
    let taskCardUp =null;
    let isDone = null;
    let taskCard = null;

    // Update task property.
    if (isTask){
        taskCardComp = document.querySelector(`#completed-tasks #t${task.getId()}`);
        taskCardUp =document.querySelector(`#upcoming-tasks #t${task.getId()}`);
        taskCard = taskCardComp ? taskCardComp : taskCardUp;
        taskCard.innerHTML = cardTemplate(task.getId(), task.getName(), task.getDisplayDueString(), task.getColorString(), task.getStatus());
        isDone = task.getStatus();
    
    // Update reading property.
    }else{
        taskCardUp = document.querySelector(`#unread-readings #r${task.getId()}`);
        taskCardComp =document.querySelector(`#read-readings #r${task.getId()}`);
        taskCard = taskCardComp ? taskCardComp : taskCardUp;
        taskCard.innerHTML = rdgTemplate(task.getId(), task.getName(), task.getCollection(), task.getIsRead());
        isDone = task.getIsRead();

    }

    //If task was not done but was ticked done in edit mode,
    // or if task was done but was ticked not done in edit mode.
    if ((isDone && !taskCardComp) || (!isDone && !taskCardUp)){

        // If completed tasks are hidden and a task that was not done is ticked,
        // then all completed tasks are toggled as shown.
        if(completedIsHidden){
            tglCompletedTasks(completedIsHidden, isTask);
        }

        // Update counter for upcoming tasks and completed tasks.
        updateCounter(isDone, true, upcomingCounter, completedCounter);
        updateCounter(!isDone, false, upcomingCounter, completedCounter);
        taskCard.remove(); // remove from previous list.
        createTaskContent(taskCard, task, upcomingList, completedList, isTask); //Create task or reading card from a template and append to list.

    }

}

// Create task or reading card from a template and append to list.
export function createTaskContent(taskCard, task, upcomingList, completedList, isTask){

    // Create task element.
    if (isTask){
        taskCard.innerHTML = cardTemplate(task.getId(), task.getName(), task.getDisplayDueString(), task.getColorString(), task.getStatus());
        task.getStatus() ? completedList.append(taskCard): upcomingList.append(taskCard);
    
    //Create reading element.
    }else{
        taskCard.innerHTML = rdgTemplate(task.getId(), task.getName(), task.getCollection(), task.getIsRead());
        task.getIsRead() ? completedList.append(taskCard): upcomingList.append(taskCard);
    }


}

// Clear the task form from previous inputs.
export function clearTaskForm(addTaskForm){

    let elements = []; // elements of add task form.
    elements.push(addTaskForm.elements.taskname);
    elements.push(addTaskForm.elements.due);
    elements.push(addTaskForm.elements.esthour);
    elements.push(addTaskForm.elements.estmin);
    elements.push(addTaskForm.elements.tgldone);

    // Colour tags.
    let colTags = addTaskForm.elements.coltag;

    for(var i = 0; i < colTags.length; i++){
        colTags[i].checked = false;
    }

    // Clear form input.
    for (let e of elements){
        if (e.name === "esthour" || e.name === "estmin"){
            e.value = 0;

        }else if(e.name === "coltag" || e.name === "tgldone"){
            e.checked = false;

        }else{
            e.value = "";
        }
    }
}

// Add task object to task list object.
export function addInputToTaskList(isEditMode, taskObj, addTaskForm){


    let newTask = null;

    // Title.
    let name = addTaskForm.elements.taskname.value; 
    if (name === ""){
        return false;
    }

    // Colour tags.
    let colTags = addTaskForm.elements.coltag;
    let colTag = null;
    for(var i = 0; i < colTags.length; i++){
        if(colTags[i].checked){
            colTag = colTags[i].value;
        }
    }

    // Due date.
    let due = addTaskForm.elements.due.value;

    // Priority level.
    let priority = addTaskForm.elements.priority.value; // i.e., 1, 2, 3 

    // Estimated time in hours.
    let estHour = addTaskForm.elements.esthour.value;
    estHour = estHour === "" ? 0 : estHour; 

    // Estimated time in mins.
    let estMin= addTaskForm.elements.estmin.value;
    estMin = estMin === "" ? 0 : estMin;

    // Task status.
    let isDone = addTaskForm.elements.tgldone.checked;

    // Create new task and add to task list.
    if (!isEditMode){
        let task = [name, colTag, due, priority, [estHour, estMin], isDone];
        newTask = tl.newTask(task);
        tl.addTask(newTask);
    
    // If form was opened to be edited then update task details.
    }else{
        taskObj.setName(name);
        taskObj.setColor(colTag);
        taskObj.setDue(due);
        taskObj.setPriority(priority);
        taskObj.setTime([estHour, estMin]);
        taskObj.setStatus(isDone);
        newTask = taskObj;

    }

    clearTaskForm(addTaskForm);
    return newTask;

}

// Get previous value of colour tag to remove the colour class 
// so a new color class can be added.
export function getPrevValue (tdElement){
    return tdElement.className.split(" ")[1];
}

// Helper function to capitalise a string.
export function capitalise(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Insert task details to task detail modal.
export function insertTargetTaskDetail(task, dtDeleteBtn, dtEditBtn){

    // Get the id of the task that was clicked to be displayed.
    dtDeleteBtn.id = "delete-task-" + `${task.getId()}`;
    dtEditBtn.id = "edit-task-" + `${task.getId()}`;

    // Title.
    let tdTitle = document.querySelector("#detail-task-modal .reading-title");
    tdTitle.innerText = task.getName();

    // Colour tags.
    let taskCol = task.getColor() === 0 ? "nocol" : `${task.getColorString()}`;
    let tdCol = document.querySelector("#detail-task-modal #td-col span");
    let tdColTagName = document.querySelector("#detail-task-modal #td-col p");
    tdCol.classList.remove(getPrevValue(tdCol));
    tdCol.classList.add(taskCol);
    tdColTagName.innerText = task.getColor() === 0 ? "No colour" : capitalise(taskCol);

    // Priority levels.
    let taskPrio = task.getPriorityString();
    let tdPrio = document.querySelector("#detail-task-modal #td-prio span");
    tdPrio.innerText = capitalise(taskPrio);
    tdPrio.classList.remove(getPrevValue(tdPrio));
    tdPrio.classList.add(taskPrio);

    // Due date.
    let tdDue = document.querySelector("#detail-task-modal #td-due p");
    tdDue.innerText = task.getDisplayDueString(true);

    // Estimated time (i.e., hours and minutes)
    let tdTime = document.querySelector("#detail-task-modal #td-time p");
    tdTime.innerText = task.getTimeString();

    // Task status.
    let tdStatIcon = document.querySelector("#detail-task-modal #td-isdone span");
    let tdStat = document.querySelector("#detail-task-modal #td-isdone p");
    tdStatIcon.innerText = task.getStatus() ? "done" : "hourglass_empty";
    tdStat.innerText = task.getStatusString();

}

// Handles when a task or reading is checked or unchecked.
export function taskChecked(id, upcomingList, completedList, upcomingCounter, completedCounter, isTask){

    let isDone = null;
    let task = null;
    let rdg = null;

    // Find task and update status.
    if (isTask){
        task = tl.findTask(id);
        task.setStatus(!task.getStatus());
        isDone = task.getStatus();
    
    // Find reading and update status.
    }else{
        rdg = rl.find(id, true);
        rdg.setIsRead(!rdg.getIsRead());
        isDone = rdg.getIsRead();
    }

    // Update counter of each list.
    updateCounter(isDone, true, upcomingCounter, completedCounter);
    updateCounter(!isDone, false, upcomingCounter, completedCounter);

    let taskElement = null;
    let taskObj = isTask ? task : rdg;

    // Get task element.
    // If task is done then task was not done and is in upcoming list.
    if (isDone && isTask){
        taskElement = document.querySelector(`#upcoming-tasks #t${id}`);
    
    // If task is not done then task was done and is in completed list.
    }else if(!isDone && isTask){
        taskElement = document.querySelector(`#completed-tasks #t${id}`);

    // If reading is read then reading was not read and is in unread list.
    }else if(isDone && !isTask){
        taskElement = document.querySelector(`#unread-readings #r${id}`);

    // If reading is not read then reading was read and is in read list.
    }else if (!isDone && !isTask){
        taskElement = document.querySelector(`#read-readings #r${id}`);
    }

    // Remove element from previous list, create new element and append to other list.
    taskElement.remove(); 
    createTaskContent(taskElement, taskObj, upcomingList, completedList, isTask);
}

// Toggle tasks that are completed (or reading that is read) to be showns or hidden.
export function tglCompletedTasks(completedIsHidden, isTask){

    completedIsHidden = !completedIsHidden; // update to show or hide.
    let completedTasks = null;

    // Get all tasks in completed list, or all readings in read list.
    if (isTask){
        completedTasks = document.querySelectorAll("#completed-tasks .unchecked-card");
    }else{
        completedTasks = document.querySelectorAll("#read-readings .unchecked-card");
    }

    // Hide all tasks or readings,
    // or show all taksks or readings.
    for (ct of completedTasks){
        ct.classList.toggle("is-hide");
    }

    return completedIsHidden
}

// Clear column form.
export function clearColForm(form){
    form.elements.colname.value = "";
    form.elements.tglalldone.checked = false;
}

// add Column object to Kanban or update existing column.
export function addInputToSection(form, isEdit, editedColObj, drake, colContainer){
    
    let name = form.elements.colname.value;
    let markAllDone = form.elements.tglalldone.checked;
    let id = null;

    // Add new column object to Kanban and create column element.
    if(!isEdit){
        if (name === ""){
            return 0;
        }
    
        let colObj = kb.addColumn(name,markAllDone);
        id = colObj.getId();
        let colEl = document.createElement("div");
        colEl.classList.add("column");
        colEl.id = `c-${colObj.getId()}`;
        colEl.innerHTML = kbColTemplate(colObj.getName());
        colContainer.insertBefore(colEl, colContainer.lastElementChild);
        
        drake.containers.push(colEl); // make column as container for draggable.
    
    // Update existing column object and column element.
    }else{
        id = editedColObj.getId();
        editedColObj.setName(name);
        editedColObj.setMarkAllChecked(markAllDone);

        let colEl = document.querySelector(`#c-${editedColObj.getId()} p`);
        colEl.innerText = name;
    }
    return 1;

}

// Insert column detail to column modal.
export function insertTargetColDetail(colId, form){

    // Change modal text.
    let modalTitle = document.querySelector("#new-column-modal .modal-title");
    let actionBtn = document.querySelector("#new-column-modal .btn-modal.action p");

    modalTitle.innerText= "Edit Section";
    actionBtn.innerText = "Save Changes";

    // Get column object and insert its properties as input to the form.
    let colObj = kb.findColumn(colId);
    form.elements.colname.value = colObj.getName();
    form.elements.tglalldone.checked = colObj.getMarkAllChecked();


}


// Remove column from kanban.
export function removeColfromKanban(colId){

    let colEl = document.querySelector(`#c-${colId}`);

    // Remove all tasks inside column.
    for (let child of colEl.children){
        if (child.className === "kb-card"){
            let taskObj = tl.findTask(child.id);
            tl.removeTask(taskObj.getId());
        }
    }

    colEl.remove();
    kb.removeColumn(colId);
}