
export default class Column{

    constructor(id, name, markAllChecked){
        this.id = Number(id);
        this.name = name;
        this.markAllChecked = markAllChecked;
    }

    static nameIsValid(newName){
        if (newName !== null && newName != "" && 
        (newName instanceof String || typeof newName === "string")){
            return true;
        }

        return false;
    }

    getId(){
        return this.id;
    }

    setId(newId){
        if(newId !== null){
            this.id= Number(newId);
            return 1;
        }

        return 0;
    }

    getName(){
        return this.name;
    }

    setName(newName){
        if (Column.nameIsValid(newName)){
            this.name = newName;
        }

        return 0;
    }

    getMarkAllChecked(){
        return this.markAllChecked;
    }

    setMarkAllChecked(isMarkAllChecked){
        this.markAllChecked = isMarkAllChecked;

    }
}