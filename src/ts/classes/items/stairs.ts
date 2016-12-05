import SpriteInput from '../sprite-input';
import ItemInput from '../item-input';
import Item from '../item';
import { sprites, dimensions } from '../../config';

export default class Stairs extends Item {
    constructor(itemInput: ItemInput, public targetState: string, public hidden = false) {
        super(itemInput);
    }

    create() {
        super.create();
    }

    update() {
        this.game.physics.arcade.overlap(this.level.player, this, this.use, null, this);
    }

    use() {
        if (!this.hidden) {
            this.game.state.start(this.targetState, true, false, this.level.levelID);
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
            object.properties.targetState
        );
    }
}
