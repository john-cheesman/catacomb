import { Pickup } from '../pickup';
import { Message } from '../message';
import { playerSpeed } from '../../config';

export class SpeedBoost extends Pickup {
    collect() {
        super.collect();

        this.game.player.speed = playerSpeed * 2;

        Message.create(this.game, 'You found a speed boost');

        this.game.time.events.add(5000, this.disable, this);
    }

    disable() {
        this.game.player.speed = playerSpeed;
    }
}
