const EventEmitter = require('events');

const emitter = new EventEmitter();

const promisedEvent = (eventName) => new Promise(resolve => emitter.on(eventName, resolve));

promisedEvent('event').then(console.log);

emitter.emit('event', {message:'I am the value'});