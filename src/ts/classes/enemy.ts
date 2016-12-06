import Level from './states/level';
import SpriteInput from './sprite-input';
import Direction from '../enums/direction';
import { animations, frames, sprites, playerSpeed } from '../config';

export default class Enemy extends Phaser.Sprite {
    constructor(spriteInput: SpriteInput, public direction: Direction = 'down') {
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
        case 'up':
            return 'right';

        case 'down':
            return 'left';

        case 'left':
            return 'up';

        case 'right':
            return 'down';

        default:
            console.error(`${currentDirection} is not a valid direction`);
    }
}

function setDirection(direction: Direction, context: Enemy) {
    context.animations.play(direction);
    context.direction = direction;

    switch (direction) {
        case 'up':
            context.body.velocity.y = context.speed * -1;
            context.body.velocity.x = 0;
            break;

        case 'down':
            context.body.velocity.y = context.speed * 1;
            context.body.velocity.x = 0;
            break;

        case 'left':
            context.body.velocity.y = 0;
            context.body.velocity.x = context.speed * -1;
            break;

        case 'right':
            context.body.velocity.y = 0;
            context.body.velocity.x = context.speed * 1;
            break;

        default:
            console.error(`${direction} is not a valid direction`);
    }
}
