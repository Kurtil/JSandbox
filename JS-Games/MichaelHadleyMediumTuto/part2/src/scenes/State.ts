import Player from "./player.stateMachine";
export interface State {
    player: Player;
    update(commandes: string[]);
}
