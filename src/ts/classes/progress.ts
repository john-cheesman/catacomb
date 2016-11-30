import Level from './level';

export default class Progress {
    constructor(
        public levels: Level[] = new Array<Level>(),
        public LevelReached: number = 1) {
    }
}
