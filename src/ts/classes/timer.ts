import Utility from './utility';

export default class Timer extends Phaser.Time {
    displayTime() {
        return Utility.displayTime(this.totalSeconds);
    }

    setTime() {
        ++this.totalSeconds;
    }
}
