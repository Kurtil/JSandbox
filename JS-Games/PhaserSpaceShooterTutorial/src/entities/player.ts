import Entity from './entity'
import MainScene from '../scenes/main.scene';
import PlayerLaser from './playerLaser';

export default class Player extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player");

        this.setData("speed", 200);

        this.setData("isShooting", false);
        this.setData("timerShootDelay", 10);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
    }
    moveUp() {
        (<Phaser.Physics.Arcade.Body>this.body).velocity.y = -this.getData("speed");
    }
    moveDown() {
        (<Phaser.Physics.Arcade.Body>this.body).velocity.y = this.getData("speed");
    }
    moveLeft() {
        (<Phaser.Physics.Arcade.Body>this.body).velocity.x = -this.getData("speed");
    }
    moveRight() {
        (<Phaser.Physics.Arcade.Body>this.body).velocity.x = this.getData("speed");
    }

    update() {
        (<Phaser.Physics.Arcade.Body>this.body).setVelocity(0, 0);

        this.x = Phaser.Math.Clamp(this.x, 0 + this.width / 2, <number>this.scene.game.config.width - this.width / 2);
        this.y = Phaser.Math.Clamp(this.y, 0 + this.height / 2, <number>this.scene.game.config.height - this.height / 2);

        if (this.getData("isShooting")) {
            if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
                this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
            }
            else { // when the "manual timer" is triggered:
                const laser = new PlayerLaser(this.scene, this.x, this.y);
                (<MainScene>this.scene).playerLasers.add(laser);

                (<MainScene>this.scene).sfx.laser.play(); // play the laser sound effect
                this.setData("timerShootTick", 0);
            }
        }
    }
}