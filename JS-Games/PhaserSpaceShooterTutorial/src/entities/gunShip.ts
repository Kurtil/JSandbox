import Entity from './entity';
import EnemyLaser from "./enemyLaser";

export default class GunShip extends Entity {

    constructor(scene, x, y) {
        super(scene, x, y, "sprEnemy0", "GunShip");
        (<Phaser.Physics.Arcade.Body>this.body).velocity.y = Phaser.Math.Between(50, 100);
        this.play("sprEnemy0");

        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function () {
                var laser = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y
                );
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
    }
}