import { Item } from '../item';
import { Factory } from '../factory';
import { animations, sprites } from '../../config';

export class Chest extends Item {
    constructor(game, x, y, key, frame, name, group, flipX, flipY, immovable, contents, quantity = 1, opened = false) {
        super(game, x, y, key, frame, name, group, flipX, flipY, immovable);

        this.contents = contents;
        this.quantity = quantity;
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
            let type,
                pickup;

            type = Factory.getObjectFromString(this.contents);
            pickup = new type(this.game, this.quantity);

            pickup.collect();

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
            object.properties.quanity,
            object.properties.open
        );
    }
}
