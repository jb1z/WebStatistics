'use strict';
const milliElement = document.querySelector('.milliseconds');
let milliSeconds = 0, interval;
let timerStartStop = false;
let timerStartMillis = 0;
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

document.addEventListener('click', function(event){
    if(event.target.tagName !== 'BUTTON') return;
    timerStartStop = !timerStartStop;
    if (timerStartStop) {
        interval = setInterval(startTimer, 10);
        timerStartMillis = milliSeconds;
    } else {
        stopTimer(interval);
        timerStopMillis = milliSeconds;
        statistics.takeTimeInterval(timerStopMillis - timerStartMillis);
        // console.log('start ' + timerStartMillis + ' end ' + timerStopMillis);
        statistics.displayStatistics();
    }
    statistics.incrementClicks();
});