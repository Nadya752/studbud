import Kanban from './kanban.js';
import TaskList from './tasklist.js';
import { closeModalHandler, openModalHandler } from './taskScreen.js';
import { kbCardTemplate, kbColTemplate } from './template.js';


const colContainer = document.querySelector(".columns");
const addColBtn = document.querySelector(".kb-btn-add");
const newColModal = document.querySelector("#new-column-modal");
const ncCancelIcon = document.querySelector("#new-column-modal .btn-close");
const ncCancelBtn = document.querySelector("#new-column-modal .btn-modal.cancel");
const createSectionBtn = document.querySelector("#new-column-modal .btn-modal.action");
const createSectionForm = document.querySelector("#new-column-modal form");
const modalTitle = document.querySelector("#new-column-modal .modal-title");
const actionBtn = document.querySelector("#new-column-modal .btn-modal.action p");
const colModalContent = document.querySelector("#new-column-modal .modal-content");



function clearColForm(form){
    form.elements.colname.value = "";
    form.elements.tglalldone.checked = false;
}

function addInputToSection(form, isEdit, editedColObj){
    
    let name = form.elements.colname.value;
    let markAllDone = form.elements.tglalldone.checked;
    let id = null;

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

    }else{
        id = editedColObj.getId();
        editedColObj.setName(name);
        editedColObj.setMarkAllChecked(markAllDone);

        let colEl = document.querySelector(`#c-${editedColObj.getId()} p`);
        colEl.innerText = name;
    }

    // let tasksInCol = tl.findTaskByColumn(id);
    // console.log(tasksInCol);
    // for (task of tasksInCol){
    //     task.setStatus(markAllDone); 
    // }


    return 1;


}

function insertTargetColDetail(colId, form){
    let modalTitle = document.querySelector("#new-column-modal .modal-title");
    let actionBtn = document.querySelector("#new-column-modal .btn-modal.action p");

    modalTitle.innerText= "Edit Section";
    actionBtn.innerText = "Save Changes";

    let colObj = kb.findColumn(colId);

    form.elements.colname.value = colObj.getName();
    form.elements.tglalldone.checked = colObj.getMarkAllChecked();


}

function removeColfromKanban(colId){
    let colEl = document.querySelector(`#c-${colId}`);
    colEl.remove();
    kb.removeColumn(colId);
}


colContainer.addEventListener("click", (e) =>{
    let edit = "material-symbols-outlined icon edit";
    let del = "material-symbols-outlined icon del";
    
    let targetName = e.target.className;
    let targetTag = e.target.tagName;
    let id = null;
    
    if (targetTag === "SPAN"){
        let current = e.target;
        while(current.id === ""){
            current = current.parentElement;
        }
        let idArray = current.id.split("-");
        id = idArray[idArray.length -1];
        

        if (targetName === edit){
            colModalContent.id = `edit-${id}`;
            insertTargetColDetail(id, createSectionForm);
            newColModal.classList.toggle('is-hide');

        }else if (targetName === del){
            removeColfromKanban(id);
        }
    }

})



addColBtn.addEventListener("click", () => {
    clearColForm(createSectionForm);
    modalTitle.innerText= "Create New Section";
    actionBtn.innerText = "Create section";
    colModalContent.id = "create";
    newColModal.classList.toggle('is-hide');
})

ncCancelIcon.addEventListener("click", () => {
    newColModal.classList.toggle('is-hide');
})

ncCancelBtn.addEventListener("click", () =>{
    newColModal.classList.toggle('is-hide');
})

createSectionBtn.addEventListener("click", () => {
    //console.log(createSectionForm);

    let isEditMode = colModalContent.id === "create" ? false : true;



    if (!isEditMode){
        let newCol = addInputToSection(createSectionForm, false, null);
        if(!newCol){
            return
        }
    }else{
        let idArray = colModalContent.id.split("-");
        let id = Number(idArray[idArray.length -1]);
        let editedColObj = kb.findColumn(id);

        addInputToSection(createSectionForm, true, editedColObj);
    }


    newColModal.classList.toggle('is-hide');


})