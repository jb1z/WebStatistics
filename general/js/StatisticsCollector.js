// page elements
const behaviorClicksElement = document.querySelector('#behaviourClick');
const behaviorOnButtonElement = document.querySelector('#behaviourOnButton');
const behaviorKeyboardElement = document.querySelector('#behaviourKeyboard');
// behavior enumeration
const Behaviour = {BOT: 'bot', HUMAN: 'human', SUSPICIOUS: 'suspicious behavior'};
// Class for defining behavior based on different types of stats
class behaviourDefiner {
    #botPoints = 0;
    #humanPoints = 0;
    #suspiciousPoints = 0;
    #definer = Behaviour.SUSPICIOUS;

    incrementBotPoints() {
        this.#botPoints++;
        console.log('Bot points ' + this.#botPoints);
        this.refreshBehavior();
    }
    incrementHumanPoints() {
        this.#humanPoints++;
        console.log('Human points ' + this.#humanPoints);
        this.refreshBehavior();
    }
    incrementSuspiciousPoints() {
        this.#suspiciousPoints++;
        console.log('Suspicious points ' + this.#suspiciousPoints);
        this.refreshBehavior();
    }

    getDefiner() {
        return this.#definer;
    }

    refreshBehavior() {
        if (this.#botPoints > this.#humanPoints) {
            this.#definer = this.#botPoints > this.#suspiciousPoints ? Behaviour.BOT : Behaviour.SUSPICIOUS;
        } else {
            this.#definer = this.#humanPoints > this.#suspiciousPoints ? Behaviour.HUMAN : Behaviour.SUSPICIOUS;
        }
    }
}

// Stats collector class
class StatisticsCollector{
    // button click statistics
    #minButtonClickTime = Number.MAX_SAFE_INTEGER; // time between two clicks
    #maxButtonClickTime = 0;
    #avgButtonClickTime = 0;
    #sumButtonClickTime = 0;
    #countClicks = 0;
    // time&distance (index) between two clicks
    #minIndexValue = Number.MAX_SAFE_INTEGER;
    #maxIndexValue = 0;
    #avgIndexValue = 0;
    #sumIndexValue = 0;
    #countIndexValue = 0;
    // moving on buttons statistics
    #minMouseOnButtonTime = Number.MAX_SAFE_INTEGER;
    #maxMouseOnButtonTime = 0;
    #avgMouseOnButtonTime = 0;
    #sumMouseOnButtonTime = 0;
    #countMouseOnButtonTime = 0;
    // keyboard statistics
    #minTapsPerSecond = Number.MAX_SAFE_INTEGER;
    #maxTapsPerSecond = 0;
    #avgTapsPerSecond = 0;
    #sumTapsPerSecond = 0;
    #countTapsOnKeys = 0;
    #countTapsIntervals = 0;
    // behavior definer
    #definerClicks = new behaviourDefiner();
    #definerOnButton = new behaviourDefiner();
    #definerKeyboard = new behaviourDefiner();

    #stats = document.querySelector('#stats');

    #updateAvgTimeClicks(timeInterval){
        this.#sumButtonClickTime+=timeInterval;
        this.#avgButtonClickTime = this.#sumButtonClickTime / (this.#countClicks - 1);
    }
    #updateAvgTimeOnButtons(timeInterval){
        this.#sumMouseOnButtonTime+=timeInterval;
        this.#avgMouseOnButtonTime = this.#sumMouseOnButtonTime / this.#countMouseOnButtonTime;
    }
    #updateAvgTapsPerSecond(tapsPerSecond){
        this.#sumTapsPerSecond+=tapsPerSecond;
        this.#avgTapsPerSecond = this.#sumTapsPerSecond / this.#countTapsIntervals;
    }
    #updateAvgIndexValue(index) {
        this.#sumIndexValue+=index;
        this.#avgIndexValue = this.#sumIndexValue / this.#countIndexValue;
    }

    incrementClicks() {
        this.#countClicks++;
    }
    incrementCountOnButtons(){
        this.#countMouseOnButtonTime++;
    }
    incrementKeyTaps(){
        this.#countTapsOnKeys++;
        statistics.displayStatistics();
    }
    incrementTapIntervals(){
        this.#countTapsIntervals++;
    }

    takeTimeIntervalClicks(timeInterval){
        // updating max time between two clicks
        if (timeInterval > this.#maxButtonClickTime){
            this.#maxButtonClickTime = timeInterval;
        }
        // updating min time between two clicks
        if (timeInterval < this.#minButtonClickTime){
            this.#minButtonClickTime = timeInterval;
        }
        this.#updateAvgTimeClicks(timeInterval);
        // behavior based on all click stats
        let ratioClicks = (this.#avgButtonClickTime + this.#maxButtonClickTime / 100 + this.#minButtonClickTime) /
                    this.#countClicks;
        if (ratioClicks <= 0.15) {
            this.#definerClicks.incrementBotPoints();
        } else if (ratioClicks <= 0.8) {
            this.#definerClicks.incrementSuspiciousPoints();
        } else {
            this.#definerClicks.incrementHumanPoints();
        }
        statistics.displayStatistics();
    }
    takeTimeIntervalsOnButtons(timeInterval){
        if (timeInterval > this.#maxMouseOnButtonTime){
            this.#maxMouseOnButtonTime = timeInterval;
        }
        if (timeInterval < this.#minMouseOnButtonTime){
            this.#minMouseOnButtonTime = timeInterval;
        }
        this.#updateAvgTimeOnButtons(timeInterval);
        // behavior is based on average and minimal time on button
        if (Math.abs((this.#avgMouseOnButtonTime / 10) - this.#minMouseOnButtonTime) <= 0.5) {
            this.#definerOnButton.incrementBotPoints();
        } else if (Math.abs((this.#avgMouseOnButtonTime / 10) - this.#minMouseOnButtonTime) <= 2.5) {
            this.#definerOnButton.incrementSuspiciousPoints();
        } else {
            this.#definerOnButton.incrementHumanPoints();
        }
        console.log(Math.abs((this.#avgMouseOnButtonTime / 10) - this.#minMouseOnButtonTime));
        statistics.displayStatistics();
    }
    takeTapsPerSecondKeyboard(tapsPerSecond) {
        if(tapsPerSecond > this.#maxTapsPerSecond){
            this.#maxTapsPerSecond = tapsPerSecond;
        }
        if(tapsPerSecond < this.#minTapsPerSecond){
            this.#minTapsPerSecond = tapsPerSecond;
        }
        this.#updateAvgTapsPerSecond(tapsPerSecond);
        // behavior is based on taps per second
        if (tapsPerSecond >= 40) {
            this.#definerKeyboard.incrementBotPoints();
        } else if (tapsPerSecond >= 20) {
            this.#definerKeyboard.incrementSuspiciousPoints();
        } else {
            this.#definerKeyboard.incrementHumanPoints();
        }
    }
    takeClicksCoordsTime(x_1, y_1, x_2, y_2, timeInterval) {
        let distance;
        let indexTimeDistance;
        distance = Math.sqrt(Math.pow(Math.abs(x_1 - x_2),2) + Math.pow(Math.abs(y_1 - y_2),2));
        console.log(timeInterval + ' ' + distance);
        if (distance === 0) {
            distance = 1;
        }
        indexTimeDistance = timeInterval / distance;
        if (indexTimeDistance < 10) {
            this.#countIndexValue++;
            if (indexTimeDistance > this.#maxIndexValue) {
                this.#maxIndexValue = indexTimeDistance;
            }
            if (indexTimeDistance < this.#minIndexValue) {
                this.#minIndexValue = indexTimeDistance;
            }
            this.#updateAvgIndexValue(indexTimeDistance);
            // behavior is based on
        }
    }

    stopCurrentSession() {

    }

    getCountTapsOnKeys() {
        return this.#countTapsOnKeys;
    }

    #setBehaviorTextColor(behaviorElement, definer) {
        behaviorElement.innerText = definer;
        if (definer === Behaviour.BOT) {
            behaviorElement.style.color = '#DE2700';
        }
        if (definer === Behaviour.SUSPICIOUS){
            behaviorElement.style.color = '#FFC103';
        }
        if (definer === Behaviour.HUMAN){
            behaviorElement.style.color = '#42D000';
        }
    }

    displayStatistics(){
        this.#setBehaviorTextColor(behaviorClicksElement, this.#definerClicks.getDefiner());
        this.#setBehaviorTextColor(behaviorOnButtonElement, this.#definerOnButton.getDefiner());
        this.#setBehaviorTextColor(behaviorKeyboardElement, this.#definerKeyboard.getDefiner());
        this.#stats.innerText = 'Click button statistics:\n' +
            'Average time between two clicks: ' + this.#avgButtonClickTime.toFixed(2) + '\n' +
            'Max. time between two clicks: ' + this.#maxButtonClickTime + '\n' +
            'Min. time between two clicks: ' + this.#minButtonClickTime + '\n' +
            'Total amount of clicks: ' + this.#countClicks + '\n' +
            '\nClick index (time/distance) statistics:\n' +
            'Average index value: ' + this.#avgIndexValue.toFixed(5) + '\n' +
            'Max. index value: ' + this.#maxIndexValue.toFixed(5) + '\n' +
            'Min. index value: ' + this.#minIndexValue.toFixed(5) + '\n' +
            '\nOn-button statistics:\n' +
            'Average time on buttons: ' + this.#avgMouseOnButtonTime.toFixed(2) + '\n' +
            'Max. time on buttons: ' + this.#maxMouseOnButtonTime + '\n' +
            'Min. time on buttons: ' + this.#minMouseOnButtonTime + '\n' +
            'Total amount of being on buttons: ' + this.#countMouseOnButtonTime + '\n' +
            '\nKeyboard statistics:\n' +
            'Average taps per second: ' + this.#avgTapsPerSecond.toFixed(2) + '\n' +
            'Max. taps per second: ' + this.#maxTapsPerSecond + '\n' +
            'Min. taps per second: ' + this.#minTapsPerSecond + '\n' +
            'Taps on keys: ' + this.#countTapsOnKeys;
    }
}