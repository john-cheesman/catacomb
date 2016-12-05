import Level from './states/level';
import ItemInput from './item-input';
import SpriteInput from './sprite-input';
import { sprites, dimensions } from '../config';

export default class Item extends Phaser.Sprite {
    constructor(itemInput: ItemInput) {

        super(
            itemInput.spriteInput.game,
            itemInput.spriteInput.x,
            itemInput.spriteInput.y,
            itemInput.spriteInput.key,
            itemInput.spriteInput.frame);

        if (itemInput.flipX) {
            this.anchor.setTo(0.5, 0);
            this.scale.x *= -1;
            this.x += (dimensions.tileSize / 2);
        }

        if (itemInput.flipY) {
            this.anchor.setTo(0, 0.5);
            this.scale.y *= -1;
            this.y += (dimensions.tileSize / 2);
        }

        this.immovable = itemInput.immovable;

        this.level = <Level>this.game.state.getCurrentState();
    }

    public immovable: boolean;
    public level: Level;

    create() {
        this.game.physics.arcade.enable(this);

        this.body.immovable = this.immovable;

        this.game.add.existing(this);
    }

    static instantiateFromMapData(game: Phaser.Game, object: any) {
        return new this(
            new ItemInput(
                new SpriteInput(
                    game,
                    object.x,
                    object.y,
                    sprites.tileSet.key,
                    parseInt(object.properties.frame, 10)
                ),
                object.name,
                object.properties.group,
                object.properties.flipX === 'true',
                object.properties.flipY === 'true',
                object.properties.immovable !== 'false'
            )
        );
    }
}
