import {cardTemplate, kbCardTemplate} from './template.js';
//https://attacomsian.com/blog/javascript-dom-remove-all-children-of-an-element
export function clearKanban(columns){
    //console.log(columns.children);
    for (let col of columns.children){
        while(col.children.length > 1){
            col.removeChild(col.lastChild);
        }
    }
    
}

export function loadTasksInKb(tl){
    
    for (let task of tl.list){
        let col = task.getColumn();
        let kbCard = document.createElement('div');
        kbCard.classList.add("kb-card");
        kbCard.innerHTML = kbCardTemplate(task);

        if(col === -1){
            task.setColumn(task.getStatus() ? 2: 0);
        }
        let parent = document.querySelector(`#c-${task.getColumn()}`)
        parent.append(kbCard);

        
    }

}
export function updateCounter(isCompleted, isAdded, upcomingCounter, completedCounter){
    let counter = isCompleted ? completedCounter : upcomingCounter;
    let num = Number(counter.innerText);
    if (isAdded){
        num++;

    }else{
        num--;
        //counter.innerText = Number(counter.innerText)--;
    }

    counter.innerText = num.toString();
    return 1;
}

export function closeModalHandler (component){
    component.classList.remove("is-active");
}

export function openModalHandler(component){
    component.classList.add("is-active");
}

export function createNewTaskElement(task, upcomingList, completedList){

    const taskCard = document.createElement("div");
    taskCard.classList.add("unchecked-card");
    taskCard.id =`t${task.getId()}`;
    createTaskContent(taskCard, task, upcomingList, completedList);
    // taskCard.innerHTML = cardTemplate(task.getId(), task.getName(), task.getDisplayDueString(), task.getColorString());
    // task.getStatus() ? completedList.append(taskCard): upcomingList.append(taskCard);
    //console.log(task.getColorString());

}

export function updateTaskElement(task, upcomingList, completedList, upcomingCounter, completedCounter, completedIsHidden){
    //let parentList = task.getStatus() ? "#completed-tasks" : "#upcoming-tasks";
    let taskCardComp = document.querySelector(`#completed-tasks #t${task.getId()}`);
    let taskCardUp =document.querySelector(`#upcoming-tasks #t${task.getId()}`);
    let taskCard = taskCardComp ? taskCardComp : taskCardUp;
    taskCard.innerHTML = cardTemplate(task.getId(), task.getName(), task.getDisplayDueString(), task.getColorString(), task.getStatus());

    //If task was not done but was ticked done in edit mode.
    if ((task.getStatus() && !taskCardComp)||!task.getStatus() && !taskCardUp ){
        if(completedIsHidden){
            tglCompletedTasks();
        }
        updateCounter(task.getStatus(), true, upcomingCounter, completedCounter);
        updateCounter(!task.getStatus(), false, upcomingCounter, completedCounter);
        taskCard.remove();
        createTaskContent(taskCard, task, upcomingList, completedList);

    }

}

export function createTaskContent(taskCard, task, upcomingList, completedList){
    taskCard.innerHTML = cardTemplate(task.getId(), task.getName(), task.getDisplayDueString(), task.getColorString(), task.getStatus());
    task.getStatus() ? completedList.append(taskCard): upcomingList.append(taskCard);

}

