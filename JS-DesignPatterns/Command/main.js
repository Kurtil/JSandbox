class Invoker {
    constructor(commandArray) {
        this.commandArray = commandArray
    }

    setCommand(commands) {
        this.commandArray = this.commandArray.concat(commands)
    }

    action() {
        this.commandArray.forEach(command => {
            command.execute()
        });
    }
}

class ActCommand {
    constructor(reveiver) {
        this.reveiver = reveiver
    }

    execute() {
        this.reveiver.act()
    }
}

class Actor {
    constructor(number) {
        this.number = number
    }

    act() {
        console.log(this.number++)
    }
}

// Program start here

const invoker = new Invoker([])

const actor1 = new Actor(2)
const actor2 = new Actor(7)
const actor3 = new Actor(8)

const actCommand1 = new ActCommand(actor1)
const actCommand2 = new ActCommand(actor2)
const actCommand3 = new ActCommand(actor3)

invoker.setCommand([actCommand1, actCommand2, actCommand3])

invoker.action()
invoker.action()