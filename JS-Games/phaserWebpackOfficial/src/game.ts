import * as Phaser from 'phaser';
import MainScene from './scenes/mainScene';

const config: GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: new MainScene,
};

const game = new Phaser.Game(config);
