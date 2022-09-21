'use strict';
const switcher = document.querySelector('.btn');
// document.querySelectorAll('.btn');

document.addEventListener('click', function(event){
    if(event.target.tagName !== 'BUTTON') return;
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if(className === "light-theme"){
        event.target.textContent = "Dark";
    } else {
        event.target.textContent = "Light"
    }

    console.log('current class name: ' + className);
});