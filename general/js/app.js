'use strict';
// timers visualization
const milliElementClick = document.querySelector('.milliseconds');
const milliElementOnButton = document.querySelector('.milliseconds1');
const milliElementKeyboard = document.querySelector('.milliseconds2');
// time counters & intervals for timers for each event
let milliSecondsClick = 0, intervalClick;
let milliSecondsOnButton = 0, intervalOnButton;
let milliSecondsOnKeyboard = 0, intervalKeyboard;
// timer start/stop flags
let timerStartStopClick = false;
let timerStartStopKeyboard = true;
// timers intervals
let timerStopMillisClick = 0;
let timerStopMillisKeyboard = 0;
// keyboard's start
let keyboardStartTaps = 0;
let keyboardStopTaps = 0;

const statistics = new StatisticsCollector();

// timers starters
function startTimer(){
    milliSecondsClick++;
    if(milliSecondsClick < 9){
        milliElementClick.innerText = "0" + milliSecondsClick;
    } else {
        milliElementClick.innerText = milliSecondsClick;
    }
}
function startTimerOnButton(){
    milliSecondsOnButton++;
    if(milliSecondsOnButton < 9){
        milliElementOnButton.innerText = "0" + milliSecondsOnButton;
    } else {
        milliElementOnButton.innerText = milliSecondsOnButton;
    }
}
function startTimerKeyboard(){
    milliSecondsOnKeyboard++;
    if(milliSecondsOnKeyboard < 9){
        milliElementKeyboard.innerText = "0" + milliSecondsOnKeyboard;
    } else {
        milliElementKeyboard.innerText = milliSecondsOnKeyboard;
    }
    if (milliSecondsOnKeyboard % 100 === 0){
        keyboardStopTaps = statistics.getCountTapsOnKeys();
        statistics.incrementTapIntervals();
        statistics.takeTapsPerSecondKeyboard(keyboardStopTaps - keyboardStartTaps);
        keyboardStartTaps = keyboardStopTaps;
        console.log('SECOND PASSED!')
    }
}

// timers stoppers
function stopTimer(interval){
    clearInterval(interval);
}
function stopTimerOnButton(interval){
    clearInterval(interval);
    milliSecondsOnButton = 0;
    milliElementOnButton.innerText = "00";
}
function stopTimerKeyboard(interval){
    clearInterval(interval);
}

// html block - wrapper (with buttons)
const wrapper = document.querySelector('.wrapper');

// handler's functions
function handleMouseEnter(event){
    intervalOnButton = setInterval(startTimerOnButton, 10);
}
function handleMouseLeave(event){
    statistics.incrementCountOnButtons();
    statistics.takeTimeIntervalsOnButtons(milliSecondsOnButton);
    stopTimerOnButton(intervalOnButton);
}
function handleMouseClick(event){
    timerStartStopClick = !timerStartStopClick;
    statistics.incrementClicks();
    if (timerStartStopClick) {
        milliSecondsClick = 0;
        intervalClick = setInterval(startTimer, 10);
    } else {
        stopTimer(intervalClick);
        timerStopMillisClick = milliSecondsClick;
        statistics.takeTimeIntervalClicks(timerStopMillisClick);
        milliSecondsClick = 0;
        intervalClick = setInterval(startTimer, 10);
        timerStartStopClick = !timerStartStopClick;
    }
}

// keyboard taps handler
document.onkeydown = function (event){
    statistics.incrementKeyTaps();
    if (timerStartStopKeyboard) {
        milliSecondsOnKeyboard = 0;
        keyboardStartTaps = statistics.getCountTapsOnKeys();
        intervalKeyboard = setInterval(startTimerKeyboard, 10);
    }
    timerStartStopKeyboard = false;
    /*else {
        stopTimerKeyboard(intervalKeyboard);
        timerStopMillisKeyboard = milliSecondsOnKeyboard;
        milliSecondsOnKeyboard = 0;
        keyboardStartTaps = statistics.getCountTapsOnKeys();
        intervalKeyboard = setInterval(startTimerKeyboard, 10);
        timerStartStopKeyboard = !timerStartStopKeyboard;
    }*/

    console.log(event);
}

// link functions with events
wrapper.addEventListener('mouseenter', handleMouseEnter);
wrapper.addEventListener('mouseleave', handleMouseLeave);
wrapper.addEventListener('click', handleMouseClick);