import {rp, Reading} from './reading.js';
import TaskList from './tasklist.js';
import {cp, Collection} from './collection.js';

export default class ReadingList{
    
    constructor(){
        this.rlist = []; // list of readings.
        this.clist=[]; // list of collections.
        this.idCounter= 0; // id generator for readings.
        this.colIdCounter = 1; // id generator for collections.
    }

    // Check if object is a Collections instance.
    static isCollection(col){
        return col instanceof Collection;
    }

    // Create a new reading instance.
    newReading(reading){
        if(reading === null || !TaskList.isArray(reading)){
            return;
        }

        let newReading = new Reading(reading[rp.NAME], reading[rp.IS_READ],
                         reading[rp.LINK], reading[rp.COLLECTION]);
        
        return newReading;

    }

    // Add reading to list.
    addReading(reading){
        if (!reading instanceof Reading){
            return;
        }

        reading.setId(this.idCounter);
        this.rlist.push(reading);
        this.idCounter++;

    }

    // Remove reading from list.
    remove(id, isReading){
        id = Number(id);
        if (isReading){
            this.rlist = this.rlist.filter( (reading) => reading.getId() !== id);
        }

        this.clist = this.clist.filter( (collection) => collection.getId() !== id);
    }

    // Find reading or collection by its id.
    find(id, isReading){
        id = Number(id);

        // Find reading.
        if (isReading){
            return this.rlist.find( reading => reading.getId() === id);
        }

        //Find collection.
        return this.clist.find( collection => collection.getId() === id);
    }

    // Find all readings in a collection.
    findReadingByCollection(id){
        id = Number(id);
        return this.rlist.filter( reading => reading.getCollection().getId() === id);
    }

    // Create a new collection.
    newCollection(collection){
        if(collection === null){
            return;
        }

        let newCollection = new Collection (collection[cp.NAME], collection[cp.COLOR]);

        return newCollection;
    }

    // Add collection instance to list.
    addCollection(collection){
        if (!ReadingList.isCollection(collection)){
            return;
        }
        collection.setId(this.colIdCounter);
        this.clist.push(collection);
        this.colIdCounter++;
    }

    // Returns all collections in list.
    getAllCollections(){
        let collections = this.clist;
        if (collections.length === 0){
            return null;
        }

        return collections;
    }

    // Returns all readings in list.
    getAllReadings(){
        let readings = this.rlist;
        if (readings.length === 0){
            return null;
        }

        return readings;
    }

}