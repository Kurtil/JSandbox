import * as Phaser from "phaser";

/**
 * A class that wraps up our 2D platforming player logic. It creates, animates and moves a sprite in
 * response to WASD/arrow keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player {

    static parseCommandes(commandes: string[]): { up: boolean, right: boolean, left: boolean } {
        const up = commandes.find(e => e === 'up') !== undefined;
        const right = commandes.find(e => e === 'right') !== undefined;
        const left = commandes.find(e => e === 'left') !== undefined;
        return { up, right, left };
    }

    private scene: Phaser.Scene = null;
    private sprite: Phaser.Physics.Arcade.Sprite = null;
    private keys = null;
    private doubleJump = true;
    private lastJumpTime: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene;

        this.createAnims(this.scene.anims);

        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.physics.add
            .sprite(x, y, "player", 0)
            .setDrag(1000, 0)
            .setMaxVelocity(300, 400)
            .setSize(18, 24)
            .setOffset(7, 9);

        // Track the arrow keys & WASD
        const { LEFT, RIGHT, UP, W, A, D, SPACE, R, T } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            w: W,
            a: A,
            d: D,
            space: SPACE,
            r: R,
            t: T
        });
    }

    freeze() {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        body.moves = false;
    }

    update(time, delta) {
        const onGround = this.sprite.body.blocked.down;
        const acceleration = onGround ? 600 : 200;

        // Apply horizontal acceleration when left/a or right/d are applied
        if (this.keys.left.isDown || this.keys.a.isDown) {
            this.sprite.setAccelerationX(-acceleration);
            // No need to have a separate set of graphics for running to the left & to the right. Instead
            // we can just mirror the this.sprite.
            this.sprite.setFlipX(true);
        } else if (this.keys.right.isDown || this.keys.d.isDown) {
            this.sprite.setAccelerationX(acceleration);
            this.sprite.setFlipX(false);
        } else {
            this.sprite.setAccelerationX(0);
        }

        // Only allow the player to jump if they are on the ground
        if ((onGround || this.doubleJumpAvailable(time)) && (this.keys.up.isDown || this.keys.w.isDown)) {
            this.sprite.setVelocityY(-500);
            this.lastJumpTime = time;
            if (!onGround) {
                this.doubleJump = false;
            }
        }

        // Update the animation/texture based on the state of the player
        if (onGround) {
            this.doubleJump = true;
            if (this.sprite.body.velocity.x !== 0) {
                this.sprite.anims.play("player-run", true);
            } else if (this.keys.t.isDown) {
                this.sprite.anims.play('player-red', true);
            } else if (this.keys.r.isDown) {
                this.sprite.anims.play('player-return', true);
            } else if (this.keys.space.isDown) {
                this.sprite.anims.play('player-action', true);
            }
            else {
                this.sprite.anims.play("player-idle", true);
            }
        } else {
            this.sprite.anims.stop();
            this.sprite.setTexture("player", 10);
        }
    }

    destroy() {
        this.sprite.destroy();
    }

    // Create the animations we need from the player spritesheet
    private createAnims(anims: Phaser.Animations.AnimationManager): any {
        anims.create({
            key: "player-idle",
            frames: anims.generateFrameNumbers("player", { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
        anims.create({
            key: "player-run",
            frames: anims.generateFrameNumbers("player", { start: 8, end: 15 }),
            frameRate: 12,
            repeat: -1,
            yoyo: true,
        });
        anims.create({
            key: 'player-action',
            frames: anims.generateFrameNumbers("player", { start: 24, end: 27 }),
            frameRate: 12,
            repeat: -1
        });
        anims.create({
            key: 'player-red',
            frames: anims.generateFrameNumbers("player", { start: 16, end: 19 }),
            frameRate: 6,
            // yoyo: true,
            repeat: 0,
            hideOnComplete: true

        });
        anims.create({
            key: 'player-return',
            frames: anims.generateFrameNumbers("player", { start: 20, end: 23 }),
            frameRate: 20,
            showOnStart: true,
            repeat: 0
        });
    }

    doubleJumpAvailable(time: number) {
        return this.doubleJump && (time - this.lastJumpTime > 200);
    }
}
