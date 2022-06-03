// Reading properties.
export const rp={
    NAME: 0,
    IS_READ: 1,
    LINK: 2,
    COLLECTION: 3
}

export class Reading{

    constructor(name, isRead, link, collection){
        this.id = null;
        this.name = name;
        this.isRead = isRead;
        this.link = link;
        this.collection = collection === "0" ? null : collection;

    }

    // Getter function for reading id.
    getId(){
        return this.id;
    }

    // Setter function for reading id.
    setId(id){
        this.id = Number(id);
    }

    // Getter function for reading name.
    getName(){
        return this.name;
    }

    // Setter function for reading name.
    setName(newName){
        if(newName !== null && newName !== ""){
            this.name = newName;
        }
    }

    // Getter function for reading status (i.e., read or unread).
    getIsRead(){
        return this.isRead;
    }

    // Setter function for reading status.
    setIsRead(newIsRead){
        if(newIsRead !== null){
            this.isRead = newIsRead;
        }
    }

    // Getter function for reading link.
    getLink(){
        return this.link;
    }

    // Setter function for reading link.
    setLink(newLink){
        if (newLink !== null && newLink != "" && 
        (newLink instanceof String || typeof newLink === "string")){
            this.link = newLink
        }
    }
    
    // Getter function for reading collection.
    getCollection(){
        return this.collection === "0" ? null : this.collection;
    }

    // Setter function for reading collection.
    setCollection(newCollection){
        this.collection = newCollection;
    }
    
}