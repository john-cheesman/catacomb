import { MenuItem } from './menu-item';
import { colours, dimensions } from '../config';

export class Menu {
    constructor(game, x, y, options) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.options = options;
    }

    create() {
        this.focused = 0;

        this.keyboard = this.game.input.keyboard;

        this.controls = this.keyboard.addKeys({
            up: Phaser.Keyboard.UP,
            down: Phaser.Keyboard.DOWN,
            left: Phaser.Keyboard.LEFT,
            right: Phaser.Keyboard.RIGHT,
            interact: Phaser.Keyboard.SPACEBAR
        });

        this.menuItems = [];

        for (let i = 0; i < this.options.length; i++) {
            let option,
                menuItem;

            option = this.options[i];

            menuItem = new MenuItem(this.game, this.x, (((i + 1) * (dimensions.tileSize / 2)) + this.y), option.text, option.targetState, option.params);

            this.menuItems.push(menuItem);
        }

        this.menuItems[this.focused].focus(true);

        this.controls.interact.onDown.add(this.activateFocusedItem, this);
        this.controls.up.onDown.add(this.selectItem, this, 0, -1);
        this.controls.down.onDown.add(this.selectItem, this, 0, 1);
    }

    selectItem(key, delta) {
        this.menuItems[this.focused].focus(false);

        this.focused += delta;

        if (this.focused >= this.menuItems.length) {
            this.focused -= this.menuItems.length;
        } else if (this.focused < 0) {
            this.focused += this.menuItems.length;
        }

        this.menuItems[this.focused].focus(true);
    }

    activateFocusedItem() {
        this.menuItems[this.focused].navigate();
    }
}
