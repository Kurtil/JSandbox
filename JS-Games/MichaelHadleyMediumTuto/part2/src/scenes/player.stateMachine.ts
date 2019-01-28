import * as Phaser from "phaser";
import { State } from "./State";
import { IdlePlayerState } from "./IdlePlayerState";

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
    sprite: Phaser.Physics.Arcade.Sprite = null;
    keys = null;
    private doubleJump = true;
    private lastJumpTime: number = 0;
    private currentState: State;

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

        this.currentState = new IdlePlayerState(this);
    }

    freeze() {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        body.moves = false;
    }

    update(time, delta) {
        const commandes = this.handleUserInput();
        this.currentState.update(commandes);
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

    stop() {
        this.sprite.setAccelerationX(0);
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


