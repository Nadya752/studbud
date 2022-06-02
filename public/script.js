
import TaskList from './tasklist.js';
import {cardTemplate, kbCardTemplate} from './template.js';
import Kanban from './kanban.js';
import * as t from './taskHelper.js';
import * as r from './readingListHelper.js';
import * as c from './collectionHelper.js';
import ReadingList from './readingList.js';


let completedIsHidden = false;
let readIsHidden = false;
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

const taskCard = document.querySelectorAll(".tasklists");
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
const rdTab = document.querySelector(".tab-label[for=\"readingls\"");
const clTab = document.querySelector(".tab-label[for=\"collections\"");
const tlContent = document.querySelector("#tl-content");
const kbContent = document.querySelector("#kb-content");
const rdContent = document.querySelector("#rd-content");
const clContent = document.querySelector("#collections-content");
const columns = document.querySelector('#kb-content .columns');
let isHidden= [false, true, true, true, true, true];

const navTask = document.querySelector("#nav-1");
const navTimer = document.querySelector("#nav-2");
const navRead = document.querySelector("#nav-3");


const addReadingBtn= document.querySelector("#add-reading-btn");
const addReadingModal = document.querySelector("#new-reading-modal");
const arCancelIcon = document.querySelector("#new-reading-modal .btn-close");
const arCancelBtn = document.querySelector("#new-reading-modal .btn-modal.cancel");
const rdModalContent = document.querySelector("#new-reading-modal .modal-content");
const rdModalTitle =document.querySelector("#new-reading-modal .modal-title");
const addReadingForm = document.querySelector("#new-reading-modal form");
const createRdgBtn = document.querySelector("#new-reading-modal .btn-modal.action");
const createReadingBtnTitle = document.querySelector("#new-reading-modal .btn-modal.action p");
const readingCard = document.querySelectorAll(".readings");

const rdtModal = document.querySelector("#edit-reading-modal");
const rdtDeleteBtn = document.querySelector("#edit-reading-modal #delete-rdg-r");
const rdtEditBtn = document.querySelector("#edit-reading-modal #edit-rdg-r");
const rdCancelIcon = document.querySelector("#edit-reading-modal .btn-close");

const unreadList = document.querySelector("#unread-readings");
const unreadCounter = document.querySelector("#unread-readings .list-len");
const readList = document.querySelector("#read-readings");
const readCounter = document.querySelector("#read-readings .list-len");
const rHideBtn = document.querySelector("#read-readings .button");

const addCollectionBtn = document.querySelector("#collections-content .btn-add");
const addCollectionModal = document.querySelector("#new-collection-modal");
const addCollectionForm = document.querySelector("#new-collection-modal form");
const clCancelIcon = document.querySelector("#new-collection-modal .btn-close");
const clCancelBtn = document.querySelector("#new-collection-modal .btn-modal.cancel");
const clModalContent = document.querySelector("#new-collection-modal .modal-content");
const clModalTitle =document.querySelector("#new-collection-modal .modal-title");
const createCltBtn = document.querySelector("#new-collection-modal .btn-modal.action");
const createCltBtnTitle = document.querySelector("#new-collection-modal .btn-modal.action p");
const cltContainer = document.querySelector(".accordion");

tl = new TaskList();
kb = new Kanban();
rl = new ReadingList();

window['tl'] = tl;
window['kb'] = kb;

//https://github.com/bevacqua/dragula#usage
var drake = dragula({
    copy: false,
    invalid: function (el) {
        return el.classList.contains("no-drag");
      }
});

for (let column of columnsDraggable){
    drake.containers.push(column);
}

window['drake'] = drake;

