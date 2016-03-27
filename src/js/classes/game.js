import { Boot } from './states/boot';
import { Preloader } from './states/preloader';
import { LevelExit } from './states/level-exit';
import { Level } from './states/level';
import { Utility } from './utility';
import { dimensions, levels } from '../config';

export class Game extends Phaser.Game {
    constructor() {
        super(dimensions.gameWidth, dimensions.gameHeight, Phaser.AUTO, 'gameScreen');

        this.progress = {
            levelsCompleted: []
        };

        this.state.add('Boot', Boot);

        this.state.add('Preloader', Preloader);

        this.state.add('LevelExit', LevelExit);

        for (let i = 1; i <= levels; i++) {
            this.state.add(`Level${i}`, () => {
                return new Level(`level${i}`, i);
            });
        }

        this.state.start('Boot');
    }

    updateProgress(levelID, time, pickups) {
        let gems,
            gold;

        gems = countPickups(pickups, 'Gem');
        gold = countPickups(pickups, 'Gold');

        this.progress.levelsCompleted.push({
            id: levelID,
            time: time,
            pickups: pickups,
            gems: gems,
            gold: gold
        });
    }
};

function countPickups(pickups, type) {
    let i,
        pickupArray,
        count;

    pickupArray = Utility.filterArray(pickups, 'type', type);
    count = 0;

    for (i = 0; i < pickupArray.length; i++) {
        count += pickupArray[i].quantity;
    }

    return count;
}
