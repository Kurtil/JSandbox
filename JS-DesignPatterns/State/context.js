// The context delegates methods to his state

const ClosedState = require('./states');

module.exports = class Context {
    constructor() {
        this.state = new ClosedState(this);
    }

    pay() {
        this.state.pay();
    }

    enter() {
        this.state.enter();
    }

    changeState(state) {
        this.state = state;
    }
}