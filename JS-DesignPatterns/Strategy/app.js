Logger = require('./logger')
Strategy1 = require('./strategy1')
Strategy2 = require('./strategy2')

const strategy1 = new Strategy1()
const strategy2 = new Strategy2()
const logger1 = new Logger(strategy1)
const logger2 = new Logger(strategy2)

console.log('Call to the first logger')
logger1.log()

console.log('Call to the second logger')
logger2.log()