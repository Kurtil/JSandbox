import MainScene from "../scenes/main.scene";

export default class Entity extends Phaser.GameObjects.Sprite {

    states: {MOVE_DOWN: string, CHASE: string};
    shootTimer: Phaser.Time.TimerEvent;

    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);

        // this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);

        this.states = {
            MOVE_DOWN: "MOVE_DOWN",
            CHASE: "CHASE"
        };
        this.state = this.states.MOVE_DOWN;
    }

    onDestroy() {
        if (this.shootTimer) {
            this.shootTimer.remove(false);
        }
    }

    explode(canDestroy) {
        if (!this.getData("isDead")) {
            // Set the texture to the explosion image, then play the animation
            this.setTexture("sprExplosion");  // this refers to the same animation key we used when we added this.anims.create previously
            this.play("sprExplosion"); // play the animation
            // pick a random explosion sound within the array we defined in this.sfx in SceneMain
            (<MainScene>this.scene).sfx.explosions[Phaser.Math.Between(0, (<MainScene>this.scene).sfx.explosions.length - 1)].play();
            if (this.shootTimer !== undefined) {
              if (this.shootTimer) {
                this.shootTimer.remove(false);
              }
            }
            this.setAngle(0);
            (<Phaser.Physics.Arcade.Body>this.body).setVelocity(0, 0);
            this.on('animationcomplete', function() {
              if (canDestroy) {
                this.destroy();
              }
              else {
                this.setVisible(false);
              }
            }, this);
            this.setData("isDead", true);
          }
    }
}