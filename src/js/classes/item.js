import {sprites, dimensions} from '../config';

export class Item extends Phaser.Sprite {
    constructor(game, x, y, key, frame, name, group, flipX = false, flipY = false, immovable = true) {
        super(game, x, y, key, frame);

        this.name = name || null;
        this.group = group || null;
        this.immovable = immovable;

        if (flipX) {
            this.anchor.setTo(0.5, 0);
            this.scale.x *= -1;
            this.x += (dimensions.tileSize / 2);
        }

        if (flipY) {
            this.anchor.setTo(0, 0.5);
            this.scale.y *= -1;
            this.y += (dimensions.tileSize / 2);
        }
    }

    create() {
        this.game.physics.arcade.enable(this);

        this.body.immovable = this.immovable;

        this.game.add.existing(this);
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
            object.properties.immovable !== 'false'
        );
    }
}
