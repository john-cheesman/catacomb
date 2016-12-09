import Spikes from './spikes';
import SpriteInput from '../sprite-input';
import ItemInput from '../item-input';
import Item from '../item';
import Utility from '../utility';
import Message from '../message';
import { animations, sprites } from '../../config';

export default class Switch extends Item {
    constructor(itemInput: ItemInput, public action: string, public thrown = false) {
        super(itemInput);
    }

    [action: string]: any;

    create() {
        super.create();

        this.animations.add('throw', animations.switch.throw, 10);
        this.animations.add('reset', animations.switch.reset, 10);
    }

    update() {
        this.game.physics.arcade.collide(this.level.player, this, this.throw, null, this);
    }

    throw() {
        if (!this.thrown) {
            this.animations.play('throw');

            this.thrown = true;

            this[this.action]();
        }
    }

    disableSpikes() {
        let spikes: any;

        spikes = Utility.filterArrayByType(this.game.world.children, Spikes);

        for (let i = 0; i < spikes.length; i++) {
            spikes[i].disable();
        }

        Message.create(this.game, 'You disabled the spikes');
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
            object.properties.action,
            object.properties.thrown === 'true'
        );
    }
}
