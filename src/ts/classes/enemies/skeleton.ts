import SpriteInput from '../sprite-input';
import Enemy from '../enemy';
import Direction from '../../enums/direction';
import { animations, frames, sprites, playerSpeed } from '../../config';

export default class Skeleton extends Enemy {
    constructor(spriteInput: SpriteInput, direction: Direction = 'down') {
        super(spriteInput, direction);

        this.animations.add('up', animations.skeleton.walk.up, 10, true);
        this.animations.add('right', animations.skeleton.walk.right, 10, true);
        this.animations.add('down', animations.skeleton.walk.down, 10, true);
        this.animations.add('left', animations.skeleton.walk.left, 10, true);

        this.speed = playerSpeed * 1.5;
    }
}
