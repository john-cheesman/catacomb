import LevelProgress from './level-progress';
import Utility from './utility';
import Pickup from './pickup';

export default class Progress {
    constructor(
        public levels: LevelProgress[] = new Array<LevelProgress>(),
        public levelReached: number = 1) {
    }

    public static updateProgress(levelID: number, time: number, pickups: Pickup[]) {
        let progress: Progress,
            gems: number,
            gold: number,
            level: LevelProgress,
            nextLevel: LevelProgress;

        progress = Utility.loadGame();

        if (progress) {
            gems = countPickups(pickups, 'Gem');
            gold = countPickups(pickups, 'Gold');
            level = progress.levels[(levelID - 1)];
            nextLevel = progress.levels[levelID];

            level.latest = {
                time: time,
                gems: gems,
                gold: gold
            };

            level.best.time = (level.best.time > time || !level.best.time) ? time : level.best.time;
            level.best.gems = (level.best.gems < gems) ? gems : level.best.gems;
            level.best.gold = (level.best.gold < gold) ? gold : level.best.gold;

            level.complete = true;

            if (nextLevel) {
                nextLevel.unlocked = true;

                progress.levelReached = (nextLevel.id > progress.levelReached) ? nextLevel.id : progress.levelReached;
            }

            Utility.saveGame(progress);
        }
        else {
            console.warn('Could not save progress, no save data found');
        }
    }
}

function countPickups(pickups: Pickup[], type: string): number {
    let i: number,
        pickupArray: Pickup[],
        count: number;

    pickupArray = Utility.filterArray(pickups, 'type', type);
    count = 0;

    for (i = 0; i < pickupArray.length; i++) {
        count += pickupArray[i].quantity;
    }

    return count;
}
