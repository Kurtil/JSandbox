import * as Phaser from 'phaser';
import MainScene from './scenes/main.scene';
import MainMenuScene from './scenes/mainMenu.scene';
import GameOverScene from './scenes/gameOver.scene';

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    MainScene,
    MainMenuScene,
    GameOverScene,
  ],
  pixelArt: true,
  roundPixels: true,
};

const game = new Phaser.Game(config);
