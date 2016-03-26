import { Pickup } from '../pickup';
import { Message } from '../message';
import { playerSpeed } from '../../config';

export class SpeedBoost extends Pickup {
    // constructor(game, quantity) {
    //     super(game, quantity);
    // }

    collect() {
        super.collect();

        let messageText,
            message;

        this.game.player.speed = playerSpeed * 2;

        messageText = `You found a speed boost`;
        message = new Message(this.game, messageText);

        message.display(1000);
    }
}
