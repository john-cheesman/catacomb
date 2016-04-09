import { animations, frames, sprites, playerSpeed } from '../config';

export class Enemy extends Phaser.Sprite {
    constructor(game, x, y, key, direction = 'down') {
        super(game, x, y, key);

        this.animations.add('up', animations.ghost.float.up, 10, true);
        this.animations.add('right', animations.ghost.float.right, 10, true);
        this.animations.add('down', animations.ghost.float.down, 10, true);
        this.animations.add('left', animations.ghost.float.left, 10, true);

        this.direction = direction;

        this.immovable = true;

        this.speed = playerSpeed;
    }

    create() {
        this.game.physics.arcade.enable(this);

        this.game.add.existing(this);

        this.body.setSize(32, 20, 0, 12);

        setDirection(this.direction, this);
    }

    update() {
        let currentState = this.game.state.getCurrentState();

        this.game.physics.arcade.collide(this, currentState.subCollisionLayer, this.changeDirection, null, this);
        this.game.physics.arcade.collide(this, currentState.superCollisionLayer, this.changeDirection, null, this);
        this.game.physics.arcade.collide(this, currentState.superCollisionLayer, this.changeDirection, null, this);

        this.game.physics.arcade.collide(this.game.player, this, this.attackPlayer, null, this);
    }

    attackPlayer() {
        this.game.player.die();
    }

    changeDirection() {
        let newDirection;

        newDirection = chooseDirection(this.direction);

        setDirection(newDirection, this);
    }

    static instantiateFromMapData(game, object) {
        return new this(
            game,
            object.x,
            object.y,
            sprites.tileSet.key,
            object.properties.direction
        );
    }
}

function chooseDirection(currentDirection) {
    switch (currentDirection) {
        case 'up':
            return 'right';
            break;

        case 'down':
            return 'left';
            break;

        case 'left':
            return 'up';
            break;

        case 'right':
            return 'down';
            break;

        default:
            console.error(`${currentDirection} is not a valid direction`);
    }
}

function setDirection(direction, context) {
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
