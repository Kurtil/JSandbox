// This is concrete commands. Here, we know the type of the receiver.
const AddCommand = class AddCommand {
    constructor(receiver, amount) {
        this.receiver = receiver;
        this.amount = amount;
    }

    execute() {
        this.receiver.value += this.amount;
    }

    unexecute() {
        this.receiver.value -= this.amount;
    }
}

const SubCommand = class SubCommand {
    constructor(receiver, amount) {
        this.receiver = receiver;
        this.amount = amount;
    }

    execute() {
        this.receiver.value -= this.amount;
    }

    unexecute() {
        this.receiver.value += this.amount;
    }
}

const MulCommand = class MulCommand {
    constructor(receiver, amount) {
        this.receiver = receiver;
        this.amount = amount;
    }

    execute() {
        this.receiver.value *= this.amount;
    }

    unexecute() {
        this.receiver.value /= this.amount;
    }
}

const DivCommand = class DivCommand {
    constructor(receiver, amount) {
        this.receiver = receiver;
        this.amount = amount;
    }

    execute() {
        this.receiver.value /= this.amount;
    }

    unexecute() {
        this.receiver.value *= this.amount;
    }
}

module.exports = { AddCommand, SubCommand, MulCommand, DivCommand };
