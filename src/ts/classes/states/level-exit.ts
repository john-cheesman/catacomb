import TimeDisplay from '../time-display';
import LevelRecord from '../level-record';
import Menu from '../menu';
import MenuState from './menu-state';
import Utility from '../utility';
import { dimensions, colours, levelData, sprites, animations } from '../../config';

export default class LevelExit extends MenuState {
    public completedLevelID: number;
    public summary: string;

    init(completedLevelID: number) {
        let completedLevelData: LevelRecord,
            currentLevelData: any,
            formattedTime: TimeDisplay;

        this.completedLevelID = completedLevelID;

        completedLevelData = Utility.loadGame().levels[(completedLevelID - 1)].latest;
        currentLevelData = levelData[(completedLevelID - 1)];
        formattedTime = Utility.displayTime(completedLevelData.time);

        this.summary = `Finished level ${completedLevelID} after ${formattedTime.minutes}:${formattedTime.seconds}\nGems: ${completedLevelData.gems}/${currentLevelData.gems}\nGold: ${completedLevelData.gold}/${currentLevelData.gold}`;
    }

    create() {
        let textWidth: number,
            padding: number,
            playerSprite: Phaser.Sprite,
            menuOptions: any[],
            nextLevelOption: any,
            replayOption: any,
            mainMenuOption: any;

        textWidth = (dimensions.gameWidth - dimensions.tileSize);
        padding = (dimensions.tileSize / 2);

        this.game.add.text(padding, padding, this.summary, {
            font: '16px monospace',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: textWidth
        });

        playerSprite = this.game.add.sprite((dimensions.gameWidth - padding), (dimensions.gameHeight - padding), sprites.tileSet.key);

        playerSprite.animations.add('down', animations.player.walk.down, 10, true);

        playerSprite.animations.play('down');

        playerSprite.anchor.set(1);

        menuOptions = [];

        nextLevelOption = {
            text: 'Next level',
            targetState: `Level${(this.completedLevelID + 1)}`
        };

        replayOption = {
            text: 'Replay',
            targetState: `Level${this.completedLevelID}`
        }

        mainMenuOption = {
            text: 'Main menu',
            targetState: 'MainMenu'
        }

        if (this.completedLevelID < levelData.length) {
            menuOptions.push(nextLevelOption);
        }

        menuOptions.push(replayOption);
        menuOptions.push(mainMenuOption);

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), menuOptions);

        this.menu.create();
    }
}
