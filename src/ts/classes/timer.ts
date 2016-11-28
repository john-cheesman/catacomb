import { Utility } from './utility';

export class Timer extends Phaser.Time {
    displayTime() {
        return Utility.displayTime(this.totalSeconds);
    }

    setTime() {
        ++this.totalSeconds;
    }
}
