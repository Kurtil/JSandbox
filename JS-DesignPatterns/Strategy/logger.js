class Logger {
    constructor(loggingStrategy) {
        this.loggingStrategy = loggingStrategy;
    }

    log() {
        console.log(this.loggingStrategy.log());
    }
}

module.exports = Logger;