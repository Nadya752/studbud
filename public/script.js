
import TaskList from './tasklist.js';
import {cardTemplate, kbCardTemplate} from './template.js';
import Kanban from './kanban.js';
import * as t from './taskHelper.js';
import * as r from './readingListHelper.js';
import * as c from './collectionHelper.js';
import * as p from './pmdrHelper.js';
import ReadingList from './readingList.js';
import StudyTimer from './studyTimer.js';



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
const pmTab = document.querySelector(".tab-label[for=\"pomodoro\"");
const stTab = document.querySelector(".tab-label[for=\"stopwatch\"");

const tlContent = document.querySelector("#tl-content");
const kbContent = document.querySelector("#kb-content");
const rdContent = document.querySelector("#rd-content");
const clContent = document.querySelector("#collections-content");
const pmContent = document.querySelector("#pmdr-content");
const stContent = document.querySelector("#swatch-content");

const columns = document.querySelector('#kb-content .columns');
// let isHidden= [false, true, true, true, true, true];

const navTask = document.querySelector("#nav-1");
const navTimer = document.querySelector("#nav-2");
const navRead = document.querySelector("#nav-3");
const hamburgerClosed = document.querySelector(".top-nav-mobile .hamburger-menu");
const hamburgerOpened = document.querySelector(".left-nav-mobile .hamburger-menu");
const mobileMenuClosed = document.querySelector(".top-nav-mobile");
const mobileMenuOpened = document.querySelector(".left-nav-mobile");
const mobileNavTask = document.querySelector("#mob-nav-0");
const mobileNavKanban = document.querySelector("#mob-nav-1");
const mobileNavPmdr = document.querySelector("#mob-nav-2");
const mobileNavStopwatch = document.querySelector("#mob-nav-3");
const mobileNavReading = document.querySelector("#mob-nav-4");
const mobileNavCollections = document.querySelector("#mob-nav-5");
const mobileNavTitle = document.querySelector(".mobile-dropdown-select p");
const mobileRadio = document.querySelectorAll(".nav-tab-radio");

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

const focusTab = document.querySelector("#focus-label");
const shortbrTab = document.querySelector("#shortbr-label");
const longbrTab = document.querySelector("#longbr-label");
const pmStartBtn = document.querySelector("#pmdr-start");
const pmResetBtn = document.querySelector("#pmdr-reset");
const sessionTabs = document.querySelectorAll(".pmdr-tab-radio");
const elapsedTime = document.querySelector("#elapsed-time");
const roundText = document.querySelector("#round-text");

const settingsBtn = document.querySelector(".settings");
const settingsModal = document.querySelector("#settings-modal");
const settingsCancelIcon= document.querySelector("#settings-modal .btn-close");
const settingsCancelBtn = document.querySelector("#settings-modal .btn-modal.cancel");
const saveSettingsBtn = document.querySelector("#settings-modal .btn-modal.action");
const focusTime = document.querySelector("#focus-time");
const shortbrTime = document.querySelector("#shortbr-time");
const longbrTime = document.querySelector("#longbr-time");
const roundNum = document.querySelector("#round-num");


const stStartBtn = document.querySelector("#st-start");
const stResetBtn = document.querySelector("#st-reset");
const stElapsedTime = document.querySelector("#s-elapsed-time");

const musicBtn = document.querySelector(".music-player span");
const minMusicBtnMobile = document.querySelector(".music-icon-mobile");
const minMusicBtn = document.querySelector(".music-player.minimised span");
const musicPlayer = document.querySelector(".music-player");
const minMusicPlayer = document.querySelector(".music-player.minimised");
const MUSIC_MIN_FILL = "#F7F6F3";
const MUSIC_EXP_FILL = "#E8E7E4";


// const timerStats = [p.status.START, p.status.START, p.status.START];
let timerStat = p.status.START;
let swatchStat = p.status.START;

const screens = {
    TASKLIST: "0",
    KANBAN: "1",
    POMODORO: "2",
    STOPWATCH: "3",
    READINGS: "4",
    COLLECTIONS: "5",
}

tl = new TaskList();
kb = new Kanban();
rl = new ReadingList();
st = new StudyTimer(p.defVal.FOCUS, p.defVal.SHORTBR, p.defVal.LONGBR, p.defVal.ROUND);
let timer = new easytimer.Timer();
let stopwatch = new easytimer.Timer();

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

