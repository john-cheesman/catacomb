import LevelProgress from './level-progress';

export default class Progress {
    constructor(
        public levels: LevelProgress[] = new Array<LevelProgress>(),
        public levelReached: number = 1) {
    }
}
