import { Menu } from '../menu';
import { Utility } from '../utility';
import { dimensions, colours, levelData, sprites, frames } from '../../config';

export class GameOver extends Phaser.State {
    init(levelID) {
        this.levelID = levelID;
    }

    create() {
        let menuOptions,
            playerSprite;

        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), 'Game Over', {
            font: '20px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        playerSprite = this.game.add.sprite((dimensions.gameWidth / 2), (dimensions.gameHeight / 2), sprites.tileSet.key);

        playerSprite.frame = frames.player.dead;

        playerSprite.anchor.set(0.5);

        menuOptions = [
            {
                text: 'Replay',
                targetState: `Level${this.levelID}`
            },
            {
                text: 'Main menu',
                targetState: 'MainMenu'
            }
        ];

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), menuOptions);

        this.menu.create();
    }
}
