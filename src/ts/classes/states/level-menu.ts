import TimeDisplay from '../time-display';
import Menu from '../menu';
import MenuState from './menu-state';
import Utility from '../utility';
import LevelProgress from '../level-progress';
import { colours, dimensions, levelData } from '../../config';

export default class LevelMenu extends MenuState {
    public id: number;
    public levelData: any;
    public levelProgress: LevelProgress;

    init(levelID: number) {
        this.id = levelID;
        this.levelData = levelData[(levelID - 1)];
        this.levelProgress = this.progress.levels[(levelID - 1)];
    }

    create() {
        let levelDetails: string,
            time: TimeDisplay,
            bestTime: string,
            menuOptions: any[],
            startOption: any,
            nextOption: any,
            previousOption: any,
            mainMenuOption: any;

        if (this.levelProgress.complete) {
            time = Utility.displayTime(this.levelProgress.best.time);
            bestTime = `${time.minutes}:${time.seconds}`;
        }
        else {
            bestTime = '--:--';
        }

        levelDetails = `Best time: ${bestTime}\nGems: ${this.levelProgress.best.gems}/${this.levelData.gems}\nGold: ${this.levelProgress.best.gold}/${this.levelData.gold}`;

        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize * 2.5), levelDetails, {
            font: '16px monospace',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), `Level ${this.id}`, {
            font: '20px monospace',
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

        if (this.levelProgress.unlocked) {
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
