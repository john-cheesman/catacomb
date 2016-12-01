import Menu from '../menu';
import Utility from '../utility';
import { colours, dimensions, levelData } from '../../config';

export default class LevelMenu extends Phaser.State {
    init(levelID) {
        this.id = levelID;
        this.levelData = levelData[(levelID - 1)];
        this.progress = this.game.progress.levels[(levelID - 1)];
    }

    create() {
        let levelDetails,
            time,
            bestTime,
            menuOptions,
            startOption,
            nextOption,
            previousOption,
            mainMenuOption;

        if (this.progress.complete) {
            time = Utility.displayTime(this.progress.best.time);
            bestTime = `${time.minutes}:${time.seconds}`;
        }
        else {
            bestTime = '--:--';
        }

        levelDetails = `Best time: ${bestTime}\nGems: ${this.progress.best.gems}/${this.levelData.gems}\nGold: ${this.progress.best.gold}/${this.levelData.gold}`;

        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize * 2.5), levelDetails, {
            font: '16px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), `Level ${this.id}`, {
            font: '20px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        menuOptions = [];

        startOption = {
            text: 'Start',
            targetState: `Level${this.id}`
        };

        nextOption = {
            text: 'Next level',
            targetState: `LevelMenu`,
            params: (this.id + 1)
        };

        previousOption = {
            text: 'Previous level',
            targetState: `LevelMenu`,
            params: (this.id - 1)
        };

        mainMenuOption = {
            text: 'Main menu',
            targetState: 'MainMenu'
        }

        if (this.progress.unlocked) {
            menuOptions.push(startOption);
        }

        if (this.id !== 1) {
            menuOptions.push(previousOption);
        }

        if (this.id < levelData.length) {
            menuOptions.push(nextOption);
        }

        menuOptions.push(mainMenuOption);

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), menuOptions);

        this.menu.create();
    }
}
