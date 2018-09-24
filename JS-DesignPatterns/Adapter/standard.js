module.exports = class Standard {
    constructor(music) {
        this.music = music;
    }

    play() {
        console.log(this.music);
    }
}
