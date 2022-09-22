class StatisticsCollector{
    // button statistics
    #minButtonClickTime = Number.MAX_SAFE_INTEGER; // time between two clicks
    #maxButtonClickTime = 0;
    #avgButtonClickTime = 0;
    #sumOfTimeIntervals = 0;
    #countClicks = 0;
    // moving on buttons statistics
    #minMouseOnButtonTime = Number.MAX_SAFE_INTEGER;
    #maxMouseOnButtonTime = 0;
    #avgMouseOnButtonTime = 0;
    #sumOfMouseOnButtonTime = 0;
    #countTimesOnButton = 0;
    // keyboard statistics
    #minTapsPerSecond = Number.MAX_SAFE_INTEGER;
    #maxTapsPerSecond = 0;
    #avgTapsPerSecond = 0;
    #sumTapsPerSecond = 0;
    #countTapsOnKeys = 0;
    #countTapIntervals = 0;

    #updateAvgTimeClicks(timeInterval){
        this.#sumOfTimeIntervals+=timeInterval;
        this.#avgButtonClickTime = this.#sumOfTimeIntervals / (this.#countClicks - 1);
    }
    #updateAvgTimeOnButtons(timeInterval){
        this.#sumOfMouseOnButtonTime+=timeInterval;
        this.#avgMouseOnButtonTime = this.#sumOfMouseOnButtonTime / this.#countTimesOnButton;
    }
    #updateAvgTapsPerSecond(tapsPerSecond){
        this.#sumTapsPerSecond+=tapsPerSecond;
        this.#avgTapsPerSecond = this.#sumTapsPerSecond / this.#countTapIntervals;
    }

    incrementClicks() {
        this.#countClicks++;
    }
    incrementCountOnButtons(){
        this.#countTimesOnButton++;
    }
    incrementKeyTaps(){
        this.#countTapsOnKeys++;
    }
    incrementTapIntervals(){
        this.#countTapIntervals++;
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
    }
    takeTimeIntervalsOnButtons(timeInterval){
        if (timeInterval > this.#maxMouseOnButtonTime){
            this.#maxMouseOnButtonTime = timeInterval;
        }
        if (timeInterval < this.#minMouseOnButtonTime){
            this.#minMouseOnButtonTime = timeInterval;
        }
        this.#updateAvgTimeOnButtons(timeInterval);
    }
    takeTapsPerSecondKeyboard(tapsPerSecond) {
        if(tapsPerSecond > this.#maxTapsPerSecond){
            this.#maxTapsPerSecond = tapsPerSecond;
        }
        if(tapsPerSecond < this.#minTapsPerSecond){
            this.#minTapsPerSecond = tapsPerSecond;
        }
        this.#updateAvgTapsPerSecond(tapsPerSecond);
    }

    getCountTapsOnKeys() {
        return this.#countTapsOnKeys;
    }

    displayStatistics(){
        return 'Click statistics:\n' +
            'Average time between two clicks: ' + this.#avgButtonClickTime.toFixed(2) + '\n' +
            'Max. time between two clicks: ' + this.#maxButtonClickTime + '\n' +
            'Min. time between two clicks: ' + this.#minButtonClickTime + '\n' +
            'Total amount of clicks: ' + this.#countClicks + '\n' +
            '\nOn-button statistics:\n' +
            'Average time on buttons: ' + this.#avgMouseOnButtonTime.toFixed(2) + '\n' +
            'Max. time on buttons: ' + this.#maxMouseOnButtonTime + '\n' +
            'Min. time on buttons: ' + this.#minMouseOnButtonTime + '\n' +
            'Total amount of being on buttons: ' + this.#countTimesOnButton + '\n' +
            '\nKeyboard statistics:\n' +
            'Average taps per second: ' + this.#avgTapsPerSecond.toFixed(2) + '\n' +
            'Max. taps per second: ' + this.#maxTapsPerSecond + '\n' +
            'Min. taps per second: ' + this.#minTapsPerSecond + '\n' +
            'Taps on keys: ' + this.#countTapsOnKeys;
    }
}