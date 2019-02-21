import Entity from './entity'

export default class EnemyLaser extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprLaserEnemy0", "enemyLaser");
      (<Phaser.Physics.Arcade.Body>this.body).velocity.y = 200;
    }
  }