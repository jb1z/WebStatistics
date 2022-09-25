'use strict';
// timers visualization
const milliElementClick = document.querySelector('#timerClick');
const milliElementOnButton = document.querySelector('#timerOnButton');
const milliElementKeyboard = document.querySelector('#timerKeyboard');
const milliElementClickDistance = document.querySelector('#timerClickDistance');
const secondElementSession = document.querySelector('#timerSession');
// html block - wrapper (with buttons)
const wrapper = document.querySelector('.wrapper');
// time counters & intervals for timers for each event
let msClick = 0, intervalClick;
let msClickDistance = 0, intervalClickDistance;
let msOnButton = 0, intervalOnButton;
let msOnKeyboard = 0, intervalKeyboard;
let secSession = 0, intervalSession;
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
let timerStartStopSession = true;
// timers intervals
let intervalTimerStopMillisClick = 0;
// keyboard's start
let keyboardStartTaps = 0;
let keyboardStopTaps = 0;

const statistics = new StatisticsCollector();

// timers starters
function startTimerClick(){
    msClick++;
    if(msClick < 10){
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
    if(msOnButton < 10){
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
    if (msOnKeyboard < 10) {
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
    if (msClickDistance < 10) {
        milliElementClickDistance.innerText = '0' + msClickDistance;
    } else {
        milliElementClickDistance.innerText = msClickDistance;
    }
}
function startTimerSession() {
    secSession++;
    if (secSession < 10) {
        secondElementSession.innerText = '0' + secSession;
    } else {
        secondElementSession.innerText = secSession;
    }
    if (secSession === 15) {
        stopTimerSession(intervalSession);
        timerStartStopSession = true;
    }
}
function resetFields() {
    timerStartStopClick = false;
    timerStartStopClickDistance = true;
    timerStartStopOnButton = true;
    timerStartStopKeyboard = true;
    timerStartStopSession = true;
    firstClickX = 0;
    firstClickY = 0;
    secondClickX = 0;
    secondClickY = 0;
    keyboardStartTaps = 0;
    keyboardStopTaps = 0;
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
function stopTimerClickDistance(interval) {
    clearInterval(interval);
    msClickDistance = 0;
    milliElementClickDistance.innerText = '00';
}
function stopTimerSession(interval) {
    clearInterval(interval);
    secSession = 0;
    secondElementSession.innerText = '00';
    statistics.refreshSession();
    resetFields();
    stopTimerClick(intervalClick);
    stopTimerClickDistance(intervalClickDistance);
    stopTimerOnButton(intervalOnButton);
    stopTimerKeyboard(intervalKeyboard);
}
// handler's functions
function handleMouseEnter(){
    if (timerStartStopSession) {
        intervalSession = setInterval(startTimerSession, 1000);
        timerStartStopSession = false;
    }
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
    if (timerStartStopSession) {
        intervalSession = setInterval(startTimerSession, 1000);
        timerStartStopSession = false;
    }
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
    if (timerStartStopSession) {
        intervalSession = setInterval(startTimerSession, 1000);
        timerStartStopSession = false;
    }
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
    if (timerStartStopSession) {
        intervalSession = setInterval(startTimerSession, 1000);
        timerStartStopSession = false;
    }
    if (timerStartStopClickDistance) {
        firstClickX = event.pageX;
        firstClickY = event.pageY;
        intervalClickDistance = setInterval(startTimerClickDistance, 10);
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

