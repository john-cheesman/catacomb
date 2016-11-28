import { Enemy } from '../enemy';
import { animations, frames, sprites, playerSpeed } from '../../config';

export class Ghost extends Enemy {
    constructor(game, x, y, key, direction) {
        super(game, x, y, key, direction);

        this.animations.add('up', animations.ghost.float.up, 10, true);
        this.animations.add('right', animations.ghost.float.right, 10, true);
        this.animations.add('down', animations.ghost.float.down, 10, true);
        this.animations.add('left', animations.ghost.float.left, 10, true);
    }
}
