import Level from '../states/level';
import ItemInput from '../item-input';
import SpriteInput from '../sprite-input';
import Item from '../item';
import Factory from '../factory';
import { animations, sprites } from '../../config';

export default class Chest extends Item {
    constructor(
        itemInput: ItemInput,
        public contents: string,
        public quantity: number = 1,
        public opened: boolean = false) {

        super(itemInput);
    }

    create() {
        super.create();

        this.animations.add('open', animations.chest.open, 10);
    }

    update() {
        this.game.physics.arcade.collide(this.level.player, this, this.open, null, this);
    }

    open() {
        if (!this.opened) {
            let type: any,
                pickup: any;

            type = Factory.getObjectFromString(this.contents);
            pickup = new type(this.game, this.quantity);

            pickup.collect();

            this.animations.play('open');

            console.log('You found ' + this.contents);

            this.opened = true;
        }
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
                object.properties.immovable),
            object.properties.contents,
            object.properties.quantity,
            object.properties.open
        );
    }
}
