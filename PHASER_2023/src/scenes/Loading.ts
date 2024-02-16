export default class Loading extends Phaser.Scene
{
    private logo: Phaser.GameObjects.Image;
    private sounds: Array<string> = ['bg-mario-loading1', 'bg-mario-loading2'];
    private music: Phaser.Sound.BaseSound;
    private index: number = -1;
    private scenes: Array<string> = ['Uranus', 'SpaceWar', 'Earth'];
    private _loading: Phaser.GameObjects.BitmapText;

    constructor() {
        super({key: 'Loading'});
    }

    preload() 
    {
        this.load.image('logo-loading', 'assets/images/logo-loading.png');
        this.load.audio('bg-mario-loading1', 'assets/sounds/loading1.mp3');
        this.load.audio('bg-mario-loading2', 'assets/sounds/loading2.mp3');
        this.load.bitmapFont('chiller', 'assets/fonts/chiller.png', 'assets/fonts/chiller.xml');
    }

    create() {
        this.sound.stopAll();
        this.cameras.main.setBackgroundColor(0x000000);

        const rand_num = Math.floor(Math.random() * (2));
        this.music = this.sound.add(this.sounds[rand_num]);
        this.music.play();

        this.logo = this.add.image(this.game.canvas.width / 2, (this.game.canvas.height / 2) - 100, 'logo-loading').setAlpha(.7);
        this._loading = this.add.bitmapText(this.game.canvas.width / 2, (this.game.canvas.height / 2) + 100, 'chiller', 'Loading...').setOrigin(.5, .5).setScale(.7);
        
        var load_timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this._loading.setText("Tap to switch scene!");
                this._loading.setInteractive().once("pointerdown", () => 
                {
                    this.index++;
                    this.scene.start(this.scenes[this.index]);
                });
            }
        });
    }

    update() {
        this.logo.rotation += .5;
    }
}