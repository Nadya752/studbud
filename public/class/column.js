// Column class for kanban board.
export default class Column{

    constructor(id, name, markAllChecked){
        this.id = Number(id);
        this.name = name;
        this.markAllChecked = markAllChecked; // If true then all tasks inside the column is checked as Done.
    }

    // Check if name is a string.
    static nameIsValid(newName){
        if (newName !== null && newName != "" && 
        (newName instanceof String || typeof newName === "string")){
            return true;
        }

        return false;
    }

    // Getter function for column id.
    getId(){
        return this.id;
    }

    // Setter function for column id.
    setId(newId){
        if(newId !== null){
            this.id= Number(newId);
            return 1;
        }

        return 0;
    }

    // Getter function for column name.
    getName(){
        return this.name;
    }

    // Setter function for column name.
    setName(newName){
        if (Column.nameIsValid(newName)){
            this.name = newName;
        }

        return 0;
    }

    // Getter function for column MarkAllChecked property.
    getMarkAllChecked(){
        return this.markAllChecked;
    }

    // Setter function for column MarkAllChecked property.
    setMarkAllChecked(isMarkAllChecked){
        this.markAllChecked = isMarkAllChecked;

    }
    
}