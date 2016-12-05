import Level from '../states/level';
import Pickup from '../pickup';
import Message from '../message';
import { playerSpeed } from '../../config';

export default class SpeedBoost extends Pickup {
    constructor(game: Phaser.Game, quantity: number) {
        super(game, quantity, 'SpeedBoost');

        this.singular = 'a piece of gold';
        this.plural = 'pieces of gold';
    }

    collect() {
        let level: Level;

        level = <Level>this.game.state.getCurrentState();

        super.collect();

        level.player.speed = playerSpeed * 2;

        Message.create(this.game, 'You found a speed boost');

        this.game.time.events.add(5000, () => {
            level.player.speed = playerSpeed;
        });
    }
}
