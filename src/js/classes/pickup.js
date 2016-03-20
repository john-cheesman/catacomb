export class Pickup {
    constructor(game, quantity) {
        this.game = game;
        this.quantity = quantity;
    }

    collect() {
        let currentState;

        currentState = this.game.state.getCurrentState();

        currentState.pickups.push(this);
    }
}
