// In command pattern, we encapsulate the command.
// Not the invoker, not the receiver, but the command itself.
// In that way, command can be shared by many invoker
// and can be unexecuted (undo).

const { AddCommand, SubCommand, MulCommand, DivCommand } = require('./commands');
const Invoker = require('./invoker');

const receiver = {value : 1};

// Instead of directly apply modifications, modifications are wrapped into command object.
const add2   = new AddCommand(receiver, 2);
const minus1 = new SubCommand(receiver, 1);
const mul4   = new MulCommand(receiver, 4);
const div2   = new DivCommand(receiver, 2);

// The invoker is subject dependent... it is just an example here, not the design pattern itself.
const invoker = new Invoker(add2, minus1, mul4, div2);

console.log('--- before commands ---');
console.log(receiver);

invoker.add();
invoker.add();
invoker.add();

console.log('--- after 3 add2 commands ---');
console.log(receiver);

invoker.undo();

console.log('--- undo once ---');
console.log(receiver);

invoker.mul();
invoker.div();
invoker.sub();
invoker.sub();
invoker.mul();

console.log('--- after many commands ---');
console.log(receiver);

invoker.undoAll();

console.log('--- after undo every commands ---');
console.log(receiver);
