class StatsKeyboard {
    // keyboard statistics
    #minTapsPerSecond = Number.MAX_SAFE_INTEGER;
    #maxTapsPerSecond = 0;
    #avgTapsPerSecond = 0;
    #sumTapsPerSecond = 0;
    #countTapsOnKeys = 0;
    #countTapIntervals = 0;

    #updateAvgTapsPerSecond(tapsPerSecond) {
        this.#sumTapsPerSecond += tapsPerSecond;
        this.#avgTapsPerSecond = this.#sumTapsPerSecond / this.#countTapIntervals;
    }

    incrementKeyTaps() {
        this.#countTapsOnKeys++;
    }

    incrementTapIntervals() {
        this.#countTapIntervals++;
    }

    takeTapsPerSecondKeyboard(tapsPerSecond) {
        if (tapsPerSecond > this.#maxTapsPerSecond) {
            this.#maxTapsPerSecond = tapsPerSecond;
        }
        if (tapsPerSecond < this.#minTapsPerSecond) {
            this.#minTapsPerSecond = tapsPerSecond;
        }
        this.#updateAvgTapsPerSecond(tapsPerSecond);
    }


    getMinTapsPerSecond() {
        return this.#minTapsPerSecond;
    }
    getMaxTapsPerSecond() {
        return this.#maxTapsPerSecond;
    }
    getAvgTapsPerSecond() {
        return this.#avgTapsPerSecond;
    }
    getSumTapsPerSecond() {
        return this.#sumTapsPerSecond;
    }
    getCountTapsOnKeys() {
        return this.#countTapsOnKeys;
    }
    getCountTapIntervals() {
        return this.#countTapIntervals;
    }

    displayKeyboardStats(){
        return 'Keyboard statistics:\n' +
            'Average taps per second: ' + this.#avgTapsPerSecond.toFixed(2) + '\n' +
            'Max. taps per second: ' + this.#maxTapsPerSecond + '\n' +
            'Min. taps per second: ' + this.#minTapsPerSecond + '\n' +
            'Taps on keys: ' + this.#countTapsOnKeys;
    }

    setMinTapsPerSecond(value) {
        this.#minTapsPerSecond = value;
    }
    setMaxTapsPerSecond(value) {
        this.#maxTapsPerSecond = value;
    }
    setAvgTapsPerSecond(value) {
        this.#avgTapsPerSecond = value;
    }
    setSumTapsPerSecond(value) {
        this.#sumTapsPerSecond = value;
    }
    setCountTapsOnKeys(value) {
        this.#countTapsOnKeys = value;
    }
    setCountTapIntervals(value) {
        this.#countTapIntervals = value;
    }
}
