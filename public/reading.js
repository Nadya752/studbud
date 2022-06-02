export const rp={
    // id: 0,
    NAME: 0,
    IS_READ: 1,
    IS_PIN: 2,
    LINK: 3,
    COLLECTION: 4,
}

export class Reading{

    constructor(name, isRead, isPin, link, collection){
        this.id = null;
        this.name = name;
        this.isRead = isRead;
        this.isPin = isPin;
        this.link = link;
        this.collection = collection === "0" ? null : collection;

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

    getIsRead(){
        return this.isRead;
    }

    setIsRead(newIsRead){
        if(newIsRead !== null){
            this.isRead = newIsRead;
        }
    }

    getIsPin(){
        return this.isPin;
    }

    setIsPin(newIsPin){
        if(newIsPin !== null){
            this.isPin = newIsPin;
        }
    }

    getLink(){
        return this.link;
    }

    setLink(newLink){
        if (newLink !== null && newLink != "" && 
        (newLink instanceof String || typeof newLink === "string")){
            this.link = newLink
        }
    }
    
    getCollection(){
        return this.collection === "0" ? null : this.collection;
    }

    setCollection(newCollection){
        this.collection = newCollection;
    }



}