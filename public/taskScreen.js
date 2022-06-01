
import TaskList from './tasklist.js';
import {cardTemplate, kbCardTemplate} from './template.js';
import Kanban from './kanban.js';
import * as t from './taskHelper.js';


let completedIsHidden = false;
const upcomingList = document.querySelector("#upcoming-tasks");
const upcomingCounter = document.querySelector("#upcoming-tasks .list-len");
const completedList = document.querySelector("#completed-tasks");
const completedCounter = document.querySelector("#completed-tasks .list-len")

const addTaskBtn = document.querySelector("#add-task-btn");
const addTaskModal = document.querySelector("#new-task-modal");
const ntCancelIcon= document.querySelector("#new-task-modal .btn-close");
const ntCancelBtn = document.querySelector("#new-task-modal .btn-modal.cancel");
const createTaskBtn = document.querySelector("#new-task-modal .btn-modal.action");
const createTaskBtnTitle = document.querySelector("#new-task-modal .btn-modal.action p");
const addTaskForm = document.querySelector("#new-task-modal form");

const taskCard = document.querySelectorAll(".tasks");
const detailTaskModal = document.querySelector("#detail-task-modal");
const dtDeleteBtn = document.querySelector("#detail-task-modal #delete-task-t");
const dtEditBtn = document.querySelector("#detail-task-modal #edit-task-t");
const modalContent = document.querySelector("#new-task-modal .modal-content");
const modalTitle = document.querySelector("#new-task-modal .modal-title");


const dtCancelIcon =  document.querySelector("#detail-task-modal .btn-close");
const hideBtn = document.querySelector("#completed-tasks .button");
const columnsDraggable = document.querySelectorAll(".column");

const tlTab = document.querySelector(".tab-label[for=\"tasklist\"");
const kbTab = document.querySelector(".tab-label[for=\"kanban\"");
const tlContent = document.querySelector("#tl-content");
const kbContent = document.querySelector("#kb-content");
const columns = document.querySelector('#kb-content .columns');
let isHidden= [false, true, true, true, true, true];

const navTask = document.querySelector("#nav-1");
const navTimer = document.querySelector("#nav-2");
const navRead = document.querySelector("#nav-3");


tl = new TaskList();
kb = new Kanban();

window['tl'] = tl;
window['kb'] = kb;

var drake = dragula({
    copy: false
});

for (let column of columnsDraggable){
    drake.containers.push(column);
}
// drake.containers.push(colContainer);

const screen={

    TASKLIST: 0,
    KANBAN: 1,
    PMDR: 2,
    TIMER: 3,
    READINGS: 4,
    COLLECTIONS: 5,
}


// #pomodoro-stopwatch-tab{
//     display: none;
//   }
  
//   #readingls-collections-tab{
//     display: none;
//   }

navTask.addEventListener("click", () => {
    const tlkbTab = document.querySelector("#task-kanban-tab");
    const pmstTab = document.querySelector("#pomodoro-stopwatch-tab");
    const rdlsTab = document.querySelector("#readingls-collections-tab");
    
    navTask.classList.add("nav-selected");
    navTimer.classList.remove("nav-selected");
    navRead.classList.remove("nav-selected");

    tlkbTab.classList.remove("is-hide")
    pmstTab.classList.add("is-hide");
    rdlsTab.classList.add("is-hide");
})

navTimer.addEventListener("click", () => {
    const tlkbTab = document.querySelector("#task-kanban-tab");
    const pmstTab = document.querySelector("#pomodoro-stopwatch-tab");
    const rdlsTab = document.querySelector("#readingls-collections-tab");
    
    navTask.classList.remove("nav-selected");
    navTimer.classList.add("nav-selected");
    navRead.classList.remove("nav-selected");

    
    tlkbTab.classList.add("is-hide")
    pmstTab.classList.remove("is-hide");
    rdlsTab.classList.add("is-hide");
})

navRead.addEventListener("click", () => {
    const tlkbTab = document.querySelector("#task-kanban-tab");
    const pmstTab = document.querySelector("#pomodoro-stopwatch-tab");
    const rdlsTab = document.querySelector("#readingls-collections-tab");
    
    navTask.classList.remove("nav-selected");
    navTimer.classList.remove("nav-selected");
    navRead.classList.add("nav-selected");

    tlkbTab.classList.add("is-hide")
    pmstTab.classList.add("is-hide");
    rdlsTab.classList.remove("is-hide");
})



tlTab.addEventListener("click", () => {

    if (isHidden[screen.TASKLIST]){
        tlContent.classList.toggle("is-hide");
        kbContent.classList.toggle("is-hide");
        isHidden[screen.TASKLIST] = false;
        isHidden[screen.KANBAN] = true;
    }

})

