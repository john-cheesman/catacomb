import Pickup from '../pickup';
import Message from '../message';
import { frames } from '../../config';

export default class Gem extends Pickup {
    constructor(game: Phaser.Game, quantity: number) {
        super(game, quantity, 'Gem');

        this.singular = 'a gem';
        this.plural = 'gems';
    }

    collect() {
        super.collect();

        let messageText: string,
            message: Message;

        messageText = this.quantity > 1 ? `You found ${this.quantity} ${this.plural}` : `You found ${this.singular}`;
        message = new Message(this.game, messageText, frames.gems);

        message.display();
    }
}
