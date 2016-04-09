import { Boot } from './states/boot';
import { Preloader } from './states/preloader';
import { LevelExit } from './states/level-exit';
import { Level } from './states/level';
import { LevelMenu } from './states/level-menu';
import { GameOver } from './states/game-over';
import { MainMenu } from './states/main-menu';
import { Credits } from './states/credits';
import { Utility } from './utility';
import { dimensions, levelData } from '../config';

export class Game extends Phaser.Game {
    constructor() {
        super(dimensions.gameWidth, dimensions.gameHeight, Phaser.AUTO, 'gameScreen');

        this.progress = Utility.loadGame();

        if (!this.progress) {
            this.progress = {
                levels: [],
                levelReached: 1
            };

            for (let i = 0; i < levelData.length; i++) {
                this.progress.levels.push({
                    id: (i + 1),
                    best: {
                        time: null,
                        gems: 0,
                        gold: 0
                    },
                    latest: {
                        time: null,
                        gems: 0,
                        gold: 0
                    },
                    unlocked: false,
                    complete: false
                });
            }

            this.progress.levels[0].unlocked = true;
        }

        this.state.add('Boot', Boot);

        this.state.add('Preloader', Preloader);

        this.state.add('MainMenu', MainMenu);

        this.state.add('LevelMenu', LevelMenu);

        this.state.add('LevelExit', LevelExit);

        this.state.add('GameOver', GameOver);

        this.state.add('Credits', Credits);

        for (let i = 1; i <= levelData.length; i++) {
            this.state.add(`Level${i}`, () => {
                return new Level(`level${i}`, i);
            });
        }

        this.state.start('Boot');
    }

    updateProgress(levelID, time, pickups) {
        let gems,
            gold,
            level,
            nextLevel;

        gems = countPickups(pickups, 'Gem');
        gold = countPickups(pickups, 'Gold');
        level = this.progress.levels[(levelID - 1)];
        nextLevel = this.progress.levels[levelID];

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

            this.progress.levelReached = (nextLevel.id > this.progress.levelReached) ? nextLevel.id : this.progress.levelReached;
        }


        Utility.saveGame(this.progress);
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
