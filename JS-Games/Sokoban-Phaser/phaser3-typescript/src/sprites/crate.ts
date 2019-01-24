import * as Phaser from 'phaser';

const START_FRAME = 'Crates/crate_12';

class Crate extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'assets', START_FRAME);
  }
}

export default Crate;