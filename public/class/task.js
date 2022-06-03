const DUE_END_SUBSTRING = 10; // Number of characters from Date object's ISOstring without time.

// Task properties.
export const tp={
    NAME: 0,
    COL: 1,
    DUE: 2,
    PRIORITY: 3,
    TIME: 4,
    ISDONE: 5,
}

// Task color tags.
export const color = {
    PURPLE: 1,
    BLUE: 2,
    GREEN: 3,
    YELLOW: 4,
    ORANGE: 5,
    RED: 6

}

// Task prioriy levels.
export const priority = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3
}

export class Task{
    
    constructor(id, name, color, due, priority, time, isDone){
        this.id= id;
        this.name = name;
        this.color= color; // color tag is 0 if no color picked.
        this.due = due === "" ? false : new Date(due);
        this.priority = Number(priority);
        this.time = [Number(time[0]), Number(time[1])]; // In hours and minutes.
        this.isDone= isDone;
        this.column = -1;
      
    }

    // Getter function for task id.
    getId(){
        return this.id;
    }

    // Setter function for task id.
    setId(id){
        this.id = id;
    }

    // Getter function for task name.
    getName(){
        return this.name;
    }

    // Setter function for task name.
    setName(newName){
        if(newName !== null && newName !== ""){
            this.name = newName;
            return 1;
        }

        return 0;
    }

    // Getter function for task color tag.
    getColor(){
        return this.color;
    }

    // Setter function for task color tag.
    setColor(newColor){
        if (newColor !== null && newColor >= color.PURPLE && newColor <= color.RED){
            this.color = Number(newColor);
            return 1;
        }

        return 0;
    }

    // Getter function for task color tag in string.
    getColorString(){
        let col = null;

        switch(this.color){
            case color.PURPLE:
                col = 'purple';
                break;
        
            case color.BLUE:
                col = 'blue';
                break;
        
            case color.GREEN:
                col = 'green';
                break;

            case color.YELLOW:
                col = 'yellow';
                break;

            case color.ORANGE:
                col = 'orange';
                break;

            case color.RED:
                col =  'red';
                break;
        
            default:
                col = 'No colour';
           
        }
        return col;
    }

    // Getter function for task due date.
    getDue(){
        if (this.due){
            return this.due.toISOString().substr(0, DUE_END_SUBSTRING);
        }

      return 0;
    }

    // Setter function for task due date.
    setDue(newDue){
        if (newDue !== null && newDue !== ""){
            this.due= new Date(newDue);

            return 1;
        }

        return 0;
    }

    // Getter function for task due date in string
    getDisplayDueString(isComplete){

        let newDue = null;
        let day = null;
        if (!this.due){
            return "-";
        }
        
        // Get date string from Date object and complete its day string.
        let dueArray = this.due.toDateString().split(" ");
        if (!isComplete){
            day = dueArray[0] + ","
    
        }else{
            day = dueArray[0];
            switch(day){
                case 'Mon':
                    day = 'Monday,';
                    break;
            
                case 'Tue':
                    day = 'Tuesday,';
                    break;
            
                case 'Wed':
                    day = 'Wednesday,';
                    break;
    
                case 'Thu':
                    day = 'Thursday,';
                    break;
    
                case 'Fri':
                    day = 'Friday,';
                    break;
    
                case 'Sat':
                    day =  'Saturday,';
                    break;
    
                case 'Sun':
                    day =  'Sunday,';
                    break;
            
                default:
                    col = 'Invalid day';
               
            }

        }
        

        // Join completed day string and date string.
        dueArray.splice(0, 1, day);
        newDue = dueArray.join(" ");
        return newDue;
    }
    
    // Getter function for task estimated time completion.
    getTime(){
      return this.time;
    }
    
    // Setter function for task estimated time completion.
    setTime(newTime){
        if (newTime !== null){
            this.time=newTime;
            return 1;

        }

        return 0;
    }

    // Getter function for task in string.
    getTimeString(){

        let hour = this.time[0];
        let min = this.time[1];
        let timeString = null;

        // If in minutes only.
        if (min >0 && hour === 0){
            timeString = `${min} min`;

        // If in hours only.
        }else if (min === 0 && hour > 0){
            timeString = `${hour} hr`;
        
        // If in hours and minutes.
        }else if (min > 0 && hour > 0){
            timeString = `${hour} hr ${min} min`;
        
        // No estimated time.
        }else{
            timeString = "-";
        }

        return timeString;
    }
    
    // Getter function for task priority level.
    getPriority(){
        return this.priority;
    }

    // Setter function for task priority level.
    setPriority(newPriority){
        if(newPriority !== null && newPriority >= priority.HIGH && newPriority <= priority.LOW){
            this.priority= Number(newPriority);
            return 1;
        }

        return 0;
    }

    // Getter function for task priority in string.
    getPriorityString(){
      let p = null;
      switch(this.priority){
        case priority.HIGH:
          p = 'high';
          break;
  
        case priority.MEDIUM:
          p = 'medium';
          break;
  
        case priority.LOW:
          p = 'low';
          break;
  
        default:
          p = 'invalid';
         
      }
      return p;
    }
    
    // Getter function for task status (i.e., Done or not done).
    getStatus(){
        return this.isDone;
    }

    // Setter function for task status.
    setStatus(newStatus){
        this.isDone = newStatus;
        return 1;
    }

    // Getter function for task status in string.
    getStatusString(){
      return this.isDone ? 'Done' : 'Not Done';
    }

    // Getter function for task location in kanban column.
    getColumn(){
        return this.column;
    }

    // Setter function for task location in kanban column.
    setColumn(newColumn){
        this.column = newColumn;
    }
    
}
  
