import Level from './states/level';
import SpriteInput from './sprite-input';
import Direction from '../enums/direction';
import { animations, frames, sprites, playerSpeed } from '../config';

export default class Enemy extends Phaser.Sprite {
    constructor(spriteInput: SpriteInput, public direction: Direction = Direction.Down) {
        super(
            spriteInput.game,
            spriteInput.x,
            spriteInput.y,
            spriteInput.key);

        this.animations.add('up', animations.ghost.float.up, 10, true);
        this.animations.add('right', animations.ghost.float.right, 10, true);
        this.animations.add('down', animations.ghost.float.down, 10, true);
        this.animations.add('left', animations.ghost.float.left, 10, true);

        this.immovable = true;

        this.speed = playerSpeed;

        this.level = <Level>this.game.state.getCurrentState();
    }

    public speed: number;

    public immovable: boolean;

    public level: Level;

    create() {
        this.game.physics.arcade.enable(this);

        this.game.add.existing(this);

        this.body.setSize(32, 20, 0, 12);

        setDirection(this.direction, this);
    }

    update() {
        this.game.physics.arcade.collide(this, this.level.subCollisionLayer, this.changeDirection, null, this);
        this.game.physics.arcade.collide(this, this.level.superCollisionLayer, this.changeDirection, null, this);
        this.game.physics.arcade.collide(this, this.level.superCollisionLayer, this.changeDirection, null, this);

        this.game.physics.arcade.collide(this.level.player, this, this.attackPlayer, null, this);
    }

    attackPlayer() {
        this.level.player.die();
    }

    changeDirection() {
        let newDirection: Direction;

        newDirection = chooseDirection(this.direction);

        setDirection(newDirection, this);
    }

    static instantiateFromMapData(game: Phaser.Game, object: any) {
        return new this(
            new SpriteInput(
                game,
                object.x,
                object.y,
                sprites.tileSet.key),
            object.properties.direction
        );
    }
}

function chooseDirection(currentDirection: Direction) {
    switch (currentDirection) {
        case Direction.Up:
            return Direction.Right;

        case Direction.Down:
            return Direction.Left;

        case Direction.Left:
            return Direction.Up;

        case Direction.Right:
            return Direction.Down;

        default:
            console.error(`${currentDirection} is not a valid direction`);
    }
}

function setDirection(direction: Direction, context: Enemy) {
    context.animations.play(direction.toString());
    context.direction = direction;

    switch (direction) {
        case Direction.Up:
            context.body.velocity.y = context.speed * -1;
            context.body.velocity.x = 0;
            break;

        case Direction.Down:
            context.body.velocity.y = context.speed * 1;
            context.body.velocity.x = 0;
            break;

        case Direction.Left:
            context.body.velocity.y = 0;
            context.body.velocity.x = context.speed * -1;
            break;

        case Direction.Right:
            context.body.velocity.y = 0;
            context.body.velocity.x = context.speed * 1;
            break;

        default:
            console.error(`${direction} is not a valid direction`);
    }
}
