import {Item} from '../item';
import {animations, sprites} from '../../config';

export class Chest extends Item {
    constructor(game, x, y, key, frame, name, group, flipX, flipY, immovable, contents, opened = false) {
        super(game, x, y, key, frame, name, group, flipX, flipY, immovable);

        this.contents = contents;
        this.opened = opened;
    }

    create() {
        super.create();

        this.animations.add('open', animations.chest.open, 10);
    }

    update() {
        this.game.physics.arcade.collide(this.game.player, this, this.open, null, this);
    }

    open() {
        if (!this.opened) {
            this.animations.play('open');

            console.log('You found ' + this.contents);

            this.opened = true;
        }
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
            object.properties.immovable,
            object.properties.contents,
            object.properties.open
        );
    }
}
