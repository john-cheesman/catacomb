import Menu from '../menu';
import Progress from '../progress';
import LevelProgress from '../level-progress';
import Utility from '../utility';
import { levelData } from '../../config';

export default class MenuState extends Phaser.State {
    constructor() {
        super();

        this.progress = Utility.loadGame();

        if (!this.progress) {
            this.progress = new Progress();

            for (let i = 0; i < levelData.length; i++) {
                this.progress.levels.push(new LevelProgress(i + 1));
            }

            this.progress.levels[0].unlocked = true;
        }
    }

    public progress: Progress;
    public menu: Menu;
}
