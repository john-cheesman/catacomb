import Pickup from '../pickup';
import Message from '../message';
import { frames } from '../../config';

export default class Gold extends Pickup {
    constructor(game: Phaser.Game, quantity: number) {
        super(game, quantity, 'Gold');

        this.singular = 'a piece of gold';
        this.plural = 'pieces of gold';
    }

    collect() {
        super.collect();

        let messageText: string,
            message: Message;

        messageText = this.quantity > 1 ? `You found ${this.quantity} ${this.plural}` : `You found ${this.singular}`;
        message = new Message(this.game, messageText, frames.gold);

        message.display();
    }
}
