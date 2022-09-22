class StatsOnButton{
    // moving on buttons statistics
    #minMouseOnButtonTime = Number.MAX_SAFE_INTEGER;
    #maxMouseOnButtonTime = 0;
    #avgMouseOnButtonTime = 0;
    #sumOfMouseOnButtonTime = 0;
    #countTimesOnButton = 0;

    #updateAvgTimeOnButtons(timeInterval){
        this.#sumOfMouseOnButtonTime+=timeInterval;
        this.#avgMouseOnButtonTime = this.#sumOfMouseOnButtonTime / this.#countTimesOnButton;
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

    displayOnButtonStats(){
        return 'On-button statistics:\n' +
        'Average time on buttons: ' + this.#avgMouseOnButtonTime.toFixed(2) + '\n' +
        'Max. time on buttons: ' + this.#maxMouseOnButtonTime + '\n' +
        'Min. time on buttons: ' + this.#minMouseOnButtonTime + '\n' +
        'Total amount of being on buttons: ' + this.#countTimesOnButton + '\n';
    }

    getMinMouseOnButtonTime() {
        return this.#minMouseOnButtonTime;
    }
    getMaxMouseOnButtonTime() {
        return this.#maxMouseOnButtonTime;
    }
    getAvgMouseOnButtonTime() {
        return this.#avgMouseOnButtonTime;
    }
    getSumOfMouseOnButtonTime() {
        return this.#sumOfMouseOnButtonTime;
    }
    getCountTimesOnButton() {
        return this.#countTimesOnButton;
    }

    setMinMouseOnButtonTime(value) {
        this.#minMouseOnButtonTime = value;
    }
    setMaxMouseOnButtonTime(value) {
        this.#maxMouseOnButtonTime = value;
    }
    setAvgMouseOnButtonTime(value) {
        this.#avgMouseOnButtonTime = value;
    }
    setSumOfMouseOnButtonTime(value) {
        this.#sumOfMouseOnButtonTime = value;
    }
    setCountTimesOnButton(value) {
        this.#countTimesOnButton = value;
    }
}