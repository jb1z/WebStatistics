class StatsClick{
    // button statistics
    #minButtonClickTime = Number.MAX_SAFE_INTEGER; // time between two clicks
    #maxButtonClickTime = 0;
    #avgButtonClickTime = 0;
    #sumOfTimeIntervals = 0;
    #countClicks = 0;

    #updateAvgTimeClicks(timeInterval){
        this.#sumOfTimeIntervals+=timeInterval;
        this.#avgButtonClickTime = this.#sumOfTimeIntervals / (this.#countClicks - 1);
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

    displayClickStats(){
        return 'Click statistics:\n' +
            'Average time between two clicks: ' + this.#avgButtonClickTime.toFixed(2) + '\n' +
            'Max. time between two clicks: ' + this.#maxButtonClickTime + '\n' +
            'Min. time between two clicks: ' + this.#minButtonClickTime + '\n' +
            'Total amount of clicks: ' + this.#countClicks + '\n';
    }

    getCountClicks() {
        return this.#countClicks;
    }
    getMinButtonClickTime() {
        return this.#minButtonClickTime;
    }
    getMaxButtonClickTime() {
        return this.#maxButtonClickTime;
    }
    getAvgButtonClickTime() {
        return this.#avgButtonClickTime;
    }
    getSumOfTimeIntervals() {
        return this.#sumOfTimeIntervals;
    }


    setMinButtonClickTime(value) {
        this.#minButtonClickTime = value;
    }
    setMaxButtonClickTime(value) {
        this.#maxButtonClickTime = value;
    }
    setAvgButtonClickTime(value) {
        this.#avgButtonClickTime = value;
    }
    setSumOfTimeIntervals(value) {
        this.#sumOfTimeIntervals = value;
    }
    setCountClicks(value) {
        this.#countClicks = value;
    }
}