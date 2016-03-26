import { Item } from '../item';
import { Utility } from '../utility';
import { Message } from '../message';
import { animations, sprites } from '../../config';

export class Switch extends Item {
    constructor(game, x, y, key, frame, name, group, flipX, flipY, immovable, action, thrown = false) {
        super(game, x, y, key, frame, name, group, flipX, flipY, immovable);

        this.action = action;
        this.thrown = thrown;
    }

    create() {
        super.create();

        this.animations.add('throw', animations.switch.throw, 10);
        this.animations.add('reset', animations.switch.reset, 10);
    }

    update() {
        this.game.physics.arcade.collide(this.game.player, this, this.throw, null, this);
    }

    throw() {
        if (!this.thrown) {
            this.animations.play('throw');

            this.thrown = true;

            this[this.action]();
        }
    }

    disableSpikes() {
        let spikes;

        spikes = Utility.filterArray(this.game.world.children, 'group', 'spikes');

        for (let i = 0; i < spikes.length; i++) {
            spikes[i].disable();
        }

        Message.create(this.game, 'You disabled the spikes');
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
            object.properties.action,
            object.properties.thrown === 'true'
        );
    }
}
