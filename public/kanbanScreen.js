import * as t from './helper/taskHelper';

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
    modalTitle.innerText= "Create New Section";
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
        let newCol = t.addInputToSection(createSectionForm, false, null, drake);
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