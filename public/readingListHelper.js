// let newTask = null;

import { Reading } from "./reading";
import { createNewTaskElement } from "./taskHelper";

export function clearRdgForm(form){

    for (let f of form.elements){
        if (f.name === "tglread" || f.name ==="tglbookm"){
            f.checked = false;
        }else{
            f.value = "";
        }
    }
}

export function addInputToReadingList(isEditMode, rdgObj, form){
    let newRdg = null;

    let name = form.elements.rdgname.value; 
    if (name === ""){
        return false;
    }

    let isRead = form.elements.tglread.checked;
    let isPin =  form.elements.tglbookm.checked;

    let link = form.elements.link.value;
    let collection = form.elements.collection.value;
    collection = rl.find(collection, false);


    if (!isEditMode){
        let rdg = [name, isRead, isPin, link, collection];

        newRdg = rl.newReading(rdg);
        // console.log(newRdg);
        rl.addReading(newRdg);
    }else{

        rdgObj.setName(name);
        rdgObj.setIsRead(isRead);
        rdgObj.setIsPin(isPin);
        rdgObj.setLink(link);
        rdgObj.setCollection(collection);
        newRdg = rdgObj;
        //console.log(newRdg);
    }

    clearRdgForm(form);
    return newRdg;

}

export function insertTargetRdgDetail(rdg, dtDeleteBtn, dtEditBtn){
    dtDeleteBtn.id = "delete-task-" + `${rdg.getId()}`;
    dtEditBtn.id = "edit-task-" + `${rdg.getId()}`;

    let rdTitle = document.querySelector("#edit-reading-modal .reading-title");
    rdTitle.innerText = rdg.getName();


    let rdLink = document.querySelector("#edit-reading-modal .reading-link");
    let linkString = rdg.getLink();
    const MAX_STRING = 24;

    rdLink.innerText = linkString === "" ? "-" : `${linkString.substring(0, MAX_STRING)}...`;
    rdLink.setAttribute("href", linkString);

    let colTag = document.querySelector("#edit-reading-modal .col-tag");
    let colName = document.querySelector("#edit-reading-modal .card-detail p");
    let preVal = colTag.className.split(" ")[1];
    let collection = rdg.getCollection();
    colTag.classList.remove(preVal);

    if(collection){
        colTag.classList.add(collection.getColorString());
        colName.innerText = collection.getName();
    }else{
        colTag.classList.add("nocol");
        colName.innerText = "-";
    }

    let isReadIcon = document.querySelector("#edit-reading-modal #isread-dt span");
    let isReadTxt = document.querySelector("#edit-reading-modal #isread-dt p");
    let isPinIcon = document.querySelector("#edit-reading-modal #ispin-dt span");
    let isPinTxt = document.querySelector("#edit-reading-modal #ispin-dt p");

    isReadIcon.innerText = rdg.getIsRead() ? "done" : "hourglass_empty";
    isReadTxt.innerText = rdg.getIsRead() ? "Read" : "Unread";

    if (rdg.getIsPin()){
        isPinIcon.innerText = "bookmark_added";

        isPinTxt.innerText = "Bookmarked";
    }else{
        isPinIcon.innerText = "bookmark";
        isPinTxt.innerText = "Not bookmarked";
    }





}


export function updateCollectionChoice(form){
    // console.log(collection);
    // console.log(form.elements.collection.children);
    let parent = form.elements.collection
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
        
    }
    let collections = rl.getAllCollections();
    let noneChoice = document.createElement('option');
    noneChoice.value = 0;
    noneChoice.innerText = "None";
    parent.append(noneChoice);
    // let checkboxes = `<option value="0">None</option`;
    if (collections){

        for (let c of collections){
            // checkboxes+= `<option value="${c.getId()}">${c.getName()}</option`
            let choice = document.createElement('option');
            choice.value = c.getId();
            choice.innerText = c.getName();
            parent.append(choice);
        }
    }

}

export function clearReading(){
    let prevRdg = document.querySelectorAll(".isreading");

    if (prevRdg){
        for (let rdg of prevRdg){
            rdg.remove();
        }
    }

}