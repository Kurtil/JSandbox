import Entity from './entity'
import MainScene from '../scenes/main.scene';

export default class ChaserShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "sprEnemy1", "ChaserShip");
        (<Phaser.Physics.Arcade.Body>this.body).velocity.y = Phaser.Math.Between(50, 100);
    }

    update() {
        if (!this.getData("isDead") && (<MainScene>this.scene).player) {
            if (Phaser.Math.Distance.Between(
                this.x,
                this.y,
                (<MainScene>this.scene).player.x,
                (<MainScene>this.scene).player.y
            ) < 320) {
                this.state = this.states.CHASE;
            }
            if (this.state == this.states.CHASE) {
                var dx = (<MainScene>this.scene).player.x - this.x;
                var dy = (<MainScene>this.scene).player.y - this.y;
                var angle = Math.atan2(dy, dx);
                var speed = 100;
                (<Phaser.Physics.Arcade.Body>this.body).setVelocity(
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
            }
        }
        if (this.x < (<MainScene>this.scene).player.x) {
            this.angle -= 5;
        }
        else {
            this.angle += 5;
        }
    }
}