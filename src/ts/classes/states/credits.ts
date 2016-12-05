import Menu from '../menu';
import { colours, dimensions } from '../../config';

export default class Credits extends Phaser.State {
    public menu: Menu;

    create() {
        let creditsBody: string;

        creditsBody = 'Created by John Cheesman. All artwork by Lanea Zimmerman.\n\nCopyright 2016 John Cheesman.';

        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), 'Credits', {
            font: '20px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize * 2.5), creditsBody, {
            font: '16px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), [
            {
                text: 'Main menu',
                targetState: 'MainMenu'
            }
        ]);

        this.menu.create();
    }
}
