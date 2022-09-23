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
let timerStartStopOnButton = true;
let timerStartStopKeyboard = true;
// timers intervals
let intervalTimerStopMillisClick = 0;
/*let timerStopMillisKeyboard = 0;*/
// keyboard's start
let keyboardStartTaps = 0;
let keyboardStopTaps = 0;

const statistics = new StatisticsCollector();

// timers starters
function startTimerClick(){
    milliSecondsClick++;
    if(milliSecondsClick < 9){
        milliElementClick.innerText = "0" + milliSecondsClick;
    } else {
        milliElementClick.innerText = milliSecondsClick;
    }
    if (milliSecondsClick >= 500) {
        stopTimerClick(intervalClick);
    }
}
function startTimerOnButton(){
    milliSecondsOnButton++;
    if(milliSecondsOnButton < 9){
        milliElementOnButton.innerText = "0" + milliSecondsOnButton;
    } else {
        milliElementOnButton.innerText = milliSecondsOnButton;
    }
    if (milliSecondsOnButton >= 500) {
        stopTimerOnButton(intervalOnButton);
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
        console.log(keyboardStartTaps + ' ' + keyboardStopTaps)
        statistics.takeTapsPerSecondKeyboard(keyboardStopTaps - keyboardStartTaps);
        keyboardStartTaps = keyboardStopTaps;
    }
    if (milliSecondsOnKeyboard > 100) {
        stopTimerKeyboard(intervalKeyboard);
    }
}

// timers stoppers
function stopTimerClick(interval){
    clearInterval(interval);
    milliElementClick.innerText = '00';
    timerStartStopClick = false;
}
function stopTimerOnButton(interval){
    clearInterval(interval);
    milliElementOnButton.innerText = '00';
}
function stopTimerKeyboard(interval){
    clearInterval(interval);
    timerStartStopKeyboard = true;
    milliSecondsOnKeyboard = 0;
    milliElementKeyboard.innerText = '00';
    statistics.displayStatistics();
}

// html block - wrapper (with buttons)
const wrapper = document.querySelector('.wrapper');

// handler's functions
function handleMouseEnter(){
    if (timerStartStopOnButton){
        intervalOnButton = setInterval(startTimerOnButton, 10);
        timerStartStopOnButton = false;
    }
}
function handleMouseLeave(){
    timerStartStopOnButton = true;
    statistics.incrementCountOnButtons();
    statistics.takeTimeIntervalsOnButtons(milliSecondsOnButton);
    milliSecondsOnButton = 0;
    stopTimerOnButton(intervalOnButton);
}
function handleMouseClick(){
    timerStartStopClick = !timerStartStopClick;
    statistics.incrementClicks();
    if (timerStartStopClick) {
        milliSecondsClick = 0;
        intervalClick = setInterval(startTimerClick, 10);
    } else {
        stopTimerClick(intervalClick);
        intervalTimerStopMillisClick = milliSecondsClick;
        statistics.takeTimeIntervalClicks(intervalTimerStopMillisClick);
        milliSecondsClick = 0;
        intervalClick = setInterval(startTimerClick, 10);
        timerStartStopClick = !timerStartStopClick;
    }
}

// keyboard taps handler
document.onkeydown = function (){
    if (timerStartStopKeyboard) {
        milliSecondsOnKeyboard = 0;
        keyboardStartTaps = statistics.getCountTapsOnKeys();
        intervalKeyboard = setInterval(startTimerKeyboard, 10);
    }
    statistics.incrementKeyTaps();
    timerStartStopKeyboard = false;
}

// link functions with events
wrapper.addEventListener('click', handleMouseClick);
wrapper.addEventListener('mouseenter', handleMouseEnter);
wrapper.addEventListener('mouseleave', handleMouseLeave);