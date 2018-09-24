// Adapter is of the same interface of the one used by the client, and have
// an instance of another object. It make this other object compatible with the
// interface looked for by the client.
module.exports = class Adapter {
    constructor(unstandard) {
        this.unstandard = unstandard;
    }

    play() {
        this.unstandard.start();
    }
}