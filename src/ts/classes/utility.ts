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
        let json: any,
            progress: Progress;

        json = JSON.parse(localStorage.getItem('catacomb-save'));
        progress = new Progress(new Array<LevelProgress>(), json.levelReached);

        return JSON.parse(json);
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
