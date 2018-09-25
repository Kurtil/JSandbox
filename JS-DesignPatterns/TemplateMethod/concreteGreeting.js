const AbstractGreeting = require('./abstractGreeting');

module.exports = class ConcreteGreeting extends AbstractGreeting{
    constructor(greetingStart, greetingEnds) {
        super();
        this.greetingStart = greetingStart;
        this.greetingEnds = greetingEnds;
    }
}