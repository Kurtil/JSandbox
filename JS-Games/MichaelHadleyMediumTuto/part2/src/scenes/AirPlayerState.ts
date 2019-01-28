import { State } from "./State";
import { IdlePlayerState } from "./IdlePlayerState";
import Player from "./player.stateMachine";
import { RunningPlayerState } from "./RunningPlayerState";
export class AirPlayerState implements State {
    player: Player;
    private acceleration: number;
    constructor(player: Player) {
        this.player = player;
        this.acceleration = 200;
        this.player.sprite.anims.stop();
        this.player.sprite.setTexture("player", 10);
    }
    update(commandes: string[]) {
        const { right, left } = Player.parseCommandes(commandes);
        const body = this.player.sprite.body;

        if (right && !body.blocked.right && !left) {
            this.player.move(this.acceleration);
        }
        if (left && !body.blocked.left && !right) {
            this.player.move(this.acceleration, true);
        }
        if ((!right && !left) || (right && left)) {
            this.player.stop();
        }

        if (body.blocked.down) {
            if (body.velocity.x !== 0) {
                return this.player.setState(new RunningPlayerState(this.player));
            }
            else {
                return this.player.setState(new IdlePlayerState(this.player));
            }
        }
    }
}
