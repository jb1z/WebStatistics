'use strict';
const milliElement = document.querySelector('.milliseconds');
let milliSeconds = 0, interval
let countClick = 0;

function startTimer(){
    milliSeconds++;
    if(milliSeconds < 9){
        milliElement.innerText = "0" + milliSeconds;
    } else {
        milliElement.innerText = milliSeconds;
    }
}

document.addEventListener('click', function(event){
    if(event.target.tagName !== 'BUTTON') return;
    clearInterval(interval)
    interval = setInterval(startTimer, 10);
    countClick++;
    console.log('amount of clicks: ' + countClick);
});