import * as Phaser from 'phaser';

const START_FRAME = 'Player/player_05'; // depends on your tilesheet, check out the JSON

class Player extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'assets', START_FRAME);
  }
}

export default Player;