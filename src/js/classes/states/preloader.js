import {dimensions, sprites} from '../../config';

export class Preloader extends Phaser.State {
    constructor(game) {
        super(game);
    }

    preload() {
        this.game.load.spritesheet(sprites.tileSet.key, sprites.tileSet.path, 32, 32, 254);
    }

    create() {
        this.state.start('Level1');
    }
}
