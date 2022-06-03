// Helper functions for pomodoro.

// Fill colors of sessions.
export const fillColor ={
    focus: "#D0E6EF",
    shortbr: "#D1D0EF",
    longbr: "#EBD0EF",

}

// Stroke colors of sessions.
export const strokeColor ={
    focus: "#70A1B5",
    shortbr: "#807EC8",
    longbr: "#A164AB",
}

// Session tabs
export const tab = {
    FOCUS: 1,
    SHORTBR: 2,
    LONGBR: 3
}

// Status of timer aside from reset (i.e., stop).
export const status ={
    START: 1,
    RESUME: 2,
    PAUSE:3
}

// Default values of pomodoro.
export const defVal={
    FOCUS: 25,
    SHORTBR: 5,
    LONGBR: 30,
    ROUND: 4
}

export const lightFill = "#F7F6F3"; // secondary color.
export const START_ROUND = 1; // pomodoro round starts at round 1.
const MIN_TO_SEC = 60;
const HOUR_TO_SEC = 3600;
const PERCENT = 100;
const DEGREE_CONSTANT = 3.6;
const HOUR_TO_MINUTES = 60;
const PADDING_DIGIT_NUMBER =2;

// Apply colours according to session.
export function applyColour(targetTab, tabEl){
    const circleOuter =document.querySelector(".progress-circle");
    const circleInner = document.querySelector(".progress-circle-inner");
    const allTabs = document.querySelectorAll(".pmdr-tab-label");

    let fillCol = null;
    let strokeCol = null;

    // Set fill color and stroke color according to session.
    if (targetTab === tab.FOCUS){
        fillCol = fillColor.focus;
        strokeCol = strokeColor.focus;

    }else if (targetTab === tab.SHORTBR){
        fillCol = fillColor.shortbr;
        strokeCol = strokeColor.shortbr;

    }else if (targetTab === tab.LONGBR){
        fillCol = fillColor.longbr;
        strokeCol = strokeColor.longbr;
    }

    // Apply fill and stroke color to pomodoro elements.
    tabEl.style.backgroundColor = fillCol;
    circleOuter.style.background = `conic-gradient(${fillCol} 360deg, ${lightFill} 360deg)`;
    circleInner.style.borderColor = strokeCol;

    // Set unselected tabs to secondary color.
    for (let t of allTabs){
        if (t !== tabEl){
            t.style.backgroundColor = lightFill;
        }
    }

}

// Start, resume, or pause time.
export function activateTimer(timer, currentSesh, startBtn, resetBtn, timerStat, isCountdown){

    if (timerStat === status.START){
        resetBtn.classList.remove("is-hide");
        startBtn.firstElementChild.innerText = "Pause";
        timerStat = status.PAUSE;

        // For pomodoro timer.
        if (isCountdown){
            timer.start({countdown: true, startValues: {minutes: st.getMax(currentSesh)}});
        
        // For stopwatch.
        }else{
            timer.start({countdown: false, precision: 'secondTenths'});
        }


    }else if (timerStat === status.RESUME){
        startBtn.firstElementChild.innerText = "Pause";
        timerStat = status.PAUSE;
        timer.start();

    }else if(timerStat === status.PAUSE){
        startBtn.firstElementChild.innerText = "Resume";
        timerStat = status.RESUME;
        timer.pause();

    }

    return timerStat;
}

// Stop or reset timer.
export function deactivateTimer(timer, startBtn, resetBtn, timerStat, sessionTabs){

    // Buttons become only start button.
    resetBtn.classList.add("is-hide");
    startBtn.firstElementChild.innerText = "Start";
    timerStat = status.START;

    // Set colors according to selected session tab.
    if (sessionTabs){
        const circleOuter = document.querySelector(".progress-circle");
        let fillCol = null;

        let session = getCurrentSesh(sessionTabs);
        if (session === tab.FOCUS){
            fillCol = fillColor.focus;
    
        }else if (session === tab.SHORTBR){
            fillCol = fillColor.shortbr;
    
    
        }else if (session === tab.LONGBR){
            fillCol = fillColor.longbr;
    
        }
        
        // Progress circles becomes full again.
        circleOuter.style.background = `conic-gradient(${fillCol} 360deg, ${lightFill} 360deg)`;
    }

    return timerStat;
}

// Get progress value of Pomodoro timer.
export function getProgressValue(totalVal, hour, min, sec){
    let current = (hour*HOUR_TO_SEC) + (min*MIN_TO_SEC) + sec;
    totalVal = toHoursAndMinutes(totalVal, false);
    let total = (totalVal[0]*HOUR_TO_SEC) + (totalVal[1]*MIN_TO_SEC);
    return current/total*PERCENT;

}