const screen={

    TASKLIST: 0,
    KANBAN: 1,
    PMDR: 2,
    TIMER: 3,
    READINGS: 4,
    COLLECTIONS: 5,
}

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
    t.clearTaskList();
    upcomingCounter.innerText = "0";
    completedCounter.innerText = "0";
    let allTasks = tl.getAllTasks();
    if(allTasks){
        for (let task of allTasks){
            t.createNewTaskElement(task, upcomingList, completedList, true);
            t.updateCounter(task.getStatus(), true, upcomingCounter, completedCounter);
        }
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

rdTab.addEventListener("click",() => {
    rdContent.classList.remove("is-hide");
    clContent.classList.add("is-hide");
    r.clearReading();
    unreadCounter.innerText = "0";
    readCounter.innerText = "0";
    let allRdg = rl.getAllReadings();
    if (allRdg){
        for (let rdg of allRdg){
            t.createNewTaskElement(rdg, unreadList, readList, false);
            t.updateCounter(rdg.getIsRead(), true, unreadCounter, readCounter);
        }
    }
    r.updateCollectionChoice(addReadingForm);


})

clTab.addEventListener("click",() => {
    rdContent.classList.add("is-hide");
    clContent.classList.remove("is-hide");
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
        t.createNewTaskElement(newTask, upcomingList, completedList, true);
        t.updateCounter(newTask.getStatus(), true, upcomingCounter, completedCounter);
        
    }else{
        modalContent.id = `edit-mode-0`;
        t.updateTaskElement(taskObj, upcomingList, completedList, upcomingCounter, completedCounter, completedIsHidden, true);

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

                    completedIsHidden = t.tglCompletedTasks(completedIsHidden, true);
                }
                t.taskChecked(e.target.id.split("-")[1], upcomingList, completedList, upcomingCounter, completedCounter, true);
            }
        }
    
    })
}

dtCancelIcon.addEventListener("click", () =>{
    t.closeModalHandler(detailTaskModal);
})

