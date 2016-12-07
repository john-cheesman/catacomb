import Utility from '../utility';
import Menu from '../menu';
import MenuState from './menu-state';
import { colours, dimensions } from '../../config';

export default class MainMenu extends MenuState {
    create() {
        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), 'Catacomb', {
            font: '20px monospace',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), [
            {
                text: 'Levels',
                targetState: 'LevelMenu',
                params: Utility.loadGame().levelReached
            },
            {
                text: 'Credits',
                targetState: 'Credits'
            }
        ]);

        this.menu.create();
    }
}
