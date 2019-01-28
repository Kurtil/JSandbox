import { State } from "./State";
import Player from "./player.stateMachine";
import { RunningPlayerState } from "./RunningPlayerState";
import { AirPlayerState } from "./AirPlayerState";
export class IdlePlayerState implements State {
    player: Player;
    private acceleration: number;
    constructor(player: Player) {
        this.player = player;
        this.acceleration = 600;
        this.player.sprite.anims.play("player-idle");
    }
    update(commandes: string[]) {
        const { up, right, left } = Player.parseCommandes(commandes);
        const body = this.player.sprite.body;

        if (!body.blocked.down) {
            return this.player.setState(new AirPlayerState(this.player));
        }

        if (up && !body.blocked.up) {
            this.player.jump();
            return this.player.setState(new AirPlayerState(this.player));
        }
        if (right && !body.blocked.right && !left) {
            this.player.move(this.acceleration);
            return this.player.setState(new RunningPlayerState(this.player));
        }
        if (left && !body.blocked.left && !right) {
            this.player.move(this.acceleration, true);
            return this.player.setState(new RunningPlayerState(this.player));
        }
    }
}
