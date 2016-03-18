import {Item} from '../item';
import {animations} from '../../config';

export class Torch extends Item {
    constructor(game, x, y, key, frame, name, group, flipX, flipY, immovable) {
        super(game, x, y, key, frame, name, group, flipX, flipY, immovable);
    }

    create() {
        super.create();

        this.animations.add('flame', animations.torch.flame, 10, true);
        this.animations.play('flame');
    }
}
