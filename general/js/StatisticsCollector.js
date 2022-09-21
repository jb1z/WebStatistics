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
    #countTapsOnKeys = 0;

    #updateAvgTimeClicks(timeInterval){
        this.#sumOfTimeIntervals+=timeInterval;
        this.#avgButtonClickTime = this.#sumOfTimeIntervals / (this.#countClicks - 1);
    }

    #updateAvgTimeOnButtons(timeInterval){
        this.#sumOfMouseOnButtonTime+=timeInterval;
        this.#avgMouseOnButtonTime = this.#sumOfMouseOnButtonTime / this.#countTimesOnButton;
    }

    incrementClicks() {
        this.#countClicks++;
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

    incrementKeyTaps(){
        this.#countTapsOnKeys++;
    }

    incrementCountOnButtons(){
        this.#countTimesOnButton++;
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

    displayStatistics(){
        /* console.log('Total amount of clicks: ' + this.#countClicks + '\n',
                    'Average time between two clicks: ' + this.#avgButtonClickTime + '\n',
                    'Max. time between two clicks: ' + this.#maxButtonClickTime + '\n',
                    'Min. time between two clicks: ' + this.#minButtonClickTime);
        console.log('Total amount of being on buttons: ' + this.#countClicks + '\n',
            'Average time on buttons: ' + this.#avgButtonClickTime + '\n',
            'Max. time on buttons: ' + this.#maxButtonClickTime + '\n',
            'Min. time on buttons: ' + this.#minButtonClickTime);
        console.log('Taps on keys: ' + this.#countTapsOnKeys);*/
        return 'Total amount of clicks: ' + this.#countClicks + '\n' +
        'Average time between two clicks: ' + this.#avgButtonClickTime + '\n' +
        'Max. time between two clicks: ' + this.#maxButtonClickTime + '\n' +
        'Min. time between two clicks: ' + this.#minButtonClickTime + '\n' +
        'Total amount of being on buttons: ' + this.#countTimesOnButton + '\n' +
        'Average time on buttons: ' + this.#avgMouseOnButtonTime + '\n' +
        'Max. time on buttons: ' + this.#maxMouseOnButtonTime + '\n' +
        'Min. time on buttons: ' + this.#minMouseOnButtonTime + '\n' +
        'Taps on keys: ' + this.#countTapsOnKeys;
    }
}