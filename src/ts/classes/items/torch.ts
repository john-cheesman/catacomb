import Item from '../item';
import { animations, sprites } from '../../config';

export default class Torch extends Item {
    constructor(game, x, y, key, frame, name, group, flipX, flipY, immovable, colour) {
        super(game, x, y, key, frame, name, group, flipX, flipY, immovable);

        this.colour = colour;
    }

    create() {
        super.create();

        this.animations.add('flame', animations.torch[this.colour], 10, true);
        this.animations.play('flame');
    }


    static instantiateFromMapData(game, object) {
        return new this(
            game,
            object.x,
            object.y,
            sprites.tileSet.key,
            parseInt(object.properties.frame, 10),
            object.name,
            object.properties.group,
            object.properties.flipX === 'true',
            object.properties.flipY === 'true',
            object.properties.immovable !== 'false',
            object.properties.colour
        );
    }
}
