import {tab} from '../helper/pmdrHelper.js';

export default class StudyTimer{

    constructor(maxFocus, maxShortBreak, maxLongBreak, maxRound){
        this.currentFocus= 0;
        this.maxFocus = maxFocus; // focus session limit.

        this.currentShortBreak = 0;
        this.maxShortBreak = maxShortBreak; // short break session limit.
        
        this.currentLongBreak = 0;
        this.maxLongBreak = maxLongBreak; // long break session limit.

        this.currentRound = 1;
        this.maxRound = maxRound // round limit.

    }

    // Getter function for pomodoro current session.
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

    // Setter function for pomodoro current session.
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

    // Getter function for pomodoro session limits.
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

    // Setter function for pomodoro current session.
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

    // Getter function for pomodoro current round.
    getCurrentRound(){
        return this.currentRound;
    }
    
    // Setter function for pomodoro current round.
    setCurrentRound(newRound){
        newRound = Number(newRound);
        if (newRound === null || newRound <= 0){
            return;

        }
        this.currentRound = newRound;
    }

    // Getter function for pomodoro round limit.
    getMaxRound(){
        return this.maxRound;
    }

    // Setter function for pomodoro round limit
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

    // Increment pomodoro current round.
    incrementRound(){
        this.currentRound++;

        // Sets current round back to 1 if current round reaches round limit.
        if (this.currentRound !== this.maxRound){
            this.currentRound %= this.maxRound;
        }
        
    }

}