// NAVIGATION

navTask.addEventListener("click", () => {
    tlTab.click();
    const tlkbTab = document.querySelector("#task-kanban-tab");
    const pmstTab = document.querySelector("#pomodoro-stopwatch-tab");
    const rdlsTab = document.querySelector("#readingls-collections-tab");
    
    navTask.classList.add("nav-selected");
    navTimer.classList.remove("nav-selected");
    navRead.classList.remove("nav-selected");

    tlkbTab.classList.remove("is-hide")
    pmstTab.classList.add("is-hide");
    rdlsTab.classList.add("is-hide");
    tlTab.checked = true;
    kbTab.checked = false;
})

navTimer.addEventListener("click", () => {

    pmTab.click();
    const tlkbTab = document.querySelector("#task-kanban-tab");
    const pmstTab = document.querySelector("#pomodoro-stopwatch-tab");
    const rdlsTab = document.querySelector("#readingls-collections-tab");
    
    navTask.classList.remove("nav-selected");
    navTimer.classList.add("nav-selected");
    navRead.classList.remove("nav-selected");

    pmTab.checked = true;
    stTab.checked = false;
    
    tlkbTab.classList.add("is-hide")
    pmstTab.classList.remove("is-hide");
    rdlsTab.classList.add("is-hide");
    tab = p.getCurrentSesh(sessionTabs);

    if (tab === p.tab.FOCUS){
        p.applyColour(p.tab.FOCUS, focusTab);

    }else if (tab === p.tab.SHORTBR){
        p.applyColour(p.tab.SHORTBR, shortbrTab);

    }else if(tab === p.tab.LONGBR){
        p.applyColour(p.tab.LONGBR, longbrTab);
    }

    p.refreshPmdrPage(st, tab, elapsedTime, roundText);

    
})

