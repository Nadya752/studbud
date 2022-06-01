// import TaskList from './tasklist.js';
// import Kanban from './kanban.js';
// import {kbCardTemplate} from './template.js';


// tl = new TaskList();
// kb = new Kanban();

// window['tl'] = tl;
// window['kb'] = kb;
// // let {tl} = require('./variables.js');
// const screen={

//     TASKLIST: 0,
//     KANBAN: 1,
//     PMDR: 2,
//     TIMER: 3,
//     READINGS: 4,
//     COLLECTIONS: 5,
// }

// const tlTab = document.querySelector(".tab-label[for=\"tasklist\"");
// const kbTab = document.querySelector(".tab-label[for=\"kanban\"");
// const tlContent = document.querySelector("#tl-content");
// const kbContent = document.querySelector("#kb-content");
// const columns = document.querySelector('#kb-content .columns');
// let isHidden= [false, true, true, true, true, true];
// // let tl = new TaskList();

// //https://attacomsian.com/blog/javascript-dom-remove-all-children-of-an-element
// function clearKanban(columns){
//     //console.log(columns.children);
//     for (let col of columns.children){
//         while(col.children.length > 1){
//             col.removeChild(col.lastChild);
//         }
//     }
    
// }

// function loadTasksInKb(tl){
    
//     for (let task of tl.list){
//         let col = task.getColumn();
//         let kbCard = document.createElement('div');
//         kbCard.classList.add("kb-card");
//         kbCard.innerHTML = kbCardTemplate(task);

//         if(col === -1){
//             task.setColumn(task.getStatus() ? 2: 0);
//         }
//         let parent = document.querySelector(`#c-${task.getColumn()}`)
//         parent.append(kbCard);
        
//     }

// }

// tlTab.addEventListener("click", () => {
//     if (isHidden[screen.TASKLIST]){
//         tlContent.classList.toggle("is-hide");
//         kbContent.classList.toggle("is-hide");
//         isHidden[screen.TASKLIST] = false;
//         isHidden[screen.KANBAN] = true;
//     }

// })

// kbTab.addEventListener("click", () => {
//     // console.log("AJSNDLndlakndlaknsdlaks");
//     if(isHidden[screen.KANBAN]){
//         tlContent.classList.toggle("is-hide");
//         kbContent.classList.toggle("is-hide");
//         isHidden[screen.TASKLIST] = true;
//         isHidden[screen.KANBAN] = false;
//     }
//     clearKanban(columns);
//     loadTasksInKb(tl);


// })



// // module.exports = {tl};