import Menu from '../menu';
import Progress from '../progress';
import LevelProgress from '../level-progress';
import Utility from '../utility';
import { levelData } from '../../config';

export default class MenuState extends Phaser.State {
    constructor() {
        super();

        let progress: Progress = Utility.loadGame();

        if (!progress) {
            progress = new Progress();

            for (let i = 0; i < levelData.length; i++) {
                progress.levels.push(new LevelProgress(i + 1));
            }

            progress.levels[0].unlocked = true;

            Utility.saveGame(progress);
        }
    }

    public menu: Menu;
}
