import {dimensions, sprites, animations} from '../../config';

export class Preloader extends Phaser.State {
    constructor(game) {
        super(game);
    }

    preload() {
        let spinner;

        spinner = this.game.add.sprite((dimensions.gameWidth / 2), (dimensions.gameHeight / 2), sprites.spinner.key);

        spinner.anchor.setTo(0.5);

        spinner.animations.add('spin', animations.spinner.spin, 10, true);
        spinner.animations.play('spin');

        this.game.load.spritesheet(sprites.tileSet.key, sprites.tileSet.path, dimensions.tileSize, dimensions.tileSize, 254);
    }

    create() {
        this.state.start('MainMenu');
    }
}
