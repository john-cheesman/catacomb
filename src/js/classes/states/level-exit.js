import { Utility } from '../utility';

export class LevelExit extends Phaser.State {
    init(completedLevelID) {
        let completedLevelData,
            formattedTime;

        this.completedLevelID = completedLevelID;

        completedLevelData = Utility.filterArray(this.game.progress.levelsCompleted, 'id', completedLevelID)[0];
        formattedTime = Utility.displayTime(completedLevelData.time);

        console.log(`Exited level ${completedLevelData.id} after ${formattedTime.minutes}:${formattedTime.seconds}`);
        console.log('Pickups: ', completedLevelData.pickups);
    }

    create() {
        let nextLevel;

        nextLevel = this.completedLevelID + 1;

        this.state.start(`Level${nextLevel}`);
    }
}
