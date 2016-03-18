import {Item} from '../item';
import {sprites, dimensions} from '../../config';

export class Stairs extends Item {
    constructor(
        game,
        x,
        y,
        key,
        frame,
        name,
        group,
        flipX = false,
        flipY = false,
        immovable,
        targetState,
        hidden = false)
    {
        super(game, x, y, key, frame, name, group, flipX, flipY, immovable);

        this.targetState = targetState;
        this.hidden = hidden;
    }

    create() {
        super.create();
    }

    update() {
        this.game.physics.arcade.overlap(this.game.player, this, this.use, null, this);
    }

    use() {
        if (!this.hidden) {
            let currentState = this.game.state.getCurrentState();

            //this.game.stateTransition.to(this.targetState, true, false, currentState.levelID);
            this.game.state.start(this.targetState, true, false, currentState.levelID);
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
            object.properties.targetState
        );
    }
}
