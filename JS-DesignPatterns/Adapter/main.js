// The adaptater pattern allow to use behaviour of something of different interface,
// as if it was of the good interface... No intent to change or add behaviour.
// We just try to get the original behaviour even if it is from different interface.

// In this example, client take 'standard' object and call play methode on them.
// Adapter make possible for the client to use 'unstandard' object and 'play' them too !

const Client = require('./client');
const Standard = require('./standard');
const Unstandard = require('./unstandard');
const Adapter = require('./adapter');

const standard = new Standard('You ou ou ha ha !! !');
const client = new Client(standard);

// Client can play standard because it correspond of the expected interface.
client.play();

const unstandard = new Unstandard('Go Go Go JUMP !!! =D');
client.setStandard(new Adapter(unstandard));

// Client can now play unstandard because it is adapted as a standard! :D
client.play();
