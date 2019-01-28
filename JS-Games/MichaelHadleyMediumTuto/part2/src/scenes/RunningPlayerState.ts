import { State } from "./State";
import { IdlePlayerState } from "./IdlePlayerState";
import { AirPlayerState } from "./AirPlayerState";
import Player from "./player.stateMachine";
export class RunningPlayerState implements State {
    player: Player;
    private acceleration: number;
    constructor(player: Player) {
        this.player = player;
        this.acceleration = 200;
        this.player.sprite.anims.play("player-run");
    }
    update(commandes: string[]) {
        const { up, right, left } = Player.parseCommandes(commandes);
        const body = this.player.sprite.body;

        if (left && !body.blocked.left && !right) {
            this.player.move(this.acceleration, true);
        }
        if (right && !body.blocked.right && !left) {
            this.player.move(this.acceleration);
        }
        if ((!right && !left) || (right && left)) {
            this.player.stop();
            if (body.velocity.x === 0 && !up) {
                return this.player.setState(new IdlePlayerState(this.player));
            }
        }
        if (left && body.blocked.left && (!up || body.blocked.up)) {
            return this.player.setState(new IdlePlayerState(this.player));
        }
        if (right && body.blocked.right && (!up || body.blocked.up)) {
            return this.player.setState(new IdlePlayerState(this.player));
        }

        if (!body.blocked.down) {
            return this.player.setState(new AirPlayerState(this.player));
        } else {
            if (up && !body.blocked.up) {
                this.player.jump();
                return this.player.setState(new AirPlayerState(this.player));
            }
        }
    }
}
