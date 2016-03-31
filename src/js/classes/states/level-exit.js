import { Utility } from '../utility';
import { dimensions, colours } from '../../config';

export class LevelExit extends Phaser.State {
    init(completedLevelID) {
        let completedLevelData,
            formattedTime;

        this.completedLevelID = completedLevelID;

        completedLevelData = Utility.filterArray(this.game.progress.levelsCompleted, 'id', completedLevelID)[0];
        formattedTime = Utility.displayTime(completedLevelData.time);

        this.summary = `Finished level ${completedLevelData.id} after ${formattedTime.minutes}:${formattedTime.seconds}\nGems: ${completedLevelData.gems}\nGold: ${completedLevelData.gold}`;
    }

    create() {
        let textWidth,
            padding;

        textWidth = (dimensions.gameWidth - dimensions.tileSize);
        padding = dimensions.tileSize / 2;

        this.game.add.text(padding, padding, this.summary, {
            font: '16px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: textWidth
        });

        this.game.time.events.add(3000, this.loadNextLevel, this);
    }

    loadNextLevel() {
        let nextLevel;

        nextLevel = this.completedLevelID + 1;

        this.state.start(`Level${nextLevel}`);
    }
}
