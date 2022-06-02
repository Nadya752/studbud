export const cp ={
    NAME: 0,
    COLOR: 1
}

export class Collection{
    constructor (name, color){
        this.id = null;
        this.name = name;
        this.color = Number(color);
        // this.list = [];
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = Number(id);
    }

    getName(){
        return this.name;
    }

    setName(newName){
        if(newName !== null && newName !== ""){
            this.name = newName;
        }
    }

    getColor(){
        return this.color;
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

    setColor(newColor){
        if (newColor !== null && newColor >= 1 && newColor <= 6){
            this.color = Number(newColor);
        }
    }


}

