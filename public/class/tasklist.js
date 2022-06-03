import {tp, Task} from './task.js';

export default class TaskList{
    
    constructor(){
      this.list = []; // list of tasks.
      this.counter = 0; // count number tasks.
      this.idCounter = 0; // id generator for tasks.
    }
    
    // Check if object is Array.
    static isArray(task){
        return task instanceof Array;
    }

    // Check if object is Task.
    static isTask(task){
        return task instanceof Task;
    }

    // Create new instance of task.
    newTask(task){
        
        if (task === null || !TaskList.isArray(task)){
            return 0;
        }

        return new Task(null, task[tp.NAME], 
            Number(task[tp.COL]), task[tp.DUE], task[tp.PRIORITY], task[tp.TIME], task[tp.ISDONE]);
        

    }
    
    // Add new task instance to list.
    addTask(task){

        if (!TaskList.isTask(task)){
            return 0;
        }

        task.setId(this.idCounter); // add its id from id generator.
        this.list.push(task);
        this.counter++;
        this.idCounter++;

        return 1;
      
    }

    // Remove a task from list.
    removeTask(taskId){
        this.list = this.list.filter( (task) => task.id !== taskId);
        this.counter--;
        return 1;

    }

    // Find a task from list by id.
    findTask(id){
        id = Number(id);
        return this.list.find( task => task.getId() === id);
    }

    // Find a task from list by its column placement in kanban board.
    findTaskByColumn(colId){
        colId = Number(colId);
        return this.list.filter( task => task.getColumn() === colId);
    }
    
    // Return all tasks in list.
    getAllTasks(){
        if (this.list.length === 0){
            return null;
        }

        return this.list;
    }

}