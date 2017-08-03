/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts" />

import Boot from './states/boot';
import Preloader from './states/preloader';
import LevelExit from './states/level-exit';
import Level from './states/level';
import LevelMenu from './states/level-menu';
import GameOver from './states/game-over';
import MainMenu from './states/main-menu';
import Credits from './states/credits';
import Player from './player';
import Pickup from './pickup';
import Utility from './utility';
import Progress from './progress';
import LevelProgress from './level-progress';
import { dimensions, levelData } from '../config';

export default class Game extends Phaser.Game {
    constructor() {
        super(dimensions.gameWidth, dimensions.gameHeight, Phaser.CANVAS, 'gameScreen');

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
};
