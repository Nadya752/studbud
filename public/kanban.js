import Column from './column.js';

export default class Kanban {
    constructor(){

        this.idCounter = 0;

        let upcoming = new Column(this.idCounter++, "Upcoming Tasks", false);
        let inProg = new Column(this.idCounter++, "In Progress", false);
        let completed = new Column(this.idCounter++, "Completed Tasks", true);
        this.columns = [upcoming, inProg, completed];

    }

    addColumn(name, markAllChecked){
        let newColumn = null;
        if(Column.nameIsValid(name) && markAllChecked !== null){
            newColumn = new Column(this.idCounter++, name, markAllChecked);
            this.columns.push(newColumn);
            
        }

        return newColumn;

    }

    removeColumn(id){
        id= Number(id);
        this.columns = this.columns.filter( (column) => column.getId() !== id);

    }

    findColumn(id){
        id = Number(id);
        return this.columns.find( column => column.getId() === id);
    }

}