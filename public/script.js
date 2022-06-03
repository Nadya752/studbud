// Studbud classes.
import TaskList from './class/tasklist.js';
import Kanban from './class/kanban.js';
import ReadingList from './class/readingList.js';
import StudyTimer from './class/studyTimer.js';

// Helper Functions.
import * as t from './helper/taskHelper.js';
import * as r from './helper/readingListHelper.js';
import * as c from './helper/collectionHelper.js';
import * as p from './helper/pmdrHelper.js';


// Variable declarations.

// Screen enum.
const screens = {
    TASKLIST: "0",
    KANBAN: "1",
    POMODORO: "2",
    STOPWATCH: "3",
    READINGS: "4",
    COLLECTIONS: "5",
}

let timerStat = p.status.START; // Timer start, pause, or resume.
let swatchStat = p.status.START; // Stopwatch start, pause, or resume.

let completedIsHidden = false; // bool for task completed list.
let readIsHidden = false; // bool for reading read list.

// Task screen elements.
const upcomingList = document.querySelector("#upcoming-tasks");
const upcomingCounter = document.querySelector("#upcoming-tasks .list-len");
const completedList = document.querySelector("#completed-tasks");
const completedCounter = document.querySelector("#completed-tasks .list-len")
const hideBtn = document.querySelector("#completed-tasks .button");
const taskCard = document.querySelectorAll(".tasklists");
const addTaskBtn = document.querySelector("#add-task-btn");

// Add task or edit task modal elements.
const addTaskModal = document.querySelector("#new-task-modal");
const ntCancelIcon= document.querySelector("#new-task-modal .btn-close");
const ntCancelBtn = document.querySelector("#new-task-modal .btn-modal.cancel");
const createTaskBtn = document.querySelector("#new-task-modal .btn-modal.action");
const createTaskBtnTitle = document.querySelector("#new-task-modal .btn-modal.action p");
const addTaskForm = document.querySelector("#new-task-modal form");
const modalContent = document.querySelector("#new-task-modal .modal-content");
const modalTitle = document.querySelector("#new-task-modal .modal-title");

// Task detail modal elements.
const detailTaskModal = document.querySelector("#detail-task-modal");
const dtDeleteBtn = document.querySelector("#detail-task-modal #delete-task-t");
const dtEditBtn = document.querySelector("#detail-task-modal #edit-task-t");
const dtCancelIcon =  document.querySelector("#detail-task-modal .btn-close");

// Kanban elements and modal.
const colContainer = document.querySelector(".columns");
const addColBtn = document.querySelector(".kb-btn-add");
const newColModal = document.querySelector("#new-column-modal");
const ncCancelIcon = document.querySelector("#new-column-modal .btn-close");
const ncCancelBtn = document.querySelector("#new-column-modal .btn-modal.cancel");
const createSectionBtn = document.querySelector("#new-column-modal .btn-modal.action");
const createSectionForm = document.querySelector("#new-column-modal form");
const colModalTitle = document.querySelector("#new-column-modal .modal-title");
const actionBtn = document.querySelector("#new-column-modal .btn-modal.action p");
const colModalContent = document.querySelector("#new-column-modal .modal-content");
const columnsDraggable = document.querySelectorAll(".column");
const columns = document.querySelector('#kb-content .columns');

// Reading elements.
const addReadingBtn= document.querySelector("#add-reading-btn");
const unreadList = document.querySelector("#unread-readings");
const unreadCounter = document.querySelector("#unread-readings .list-len");
const readList = document.querySelector("#read-readings");
const readCounter = document.querySelector("#read-readings .list-len");
const rHideBtn = document.querySelector("#read-readings .button");
const readingCard = document.querySelectorAll(".readings");

