// strategy pattern is a way of using composition over inheritance
// has a instead of is a. In this example, we inject the strategy at creation time.
// This is dependency injection

Logger = require('./logger');
Strategy1 = require('./strategy1');
Strategy2 = require('./strategy2');

const strategy1 = new Strategy1();
const strategy2 = new Strategy2();
const logger1 = new Logger(strategy1);
const logger2 = new Logger(strategy2);

console.log('Call to the first logger');
logger1.log();

console.log('Call to the second logger');
logger2.log();

// It is dynamic, not like inheritance :
logger1.setStrategy(strategy2);
console.log('Call to the first logger with second strategy');
logger1.log();