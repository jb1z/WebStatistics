'use strict';
const milliElement = document.querySelector('.milliseconds');
const milliElementOnButton = document.querySelector('.milliseconds1');
let milliSeconds = 0, interval;
let milliSecondsOnButton = 0, intervalOnButton;
let timerStartStop = false;
let timerStopMillis = 0;

const statistics = new StatisticsCollector();

function startTimer(){
    milliSeconds++;
    if(milliSeconds < 9){
        milliElement.innerText = "0" + milliSeconds;
    } else {
        milliElement.innerText = milliSeconds;
    }
}

function stopTimer(interval){
    clearInterval(interval);
}

function startTimerOnButton(){
    milliSecondsOnButton++;
    if(milliSecondsOnButton < 9){
        milliElementOnButton.innerText = "0" + milliSecondsOnButton;
    } else {
        milliElementOnButton.innerText = milliSecondsOnButton;
    }
}

function stopTimerOnButton(interval){
    clearInterval(interval);
    milliSecondsOnButton = 0;
    milliElementOnButton.innerText = "00";
}

const wrapper = document.querySelector('.wrapper');

function handleMouseEnter(event){
    intervalOnButton = setInterval(startTimerOnButton, 10);
}
function handleMouseLeave(event){
    statistics.incrementCountOnButtons();
    statistics.takeTimeIntervalsOnButtons(milliSecondsOnButton);
    stopTimerOnButton(intervalOnButton);
}

function handleMouseClick(event){
    // if(event.target.tagName !== 'BUTTON') return;
    timerStartStop = !timerStartStop;
    statistics.incrementClicks();
    if (timerStartStop) {
        milliSeconds = 0;
        interval = setInterval(startTimer, 10);
    } else {
        stopTimer(interval);
        timerStopMillis = milliSeconds;
        statistics.takeTimeIntervalClicks(timerStopMillis);
        // statistics.displayStatistics();
        milliSeconds = 0;
        interval = setInterval(startTimer, 10);
        timerStartStop = !timerStartStop;
    }
}

document.onkeydown = function (event){
    statistics.incrementKeyTaps();
    console.log(event);
}

wrapper.addEventListener('mouseenter', handleMouseEnter);
wrapper.addEventListener('mouseleave', handleMouseLeave);
wrapper.addEventListener('click', handleMouseClick);

const statsButton = document.querySelector('#statsButton');
const stats = document.querySelector('#stats');
statsButton.addEventListener('click', function(){
    stats.innerText = statistics.displayStatistics();
});