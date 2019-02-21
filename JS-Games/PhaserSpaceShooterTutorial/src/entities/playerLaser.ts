import Entity from './entity'

export default class PlayerLaser extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprLaserPlayer", "playerLaser");
      (<Phaser.Physics.Arcade.Body>this.body).velocity.y = -200;
    }
  }