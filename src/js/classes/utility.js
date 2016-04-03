import { dimensions } from '../config';

export class Utility {
    static filterArray(array, key, value) {
        return array.filter((object) => {
            return object[key] === value;
        });
    }

    static setPositionByTile(object, position) {
        object.x = (position[0] * dimensions.tileSize);
        object.y = (position[1] * dimensions.tileSize);
    }

    static displayTime(seconds) {
        let roundedSeconds;

        roundedSeconds = Math.round(seconds);

        return {
            minutes: pad(parseInt(roundedSeconds / 60)),
            seconds: pad(roundedSeconds % 60)
        };
    }

    static saveGame(progress) {
        let json;

        json = JSON.stringify(progress);

        localStorage.setItem('catacomb-save', json);
    }

    static loadGame() {
        let json;

        json = localStorage.getItem('catacomb-save');

        return JSON.parse(json);
    }
}

function pad(val) {
    let valString = `${val}`;

    if(valString.length < 2) {
        return `0${valString}`;
    }
    else {
        return valString;
    }
}
