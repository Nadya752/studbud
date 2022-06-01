import {tp, Task} from './task.js';


export default class TaskList{
    constructor(){
      this.list = [];
      this.counter = 0;
      this.idCounter = 0;
    }
  
    static isArray(task){
        return task instanceof Array;
    }

    static isTask(task){
        return task instanceof Task;
    }

    

    newTask(task){
        
        if (task === null || !TaskList.isArray(task)){
            return 0;
        }

        return new Task(null, task[tp.name], 
            Number(task[tp.col]), task[tp.due], task[tp.priority], task[tp.time], task[tp.isDone]);
        

    }
    
    addTask(task){
    //   let nt = this.newTask(task);
        if (!TaskList.isTask(task)){
            return 0;
        }

        task.setId(this.idCounter);

        this.list.push(task);
        this.counter++;
        this.idCounter++;

        return 1;
      
    }

    removeTask(taskId){
        // if (!TaskList.isTask(task)){
        //     return 0;
        // }
        // console.log("EYD");

        this.list = this.list.filter( (task) => task.id !== taskId);
        this.counter--;
        return 1;

    }

    findTask(id){
        //console.log("FIND TASK: ", id);
        // id = id.slice(1, id.length+1); // truncate t in id.
        id = Number(id);
        //console.log(id);
        return this.list.find( task => task.getId() === id);
    }

    findTaskByColumn(colId){
        colId = Number(colId);
        //console.log(id);
        return this.list.find( task => task.getColumn() === colId);
    }
  
    
  }