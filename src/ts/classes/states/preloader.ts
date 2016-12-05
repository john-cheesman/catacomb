import { dimensions, sprites, animations } from '../../config';

export default class Preloader extends Phaser.State {
    preload() {
        let spinner: Phaser.Sprite;

        spinner = this.game.add.sprite((dimensions.gameWidth / 2), (dimensions.gameHeight / 2), sprites.spinner.key);

        spinner.anchor.setTo(0.5);

        spinner.animations.add('spin', animations.spinner.spin, 10, true);
        spinner.animations.play('spin');

        this.game.load.spritesheet(sprites.tileSet.key, sprites.tileSet.path, dimensions.tileSize, dimensions.tileSize, 254);
    }

    create() {
        this.game.state.start('MainMenu');
    }
}
