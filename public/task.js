export const tp={
    // id: 0,
    name: 0,
    col: 1,
    due: 2,
    priority: 3,
    time: 4,
    isDone: 5,
}

export class Task{
    
    constructor(id, name, color, due, priority, time, isDone){
        this.id= id;
        this.name = name;
        this.color= color; // 0 if no color
        this.due = due === "" ? false : new Date(due);
        this.priority = Number(priority);
        this.time = [Number(time[0]), Number(time[1])];
        this.isDone= isDone;
        this.column = -1;
      
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getName(){
        return this.name;
    }

    setName(newName){
        if(newName !== null && newName !== ""){
            this.name = newName;

            return 1;
        }

        return 0;
    }

    getColor(){
        return this.color;
    }

    setColor(newColor){
        if (newColor !== null && newColor >= 1 && newColor <= 6){
            this.color = Number(newColor);
            return 1;
        }

        return 0;
    }
    getColorString(){
        let col = null;
        // console.log("MYCOL", this.color);
        switch(this.color){
            case 1:
                col = 'purple';
                break;
        
            case 2:
                col = 'blue';
                break;
        
            case 3:
                col = 'green';
                break;

            case 4:
                col = 'yellow';
                break;

            case 5:
                col = 'orange';
                break;

            case 6:
                col =  'red';
                break;
        
            default:
                col = 'No colour';
           
        }
        return col;
    }

    getDue(){
        if (this.due){
            return this.due.toISOString().substr(0, 10);
        }

      return 0;
    }

    setDue(newDue){
        if (newDue !== null && newDue !== ""){
            this.due= new Date(newDue);

            return 1;
        }

        return 0;
    }

    // getDueString(){
    //     // console.log("MY DUE", this.due);
    //     return !this.due ? "" : this.due.toDateString();
    // }
    getDisplayDueString(isComplete){

        let newDue = null;
        let day = null;
        if (!this.due){
            return "-";
        }
    
        let dueArray = this.due.toDateString().split(" ");
        //console.log(dueString, dueArray);
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
    
            // dueArray = dueArray.splice(0, 0, day);
            // newDue = dueArray 
        }
    
        dueArray.splice(0, 1, day);
        newDue = dueArray.join(" ");
        //console.log(dueArray, newDue);
        return newDue;
    }
    
    getTime(){
      return this.time;
    }
    
    setTime(newTime){
        if (newTime !== null){
            this.time=newTime;
            return 1;

        }

        return 0;
    }

    getTimeString(){

        let hour = this.time[0];
        let min = this.time[1];
        let timeString = null;

        if (min >0 && hour === 0){
            timeString = `${min} min`;

        }else if (min === 0 && hour > 0){
            timeString = `${hour} hr`;

        }else if (min > 0 && hour > 0){
            timeString = `${hour} hr ${min} min`;

        }else{
            timeString = "-";
        }

        return timeString;
    }
    
    getPriority(){
        return this.priority;
    }

    setPriority(newPriority){
        if(newPriority !== null && newPriority > 0 && newPriority <= 3){
            this.priority= Number(newPriority);
            return 1;
        }

        return 0;
    }

    getPriorityString(){
      let p = null;
      switch(this.priority){
        case 1:
          p = 'high';
          break;
  
        case 2:
          p = 'medium';
          break;
  
        case 3:
          p = 'low';
          break;
  
        default:
          p = 'invalid';
         
      }
      return p;
    }
    
    getStatus(){
        return this.isDone;
    }

    setStatus(newStatus){
        this.isDone = newStatus;
        return 1;
    }

    getStatusString(){
      return this.isDone ? 'Done' : 'Not Done';
    }

    getColumn(){
        return this.column;
    }

    setColumn(newColumn){
        this.column = newColumn;
    }
  }
  
// export {tp, Task};