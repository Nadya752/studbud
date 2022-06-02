import {rp, Reading} from './reading.js';
import TaskList from './tasklist.js';
import {cp, Collection} from './collection.js';

export default class ReadingList{
    constructor(){
        this.rlist = [];
        this.clist=[];
        this.idCounter= 0;
        this.colIdCounter = 1;
    }
    static isCollection(col){
        return col instanceof Collection;
    }

    newReading(reading){
        if(reading === null || !TaskList.isArray(reading)){
            return;
        }

        let newReading = new Reading(reading[rp.NAME], reading[rp.IS_READ],
            reading[rp.IS_PIN], reading[rp.LINK], reading[rp.COLLECTION]);
        
        return newReading;

    }

    addReading(reading){
        if (!reading instanceof Reading){
            return;
        }

        reading.setId(this.idCounter);
        this.rlist.push(reading);
        this.idCounter++;

    }

    remove(id, isReading){
        id = Number(id);
        if (isReading){
            this.rlist = this.rlist.filter( (reading) => reading.getId() !== id);
        }

        this.clist = this.clist.filter( (collection) => collection.getId() !== id);
    }

    find(id, isReading){
        id = Number(id);
        //console.log(id);

        if (isReading){
            return this.rlist.find( reading => reading.getId() === id);
        }

        return this.clist.find( collection => collection.getId() === id);
    }

    findReadingByCollection(id){
        id = Number(id);
        return this.rlist.filter( reading => reading.getCollection().getId() === id);
    }

    newCollection(collection){
        if(collection === null){
            return;
        }


        let newCollection = new Collection (collection[cp.NAME], collection[cp.COLOR]);

        return newCollection;
    }

    addCollection(collection){
        if (!ReadingList.isCollection(collection)){
            return;
        }
        collection.setId(this.colIdCounter);
        this.clist.push(collection);
        this.colIdCounter++;
    }

    getAllCollections(){
        let collections = this.clist;
        if (collections.length === 0){
            return null;
        }

        return collections;
    }

    getAllReadings(){
        let readings = this.rlist;
        if (readings.length === 0){
            return null;
        }

        return readings;
    }

}