hideBtn.addEventListener("click", () => {
    completedIsHidden = t.tglCompletedTasks(completedIsHidden, true);

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

// READING AND COLLECTIONS
addReadingBtn.addEventListener("click", () => {
    addReadingModal.classList.remove("is-hide");
})

arCancelBtn.addEventListener("click", () => {
    addReadingModal.classList.add("is-hide");
})

arCancelIcon.addEventListener("click", () => {
    addReadingModal.classList.add("is-hide");
})

createRdgBtn.addEventListener("click", () =>{


    let rdgId = rdModalContent.id.split("-").includes("reading") ? Number(rdModalContent.id.split("-").pop()) : null;
    let isEditMode = rdgId === null ? false : true;
    let rdgObj = isEditMode ? rl.find(rdgId, true) : null;
    let newRdg = r.addInputToReadingList(isEditMode, rdgObj, addReadingForm);


    // Prevent creating untitled task
    if (!newRdg){
        return;
    }
    

    if(!isEditMode){
        // console.log("create");
        t.createNewTaskElement(newRdg, unreadList, readList, false);
        t.updateCounter(newRdg.getIsRead(), true, unreadCounter, readCounter);
    }else{

        // console.log("edit");
        rdModalContent.id = `edit-mode-0`;
        t.updateTaskElement(rdgObj, unreadList, readList, unreadCounter, readCounter, readIsHidden, false);


    }  

    addReadingModal.classList.add("is-hide");
    //console.log("???");


})

for (let rd of readingCard){
    rd.addEventListener("click", (e) => {
        let eName = e.target.className;
        if(eName.includes("card") || eName.includes("col-tag")){

            let current = e.target;
            while (current.id === ""){
                current = current.parentElement;
            }
    
            let targetRdg = rl.find(current.id.slice(1, current.id.length+1), true); // truncate r in id.);


            r.insertTargetRdgDetail(targetRdg, rdtDeleteBtn, rdtEditBtn);
            rdtModal.classList.remove("is-hide");

        }else if (eName.includes("check") || e.target.tagName === "INPUT"){
            if(e.target.tagName === "INPUT"){
                if(readIsHidden){
                    readIsHidden =t.tglCompletedTasks(readIsHidden, false);
                }
                t.taskChecked(e.target.id.split("-")[1], unreadList, readList, unreadCounter, readCounter, false);
            }
        }else if (e.target.parentElement.className === "bookmark-icon"){

            let current = e.target;
            while (current.id === ""){
                current = current.parentElement;
            }
            

            let targetRdg = rl.find(current.id.slice(1, current.id.length+1), true); // truncate r in id.);
            // console.log(targetRdg);
            let parent = targetRdg.getIsRead() ? readList : unreadList;
            current.remove();
            let sibling =targetRdg.getIsRead() ? parent.children[0] : parent.children[1];
            //console.log(sibling);
            sibling.insertAdjacentElement("afterend", current);
            // console.log(current);

        }

    })
}

rdCancelIcon.addEventListener("click", () =>{
    rdtModal.classList.add("is-hide");
})

rHideBtn.addEventListener("click", () => {
    readIsHidden = t.tglCompletedTasks(readIsHidden, false);
})

rdtEditBtn.addEventListener("click", () => {
    let rdgId = rdtEditBtn.id.split("-").pop();
    let rdgObj = rl.find(rdgId, true);
    rdtModal.classList.add("is-hide");
    addReadingModal.classList.remove("is-hide");
    rdModalContent.id = `edit-mode-reading-${rdgObj.getId()}`;
    rdModalTitle.innerText = "Edit Reading";
    createReadingBtnTitle.innerText = "Save changes";

    addReadingForm.elements.rdgname.value = rdgObj.getName();
    addReadingForm.elements.tglread.checked = rdgObj.getIsRead();
    addReadingForm.elements.tglbookm.checked = rdgObj.getIsPin();
    addReadingForm.elements.link.value = rdgObj.getLink();
    r.updateCollectionChoice(addReadingForm);
    addReadingForm.elements.collection.value = rdgObj.getCollection() ? rdgObj.getCollection().getId() : 0;

})

rdtDeleteBtn.addEventListener("click", () => {
    let rdgId = rdtDeleteBtn.id.split("-").pop();
    let rdgObj = rl.find(rdgId, true);
    let readings = rdgObj.getIsRead() ? "#read-readings" : "#unread-readings";
    let targetRdg = document.querySelector(`${readings} #r${rdgId}`);
    targetRdg.remove();
    rl.remove(rdgId, true);
    rdtModal.classList.add("is-hide");
    t.updateCounter(rdgObj.getIsRead(), false, unreadCounter, readCounter);

})

addCollectionBtn.addEventListener("click", () =>{

    c.clearCltForm(addCollectionForm);
    clModalTitle.innerText= "Create New Collection";
    createCltBtnTitle.innerText = "Create collection";
    clModalContent.id = "create";
    addCollectionModal.classList.remove("is-hide");
})

clCancelIcon.addEventListener("click", () => {
    addCollectionModal.classList.add("is-hide");
})

clCancelBtn.addEventListener("click", () => {
    addCollectionModal.classList.add("is-hide");
})

createCltBtn.addEventListener("click", () => {
    let isEditMode = clModalContent.id === "create" ? false : true;
    if (!isEditMode){
        let newClt = c.addInputToCollection(addCollectionForm, false, null);
        if(!newClt){
            return
        }
    }else{
        let idArray = clModalContent.id.split("-");
        let id = Number(idArray[idArray.length -1]);
        let editedCltObj = rl.find(id, false);

        c.addInputToCollection(addCollectionForm, true, editedCltObj);
    }


    addCollectionModal.classList.add("is-hide");

})

cltContainer.addEventListener("click", (e) => {
    let edit = "material-symbols-outlined icon edit";
    let del = "material-symbols-outlined icon del";

    let targetName = e.target.className;
    let targetTag = e.target.tagName;
    let id = null;

    if (targetTag === "SPAN"){
        let current = e.target;
        //console.log(current);
        while(current.id === ""){
            current = current.parentElement;
        }
        let idArray = current.id.split("-");
        id = idArray[idArray.length -1];
    

        if (targetName === edit){

            clModalContent.id = `edit-${id}`;
            c.insertTargetCltDetail(id, addCollectionForm);
            addCollectionModal.classList.toggle('is-hide');

        }else if (targetName === del){

            c.removeClt(id);
        }else if(targetName.includes("open")){

            c.openAllTabs(id);
        }
    }

})

// colContainer.addEventListener("click", (e) =>{
//     let edit = "material-symbols-outlined icon edit";
//     let del = "material-symbols-outlined icon del";
    
//     let targetName = e.target.className;
//     let targetTag = e.target.tagName;
//     let id = null;
    
//     if (targetTag === "SPAN"){
//         let current = e.target;
//         while(current.id === ""){
//             current = current.parentElement;
//         }
//         let idArray = current.id.split("-");
//         id = idArray[idArray.length -1];
        

//         if (targetName === edit){
//             colModalContent.id = `edit-${id}`;
//             insertTargetColDetail(id, createSectionForm);
//             newColModal.classList.toggle('is-hide');

//         }else if (targetName === del){
//             removeColfromKanban(id);
//         }
//     }

// })