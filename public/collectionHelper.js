import {cltTemplate} from './template.js';

const borderCol = {
    nocol: "#C4C4C4",
    purple: "#6267F3",
    blue: "#55ADF0",
    green: "#6DCDB7",
    yellow: "#F3C84A",
    orange: "#E98239",
    red: "#E04A30",
    
}
export function clearCltForm(form){
    form.elements.cltname.value = "";
    let colTags = form.elements.rcoltag;

    for(var i = 0; i < colTags.length; i++){
        colTags[i].checked = false;
    }

}


export function addInputToCollection(form, isEdit, editedObj){
    
    let name = form.elements.cltname.value;
    let colTags = form.elements.rcoltag;
    let colTag = null;

    for(var i = 0; i < colTags.length; i++){
        if (colTags[i].checked){
            colTag = colTags[i].value;
        }
    }
    let id = null;

    if(!isEdit){
        if (name === "" || !colTag){
            return 0;
        }

        let cltObj = rl.newCollection([name, colTag]);
        rl.addCollection(cltObj);
        id = cltObj.getId();


        let cltEl = document.createElement("div");
        cltEl.classList.add("accordion-item");
        cltEl.id = `cl-${cltObj.getId()}`;
        cltEl.innerHTML = cltTemplate(cltObj.getName());
        let col = cltObj.getColor();
        col = Object.values(borderCol)[col];
        cltEl.style.borderLeftColor = col;
        // cltEl.style.setProperty('borderLeftColor', col);


        let parent =  document.querySelector(".accordion");
        parent.insertAdjacentElement("beforeend", cltEl)


    }else{

        id = editedObj.getId();
        editedObj.setName(name);
        editedObj.setColor(colTag);

        let cltEl = document.querySelector(`#cl-${editedObj.getId()} p`);
        cltEl.innerText = name;
        let col = editedObj.getColor();
        let cltCol = document.querySelector(`#cl-${editedObj.getId()}`);
        col = Object.values(borderCol)[col];
        cltCol.style.borderLeftColor = col;
        // cltEl.style.setProperty('borderLeftColor', col);
        //console.log(cltCol);

    }

    return 1;
 
}

export function insertTargetCltDetail(id, form){
    let modalTitle = document.querySelector("#new-collection-modal .modal-title");
    let actionBtn = document.querySelector("#new-collection-modal .btn-modal.action p");

    modalTitle.innerText= "Edit Section";
    actionBtn.innerText = "Save Changes";

    let cltObj = rl.find(id, false);

    form.elements.cltname.value = cltObj.getName();
    form.elements.rcoltag[cltObj.getColor()-1].checked = true;


}

export function removeClt(id){
    let readingsInClt = rl.findReadingByCollection(id);
    if(readingsInClt){
        for(let rdg of readingsInClt){
            rdg.setCollection(null);
        }
    }
    let cltEl = document.querySelector(`#cl-${id}`);
    cltEl.remove();
    rl.remove(id, false);

    
}

export function openAllTabs(id){
    let readings = rl.findReadingByCollection(id);


    if (readings.length > 1){

        for (let r of readings){
            openRequestedPopup(r.getLink(), "");
        }
    }else if(readings.length === 1){
        openRequestedPopup(readings[0].getLink(), "");
    }else{
        return;
    }

}

//https://developer.mozilla.org/en-US/docs/Web/API/Window/open
export function openRequestedPopup(url, windowName) {
    let windowObjectReference = null;

    if(windowObjectReference == null || windowObjectReference.closed) {
      windowObjectReference = window.open(url, windowName, "popup");
      
    } else {
      windowObjectReference.focus();
    };
  }
