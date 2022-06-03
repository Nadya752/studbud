import {tab} from './pmdrHelper.js';

export default class StudyTimer{
    constructor(maxFocus, maxShortBreak, maxLongBreak, maxRound){

        this.currentFocus= 0;
        this.maxFocus = maxFocus;

        this.currentShortBreak = 0;
        this.maxShortBreak = maxShortBreak;
        
        this.currentLongBreak = 0;
        this.maxLongBreak = maxLongBreak;

        this.currentRound = 1;
        this.maxRound = maxRound

        // this.stopwatchTime = 0;
    }

    getCurrent(session){
        if (session === null){
            return;
        }

        session = Number(session);
        if(session === tab.FOCUS){
            return this.currentFocus;

        }else if(session === tab.SHORTBR){
            return this.currentShortBreak;

        }else if(session === tab.LONGBR){
            return this.currentLongBreak;
        }

    }

    setCurrent(session, value){
        if (session === null || value === null){
            return;
        }

        session = Number(session);
        if(session === tab.FOCUS){
            this.currentFocus = value;

        }else if(session === tab.SHORTBR){
            this.currentShortBreak = value;

        }else if(session === tab.LONGBR){
            this.currentLongBreak = value;
        }

    }

    getMax(session){
        if (session === null){
            return;
        }

        session = Number(session);
        if(session === tab.FOCUS){
            return this.maxFocus;

        }else if(session === tab.SHORTBR){
            return this.maxShortBreak;

        }else if(session === tab.LONGBR){
            return this.maxLongBreak;
        }
    }

    setMax(session, value){
        if (session === null || value === null){
            return;
        }

        value = Number(value);
        session = Number(session);
        if(session === tab.FOCUS){
            this.maxFocus = value;

        }else if(session === tab.SHORTBR){
            this.maxShortBreak = value;

        }else if(session === tab.LONGBR){
            this.maxLongBreak = value;
        }

    }

    getCurrentRound(){
        return this.currentRound;
    }

    setCurrentRound(newRound){
        newRound = Number(newRound);
        if (newRound === null || newRound <= 0){
            return;

        }
        this.currentRound = newRound;
    }

    getMaxRound(){
        return this.maxRound;
    }

    setMaxRound(newRound){
        newRound = Number(newRound);
        if (newRound === null || newRound <= 0){
            return;

        }

        this.maxRound = newRound;
        if (this.currentRound > this.maxRound){
            this.currentRound = this.maxRound;
        }
    }

    incrementRound(){
        this.currentRound++;
        if (this.currentRound !== this.maxRound){
            this.currentRound %= this.maxRound;
        }
        
    }



}