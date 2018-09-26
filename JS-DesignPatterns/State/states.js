// State have referenceto the context to change state.

// WARNING : States share the same file because otherwise, it leads to circular dependecy
class OpenState {
    constructor(context) {
        this.context = context;
    }

    pay() {
        console.log('You already pay... but thank you');
    }

    enter() {
        console.log('Enjoy !');
        this.context.changeState(new ClosedStateClass(this.context));
    }
}

const ClosedStateClass = class ClosedState {
    constructor(context) {
        this.context = context;
    }

    pay() {
        console.log('Thanks fo the payment, you can now enter');
        this.context.changeState(new OpenState(this.context));
    }

    enter() {
        console.log('You have to pay before enter');
    }
}

module.exports = ClosedStateClass;
