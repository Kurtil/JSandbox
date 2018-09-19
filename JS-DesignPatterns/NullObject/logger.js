const NullStrategy = require('./nullStrategy');

class Logger {
    // if no strategy are injected, the nullStrategy is injected by default
    // this example use the ES6 default value
    constructor(loggingStrategy = new NullStrategy()) {
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