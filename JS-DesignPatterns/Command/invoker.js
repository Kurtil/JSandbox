// the invoker has commands, but the invoker is not the main point of this pattern.
// It can be really different in other scenarios.
// The main point here is that the invoker has command and execute them.
module.exports = class Invoker {
    constructor(addCommand, subCommand, mulCommand, divCommand) {
        this.addCommand = addCommand;
        this.subCommand = subCommand;
        this.mulCommand = mulCommand;
        this.divCommand = divCommand;

        // the invoker keep track of command calls to be able to undo them
        this.commandHistoric = [];
    }

    add() {
        this.commandHistoric.push(this.addCommand);
        this.addCommand.execute();
    }

    sub() {
        this.commandHistoric.push(this.subCommand);
        this.subCommand.execute();
    }

    mul() {
        this.commandHistoric.push(this.mulCommand);
        this.mulCommand.execute();
    }

    div() {
        this.commandHistoric.push(this.divCommand);
        this.divCommand.execute();
    }

    undo() {
        const lastCommand = this.commandHistoric.pop();
        if (lastCommand) {
            lastCommand.unexecute();
        }
    }

    undoAll() {
        let lastCommand
        while(lastCommand = this.commandHistoric.pop(), lastCommand) {
            lastCommand.unexecute();
        }
    }
}
