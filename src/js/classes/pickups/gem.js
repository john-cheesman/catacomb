import { Pickup } from '../pickup';

export class Gem extends Pickup {
    constructor(game, quantity) {
        super(game, quantity);

        this.singular = 'gem';
        this.plural = 'gems';
    }

    collect() {
        super.collect();

        console.log(`You collected ${this.quantity} ${this.quantity > 1 ? this.plural : this.singular}`);
    }
}