export function clearTaskForm(addTaskForm){

    let elements = []; // elements of add task form
    elements.push(addTaskForm.elements.taskname);
    elements.push(addTaskForm.elements.due);
    elements.push(addTaskForm.elements.esthour);
    elements.push(addTaskForm.elements.estmin);
    elements.push(addTaskForm.elements.tgldone);

    // Colour tags
    let colTags = addTaskForm.elements.coltag;

    for(var i = 0; i < colTags.length; i++){
        colTags[i].checked = false;
    }

    // Clear form input
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

export function addInputToTaskList(isEditMode, taskObj, addTaskForm){


    let newTask = null;

    // Title
    let name = addTaskForm.elements.taskname.value; 
    //elements.push(addTaskForm.elements.taskname);
    if (name === ""){
        return false;
    }

    // Colour tags
    let colTags = addTaskForm.elements.coltag;
    let colTag = null;
    for(var i = 0; i < colTags.length; i++){
        if(colTags[i].checked){
            colTag = colTags[i].value;
            //elements.push(colTags[i]);
        }
    }

    // Due date
    let due = addTaskForm.elements.due.value; //2022-05-04
    // console.log(due, due === null);
    // elements.push(addTaskForm.elements.due);

    // Priority level
    let priority = addTaskForm.elements.priority.value; //1, 2, 3
    // elements.push(addTaskForm.elements.priority);

    // Estimated time in hours
    let estHour = addTaskForm.elements.esthour.value;
    estHour = estHour === "" ? 0 : estHour; // 12a becomes empty string!
    // elements.push(addTaskForm.elements.esthour);

    // Estimated time in mins
    let estMin= addTaskForm.elements.estmin.value;
    estMin = estMin === "" ? 0 : estMin;
    // elements.push(addTaskForm.elements.estmin);

    // Task status
    let isDone = addTaskForm.elements.tgldone.checked;
    // elements.push(addTaskForm.elements.tgldone);

    if (!isEditMode){
        // Create new task and add to task list
        let task = [name, colTag, due, priority, [estHour, estMin], isDone];
        newTask = tl.newTask(task);
        tl.addTask(newTask);
    }else{

        taskObj.setName(name);
        taskObj.setColor(colTag);
        taskObj.setDue(due);
        taskObj.setPriority(priority);
        taskObj.setTime([estHour, estMin]);
        taskObj.setStatus(isDone);
        //console.log(taskObj);
        //console.log(name, colTag, due, priority, estHour, estMin, isDone )
        newTask = taskObj;

    }

    clearTaskForm(addTaskForm);
    return newTask;

}

export function getPrevValue (tdElement){
    return tdElement.className.split(" ")[1];
}

export function capitalise(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function insertTargetTaskDetail(task, dtDeleteBtn, dtEditBtn){
    // modal screen -> modal content -> details wrapper -> rhs -> card detail 
    // To know which task that is currently displayed.
    dtDeleteBtn.id = "delete-task-" + `${task.getId()}`;
    dtEditBtn.id = "edit-task-" + `${task.getId()}`;



    // dtEditBtn.id += `-${task.getId()}`;

    let tdTitle = document.querySelector("#detail-task-modal .reading-title");
    tdTitle.innerText = task.getName();


    let taskCol = task.getColor() === 0 ? "nocol" : `${task.getColorString()}`;
    let tdCol = document.querySelector("#detail-task-modal #td-col span");
    let tdColTagName = document.querySelector("#detail-task-modal #td-col p");
    tdCol.classList.remove(getPrevValue(tdCol));
    tdCol.classList.add(taskCol);
    tdColTagName.innerText = task.getColor() === 0 ? "No colour" : capitalise(taskCol);

    let taskPrio = task.getPriorityString();
    let tdPrio = document.querySelector("#detail-task-modal #td-prio span");
    tdPrio.innerText = capitalise(taskPrio);
    tdPrio.classList.remove(getPrevValue(tdPrio));
    tdPrio.classList.add(taskPrio);

    let tdDue = document.querySelector("#detail-task-modal #td-due p");
    tdDue.innerText = task.getDisplayDueString(true);


    let tdTime = document.querySelector("#detail-task-modal #td-time p");
    tdTime.innerText = task.getTimeString();

    let tdStatIcon = document.querySelector("#detail-task-modal #td-isdone span");
    let tdStat = document.querySelector("#detail-task-modal #td-isdone p");
    tdStatIcon.innerText = task.getStatus() ? "done" : "hourglass_empty";
    tdStat.innerText = task.getStatusString();

}

//or unchecked
export function taskChecked(id, upcomingList, completedList, upcomingCounter, completedCounter){

    let task = tl.findTask(id);
    task.setStatus(!task.getStatus());
    updateCounter(task.getStatus(), true, upcomingCounter, completedCounter);
    updateCounter(!task.getStatus(), false, upcomingCounter, completedCounter)

    let taskElement = null;

    if (task.getStatus()){
        taskElement = document.querySelector(`#upcoming-tasks #t${id}`);
        
    }else{
        taskElement = document.querySelector(`#completed-tasks #t${id}`);
    }

    taskElement.remove();
    createTaskContent(taskElement, task,upcomingList, completedList);
}

export function tglCompletedTasks(completedIsHidden){
    completedIsHidden = !completedIsHidden;
    let completedTasks = document.querySelectorAll("#completed-tasks .unchecked-card");
    for (ct of completedTasks){
        ct.classList.toggle("is-hide");
    }

    return 1;
}
// 