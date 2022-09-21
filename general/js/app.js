'use strict';
const milliElement = document.querySelector('.milliseconds');
let milliSeconds = 0, interval;
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

const wrapper = document.querySelector('.wrapper');

function handleMouseEnter(event){
    console.log('214124', event.target);
}

function handleMouseClick(event){
    if(event.target.tagName !== 'BUTTON') return;
    timerStartStop = !timerStartStop;
    statistics.incrementClicks();
    if (timerStartStop) {
        milliSeconds = 0;
        interval = setInterval(startTimer, 10);
    } else {
        stopTimer(interval);
        timerStopMillis = milliSeconds;
        statistics.takeTimeInterval(timerStopMillis);
        statistics.displayStatistics();
        milliSeconds = 0;
        interval = setInterval(startTimer, 10);
        timerStartStop = !timerStartStop;
    }
}

wrapper.addEventListener('mouseenter', handleMouseEnter);
wrapper.addEventListener('click', handleMouseClick);

document.onkeydown = function (event){
    console.log(event);
}