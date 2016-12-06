import SpriteInput from '../sprite-input';
import Enemy from '../enemy';
import Direction from '../../enums/direction';
import { animations, frames, sprites, playerSpeed } from '../../config';

export default class Ghost extends Enemy {
    constructor(spriteInput: SpriteInput, direction: Direction = 'down') {
        super(spriteInput, direction);

        this.animations.add('up', animations.ghost.float.up, 10, true);
        this.animations.add('right', animations.ghost.float.right, 10, true);
        this.animations.add('down', animations.ghost.float.down, 10, true);
        this.animations.add('left', animations.ghost.float.left, 10, true);
    }
}
