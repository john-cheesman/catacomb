import { colours } from '../config';

let textStyle;

textStyle = {
    default: {
        font: '16px Consolas',
        align: 'left',
        fill: Phaser.Color.getWebRGB(colours.white)
    },
    focused: {
        font: '16px Consolas',
        align: 'left',
        fill: Phaser.Color.getWebRGB(colours.blue)
    }
}

export class MenuItem extends Phaser.Text {
    constructor(game, x, y, text, targetState, params = null, focused = false) {
        super(game, x, y, text, textStyle.default);

        this.targetState = targetState;
        this.params = params;
        this.focused = focused;

        this.game.world.addChild(this);
    }

    focus(focused) {
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
