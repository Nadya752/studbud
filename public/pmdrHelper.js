// $focus: #D0E6EF;
// $focus-stroke:#70A1B5;
// $shortbr: #D1D0EF;
// $shortbr-stroke: #807EC8;
// $longbr: #EBD0EF;


// $longbr-stroke:#A164AB;
export const fillColor ={
    focus: "#D0E6EF",
    shortbr: "#D1D0EF",
    longbr: "#EBD0EF",

}

export const strokeColor ={
    focus: "#70A1B5",
    shortbr: "#807EC8",
    longbr: "#A164AB",
}

export const tab = {
    FOCUS: 1,
    SHORTBR: 2,
    LONGBR: 3
}

export const status ={
    START: 1,
    RESUME: 2,
    PAUSE:3
}
export const defVal={
    FOCUS: 25,
    SHORTBR: 5,
    LONGBR: 30,
    ROUND: 4
}

export const lightFill = "#F7F6F3";
export const START_ROUND = 1;

export function applyColour(targetTab, tabEl){
    const circleOuter =document.querySelector(".progress-circle");
    const circleInner = document.querySelector(".progress-circle-inner");
    const allTabs = document.querySelectorAll(".pmdr-tab-label");

    let fillCol = null;
    let strokeCol = null;

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

    tabEl.style.backgroundColor = fillCol;
    circleOuter.style.background = `conic-gradient(${fillCol} 360deg, ${lightFill} 360deg)`;
    circleInner.style.borderColor = strokeCol;

    for (let t of allTabs){
        if (t !== tabEl){
            t.style.backgroundColor = lightFill;
        }
    }

}

export function activateTimer(timer, currentSesh, startBtn, resetBtn, timerStat, isCountdown){


    if (timerStat === status.START){
        //console.log("START!");
        resetBtn.classList.remove("is-hide");
        startBtn.firstElementChild.innerText = "Pause";
        timerStat = status.PAUSE;
        if (isCountdown){
            timer.start({countdown: true, startValues: {minutes: st.getMax(currentSesh)}});
            // timer.start({countdown: true, startValues: {seconds: 3}});

        }else{
            timer.start({countdown: false, precision: 'secondTenths'});
        }


    }else if (timerStat === status.RESUME){
        //console.log("RESUME");
        startBtn.firstElementChild.innerText = "Pause";
        timerStat = status.PAUSE;
        timer.start();
        // console.log("RESUME!");
    }else if(timerStat === status.PAUSE){
        //console.log("PAUSE");
        startBtn.firstElementChild.innerText = "Resume";
        timerStat = status.RESUME;
        timer.pause();
        // console.log("PAUSE!");
    }

    return timerStat;
}

export function deactivateTimer(timer, startBtn, resetBtn, timerStat, sessionTabs){

    resetBtn.classList.add("is-hide");
    startBtn.firstElementChild.innerText = "Start";
    timerStat = status.START;
    // console.log("RESET!");

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
    
        circleOuter.style.background = `conic-gradient(${fillCol} 360deg, ${lightFill} 360deg)`;
    }

    return timerStat;
}


export function getProgressValue(totalVal, hour, min, sec){
    let current = (hour*3600) + (min*60) + sec;
    totalVal = toHoursAndMinutes(totalVal, false);
    let total = (totalVal[0]*3600) + (totalVal[1]*60);
    return current/total*100;
}

export function getConicGradient(progress, fillCol){
    return `conic-gradient(${fillCol} ${(progress*3.6)}deg, ${lightFill} ${(progress*3.6)}deg)`;
}

export function updateCircle(values, totalVal, sessionTabs){
    let currentSesh = null;
    let fillCol = null;

    for(let sesh of sessionTabs){
        if(sesh.checked){
            currentSesh = sesh.value;
        }
    }

    currentSesh = Number(currentSesh);
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

    let progress = getProgressValue(totalVal, hours, minutes, seconds);
    const circleOuter =document.querySelector(".progress-circle");
    let gradient = getConicGradient(progress, fillCol);
    // console.log(gradient, progress);
    circleOuter.style.backgroundImage = gradient;
    // console.log(circleOuter.style);

}

export function showStopwatchTime(stopwatch, element){
    let value = stopwatch.getTimeValues();
    let elapsedTimeString = value.toString() + `.${value.secondTenths}`;
    element.innerText = elapsedTimeString;
}

export function getCurrentSesh(sessionTabs){
    let currentSesh = null;
    for(let sesh of sessionTabs){
        if(sesh.checked){
            currentSesh = sesh.value;

        }

    }

    return Number(currentSesh);
}

export function getNextSesh(session, st, sessionTabs){
    let currentRound = st.getCurrentRound();
    let maxRound = st.getMaxRound();
    sessionTabs[session-1].checked = false; 
    let nextSesh = null

    if (session === tab.FOCUS ){
        sessionTabs[tab.SHORTBR-1].checked = true; 
        nextSesh =  tab.SHORTBR;

    }else if(session === tab.SHORTBR){
        
        if (currentRound === maxRound){
            sessionTabs[tab.LONGBR-1].checked = true; 
            nextSesh =  tab.LONGBR;
        }else{
            sessionTabs[tab.FOCUS-1].checked = true; 
            nextSesh = tab.FOCUS;
        }
        st.incrementRound();

    }else if(session === tab.LONGBR){
        sessionTabs[tab.FOCUS-1].checked = true; 
        st.setCurrentRound(START_ROUND);
        nextSesh = tab.FOCUS;
    }

    console.log(session, nextSesh, st);
    return nextSesh;
}

export function getMaxTimeString(maxVal){
    maxVal = toHoursAndMinutes(maxVal, true);
    return `${maxVal}:00`;
}

export function getRoundString(current, max){
    return `Round ${current} of ${max}`;
}

export function refreshPmdrPage(st, session, elapsedTime, roundText){

    let maxVal = st.getMax(session);
    elapsedTime.innerText = getMaxTimeString(maxVal);
    roundText.innerText = getRoundString(st.getCurrentRound(), st.getMaxRound());

}
//https://bobbyhadz.com/blog/javascript-convert-minutes-to-hours-and-minutes
function toHoursAndMinutes(totalMinutes, isString) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    
    if (isString){
        return [`${padTo2Digits(hours)}:${padTo2Digits(minutes)}`];
    }else{
        return [hours, minutes];
    }
}

function padTo2Digits(num) {
return num.toString().padStart(2, '0');
}

// var timer = new Timer();
// timer.start({countdown: true, startValues: {seconds: 30}});

// $('#countdownExample .values').html(timer.getTimeValues().toString());

// timer.addEventListener('secondsUpdated', function (e) {
//     $('#countdownExample .values').html(timer.getTimeValues().toString());
// });

// timer.addEventListener('targetAchieved', function (e) {
//     $('#countdownExample .values').html('KABOOM!!');
// });

