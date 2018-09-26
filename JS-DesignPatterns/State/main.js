const Context = require('./context');

const context = new Context();

// The methods calls will be different in function of the state of the context
// as if the context is changing class between calls... :D
context.enter();
context.enter();
context.pay();
context.enter();
context.enter();
context.pay();
context.pay();
