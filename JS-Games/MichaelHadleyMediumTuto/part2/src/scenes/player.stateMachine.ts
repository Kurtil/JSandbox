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

        const commandes = this.handleUserInput();
        if (commandes.length != 0) this.currentState.handleInput(commandes);
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

    setState(state: State) {
        this.currentState = state;
    }

    move(acceleration: number, leftDirection = false) {
        this.sprite.setAccelerationX(leftDirection ? -acceleration : acceleration);
        this.sprite.setFlipX(leftDirection);
    }

    jump() {
        this.sprite.setVelocityY(-500);
    }

    handleUserInput() {
        const commandes = [];
        if (this.keys.left.isDown) {
            commandes.push('left');
        }
        if (
            this.keys.right.isDown) {
            commandes.push('right');
        }
        if (this.keys.up.isDown) {
            commandes.push('up');
        }
        return commandes;
    }
}

interface State {
    player: Player;
    update();
    handleInput(commandes: string[]);
}

class IdlePlayerState implements State {

    player: Player;
    private acceleration: number;

    constructor(player: Player) {
        this.player = player;
        this.acceleration = 600;
    }

    update() {
        // quite idle state if moving
        const { x, y } = this.player.sprite.body.velocity;
        if (x !== 0 || y !== 0) {
            if (this.player.sprite.body.blocked.down) {
                this.player.setState(new RunningPlayerState(this.player));
            } else {
                this.player.setState(new AirPlayerState(this.player));
            }
        }
        // TODO must we continue if state changed... ?
        this.player.sprite.setAccelerationX(0);
        this.player.sprite.anims.play("player-idle", true);
    }

    handleInput(commandes: string[]) {
        const up = commandes.find(e => e === 'up') !== undefined;
        const right = commandes.find(e => e === 'right') !== undefined;
        const left = commandes.find(e => e === 'left') !== undefined;

        // TODO should we change state here or just in update... ?
        if (up) {
            this.player.jump();
            this.player.setState(new AirPlayerState(this.player));
        }
        if (right) {
            this.player.move(this.acceleration);
        }
        if (left) {
            this.player.move(this.acceleration);
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
        if (this.player.sprite.body.blocked.down) {
            if (this.player.sprite.body.velocity.x !== 0) {
                this.player.setState(new RunningPlayerState(this.player));
            } else {
                this.player.setState(new IdlePlayerState(this.player));
            }
        }
        this.player.sprite.anims.stop();
        this.player.sprite.setTexture("player", 10);
    }

    handleInput(commandes: string[]) {
        const right = commandes.find(e => e === 'right') !== undefined;
        const left = commandes.find(e => e === 'left') !== undefined;

        // TODO should we change state here or just in update... ?
        if (right) {
            this.player.move(this.acceleration);
        }
        if (left) {
            this.player.move(this.acceleration, true);
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
        if (this.player.sprite.body.blocked.down &&
            (this.player.sprite.body.blocked.left || this.player.sprite.body.blocked.right)) {
            this.player.setState(new IdlePlayerState(this.player));
        }
        if (!this.player.sprite.body.blocked.down) {
            this.player.setState(new AirPlayerState(this.player));
        }

        this.player.sprite.anims.play("player-run", true);
    }

    handleInput(commandes: string[]) {
        const up = commandes.find(e => e === 'up') !== undefined;
        const right = commandes.find(e => e === 'right') !== undefined;
        const left = commandes.find(e => e === 'left') !== undefined;

        // TODO should we change state here or just in update... ?
        if (up) {
            this.player.jump();
            this.player.setState(new AirPlayerState(this.player));
        }
        if (right) {
            this.player.move(this.acceleration);
        }
        if (left) {
            this.player.move(this.acceleration, true);
        }
    }
}


