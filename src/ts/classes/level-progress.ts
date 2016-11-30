import LevelRecord from './level-record';

export default class LevelProgress {
    constructor(
        public id: number,
        public best: LevelRecord = new LevelRecord(),
        public latest: LevelRecord = new LevelRecord(),
        public unlocked: boolean = false,
        public complete: boolean = false) {
    }
}
