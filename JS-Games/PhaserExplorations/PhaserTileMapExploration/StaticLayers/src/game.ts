import * as Phaser from 'phaser';
import MarioScene from './scenes/marioScene';

const config: GameConfig | any = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: new MarioScene,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 } // Top down game, so no gravity
        }
    }
};

const game = new Phaser.Game(config);
