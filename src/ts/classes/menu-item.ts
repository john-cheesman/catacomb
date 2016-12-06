import { colours } from '../config';

const textStyle: any = {
    default: {
        font: '16px monospace',
        align: 'left',
        fill: Phaser.Color.getWebRGB(colours.white)
    },
    focused: {
        font: '16px monospace',
        align: 'left',
        fill: Phaser.Color.getWebRGB(colours.blue)
    }
}

export default class MenuItem extends Phaser.Text {
    constructor(
        game: Phaser.Game,
        x: number,
        y: number,
        text: string,
        public targetState: string,
        public params?: any[],
        public focused: boolean = false) {

        super(game, x, y, text, textStyle.default);

        this.targetState = targetState;
        this.params = params;
        this.focused = focused;

        this.game.world.addChild(this);
    }

    focus(focused: boolean) {
        if (focused) {
            this.focused = true;
            this.setStyle(textStyle.focused);
        } else {
            this.focused = false;
            this.setStyle(textStyle.default);
        }
    }

    navigate() {
        if (this.targetState) {
            if (this.params) {
                this.game.state.start(this.targetState, true, false, this.params);
            }
            else {
                this.game.state.start(this.targetState);
            }
        }
    }
}