// Conic gradient of progress circle according to progress.
export function getConicGradient(progress, fillCol){
    return `conic-gradient(${fillCol} ${(progress*DEGREE_CONSTANT)}deg, ${lightFill} ${(progress*DEGREE_CONSTANT)}deg)`;
}

// Wrapper function to update display of progress circle.
export function updateCircle(values, totalVal, sessionTabs){
    let currentSesh = null;
    let fillCol = null;

    // Get current session and
    // fill color according to current session tab.
    currentSesh = getCurrentSesh(sessionTabs);
    if (currentSesh === tab.FOCUS){
        fillCol = fillColor.focus;


    }else if (currentSesh === tab.SHORTBR){
        fillCol = fillColor.shortbr;


    }else if (currentSesh === tab.LONGBR){
        fillCol = fillColor.longbr;

    }

    let minutes = values.minutes;
    let seconds = values.seconds;
    let hours = values.hours;

    // Update display of progress circle according to progress of timer.
    let progress = getProgressValue(totalVal, hours, minutes, seconds);
    const circleOuter =document.querySelector(".progress-circle");
    let gradient = getConicGradient(progress, fillCol);
    circleOuter.style.backgroundImage = gradient;

}

// Show elapsed time.
export function showStopwatchTime(stopwatch, element){
    let value = stopwatch.getTimeValues();
    let elapsedTimeString = value.toString() + `.${value.secondTenths}`;
    element.innerText = elapsedTimeString;
}

// Get current session.
export function getCurrentSesh(sessionTabs){
    let currentSesh = null;
    for(let sesh of sessionTabs){
        if(sesh.checked){
            currentSesh = sesh.value;
        }
    }

    return Number(currentSesh);
}

// Get the next session.
export function getNextSesh(session, st, sessionTabs){
    let currentRound = st.getCurrentRound();
    let maxRound = st.getMaxRound();
    sessionTabs[session-1].checked = false; 
    let nextSesh = null

    // If current is focus the next is short break.
    if (session === tab.FOCUS ){
        sessionTabs[tab.SHORTBR-1].checked = true; 
        nextSesh =  tab.SHORTBR;
    
    // If current is short break then next is focus if round has not reached limit,
    // or long break of round has reached limit.
    }else if(session === tab.SHORTBR){
        if (currentRound === maxRound){
            sessionTabs[tab.LONGBR-1].checked = true; 
            nextSesh =  tab.LONGBR;
        }else{
            sessionTabs[tab.FOCUS-1].checked = true; 
            nextSesh = tab.FOCUS;
        }
        st.incrementRound();
    
    // If current is long break then next session is focus.
    }else if(session === tab.LONGBR){
        sessionTabs[tab.FOCUS-1].checked = true; 
        st.setCurrentRound(START_ROUND);
        nextSesh = tab.FOCUS;
    }

    console.log(session, nextSesh, st);
    return nextSesh;
}

// Get display string when timer has not started.
export function getMaxTimeString(maxVal){
    maxVal = toHoursAndMinutes(maxVal, true);
    return `${maxVal}:00`;
}

// Get the round string of timer.
export function getRoundString(current, max){
    return `Round ${current} of ${max}`;
}

// Refresh the display of pomodoro tab.
export function refreshPmdrPage(st, session, elapsedTime, roundText){

    let maxVal = st.getMax(session);
    elapsedTime.innerText = getMaxTimeString(maxVal);
    roundText.innerText = getRoundString(st.getCurrentRound(), st.getMaxRound());

}

/* USYD CODE CITATION ACKNOWLEDGEMENT
* I declare that the following lines of code have been copied from the
* website titled: "Javascript Convert Minutes to Hours and Minutes"
* with only minor changes and it is not my own work. 
* 
* Original URL
* https://bobbyhadz.com/blog/javascript-convert-minutes-to-hours-and-minutes
* Last access June, 2022
*/

// Minutes to hours and minutes.
function toHoursAndMinutes(totalMinutes, isString) {
    const minutes = totalMinutes % HOUR_TO_MINUTES;
    const hours = Math.floor(totalMinutes / HOUR_TO_MINUTES);
    
    // Hours and minutes in string.
    if (isString){
        return [`${padTo2Digits(hours)}:${padTo2Digits(minutes)}`];
        
    // Hours and minutes in Number.
    }else{
        return [hours, minutes];
    }
}

// Helper function for padding of digits.
function padTo2Digits(num) {
return num.toString().padStart(PADDING_DIGIT_NUMBER, '0');
}

/* end of copied code */
