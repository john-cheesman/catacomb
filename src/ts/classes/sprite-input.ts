export default class SpriteInput {
    constructor(
        public game: Phaser.Game,
        public x: number,
        public y: number,
        public key?: string,
        public frame?: string | number
    ) { }
}
