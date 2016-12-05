import SpriteInput from './sprite-input';
export default class ItemInput {
    constructor(
        public spriteInput: SpriteInput,
        public name: string,
        public group: string,
        public flipX: boolean = false,
        public flipY: boolean = false,
        public immovable: boolean = true
    ) { }
}
