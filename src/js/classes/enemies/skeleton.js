import { Enemy } from '../enemy';
import { animations, frames, sprites, playerSpeed } from '../../config';

export class Skeleton extends Enemy {
    constructor(game, x, y, key, direction) {
        super(game, x, y, key, direction);

        this.animations.add('up', animations.skeleton.walk.up, 10, true);
        this.animations.add('right', animations.skeleton.walk.right, 10, true);
        this.animations.add('down', animations.skeleton.walk.down, 10, true);
        this.animations.add('left', animations.skeleton.walk.left, 10, true);

        this.speed = playerSpeed * 1.5;
    }
}
