import { dimensions } from '../config';

export class Message extends Phaser.Text {
    constructor(game, text, x = (dimensions.gameWidth / 2), y = (dimensions.gameHeight - 10)) {
        super(game, x, y, text, {
            font: '18px Consolas',
            fill: 'rgb(222, 238, 214)',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: dimensions.gameWidth - 40,
            backgroundColor: 'rgb(20, 12, 28)'
        });

        this.fixedToCamera = true;
        this.anchor.set(0.5,1);
        this.alpha = 0.85;
    }

    display(duration) {
        let currentState;

        currentState = this.game.state.getCurrentState();

        //currentState.time.add(duration, this.hide, this);

        this.game.add.existing(this);
    }

    hide() {
        this.destroy();
    }
}
