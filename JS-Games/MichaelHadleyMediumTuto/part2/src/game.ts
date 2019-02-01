import * as Phaser from 'phaser';
import MainScene from './scenes/mainScene';

const config: GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    pixelArt: true,
    backgroundColor: "#1d212d",
    scene: MainScene,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 1000 }
      }
    }
};

const game = new Phaser.Game(config);
