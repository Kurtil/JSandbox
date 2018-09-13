class Singleton {
    constructor() {
    }

    getInstance() {
        if (!this.instance) {
            this.instance = new Instance();
        }
        return this.instance;
    }
}

class Instance {
    constructor() {
        this.id = Math.random();
    }
}

module.exports = new Singleton();