navRead.addEventListener("click", () => {
    rdTab.click();
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

mobileNavTask.addEventListener("click", () =>{
    navTask.click();
    // mobileNavTitle.innerText = "✔️ Task List";
})

mobileNavKanban.addEventListener("click", () => {
    navTask.click();
    kbTab.click();
    // mobileNavTitle.innerText = "🗂️ Kanban Board";
})

mobileNavPmdr.addEventListener("click", () => {
    navTimer.click();
    // mobileNavTitle.innerText = "⏰ Pomodoro Timer";
})

mobileNavStopwatch.addEventListener("click", () => {
    navTimer.click();
    stTab.click();
    // mobileNavTitle.innerText = "⏱️ Classic Stopwatch";
})

mobileNavReading.addEventListener("click", () => {
    navRead.click();
    // mobileNavTitle.innerText = "📖 Readings";
})

mobileNavCollections.addEventListener("click", () => {
    navRead.click();
    clTab.click();
    // mobileNavTitle.innerText = "📚 Collections";
})

function checkMobile(targetTab){

    for( let mtab of mobileRadio){
        if (mtab.value === targetTab){
            mtab.checked = true;
            continue;
        }
        mtab.checked = false;
    }
}

tlTab.addEventListener("click", () => {
    mobileNavTitle.innerText = "✔️ Task List";
    checkMobile(screens.TASKLIST);

    tlContent.classList.remove("is-hide");
    kbContent.classList.add("is-hide");

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
    mobileNavTitle.innerText = "🗂️ Kanban Board";
    checkMobile(screens.KANBAN);
    tlContent.classList.add("is-hide");
    kbContent.classList.remove("is-hide");
    t.clearKanban(columns);
    t.loadTasksInKb(tl);
})

pmTab.addEventListener("click", () => {
    mobileNavTitle.innerText = "⏰ Pomodoro Timer";
    checkMobile(screens.POMODORO);
    pmContent.classList.remove("is-hide");
    stContent.classList.add("is-hide");
})

stTab.addEventListener("click", () => {
    mobileNavTitle.innerText = "⏱️ Classic Stopwatch";
    checkMobile(screens.STOPWATCH);
    pmContent.classList.add("is-hide");
    stContent.classList.remove("is-hide");
})

rdTab.addEventListener("click",() => {
    mobileNavTitle.innerText = "📖 Readings";
    checkMobile(screens.READINGS);
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
    mobileNavTitle.innerText = "📚 Collections";
    checkMobile(screens.COLLECTIONS);
    rdContent.classList.add("is-hide");
    clContent.classList.remove("is-hide");
})

//NAVIGATION MOBILE
hamburgerClosed.addEventListener("click", () => {
    mobileMenuOpened.classList.remove("is-hide");
    mobileMenuClosed.classList.add("is-hide");
})

hamburgerOpened.addEventListener("click", () => {
    mobileMenuOpened.classList.add("is-hide");
    mobileMenuClosed.classList.remove("is-hide");

})

// MUSIC PLAYER
musicBtn.addEventListener("click", () => {
    musicPlayer.classList.add("is-hide");
    minMusicPlayer.classList.remove("is-hide");

    if (minMusicBtnMobile.style.backgroundColor = MUSIC_EXP_FILL){
        musicPlayer.classList.add("is-hide");
        minMusicBtnMobile.style.backgroundColor = MUSIC_MIN_FILL;
    }
})

minMusicBtn.addEventListener("click", () => {
    musicPlayer.classList.remove("is-hide");
    minMusicPlayer.classList.add("is-hide");
})

minMusicBtnMobile.addEventListener("click", () => {
    let isMin = musicPlayer.classList.contains("is-hide");
    if (isMin){
        musicPlayer.classList.remove("is-hide");
        minMusicBtnMobile.style.backgroundColor = MUSIC_EXP_FILL;
    }else{
        musicPlayer.classList.add("is-hide");
        minMusicBtnMobile.style.backgroundColor = MUSIC_MIN_FILL;
    }
})


// READING



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

// POMODORO
// var timerInstance = new easytimer.Timer();
// console.log(timerInstance);



timer.addEventListener('secondsUpdated', function (e) {
    // $('#countdownExample .values').html(timer.getTimeValues().toString());
    elapsedTime.innerText = timer.getTimeValues().toString();
    let currentSesh = null;
    for(let sesh of sessionTabs){
        if(sesh.checked){
            currentSesh = sesh.value;
        }
    }

    p.updateCircle(timer.getTimeValues(), st.getMax(currentSesh), sessionTabs);
    // console.log(timer.getTimeValues());
    // console.log(timer.getTotalTimeValues());

});


timer.addEventListener("targetAchieved", () => {
    console.log("YAY!!!!!");

    
    let session = p.getCurrentSesh(sessionTabs);
    let nextSession = p.getNextSesh(session, st, sessionTabs);
    p.refreshPmdrPage(st, session, elapsedTime, roundText);
    p.refreshPmdrPage(st, nextSession, elapsedTime, roundText);
    
    let tabEl = null;
    if (nextSession === p.tab.FOCUS){
        tabEl = focusTab;

    }else if (nextSession === p.tab.SHORTBR){
        tabEl= shortbrTab;

    }else if (nextSession === p.tab.LONGBR){
        tabEl= longbrTab;
    }

    p.applyColour(nextSession, tabEl);
    timerStat = p.deactivateTimer(timer, pmStartBtn, pmResetBtn, timerStat, sessionTabs);
})
timer.addEventListener('started', () =>  {
    elapsedTime.innerText = timer.getTimeValues().toString();
});

timer.addEventListener('reset', () => {
    elapsedTime.innerText = timer.getTimeValues().toString();
});

// timer.addEventListener('stopped', (e) => {
//     // elapsedTime.innerText = timer.getTimeValues().toString();
//     // let timeVal = timer.getTimeValues().toString();
//     // if (timeVal === "00:00:00"){
//     //     console.log("auto", timeVal, e);
//     //     let session = p.getCurrentSesh(sessionTabs);
//     //     let nextSession = p.getNextSesh(session, st, sessionTabs);
//     //     p.refreshPmdrPage(st, session, elapsedTime, roundText);
//     //     p.refreshPmdrPage(st, nextSession, elapsedTime, roundText);
        
//     //     let tabEl = null;
//     //     if (nextSession === p.tab.FOCUS){
//     //         tabEl = focusTab;

//     //     }else if (nextSession === p.tab.SHORTBR){
//     //         tabEl= shortbrTab;

//     //     }else if (nextSession === p.tab.LONGBR){
//     //         tabEl= longbrTab;
//     //     }

//     //     p.applyColour(nextSession, tabEl);
//     //     timerStat = p.deactivateTimer(timer, pmStartBtn, pmResetBtn, timerStat, sessionTabs);
//     //     // console.log("End");
//     // }
//     // timer.reset();
// });




focusTab.addEventListener("click", () => {
    p.applyColour(p.tab.FOCUS, focusTab);
    p.refreshPmdrPage(st, p.tab.FOCUS, elapsedTime, roundText);
})

shortbrTab.addEventListener("click", () => {
    p.applyColour(p.tab.SHORTBR, shortbrTab);
    p.refreshPmdrPage(st, p.tab.SHORTBR, elapsedTime, roundText);
})
longbrTab.addEventListener("click", () => {
    p.applyColour(p.tab.LONGBR, longbrTab);
    p.refreshPmdrPage(st, p.tab.LONGBR, elapsedTime, roundText);
})

pmStartBtn.addEventListener("click", () =>{
    let currentSesh = p.getCurrentSesh(sessionTabs);
    let isCountdown = true;

    timerStat = p.activateTimer(timer, currentSesh, pmStartBtn, pmResetBtn, timerStat, isCountdown);

})

pmResetBtn.addEventListener("click", () =>{
    let currentSesh = p.getCurrentSesh(sessionTabs);
    p.refreshPmdrPage(st, currentSesh, elapsedTime, roundText);

    timer.reset();
    timer.stop();
    timerStat = p.deactivateTimer(timer, pmStartBtn, pmResetBtn, timerStat, sessionTabs);

})

settingsBtn.addEventListener("click", () => {
    settingsModal.classList.remove("is-hide");
    focusTime.value = st.getMax(p.tab.FOCUS);
    shortbrTime.value = st.getMax(p.tab.SHORTBR);
    longbrTime.value = st.getMax(p.tab.LONGBR);
    roundNum.value = st.getMaxRound();

    if(timer.isRunning()){
        let currentSession = p.getCurrentSesh(sessionTabs)
        timerStat = p.activateTimer(timer, currentSession, pmStartBtn, pmResetBtn, timerStat, true);
    }


})

settingsCancelBtn.addEventListener("click", () => {
    settingsModal.classList.add("is-hide");
})

settingsCancelIcon.addEventListener("click", () => {
    settingsModal.classList.add("is-hide");
})

saveSettingsBtn.addEventListener("click", () => {
    st.setMax(p.tab.FOCUS, focusTime.value);
    st.setMax(p.tab.SHORTBR, shortbrTime.value);
    st.setMax(p.tab.LONGBR, longbrTime.value);
    st.setMaxRound(roundNum.value);
    settingsModal.classList.add("is-hide");
    let session = p.getCurrentSesh(sessionTabs);
    timer.reset();
    timer.stop();
    timerStat = p.deactivateTimer(timer, pmStartBtn, pmResetBtn, timerStat, sessionTabs);
    p.refreshPmdrPage(st, session, elapsedTime, roundText);


})
// STOPWATCH
stopwatch.addEventListener("secondTenthsUpdated", () => {
    // let value = stopwatch.getTimeValues();
    // let elapsedTimeString = value.toString() + `.${value.secondTenths}`;
    // stElapsedTime.innerText = elapsedTimeString;
    // console.log(stopwatch.getTimeValues());
    p.showStopwatchTime(stopwatch, stElapsedTime);

});

stopwatch.addEventListener('started', () => {
    p.showStopwatchTime(stopwatch, stElapsedTime);
});

stopwatch.addEventListener('reset', () =>  {
    p.showStopwatchTime(stopwatch, stElapsedTime);
});

stStartBtn.addEventListener("click", () => {
    let isCountdown = false;
    swatchStat = p.activateTimer(stopwatch, null, stStartBtn, stResetBtn, swatchStat, isCountdown);

})

stResetBtn.addEventListener("click", () => {
    stopwatch.reset();
    stopwatch.stop();
    swatchStat = p.deactivateTimer(stopwatch, stStartBtn, stResetBtn, swatchStat, null);
})