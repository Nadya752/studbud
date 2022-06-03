import {cltTemplate} from './template.js';

// Colours of left corder of collection.
const borderCol = {
    nocol: "#C4C4C4",
    purple: "#6267F3",
    blue: "#55ADF0",
    green: "#6DCDB7",
    yellow: "#F3C84A",
    orange: "#E98239",
    red: "#E04A30",
    
}

// Clear collection form.
export function clearCltForm(form){
    form.elements.cltname.value = ""; // set text input to empty string.

    // Set all colour tag radios to unchecked.
    let colTags = form.elements.rcoltag;
    for(let i = 0; i < colTags.length; i++){
        colTags[i].checked = false;
    }

}

// Add collection object to readinglist object,
// or update properties of exisitng collection object.
export function addInputToCollection(form, isEdit, editedObj){
    
    // Collection name.
    let name = form.elements.cltname.value;
    
    // Collection color tag.
    let colTags = form.elements.rcoltag;
    let colTag = null;

    for(let i = 0; i < colTags.length; i++){
        if (colTags[i].checked){
            colTag = colTags[i].value;
        }
    }

    let id = null;

    // Create new collection object.
    if(!isEdit){

        // If collection has no name or has no colour tag,
        // then do nothing.
        if (name === "" || !colTag){
            return 0;
        }

        let cltObj = rl.newCollection([name, colTag]);
        rl.addCollection(cltObj);
        id = cltObj.getId();

        // Create new collection element.
        let cltEl = document.createElement("div");
        cltEl.classList.add("accordion-item");
        cltEl.id = `cl-${cltObj.getId()}`;
        cltEl.innerHTML = cltTemplate(cltObj.getName());
        let col = cltObj.getColor();
        col = Object.values(borderCol)[col];
        cltEl.style.borderLeftColor = col;

        // Append collection element.
        let parent =  document.querySelector(".accordion");
        parent.insertAdjacentElement("beforeend", cltEl)


    // Update existing collection.
    }else{

        // Update collection object properties.
        id = editedObj.getId();
        editedObj.setName(name);
        editedObj.setColor(colTag);

        // Update collection element.
        let cltEl = document.querySelector(`#cl-${editedObj.getId()} p`);
        cltEl.innerText = name;
        let col = editedObj.getColor();
        let cltCol = document.querySelector(`#cl-${editedObj.getId()}`);
        col = Object.values(borderCol)[col];
        cltCol.style.borderLeftColor = col;

    }

    return 1;
 
}

// Insert collection details to modal.
export function insertTargetCltDetail(id, form){

    // Change modal to edit mode.
    let modalTitle = document.querySelector("#new-collection-modal .modal-title");
    let actionBtn = document.querySelector("#new-collection-modal .btn-modal.action p");

    modalTitle.innerText= "Edit Section";
    actionBtn.innerText = "Save Changes";

    // Get collection object.
    let cltObj = rl.find(id, false);

    // Set collection properties as form input.
    form.elements.cltname.value = cltObj.getName();
    form.elements.rcoltag[cltObj.getColor()-1].checked = true;

}

// Remove collection object and collection element.
export function removeClt(id){

    // Get collection from list.
    let readingsInClt = rl.findReadingByCollection(id);

    // Set all readings in collection to have no collection.
    if(readingsInClt){
        for(let rdg of readingsInClt){
            rdg.setCollection(null);
        }
    }

    // Remove collection.
    let cltEl = document.querySelector(`#cl-${id}`);
    cltEl.remove();
    rl.remove(id, false);

    
}

// Open all reading links in a collection
export function openAllTabs(id){
    let readings = rl.findReadingByCollection(id);

    if (readings.length > 1){
        for (let r of readings){
            openRequestedPopup(r.getLink(), "");
        }

    }else if(readings.length === 1){
        openRequestedPopup(readings[0].getLink(), "");
    
    // No readings in collection.
    }else{
        return;
    }

}

/* USYD CODE CITATION ACKNOWLEDGEMENT
* I declare that the following lines of code have been copied from the
* website titled: "Window.open()"
* and it is not my own work. 
* 
* Original URL
* https://developer.mozilla.org/en-US/docs/Web/API/Window/open
* Last access June, 2022
*/

// Open link pop up of reading link in new tab.
export function openRequestedPopup(url, windowName) {
    let windowObjectReference = null;

    if(windowObjectReference == null || windowObjectReference.closed) {
      windowObjectReference = window.open(url, windowName, "popup");
    
    // If window is already opened.
    } else {
      windowObjectReference.focus();
    };
}
/* end of copied code */