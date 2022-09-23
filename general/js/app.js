'use strict';
// timers visualization
const milliElementClick = document.querySelector('.msClick');
const milliElementOnButton = document.querySelector('.msOnButton');
const milliElementKeyboard = document.querySelector('.msKeyboard');
const milliElementClickDistance = document.querySelector('.msClickDistance');
// html block - wrapper (with buttons)
const wrapper = document.querySelector('.wrapper');
// time counters & intervals for timers for each event
let msClick = 0, intervalClick;
let msClickDistance = 0, intervalClickDistance;
let msOnButton = 0, intervalOnButton;
let msOnKeyboard = 0, intervalKeyboard;
// coordinates of clicks
let firstClickX = 0;
let firstClickY = 0;
let secondClickX = 0;
let secondClickY = 0;
// timer start/stop flags
let timerStartStopClick = false;
let timerStartStopClickDistance = true;
let timerStartStopOnButton = true;
let timerStartStopKeyboard = true;
// timers intervals
let intervalTimerStopMillisClick = 0;
// keyboard's start
let keyboardStartTaps = 0;
let keyboardStopTaps = 0;

const statistics = new StatisticsCollector();

// timers starters
function startTimerClick(){
    msClick++;
    if(msClick < 9){
        milliElementClick.innerText = '0' + msClick;
    } else {
        milliElementClick.innerText = msClick;
    }
    if (msClick >= 500) {
        stopTimerClick(intervalClick);
    }
}
function startTimerOnButton(){
    msOnButton++;
    if(msOnButton < 9){
        milliElementOnButton.innerText = '0' + msOnButton;
    } else {
        milliElementOnButton.innerText = msOnButton;
    }
    if (msOnButton >= 500) {
        stopTimerOnButton(intervalOnButton);
    }
}
function startTimerKeyboard() {
    msOnKeyboard++;
    if (msOnKeyboard < 9) {
        milliElementKeyboard.innerText = '0' + msOnKeyboard;
    } else {
        milliElementKeyboard.innerText = msOnKeyboard;
    }
    if (msOnKeyboard % 100 === 0) {
        keyboardStopTaps = statistics.getCountTapsOnKeys();
        statistics.incrementTapIntervals();
        statistics.takeTapsPerSecondKeyboard(keyboardStopTaps - keyboardStartTaps);
        keyboardStartTaps = keyboardStopTaps;
    }
    if (msOnKeyboard > 100) {
        stopTimerKeyboard(intervalKeyboard);
    }
}
function startTimerClickDistance() {
    msClickDistance++;
    if (msClickDistance < 9) {
        milliElementClickDistance.innerText = '0' + msClickDistance;
    } else {
        milliElementClickDistance.innerText = msClickDistance;
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
    msOnKeyboard = 0;
    milliElementKeyboard.innerText = '00';
    statistics.displayStatistics();
}

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
    statistics.takeTimeIntervalsOnButtons(msOnButton);
    msOnButton = 0;
    stopTimerOnButton(intervalOnButton);
}
function handleMouseClick(){
    timerStartStopClick = !timerStartStopClick;
    statistics.incrementClicks();
    if (timerStartStopClick) {
        msClick = 0;
        intervalClick = setInterval(startTimerClick, 10);
    } else {
        stopTimerClick(intervalClick);
        intervalTimerStopMillisClick = msClick;
        statistics.takeTimeIntervalClicks(intervalTimerStopMillisClick);
        msClick = 0;
        intervalClick = setInterval(startTimerClick, 10);
        timerStartStopClick = !timerStartStopClick;
    }
}

// keyboard taps handler
document.onkeydown = function (){
    if (timerStartStopKeyboard) {
        msOnKeyboard = 0;
        keyboardStartTaps = statistics.getCountTapsOnKeys();
        intervalKeyboard = setInterval(startTimerKeyboard, 10);
    }
    statistics.incrementKeyTaps();
    timerStartStopKeyboard = false;
}

// click coordinates handler
document.addEventListener('click', (event) => {
    if (timerStartStopClickDistance) {
        firstClickX = event.pageX;
        firstClickY = event.pageY;
        intervalClickDistance = setInterval(startTimerClickDistance, 100);
        timerStartStopClickDistance = false;
    } else {
        secondClickX = event.pageX;
        secondClickY = event.pageY;
        statistics.takeClicksCoordsTime(firstClickX, firstClickY, secondClickX, secondClickY, msClickDistance);
        statistics.displayStatistics();
        firstClickX = secondClickX;
        firstClickY = secondClickY;
        msClickDistance = 0;
        milliElementClickDistance.innerText = '00';
    }
    console.log(event.pageX + ' ' + event.pageY);
})

// link functions with events
wrapper.addEventListener('click', handleMouseClick);
wrapper.addEventListener('mouseenter', handleMouseEnter);
wrapper.addEventListener('mouseleave', handleMouseLeave);

