export default class Pickup {
    constructor(
        public game: Phaser.Game,
        public quantity: number,
        public type: string) {
    }

    public singular: string;
    public plural: string;

    collect() {
        let currentState: any;

        currentState = this.game.state.getCurrentState();

        currentState.pickups.push(this);
    }
}
