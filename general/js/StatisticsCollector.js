class StatisticsCollector{
    #minButtonClickTime = Number.MAX_SAFE_INTEGER; // time between two clicks
    #maxButtonClickTime = 0;
    #avgButtonClickTime = 0;
    #sumOfTimeIntervals = 0;
    #countClicks = 0;

    #updateAvgTime(timeInterval){
        this.#sumOfTimeIntervals+=timeInterval;
        this.#avgButtonClickTime = this.#sumOfTimeIntervals / this.#countClicks;
    }

    incrementClicks() {
        this.#countClicks++;
    }

    takeTimeInterval(timeInterval){
        // updating max time between two clicks
        if (timeInterval > this.#maxButtonClickTime){
            this.#maxButtonClickTime = timeInterval;
        }
        // updating min time between two clicks
        if (timeInterval < this.#minButtonClickTime){
            this.#minButtonClickTime = timeInterval;
        }
        this.#updateAvgTime(timeInterval);
    }

    displayStatistics(){
        console.log('Total amount of clicks: ' + this.#countClicks + '\n',
                    'Average time between two clicks: ' + this.#avgButtonClickTime + '\n',
                    'Max. time between two clicks: ' + this.#maxButtonClickTime + '\n',
                    'Min. time between two clicks: ' + this.#minButtonClickTime);
    }
}