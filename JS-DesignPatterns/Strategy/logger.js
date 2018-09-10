class Logger {
    constructor(loggingStrategy) {
        this.loggingStrategy = loggingStrategy;
    }

    log() {
        console.log(this.loggingStrategy.log());
    }

    setStrategy(strategy) {
        this.loggingStrategy = strategy;
    }
}

module.exports = Logger;