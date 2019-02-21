export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainMenuScene',
        });
    }

    preload() {
        this.load.image("sprBtnPlay", "assets/sprBtnPlay.png");
        this.load.image("sprBtnPlayHover", "assets/sprBtnPlayHover.png");
        this.load.image("sprBtnPlayDown", "assets/sprBtnPlayDown.png");
        this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
        this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");

        this.load.audio("sndBtnOver", "assets/sndBtnOver.wav");
        this.load.audio("sndBtnDown", "assets/sndBtnDown.wav");
    }

    create() {

    }
}