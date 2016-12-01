import Item from '../item';
import { animations, sprites, frames } from '../../config';

export default class Spikes extends Item {
    constructor(game, x, y, key, frame, name, group, flipX, flipY, immovable, disabled = false) {
        super(game, x, y, key, frame, name, group, flipX, flipY, immovable);

        this.disabled = disabled;
    }

    create() {
        super.create();

        this.animations.add('active', animations.spikes.active, 10, true);
        this.animations.play('active');
    }

    update() {
        this.game.physics.arcade.collide(this.game.player, this, null, this.checkIfEnabled, this);
        this.game.physics.arcade.collide(this.game.enemies, this, this.hitByEnemy, this.checkIfEnabled, this);
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

    hitByEnemy(spikes, enemy) {
        console.log(spikes, enemy);
        enemy.changeDirection();
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
            object.properties.disabled === 'true'
        );
    }
}
