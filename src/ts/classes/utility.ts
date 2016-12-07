import LevelRecord from './level-record';
import Progress from './progress';
import LevelProgress from './level-progress';
import TimeDisplay from './time-display';
import { dimensions } from '../config';

export default class Utility {
    static filterArray(array: any[], key: string, value: any): any[] {
        return array.filter((object) => {
            return object[key] === value;
        });
    }

    static setPositionByTile(object: any, position: number[]) {
        object.x = (position[0] * dimensions.tileSize);
        object.y = (position[1] * dimensions.tileSize);
    }

    static displayTime(seconds: number): TimeDisplay {
        let roundedSeconds: number;

        roundedSeconds = Math.round(seconds);

        return new TimeDisplay(
            pad(roundedSeconds / 60),
            pad(roundedSeconds % 60)
        );
    }

    static saveGame(progress: Progress) {
        let json: string;

        json = JSON.stringify(progress);

        localStorage.setItem('catacomb-save', json);
    }

    static loadGame(): Progress {
        let saveData: any;

        saveData = JSON.parse(localStorage.getItem('catacomb-save'));

        if (saveData) {
            return mapSaveToProgress(saveData);
        }

        return null;
    }
}

function pad(val: number): string {
    let valString: string;

    valString = `${val}`;

    if (valString.length < 2) {
        return `0${valString}`;
    }

    return valString;
}

function mapSaveToProgress(save: any): Progress {
    let progress: Progress = new Progress();

    progress.levelReached = save.levelReached;

    save.levels.forEach((level: LevelProgress) => {
        progress.levels.push(
            new LevelProgress(
                level.id,
                new LevelRecord(
                    level.best.time,
                    level.best.gems,
                    level.best.gold
                ),
                new LevelRecord(
                    level.latest.time,
                    level.latest.gems,
                    level.latest.gold
                ),
                level.unlocked,
                level.complete
            ));
    });

    return progress;
}
