import SpriteInput from '../sprite-input';
import ItemInput from '../item-input';
import Item from '../item';
import { animations, sprites } from '../../config';

export default class Larva extends Item {
    create() {
        super.create();

        this.animations.add('larva', animations.larva, 2, true);
        this.animations.play('larva');
    }

    static instantiateFromMapData(game: Phaser.Game, object: any) {
        return new this(
            new ItemInput(
                new SpriteInput(
                    game,
                    object.x,
                    object.y,
                    sprites.tileSet.key,
                    parseInt(object.properties.frame, 10)),
                object.name,
                object.properties.group,
                object.properties.flipX === 'true',
                object.properties.flipY === 'true',
                object.properties.immovable !== 'false')
        );
    }
}
