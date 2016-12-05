import SpriteInput from '../sprite-input';
import Enemy from '../enemy';
import Level from '../states/level';
import ItemInput from '../item-input';
import Item from '../item';
import { animations, sprites, frames } from '../../config';

export default class Spikes extends Item {
    constructor(itemInput: ItemInput, public disabled = false) {
        super(itemInput);
    }

    create() {
        super.create();

        this.animations.add('active', animations.spikes.active, 10, true);
        this.animations.play('active');
    }

    update() {
        this.game.physics.arcade.collide(this.level.player, this, null, this.checkIfEnabled, this);
        this.game.physics.arcade.collide(this.level.enemies, this, this.hitByEnemy, this.checkIfEnabled, this);
    }

    disable() {
        if (!this.disabled) {
            this.animations.stop('active');
            this.frame = frames.spikes.disabled;
            this.disabled = true;
        }
    }

    checkIfEnabled() {
        if (!this.disabled) {
            return true;
        }

        return false;
    }

    hitByEnemy(spikes: Spikes, enemy: Enemy) {
        console.log(spikes, enemy);
        enemy.changeDirection();
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
            object.properties.disabled === 'true'
        );
    }
}
