import { Menu } from '../menu';
import { colours, dimensions } from '../../config';

export class MainMenu extends Phaser.State {
    create() {
        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), 'Catacomb', {
            font: '20px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), [
            {
                text: 'Levels',
                targetState: 'LevelMenu',
                params: this.game.progress.levelReached
            },
            {
                text: 'Credits',
                targetState: 'Credits'
            }
        ]);

        this.menu.create();
    }
}
