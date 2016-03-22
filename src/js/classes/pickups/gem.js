import { Pickup } from '../pickup';
import { Message } from '../message';

export class Gem extends Pickup {
    constructor(game, quantity) {
        super(game, quantity);

        this.singular = 'gem';
        this.plural = 'gems';
    }

    collect() {
        super.collect();

        let messageText,
            message;

        messageText = ` You collected ${this.quantity} ${this.quantity > 1 ? this.plural : this.singular}`;
        message = new Message(this.game, messageText);

        message.display(1000);

        console.log(messageText);
    }
}