// New readings modal.
const addReadingModal = document.querySelector("#new-reading-modal");
const arCancelIcon = document.querySelector("#new-reading-modal .btn-close");
const arCancelBtn = document.querySelector("#new-reading-modal .btn-modal.cancel");
const rdModalContent = document.querySelector("#new-reading-modal .modal-content");
const rdModalTitle =document.querySelector("#new-reading-modal .modal-title");
const addReadingForm = document.querySelector("#new-reading-modal form");
const createRdgBtn = document.querySelector("#new-reading-modal .btn-modal.action");
const createReadingBtnTitle = document.querySelector("#new-reading-modal .btn-modal.action p");

// Edit reading modal.
const rdtModal = document.querySelector("#edit-reading-modal");
const rdtDeleteBtn = document.querySelector("#edit-reading-modal #delete-rdg-r");
const rdtEditBtn = document.querySelector("#edit-reading-modal #edit-rdg-r");
const rdCancelIcon = document.querySelector("#edit-reading-modal .btn-close");

// Collections elements and modal.
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

// Pomodoro elements.
const focusTab = document.querySelector("#focus-label");
const shortbrTab = document.querySelector("#shortbr-label");
const longbrTab = document.querySelector("#longbr-label");
const pmStartBtn = document.querySelector("#pmdr-start");
const pmResetBtn = document.querySelector("#pmdr-reset");
const sessionTabs = document.querySelectorAll(".pmdr-tab-radio");
const elapsedTime = document.querySelector("#elapsed-time");
const roundText = document.querySelector("#round-text");

// Pomodoro setting modal.
const settingsBtn = document.querySelector(".settings");
const settingsModal = document.querySelector("#settings-modal");
const settingsCancelIcon= document.querySelector("#settings-modal .btn-close");
const settingsCancelBtn = document.querySelector("#settings-modal .btn-modal.cancel");
const saveSettingsBtn = document.querySelector("#settings-modal .btn-modal.action");
const focusTime = document.querySelector("#focus-time");
const shortbrTime = document.querySelector("#shortbr-time");
const longbrTime = document.querySelector("#longbr-time");
const roundNum = document.querySelector("#round-num");

// Stopwatch elements.
const stStartBtn = document.querySelector("#st-start");
const stResetBtn = document.querySelector("#st-reset");
const stElapsedTime = document.querySelector("#s-elapsed-time");

// Music player elements.
const musicBtn = document.querySelector(".music-player span");
const minMusicBtnMobile = document.querySelector(".music-icon-mobile");
const minMusicBtn = document.querySelector(".music-player.minimised span");
const musicPlayer = document.querySelector(".music-player");
const minMusicPlayer = document.querySelector(".music-player.minimised");
const MUSIC_MIN_FILL = "#F7F6F3";
const MUSIC_EXP_FILL = "#E8E7E4";

// Screen Tabs.
const tlTab = document.querySelector(".tab-label[for=\"tasklist\"");
const kbTab = document.querySelector(".tab-label[for=\"kanban\"");
const rdTab = document.querySelector(".tab-label[for=\"readingls\"");
const clTab = document.querySelector(".tab-label[for=\"collections\"");
const pmTab = document.querySelector(".tab-label[for=\"pomodoro\"");
const stTab = document.querySelector(".tab-label[for=\"stopwatch\"");

// Content of screen tabs.
const tlContent = document.querySelector("#tl-content");
const kbContent = document.querySelector("#kb-content");
const rdContent = document.querySelector("#rd-content");
const clContent = document.querySelector("#collections-content");
const pmContent = document.querySelector("#pmdr-content");
const stContent = document.querySelector("#swatch-content");

// Desktop navigation elements.
const navTask = document.querySelector("#nav-1");
const navTimer = document.querySelector("#nav-2");
const navRead = document.querySelector("#nav-3");

// Mobile navigation elements.
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

// Studbud Objects.
tl = new TaskList();
kb = new Kanban();
rl = new ReadingList();
st = new StudyTimer(p.defVal.FOCUS, p.defVal.SHORTBR, p.defVal.LONGBR, p.defVal.ROUND);
let timer = new easytimer.Timer();
let stopwatch = new easytimer.Timer();

