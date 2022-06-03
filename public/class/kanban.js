import Column from './column.js';

export default class Kanban {
    constructor(){
        this.idCounter = 0; // id generator for column.

        // Default columns in Kanban board that can be edited or deleted (except for Upcoming Tasks).

        // Id #1 is default column "Upcoming Tasks".
        // All tasks that are not marked as done are placed in this column by default.
        let upcoming = new Column(this.idCounter++, "Upcoming Tasks", false);

        // Id #2 is default column "In Progress".
        let inProg = new Column(this.idCounter++, "In Progress", false);

        // Id #3 is default column "Completed Tasks".
        // All tasks that are marked as done are placed in this column by default.
        let completed = new Column(this.idCounter++, "Completed Tasks", true);
        this.columns = [upcoming, inProg, completed];

    }

    // Add new column (section) to Kanban board.
    addColumn(name, markAllChecked){
        let newColumn = null;
        
        if(Column.nameIsValid(name) && markAllChecked !== null){
            newColumn = new Column(this.idCounter++, name, markAllChecked);
            this.columns.push(newColumn);
        }

        return newColumn;

    }

    // Remove column from Kanban board.
    removeColumn(id){
        id= Number(id);
        this.columns = this.columns.filter( (column) => column.getId() !== id);

    }

    // Find column in Kanban board.
    findColumn(id){
        id = Number(id);
        return this.columns.find( column => column.getId() === id);
    }

}