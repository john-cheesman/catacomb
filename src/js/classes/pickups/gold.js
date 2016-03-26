import { Pickup } from '../pickup';
import { Message } from '../message';
import { frames } from '../../config';

export class Gold extends Pickup {
    constructor(game, quantity) {
        super(game, quantity);

        this.singular = 'a piece of gold';
        this.plural = 'pieces of gold';
    }

    collect() {
        super.collect();

        let messageText,
            message;

        messageText = this.quantity > 1 ? `You found ${this.quantity} ${this.plural}` : `You found ${this.singular}`;
        message = new Message(this.game, messageText, frames.gold);

        message.display();
    }
}