// Navigation Handlers.

// Task menu navigation handler.
navTask.addEventListener("click", () => {
    
    // Display task list.
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

// Timer menu navigation handler.
navTimer.addEventListener("click", () => {

    // Display pomodoro.
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

    // Refresh pomodoro display screen.
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

// Readings menu navigation handler.
navRead.addEventListener("click", () => {

    // Display readings.
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

// Mobile task menu navigation handler.
mobileNavTask.addEventListener("click", () =>{
    navTask.click();
})

// Mobile kanban menu navigation handler.
mobileNavKanban.addEventListener("click", () => {
    navTask.click();
    kbTab.click();
})

// Mobile pomodoro menu navigation handler.
mobileNavPmdr.addEventListener("click", () => {
    navTimer.click();
    // mobileNavTitle.innerText = "⏰ Pomodoro Timer";
})

// Mobile stopwatch menu navigation handler.
mobileNavStopwatch.addEventListener("click", () => {
    navTimer.click();
    stTab.click();
})

// Mobile readings menu navigation handler.
mobileNavReading.addEventListener("click", () => {
    navRead.click();
})

// Mobile collections menu navigation handler.
mobileNavCollections.addEventListener("click", () => {
    navRead.click();
    clTab.click();
})

// Helper function to check radio of mobile navigation,
// when navigation is in desktop display.
function checkMobile(targetTab){
    for( let mtab of mobileRadio){
        if (mtab.value === targetTab){
            mtab.checked = true;
            continue;
        }
        mtab.checked = false;
    }
}

// Task list tab menu navigation handler.
tlTab.addEventListener("click", () => {

    // Set mobile navigation to task list.
    mobileNavTitle.innerText = "✔️ Task List";
    checkMobile(screens.TASKLIST);

    // Show task list screen.
    tlContent.classList.remove("is-hide");
    kbContent.classList.add("is-hide");

    // Load all task to task list screen.
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

// Kanban tab menu navigation handler.
kbTab.addEventListener("click", () => {

    // Set mobile navigation to kanban.
    mobileNavTitle.innerText = "🗂️ Kanban Board";
    checkMobile(screens.KANBAN);

    // Show kanvan screen.
    tlContent.classList.add("is-hide");
    kbContent.classList.remove("is-hide");

    // Load tasks in kanban.
    t.clearKanban(columns);
    t.loadTasksInKb(tl);
})

// Pomodoro tab menu navigation handler.
pmTab.addEventListener("click", () => {

    mobileNavTitle.innerText = "⏰ Pomodoro Timer";
    checkMobile(screens.POMODORO);

    pmContent.classList.remove("is-hide");
    stContent.classList.add("is-hide");
})

// Stopwatch tab menu navigation handler.
stTab.addEventListener("click", () => {

    mobileNavTitle.innerText = "⏱️ Classic Stopwatch";
    checkMobile(screens.STOPWATCH);

    pmContent.classList.add("is-hide");
    stContent.classList.remove("is-hide");
})

// Reading tab menu navigation handler.
rdTab.addEventListener("click",() => {
    
    mobileNavTitle.innerText = "📖 Readings";
    checkMobile(screens.READINGS);

    rdContent.classList.remove("is-hide");
    clContent.classList.add("is-hide");

    // Load readings to reading list and update collection display.
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

// Collections ab menu navigation handler.
clTab.addEventListener("click",() => {

    mobileNavTitle.innerText = "📚 Collections";
    checkMobile(screens.COLLECTIONS);

    rdContent.classList.add("is-hide");
    clContent.classList.remove("is-hide");
})

// Hamburger menu mobile navigation handler.
hamburgerClosed.addEventListener("click", () => {
    mobileMenuOpened.classList.remove("is-hide");
    mobileMenuClosed.classList.add("is-hide");
})

hamburgerOpened.addEventListener("click", () => {
    mobileMenuOpened.classList.add("is-hide");
    mobileMenuClosed.classList.remove("is-hide");

})

// Music player handler when is expanded.
musicBtn.addEventListener("click", () => {
    musicPlayer.classList.add("is-hide");
    minMusicPlayer.classList.remove("is-hide");

    if (minMusicBtnMobile.style.backgroundColor = MUSIC_EXP_FILL){
        musicPlayer.classList.add("is-hide");
        minMusicBtnMobile.style.backgroundColor = MUSIC_MIN_FILL;
    }
})

// Music player handler when minimised.
minMusicBtn.addEventListener("click", () => {
    musicPlayer.classList.remove("is-hide");
    minMusicPlayer.classList.add("is-hide");
})

// Music player handler when minimised in mobile.
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


// Task and Kannban handlers.

/* USYD CODE CITATION ACKNOWLEDGEMENT
* I declare that the following lines of code have been copied from the
* website titled: "Dragula Usage"
* with only minor changes and it is not my own work. 
* 
* Original URL
* https://github.com/bevacqua/dragula#usage
* Last access June, 2022
*/

var drake = dragula({
    copy: false,
    invalid: function (el) {
        return el.classList.contains("no-drag");
      }
});

for (let column of columnsDraggable){
    drake.containers.push(column);
}
/* end of copied code */

// Add task button handler.
addTaskBtn.addEventListener("click", () => {
    modalTitle.innerText = "Create new task";
    createTaskBtnTitle.innerText = "Create task";
    t.clearTaskForm(addTaskForm);
    t.openModalHandler(addTaskModal);
})

// New task cancel icon modal handler.
ntCancelIcon.addEventListener("click", () =>{
    t.closeModalHandler(addTaskModal);
})

// New task cancel button modal handler.
ntCancelBtn.addEventListener("click", () =>{
    t.closeModalHandler(addTaskModal);
})

// Create task button modal handler.
createTaskBtn.addEventListener("click", () => {

    let taskId = modalContent.id.split("-").includes("task") ? Number(modalContent.id.split("-").pop()) : null;
    let isEditMode = taskId === null ? false : true;
    let taskObj = isEditMode ? tl.findTask(taskId) : null;

    // Add or update task object to task list.
    let newTask = t.addInputToTaskList(isEditMode, taskObj, addTaskForm);

    // Prevent creating untitled task
    if (!newTask){
        return;
    }

    t.closeModalHandler(addTaskModal);

    // Create new task element if not in edit mode.
    if(!isEditMode){
        t.createNewTaskElement(newTask, upcomingList, completedList, true);
        t.updateCounter(newTask.getStatus(), true, upcomingCounter, completedCounter);
    
    // Update task element when opened in edit mode.
    }else{
        modalContent.id = `edit-mode-0`;
        t.updateTaskElement(taskObj, upcomingList, completedList, upcomingCounter, completedCounter, completedIsHidden, true);

    }

})

// Handlers for ever task card created when is clicked.
for (let tc of taskCard){
    tc.addEventListener("click", (e) =>{

        let eName = e.target.className;

        // When task is clicked, task detail modal is opened.
        if(eName.includes("card") || eName.includes("col-tag")){

            // Get task id.
            let current = e.target;
            while (current.id === ""){
                current = current.parentElement;
            }
            
            // Open task detail modal.
            let targetTask = tl.findTask(current.id.slice(1, current.id.length+1)); // truncate 't' in id
            t.insertTargetTaskDetail(targetTask, dtDeleteBtn, dtEditBtn);
            t.openModalHandler(detailTaskModal);
        
        // Task is checked or unchecked.
        }else if (eName.includes("check") || e.target.tagName === "INPUT"){

            if(e.target.tagName === "INPUT"){

                // Unhide completed task if it was hidden, and a task that was unchecked was checked.
                if(completedIsHidden){
                    completedIsHidden = t.tglCompletedTasks(completedIsHidden, true);
                }

                t.taskChecked(e.target.id.split("-")[1], upcomingList, completedList, upcomingCounter, completedCounter, true);
            }
        }
    })
}

// Task detail modal cancel icon handler.
dtCancelIcon.addEventListener("click", () =>{
    t.closeModalHandler(detailTaskModal);
})

// Hide completed tasks button handler.
hideBtn.addEventListener("click", () => {
    completedIsHidden = t.tglCompletedTasks(completedIsHidden, true);

})

// Task delete button handler in task detail modal.
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

// Task edit button handler in task detail modal.
dtEditBtn.addEventListener("click", () => {

    // Get task id.
    let taskId = dtEditBtn.id.split("-").pop();
    let taskObj = tl.findTask(taskId);

    // Open add task form in edit mode.
    t.closeModalHandler(detailTaskModal);
    t.openModalHandler(addTaskModal);
    modalContent.id = `edit-mode-task-${taskObj.getId()}`;
    modalTitle.innerText = "Edit task";
    createTaskBtnTitle.innerText = "Save changes";

    // Insert task properties to add task form to be edited.
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

// Handler when column
colContainer.addEventListener("click", (e) =>{
    let edit = "material-symbols-outlined icon edit";
    let del = "material-symbols-outlined icon del";
    
    let targetName = e.target.className;
    let targetTag = e.target.tagName;
    let id = null;
    
    if (targetTag === "SPAN"){

        // Get column id.
        let current = e.target;
        while(current.id === ""){
            current = current.parentElement;
        }
        let idArray = current.id.split("-");
        id = idArray[idArray.length -1];
        
        // Open edit modal.
        if (targetName === edit){
            colModalContent.id = `edit-${id}`;
            t.insertTargetColDetail(id, createSectionForm);
            newColModal.classList.toggle('is-hide');
        
        // Delete column.
        }else if (targetName === del){
            t.removeColfromKanban(id);
        }
    }

})

// Handler for column button.
addColBtn.addEventListener("click", () => {
    t.clearColForm(createSectionForm);
    colModalTitle.innerText= "Create New Section";
    actionBtn.innerText = "Create section";
    colModalContent.id = "create";
    newColModal.classList.toggle('is-hide');
})

// Handler for cancel icon from columnn modal.
ncCancelIcon.addEventListener("click", () => {
    newColModal.classList.toggle('is-hide');
})

// Handler for cancel button from columnn modal.
ncCancelBtn.addEventListener("click", () =>{
    newColModal.classList.toggle('is-hide');
})

// Handler for create column button from columnn modal.
createSectionBtn.addEventListener("click", () => {

    // Check if modal is in edit mode.
    let isEditMode = colModalContent.id === "create" ? false : true;

    // Create column if not edit mode.
    if (!isEditMode){
        let newCol = t.addInputToSection(createSectionForm, false, null, drake, colContainer);
        if(!newCol){
            return
        }

    // Update column if is in edit mode.
    }else{
        let idArray = colModalContent.id.split("-");
        let id = Number(idArray[idArray.length -1]);
        let editedColObj = kb.findColumn(id);
        t.addInputToSection(createSectionForm, true, editedColObj, drake);

    }

    newColModal.classList.toggle('is-hide');

})

// Readings and Collections handler.

// Add reading button handler.
addReadingBtn.addEventListener("click", () => {
    addReadingModal.classList.remove("is-hide");
})

// Add reading modal cancel button handler.
arCancelBtn.addEventListener("click", () => {
    addReadingModal.classList.add("is-hide");
})

// Add reading modal cancel icon handler.
arCancelIcon.addEventListener("click", () => {
    addReadingModal.classList.add("is-hide");
})

// Create reading button from add reading modal cancel button handler.
createRdgBtn.addEventListener("click", () =>{

    let rdgId = rdModalContent.id.split("-").includes("reading") ? Number(rdModalContent.id.split("-").pop()) : null;
    let isEditMode = rdgId === null ? false : true;
    let rdgObj = isEditMode ? rl.find(rdgId, true) : null;
    let newRdg = r.addInputToReadingList(isEditMode, rdgObj, addReadingForm);

    // Prevent creating untitled reading.
    if (!newRdg){
        return;
    }
    
    // Create new reading element.
    if(!isEditMode){
        t.createNewTaskElement(newRdg, unreadList, readList, false);
        t.updateCounter(newRdg.getIsRead(), true, unreadCounter, readCounter);
    
    // Update reading element when in edit mode.
    }else{
        rdModalContent.id = `edit-mode-0`;
        t.updateTaskElement(rdgObj, unreadList, readList, unreadCounter, readCounter, readIsHidden, false);


    }  

    addReadingModal.classList.add("is-hide"); // close modal.

})

// Handler for every reading card that is created.
for (let rd of readingCard){
    rd.addEventListener("click", (e) => {
        let eName = e.target.className;

        // Open reading detail when reading card is clicked.
        if(eName.includes("card") || eName.includes("col-tag")){

            // Get reading id.
            let current = e.target;
            while (current.id === ""){
                current = current.parentElement;
            }

            // Find reading.
            let targetRdg = rl.find(current.id.slice(1, current.id.length+1), true); // truncate r in id.);

            // Open readong deatil modal.
            r.insertTargetRdgDetail(targetRdg, rdtDeleteBtn, rdtEditBtn);
            rdtModal.classList.remove("is-hide");
        
        // Check or uncheck reading.
        }else if (eName.includes("check") || e.target.tagName === "INPUT"){
            if(e.target.tagName === "INPUT"){
                if(readIsHidden){
                    readIsHidden =t.tglCompletedTasks(readIsHidden, false);
                }
                t.taskChecked(e.target.id.split("-")[1], unreadList, readList, unreadCounter, readCounter, false);
            }
        }
    })
}

// Reading detail modal cancel icon handler.
rdCancelIcon.addEventListener("click", () =>{
    rdtModal.classList.add("is-hide");
})

// Hide button of read detail list handler.
rHideBtn.addEventListener("click", () => {
    readIsHidden = t.tglCompletedTasks(readIsHidden, false);
})

// Edit button of reading task detail handler.
rdtEditBtn.addEventListener("click", () => {
    let rdgId = rdtEditBtn.id.split("-").pop();
    let rdgObj = rl.find(rdgId, true);

    // Open reading detail modal.
    rdtModal.classList.add("is-hide");
    addReadingModal.classList.remove("is-hide");
    rdModalContent.id = `edit-mode-reading-${rdgObj.getId()}`;
    rdModalTitle.innerText = "Edit Reading";
    createReadingBtnTitle.innerText = "Save changes";

    // Insert reading detail to form to be edited.
    addReadingForm.elements.rdgname.value = rdgObj.getName();
    addReadingForm.elements.tglread.checked = rdgObj.getIsRead();
    addReadingForm.elements.link.value = rdgObj.getLink();
    r.updateCollectionChoice(addReadingForm);
    addReadingForm.elements.collection.value = rdgObj.getCollection() ? rdgObj.getCollection().getId() : 0;

})

// Delete button of reading task detail handler.
rdtDeleteBtn.addEventListener("click", () => {
    let rdgId = rdtDeleteBtn.id.split("-").pop();
    let rdgObj = rl.find(rdgId, true);
    let readings = rdgObj.getIsRead() ? "#read-readings" : "#unread-readings";
    let targetRdg = document.querySelector(`${readings} #r${rdgId}`);

    // Delete reading.
    targetRdg.remove();
    rl.remove(rdgId, true);
    rdtModal.classList.add("is-hide");
    t.updateCounter(rdgObj.getIsRead(), false, unreadCounter, readCounter);

})

// Add collections button handler.
addCollectionBtn.addEventListener("click", () =>{

    // Open new collection modal.
    c.clearCltForm(addCollectionForm);
    clModalTitle.innerText= "Create New Collection";
    createCltBtnTitle.innerText = "Create collection";
    clModalContent.id = "create";
    addCollectionModal.classList.remove("is-hide");
})

// New collection modal cancel icon handler.
clCancelIcon.addEventListener("click", () => {
    addCollectionModal.classList.add("is-hide");
})

// New collection modal cancel button handler.
clCancelBtn.addEventListener("click", () => {
    addCollectionModal.classList.add("is-hide");
})

// Create collection button handler.
createCltBtn.addEventListener("click", () => {
    let isEditMode = clModalContent.id === "create" ? false : true;

    // Create new collection.
    if (!isEditMode){
        let newClt = c.addInputToCollection(addCollectionForm, false, null);
        if(!newClt){
            return
        }
    
    // Update existing collection.
    }else{
        let idArray = clModalContent.id.split("-");
        let id = Number(idArray[idArray.length -1]);
        let editedCltObj = rl.find(id, false);

        c.addInputToCollection(addCollectionForm, true, editedCltObj);
    }

    // Close modal.
    addCollectionModal.classList.add("is-hide");

})

//Collection card handler.
cltContainer.addEventListener("click", (e) => {
    let edit = "material-symbols-outlined icon edit";
    let del = "material-symbols-outlined icon del";

    let targetName = e.target.className;
    let targetTag = e.target.tagName;
    let id = null;

    if (targetTag === "SPAN"){
        let current = e.target;
        
        // Get id of clicked collection.
        while(current.id === ""){
            current = current.parentElement;
        }
        let idArray = current.id.split("-");
        id = idArray[idArray.length -1];
    
        // If edit button was clicked open modal.
        if (targetName === edit){

            clModalContent.id = `edit-${id}`;
            c.insertTargetCltDetail(id, addCollectionForm);
            addCollectionModal.classList.toggle('is-hide');

        // If delete button clicked then delete collection
        }else if (targetName === del){
            c.removeClt(id);
        
        // If open all readings button clicked then open all tabs
        // of reading links in the collection
        }else if(targetName.includes("open")){
            c.openAllTabs(id);
        }
    }

})

// Pomodoro and Stopwatch

// Update progress circle and elapsed timer
// when Timer is running for every second.
timer.addEventListener('secondsUpdated', function (e) {
    elapsedTime.innerText = timer.getTimeValues().toString();
    let currentSesh = null;
    for(let sesh of sessionTabs){
        if(sesh.checked){
            currentSesh = sesh.value;
        }
    }

    p.updateCircle(timer.getTimeValues(), st.getMax(currentSesh), sessionTabs);

});

// When pomodoro timer gets to 00:00:00
timer.addEventListener("targetAchieved", () => {

    let session = p.getCurrentSesh(sessionTabs);
    let nextSession = p.getNextSesh(session, st, sessionTabs);

    // Go to next session and reset timer.
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

    p.applyColour(nextSession, tabEl); // next session tab color.
    timerStat = p.deactivateTimer(timer, pmStartBtn, pmResetBtn, timerStat, sessionTabs);
})

// Handler when timer starts.
timer.addEventListener('started', () =>  {
    elapsedTime.innerText = timer.getTimeValues().toString();
});

// Handler when timer is reset.
timer.addEventListener('reset', () => {
    elapsedTime.innerText = timer.getTimeValues().toString();
});

// Handler when focus tab is clicked.
focusTab.addEventListener("click", () => {
    p.applyColour(p.tab.FOCUS, focusTab);
    p.refreshPmdrPage(st, p.tab.FOCUS, elapsedTime, roundText);
})

// Handler when short break tab is clicked.
shortbrTab.addEventListener("click", () => {
    p.applyColour(p.tab.SHORTBR, shortbrTab);
    p.refreshPmdrPage(st, p.tab.SHORTBR, elapsedTime, roundText);
})

// Handler when long break tab is clicked.
longbrTab.addEventListener("click", () => {
    p.applyColour(p.tab.LONGBR, longbrTab);
    p.refreshPmdrPage(st, p.tab.LONGBR, elapsedTime, roundText);
})

// Handler when start button is clicked.
pmStartBtn.addEventListener("click", () =>{
    let currentSesh = p.getCurrentSesh(sessionTabs);
    let isCountdown = true;

    timerStat = p.activateTimer(timer, currentSesh, pmStartBtn, pmResetBtn, timerStat, isCountdown);

})

// Handler when reset button is clicked.
pmResetBtn.addEventListener("click", () =>{
    let currentSesh = p.getCurrentSesh(sessionTabs);
    p.refreshPmdrPage(st, currentSesh, elapsedTime, roundText);

    timer.reset();
    timer.stop();
    timerStat = p.deactivateTimer(timer, pmStartBtn, pmResetBtn, timerStat, sessionTabs);

})

// Handler when pomdoro settings button is clicked.
settingsBtn.addEventListener("click", () => {
    settingsModal.classList.remove("is-hide");
    focusTime.value = st.getMax(p.tab.FOCUS);
    shortbrTime.value = st.getMax(p.tab.SHORTBR);
    longbrTime.value = st.getMax(p.tab.LONGBR);
    roundNum.value = st.getMaxRound();

    // If timer is running, then pause timer.
    if(timer.isRunning()){
        let currentSession = p.getCurrentSesh(sessionTabs)
        timerStat = p.activateTimer(timer, currentSession, pmStartBtn, pmResetBtn, timerStat, true);
    }


})

// Handler when settings modal cancel button is clicked.
settingsCancelBtn.addEventListener("click", () => {
    settingsModal.classList.add("is-hide");
})

// Handler when settings modal cancel icon is clicked.
settingsCancelIcon.addEventListener("click", () => {
    settingsModal.classList.add("is-hide");
})

// Handler when settings modal save settings button is clicked.
saveSettingsBtn.addEventListener("click", () => {

    // Update session values.
    st.setMax(p.tab.FOCUS, focusTime.value);
    st.setMax(p.tab.SHORTBR, shortbrTime.value);
    st.setMax(p.tab.LONGBR, longbrTime.value);
    st.setMaxRound(roundNum.value);

    // Close modal.
    settingsModal.classList.add("is-hide");
    let session = p.getCurrentSesh(sessionTabs);

    // Update timer value on display.
    timer.reset();
    timer.stop();
    timerStat = p.deactivateTimer(timer, pmStartBtn, pmResetBtn, timerStat, sessionTabs);
    p.refreshPmdrPage(st, session, elapsedTime, roundText);


})

// Handler for stopwatch when running every second tenths.
stopwatch.addEventListener("secondTenthsUpdated", () => {
    p.showStopwatchTime(stopwatch, stElapsedTime);
});

// Handler for stopwatch when started.
stopwatch.addEventListener('started', () => {
    p.showStopwatchTime(stopwatch, stElapsedTime);
});

// Handler for stopwatch when reset.
stopwatch.addEventListener('reset', () =>  {
    p.showStopwatchTime(stopwatch, stElapsedTime);
});

// Handler for stopwatch start button clicked.
stStartBtn.addEventListener("click", () => {
    let isCountdown = false;
    swatchStat = p.activateTimer(stopwatch, null, stStartBtn, stResetBtn, swatchStat, isCountdown);

})

// Handler for stopwatch when reset button clicked.
stResetBtn.addEventListener("click", () => {
    stopwatch.reset();
    stopwatch.stop();
    swatchStat = p.deactivateTimer(stopwatch, stStartBtn, stResetBtn, swatchStat, null);
})