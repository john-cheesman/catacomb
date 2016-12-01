export default class Pickup {
    constructor(game, quantity, type) {
        this.game = game;
        this.quantity = parseInt(quantity, 10);
        this.type = type;
    }

    collect() {
        let currentState;

        currentState = this.game.state.getCurrentState();

        currentState.pickups.push(this);
    }
}
