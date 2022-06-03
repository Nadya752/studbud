import {color} from "./task";

// Collection properties.
export const cp ={
    NAME: 0,
    COLOR: 1
}

export class Collection{
    constructor (name, color){
        this.id = null;
        this.name = name;
        this.color = Number(color);
    }

    // Getter function for collection id.
    getId(){
        return this.id;
    }
    // Setter function for collection id.
    setId(id){
        this.id = Number(id);
    }

    // Getter function for collection name.
    getName(){
        return this.name;
    }

    // Setter function for colelction name.
    setName(newName){
        if(newName !== null && newName !== ""){
            this.name = newName;
        }
    }

    // Getter function for collection color tag.
    getColor(){
        return this.color;
    }

    // Getter function for collection color tag in string.
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

    // Setter function for collection color tag.
    setColor(newColor){
        if (newColor !== null && newColor >= 1 && newColor <= 6){
            this.color = Number(newColor);
        }
    }

}

