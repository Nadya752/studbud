// Helper functions for readings.

export const MAX_CHAR = 24; // maximum character of link string shown in task detail.

// Clear reading form
export function clearRdgForm(form){

    for (let f of form.elements){
        if (f.name === "tglread" ){
            f.checked = false; // uncheck read property.
        }else{
            f.value = ""; // set input to empty string.
        }
    }
}

// Add reading object to reading list object, or update properties of reading object.
export function addInputToReadingList(isEditMode, rdgObj, form){
    let newRdg = null;

    // Reading title.
    // If reading has no title then do nothing.
    let name = form.elements.rdgname.value; 
    if (name === ""){
        return false;
    }

    // Reading status.
    let isRead = form.elements.tglread.checked;

    // Reading link.
    let link = form.elements.link.value;

    // Reading collection.
    let collection = form.elements.collection.value;
    collection = rl.find(collection, false);


    // Create new reading object and add to list.
    if (!isEditMode){
        let rdg = [name, isRead, link, collection];
        newRdg = rl.newReading(rdg);
        rl.addReading(newRdg);

    // Update properties of existing reading.
    }else{
        rdgObj.setName(name);
        rdgObj.setIsRead(isRead);
        rdgObj.setLink(link);
        rdgObj.setCollection(collection);
        newRdg = rdgObj;
    }

    clearRdgForm(form);
    return newRdg;

}

// Insert clicked reading details to reading detail modal.
export function insertTargetRdgDetail(rdg, dtDeleteBtn, dtEditBtn){

    // Get clicked reading id.
    dtDeleteBtn.id = "delete-task-" + `${rdg.getId()}`;
    dtEditBtn.id = "edit-task-" + `${rdg.getId()}`;

    // Reading Title.
    let rdTitle = document.querySelector("#edit-reading-modal .reading-title");
    rdTitle.innerText = rdg.getName();

    // Reading link
    let rdLink = document.querySelector("#edit-reading-modal .reading-link");
    let linkString = rdg.getLink();

    // Truncate displaye link string if character length is more than maximum.
    rdLink.innerText = linkString === "" ? "-" : `${linkString.substring(0, MAX_CHAR)}...`;
    rdLink.setAttribute("href", linkString);

    // Collection it belongs to.
    let colTag = document.querySelector("#edit-reading-modal .col-tag");
    let colName = document.querySelector("#edit-reading-modal .card-detail p");
    let preVal = colTag.className.split(" ")[1];
    let collection = rdg.getCollection();
    colTag.classList.remove(preVal);

    // If reading does not belong to any collection then a grey coloured tag is displayed.
    if(collection){
        colTag.classList.add(collection.getColorString());
        colName.innerText = collection.getName();
    }else{
        colTag.classList.add("nocol");
        colName.innerText = "-";
    }

    // Reading status.
    let isReadIcon = document.querySelector("#edit-reading-modal #isread-dt span");
    let isReadTxt = document.querySelector("#edit-reading-modal #isread-dt p");

    isReadIcon.innerText = rdg.getIsRead() ? "done" : "hourglass_empty";
    isReadTxt.innerText = rdg.getIsRead() ? "Read" : "Unread";

}

// Update collection checkboxes choice in reading form.
// When new collection was created, or some collection was deleted.
// If there is no collection then choice is 'None'.
export function updateCollectionChoice(form){

    // Remove all previous choices.
    let parent = form.elements.collection
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }

    // Get all current collections.
    let collections = rl.getAllCollections();
    let noneChoice = document.createElement('option');
    noneChoice.value = 0;
    noneChoice.innerText = "None";
    parent.append(noneChoice);

    // Create choices based on current collections.
    if (collections){
        for (let c of collections){
            let choice = document.createElement('option');
            choice.value = c.getId();
            choice.innerText = c.getName();
            parent.append(choice);
        }
    }

}

// Clear reading elements.
export function clearReading(){
    let prevRdg = document.querySelectorAll(".isreading");
    if (prevRdg){
        for (let rdg of prevRdg){
            rdg.remove();
        }
    }

}