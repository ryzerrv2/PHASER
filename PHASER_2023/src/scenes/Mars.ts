export default class Mars extends Phaser.Scene 
{
    private music: Phaser.Sound.BaseSound;

    constructor() {
        super({key: "Mars"});
    }

    preload() 
    {
        this.load.image('bg1', 'assets/images/bg/BGLAVA/Lava-1.png');
        this.load.image('bg2', 'assets/images/bg/BGLAVA/Lava-2.png');
        this.load.audio('bg-mario-mars-volcano', 'assets/sounds/mars_volcano.mp3');
    }

    create() 
    {
        this.sound.stopAll();

        this.add.image(0, 0, 'bg1').setOrigin(0, 0);
        this.music = this.sound.add('bg-mario-mars-volcano', {loop: false, volume: 1});
        this.music.play();
    }

    update() {}
}