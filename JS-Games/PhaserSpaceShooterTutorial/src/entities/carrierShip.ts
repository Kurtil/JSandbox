import Entity from './entity'

export default class CarrierShip extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprEnemy2", "CarrierShip");
      (<Phaser.Physics.Arcade.Body>this.body).velocity.y = Phaser.Math.Between(50, 100);
      this.play("sprEnemy2");
    }
  }