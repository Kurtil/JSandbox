import * as Phaser from "phaser";

/**
 * A class that wraps up our 2D platforming player logic. It creates, animates and moves a sprite in
 * response to WASD/arrow keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player {

    private scene: Phaser.Scene = null;
    sprite: Phaser.Physics.Arcade.Sprite = null;
    keys = null;
    private doubleJump = true;
    private lastJumpTime: number = 0;
    private currentState: State = new IdlePlayerState(this);

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
        const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            w: W,
            a: A,
            d: D
        });
    }

    freeze() {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        body.moves = false;
    }

    update(time, delta) {
        this.currentState.update();
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
            repeat: -1
        });
    }

    doubleJumpAvailable(time: number) {
        return this.doubleJump && (time - this.lastJumpTime > 200);
    }

    setState(state: State) {
        this.currentState = state;
    }

    move(acceleration: number) {
        if (this.keys.left.isDown || this.keys.a.isDown) {
            this.sprite.setAccelerationX(-acceleration);
            this.sprite.setFlipX(true);
        } else if (this.keys.right.isDown || this.keys.d.isDown) {
            this.sprite.setAccelerationX(acceleration);
            this.sprite.setFlipX(false);
        }
    }
    jump() {
        this.sprite.setVelocityY(-500);
    }
}

interface State {
    player: Player;
    update();
    handleInput();
}

class IdlePlayerState implements State {

    player: Player;
    private acceleration: number;

    constructor(player: Player) {
        this.player = player;
        this.acceleration = 600;
    }

    update() {
        this.player.sprite.setAccelerationX(0);
        this.player.sprite.anims.play("player-idle", true);

        this.handleInput();
    }

    handleInput() {
        if (!this.player.sprite.body.blocked.down) {
            this.player.setState(new AirPlayerState(this.player));
        } else if (this.player.keys.left.isDown ||
            this.player.keys.a.isDown ||
            this.player.keys.right.isDown ||
            this.player.keys.d.isDown) {
            this.player.move(this.acceleration);
            this.player.setState(new RunningPlayerState(this.player));
        } else if (this.player.keys.up.isDown) {
            this.player.jump();
            return this.player.setState(new AirPlayerState(this.player));
        }
    }
}

class AirPlayerState implements State {

    player: Player;
    private acceleration: number;

    constructor(player: Player) {
        this.player = player;
        this.acceleration = 200;
    }

    update() {
        this.player.sprite.anims.stop();
        this.player.sprite.setTexture("player", 10);

        this.player.move(this.acceleration);

        this.handleInput();
    }

    handleInput() {
        if (this.player.sprite.body.blocked.down) {
            if (this.player.sprite.body.velocity.x !== 0) {
                this.player.setState(new RunningPlayerState(this.player));
            } else if (this.player.keys.up.isDown) {
                this.player.jump();
                return this.player.setState(new AirPlayerState(this.player));
            } else {
                this.player.setState(new IdlePlayerState(this.player));
            }
        }
    }
}

class RunningPlayerState implements State {

    player: Player;
    private acceleration: number;

    constructor(player: Player) {
        this.player = player;
        this.acceleration = 200;
    }

    update() {
        this.player.sprite.anims.play("player-run", true);
        this.player.move(this.acceleration);

        this.handleInput();
    }

    handleInput() {
        if (!this.player.sprite.body.blocked.down) {
            return this.player.setState(new AirPlayerState(this.player));
        }
        if (this.player.sprite.body.blocked.down && this.player.keys.up.isDown) {
            this.player.jump();
            return this.player.setState(new AirPlayerState(this.player));
        }

        if (!(this.player.keys.left.isDown || this.player.keys.a.isDown) &&
            !(this.player.keys.right.isDown || this.player.keys.d.isDown)) {
            this.player.setState(new IdlePlayerState(this.player));
        }
    }
}


