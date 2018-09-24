module.exports = class Client {
    constructor(standard) {
        this.standard = standard;
    }

    setStandard(standard) {
        this.standard = standard;
    }

    play() {
        this.standard.play();
    }
}