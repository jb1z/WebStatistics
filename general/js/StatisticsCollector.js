// page elements
const behaviorClicksElement = document.querySelector('#behaviourClick');
const behaviorIndexValue = document.querySelector('#behaviourClickDistance');
const behaviorOnButtonElement = document.querySelector('#behaviourOnButton');
const behaviorKeyboardElement = document.querySelector('#behaviourKeyboard');
const behaviorSessionsElement = document.querySelector('#behaviorSessions');
const behaviorSessionCountElement = document.querySelector('#behaviorSessionsCount');
const behaviorHumanPointElement = document.querySelector('#behaviorHumanPoints');
const behaviorSuspiciousPointElement = document.querySelector('#behaviorSuspiciousPoints');
const behaviorBotPointElement = document.querySelector('#behaviorBotPoints');
// behavior enumeration
const Behaviour = {BOT: 'bot', HUMAN: 'human', SUSPICIOUS: 'suspicious behavior', UNDEFINED: 'undefined'};
// Class for defining behavior based on different types of stats
class behaviourDefiner {
    #botPoints = 0;
    #humanPoints = 0;
    #suspiciousPoints = 0;
    #definer = Behaviour.UNDEFINED;

    incrementBotPoints() {
        this.#botPoints++;
        this.refreshBehavior();
    }
    incrementHumanPoints() {
        this.#humanPoints++;
        this.refreshBehavior();
    }
    incrementSuspiciousPoints() {
        this.#suspiciousPoints++;
        this.refreshBehavior();
    }

    resetBehaviorDefiner() {
        this.#botPoints = 0;
        this.#humanPoints = 0;
        this.#suspiciousPoints = 0;
        this.#definer = Behaviour.UNDEFINED;
    }

    getBehaviorDefiner() {
        return this.#definer;
    }


    getBotPoints() {
        return this.#botPoints;
    }
    getHumanPoints() {
        return this.#humanPoints;
    }
    getSuspiciousPoints() {
        return this.#suspiciousPoints;
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
    #definerIndex = new behaviourDefiner();
    #definerSessions = new behaviourDefiner();
    // count sessions
    #countSessions = 0;

    #stats = document.querySelector('.stats');

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
        } else if (ratioClicks <= 1.1) {
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
        let ratioOnButton = Math.abs((this.#avgMouseOnButtonTime / 10) - this.#minMouseOnButtonTime) +
            this.#maxMouseOnButtonTime / 200;
        // behavior is based on average and minimal time on button
        if (ratioOnButton <= 0.1) {
            this.#definerOnButton.incrementBotPoints();
        } else if (ratioOnButton <= 1) {
            this.#definerOnButton.incrementSuspiciousPoints();
        } else {
            this.#definerOnButton.incrementHumanPoints();
        }
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
        if (tapsPerSecond >= 60) {
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
            // behavior is based on distance&time between two clicks
            if (indexTimeDistance <= 0.01) {
                this.#definerIndex.incrementBotPoints();
            } else if (indexTimeDistance <= 0.085) {
                this.#definerIndex.incrementSuspiciousPoints();
            } else {
                this.#definerIndex.incrementHumanPoints();
            }
        }
    }

    #qualifyDefinerType(definer) {
        if (definer === Behaviour.HUMAN) {
            this.#definerSessions.incrementHumanPoints();
            return;
        }
        if (definer === Behaviour.BOT) {
            this.#definerSessions.incrementBotPoints();
            return;
        }
        if (definer === Behaviour.SUSPICIOUS) {
            this.#definerSessions.incrementSuspiciousPoints();
        }
    }

    #refreshAllFields() {
        // button click statistics
        this.#minButtonClickTime = Number.MAX_SAFE_INTEGER; // time between two clicks
        this.#maxButtonClickTime = 0;
        this.#avgButtonClickTime = 0;
        this.#sumButtonClickTime = 0;
        this.#countClicks = 0;
        // time&distance (index) between two clicks
        this.#minIndexValue = Number.MAX_SAFE_INTEGER;
        this.#maxIndexValue = 0;
        this.#avgIndexValue = 0;
        this.#sumIndexValue = 0;
        this.#countIndexValue = 0;
        // moving on buttons statistics
        this.#minMouseOnButtonTime = Number.MAX_SAFE_INTEGER;
        this.#maxMouseOnButtonTime = 0;
        this.#avgMouseOnButtonTime = 0;
        this.#sumMouseOnButtonTime = 0;
        this.#countMouseOnButtonTime = 0;
        // keyboard statistics
        this.#minTapsPerSecond = Number.MAX_SAFE_INTEGER;
        this.#maxTapsPerSecond = 0;
        this.#avgTapsPerSecond = 0;
        this.#sumTapsPerSecond = 0;
        this.#countTapsOnKeys = 0;
        this.#countTapsIntervals = 0;
        // behavior definer
        this.#definerClicks.resetBehaviorDefiner();
        this.#definerOnButton.resetBehaviorDefiner();
        this.#definerKeyboard.resetBehaviorDefiner();
        this.#definerIndex.resetBehaviorDefiner();
    }

    refreshSession() {
        this.#qualifyDefinerType(this.#definerClicks.getBehaviorDefiner());
        this.#qualifyDefinerType(this.#definerIndex.getBehaviorDefiner());
        this.#qualifyDefinerType(this.#definerOnButton.getBehaviorDefiner());
        this.#qualifyDefinerType(this.#definerKeyboard.getBehaviorDefiner());
        this.#refreshAllFields();
        this.#countSessions++;
        behaviorSessionCountElement.innerText = 'Sessions count: ' + this.#countSessions;
        this.displayStatistics();
    }

    getCountTapsOnKeys() {
        return this.#countTapsOnKeys;
    }

    #setBehaviorTextColor(behaviorElement, definer) {
        behaviorElement.innerText = definer;
        if (definer === Behaviour.BOT) {
            behaviorElement.style.color = '#DE2700';
        }
        if (definer === Behaviour.SUSPICIOUS) {
            behaviorElement.style.color = '#FF8C00';
        }
        if (definer === Behaviour.HUMAN) {
            behaviorElement.style.color = '#42D000';
        }
        if (definer === Behaviour.UNDEFINED) {
            behaviorElement.style.color = '#9400D3'
        }
    }

    displayStatistics() {
        this.#setBehaviorTextColor(behaviorClicksElement, this.#definerClicks.getBehaviorDefiner());
        this.#setBehaviorTextColor(behaviorIndexValue, this.#definerIndex.getBehaviorDefiner());
        this.#setBehaviorTextColor(behaviorOnButtonElement, this.#definerOnButton.getBehaviorDefiner());
        this.#setBehaviorTextColor(behaviorKeyboardElement, this.#definerKeyboard.getBehaviorDefiner());
        this.#setBehaviorTextColor(behaviorSessionsElement, this.#definerSessions.getBehaviorDefiner());
        behaviorHumanPointElement.innerText = 'Human points: ' + this.#definerSessions.getHumanPoints();
        behaviorSuspiciousPointElement.innerText = 'Suspicious points: ' + this.#definerSessions.getSuspiciousPoints();
        behaviorBotPointElement.innerText = 'Bot points: ' + this.#definerSessions.getBotPoints();
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