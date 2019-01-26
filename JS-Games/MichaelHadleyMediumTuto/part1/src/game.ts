import * as Phaser from 'phaser';
import Scene1 from './scenes/scene1';
import Scene2 from './scenes/scene2';
import Scene3 from './scenes/scene3';

const config: GameConfig = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: 800,
    height: 600,
    scene: new Scene3,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 } // Top down game, so no gravity
        }
    }
};

const game = new Phaser.Game(config);