kbTab.addEventListener("click", () => {
    
    if(isHidden[screen.KANBAN]){

        tlContent.classList.toggle("is-hide");
        kbContent.classList.toggle("is-hide");
        isHidden[screen.TASKLIST] = true;
        isHidden[screen.KANBAN] = false;
    }
    t.clearKanban(columns);
    t.loadTasksInKb(tl);


})

addTaskBtn.addEventListener("click", () => {
    modalTitle.innerText = "Create new task";
    createTaskBtnTitle.innerText = "Create task";
    t.clearTaskForm(addTaskForm);
    t.openModalHandler(addTaskModal);
})

ntCancelIcon.addEventListener("click", () =>{
    t.closeModalHandler(addTaskModal);
})

ntCancelBtn.addEventListener("click", () =>{
    t.closeModalHandler(addTaskModal);
})

createTaskBtn.addEventListener("click", () => {
    //console.log(modalContent.id.split("-"));
    let taskId = modalContent.id.split("-").includes("task") ? Number(modalContent.id.split("-").pop()) : null;
    let isEditMode = taskId === null ? false : true;
    let taskObj = isEditMode ? tl.findTask(taskId) : null;
    //console.log(taskId, isEditMode, taskObj);

    let newTask = t.addInputToTaskList(isEditMode, taskObj, addTaskForm);
    // Prevent creating untitled task
    if (!newTask){
        return;
    }
    t.closeModalHandler(addTaskModal);

    if(!isEditMode){
        t.createNewTaskElement(newTask, upcomingList, completedList);
        t.updateCounter(newTask.getStatus(), true, upcomingCounter, completedCounter);
    }else{
        modalContent.id = `edit-mode-0`;
        t.updateTaskElement(taskObj, upcomingList, completedList, upcomingCounter, completedCounter, completedIsHidden);

    }




})

for (let tc of taskCard){
    tc.addEventListener("click", (e) =>{

        let eName = e.target.className;
        // if (eName === "unchecked-card" || eName === "card-content" || eName === "card-detail" || eName === "card-title" || eName.includes("col-tag")){
        if(eName.includes("card") || eName.includes("col-tag")){
            let current = e.target;
            while (current.id === ""){
                current = current.parentElement;
            }
    
            let targetTask = tl.findTask(current.id.slice(1, current.id.length+1)); // truncate t in id.);
            t.insertTargetTaskDetail(targetTask, dtDeleteBtn, dtEditBtn);
            t.openModalHandler(detailTaskModal);
    
        }else if (eName.includes("check") || e.target.tagName === "INPUT"){
    
            if(e.target.tagName === "INPUT"){
                if(completedIsHidden){
                    t.tglCompletedTasks(completedIsHidden);
                }
                t.taskChecked(e.target.id.split("-")[1], upcomingList, completedList, upcomingCounter, completedCounter);
            }
        }
    
    })
}

dtCancelIcon.addEventListener("click", () =>{
    t.closeModalHandler(detailTaskModal);
})

hideBtn.addEventListener("click", () => {
    t.tglCompletedTasks(completedIsHidden);

})

dtDeleteBtn.addEventListener("click", () => {
    let taskId = dtDeleteBtn.id.split("-").pop();
    let taskObj = tl.findTask(taskId);
    let tasks = taskObj.getStatus() ? "#completed-tasks" : "#upcoming-tasks";
    let targetTask = document.querySelector(`${tasks} #t${taskId}`);
    targetTask.remove();
    tl.removeTask(taskId);
    t.closeModalHandler(detailTaskModal);
    t.updateCounter(taskObj.getStatus(), false, upcomingCounter, completedCounter);


})


dtEditBtn.addEventListener("click", () => {
    let taskId = dtEditBtn.id.split("-").pop();
    let taskObj = tl.findTask(taskId);
    t.closeModalHandler(detailTaskModal);
    t.openModalHandler(addTaskModal);
    modalContent.id = `edit-mode-task-${taskObj.getId()}`;
    modalTitle.innerText = "Edit task";
    createTaskBtnTitle.innerText = "Save changes";



    


    addTaskForm.elements.taskname.value = taskObj.getName();
    if(taskObj.getColor() !== 0){
        addTaskForm.elements.coltag[taskObj.getColor()-1].checked = true;

    }
    if (taskObj.getDue()){
        addTaskForm.elements.due.value = taskObj.getDue();
    }

    addTaskForm.elements.priority.value = taskObj.getPriority();
    addTaskForm.elements.esthour.value = taskObj.getTime()[0];
    addTaskForm.elements.estmin.value = taskObj.getTime()[1];
    addTaskForm.elements.tgldone.checked = taskObj.getStatus();

    

    
})
