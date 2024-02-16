import { GameData } from "../GameData";

export default class Timer extends Phaser.Scene
{
    public timer: Phaser.Time.TimerEvent;

    constructor() {
        super({key: "Timer"});
    }

    create()
    {
        this.timer = this.time.addEvent({
            delay: 100 * 1000,
            callback: this.onTimerComplete,
            callbackScope: this,
            loop: false,
        });

        this.scene.launch("Lava1", {timer: this.timer, time: 120});
    }

    update(time: number, delta: number): void {
        // console.log(this.prova.getRemaining());
    }

    tempo(): number
    {
        return this.timer.getRemainingSeconds();
    }

    onTimerComplete()
    {
        console.log("AAAAAAAAAA");
    }
}