import SpriteInput from './sprite-input';
import Level from './states/level';
import Direction from '../enums/direction';
import { animations, frames, sprites, playerSpeed } from '../config';

export default class Player extends Phaser.Sprite {
    constructor(
        spriteInput: SpriteInput,
        public direction: Direction = Direction.Down) {

        super(
            spriteInput.game,
            spriteInput.x,
            spriteInput.y,
            spriteInput.key);

        this.animations.add('up', animations.player.walk.up, 10);
        this.animations.add('right', animations.player.walk.right, 10);
        this.animations.add('down', animations.player.walk.down, 10);
        this.animations.add('left', animations.player.walk.left, 10);

        this.keyboard = this.game.input.keyboard;

        this.controls = {
            up: Phaser.Keyboard.UP,
            down: Phaser.Keyboard.DOWN,
            left: Phaser.Keyboard.LEFT,
            right: Phaser.Keyboard.RIGHT
        };

        this.direction = direction;

        this.frame = frames.player[this.direction];

        this.speed = playerSpeed;
    }

    public speed: number;
    public frame: number;
    public keyboard: Phaser.Keyboard;
    public controls: any;

    create() {
        this.game.physics.arcade.enable(this);

        this.game.camera.follow(this);

        this.game.add.existing(this);

        this.body.setSize(32, 20, 0, 12);
    }

    update() {
        if (this.keyboard.isDown(this.controls.up)) {
            this.body.velocity.y = this.speed * -1;
            this.body.velocity.x = 0;
            this.animations.play('up');
            this.direction = Direction.Up;
        }
        else if (this.keyboard.isDown(this.controls.down)) {
            this.body.velocity.y = this.speed;
            this.body.velocity.x = 0;
            this.animations.play('down');
            this.direction = Direction.Down;
        }
        else if (this.keyboard.isDown(this.controls.left)) {
            this.body.velocity.x = this.speed * -1;
            this.body.velocity.y = 0;
            this.animations.play('left');
            this.direction = Direction.Left;
        }
        else if (this.keyboard.isDown(this.controls.right)) {
            this.body.velocity.x = this.speed;
            this.body.velocity.y = 0;
            this.animations.play('right');
            this.direction = Direction.Right;
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.stop();
            this.frame = frames.player[this.direction];
        }
    }

    die() {
        let currentState = <Level>this.game.state.getCurrentState();

        this.game.state.start('GameOver', true, false, currentState.levelID);
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
