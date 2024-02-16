import { Game } from "phaser";
import { GameData } from "../GameData";

export default class HowToPlayLava extends Phaser.Scene
{   private x: Phaser.GameObjects.Image;
    
    private wtd: Phaser.GameObjects.BitmapText;
    private wtd2: Phaser.GameObjects.BitmapText;
    private attenzione: Phaser.GameObjects.BitmapText;
    private rule1: Phaser.GameObjects.BitmapText;
    private rule2: Phaser.GameObjects.BitmapText;

    constructor() {
        super({key: "HowToPlayLava"});
    }

    preload() {
        this.load.image('x', 'assets/images/X.png');
        this.load.image('bg-mario-htplava', 'assets/images/lava-bg.jpg');
        this.load.image('black', 'assets/images/intro/intro-4.jpg');
        this.load.image('excl', 'assets/images/excl.png');
        this.load.image('clock', 'assets/images/clock.png');
        this.load.bitmapFont('topaz', 'assets/fonts/topaz.png', 'assets/fonts/topaz.xml');
        this.load.bitmapFont('topaz-green', 'assets/fonts/topaz-green.png', 'assets/fonts/topaz-green.xml');
    }

    create() {
        this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'bg-mario-htplava').setOrigin(.5, .5).setScale(1.2,1.2);
        this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'black').setOrigin(.5, .5).setScale(1.2,1.2).setAlpha(.6);
        
        this.wtd = this.add.bitmapText(10, 50, 'topaz', 'Esplora la mappa e rispondi alle domande che ti porgono').setScale(.5);
        this.wtd2 = this.add.bitmapText(10, 80, 'topaz', 'i teschi per sbloccare il pin della cassaforte').setScale(.5);
        this.attenzione = this.add.bitmapText(10, 200, 'topaz', 'ATTENZIONE').setScale(.5);;
        this.rule1 = this.add.bitmapText(10, 250, 'topaz', 'Il tempo scorre secondo la fisica di Marte').setScale(.5);;
        this.rule2 = this.add.bitmapText(10, 310, 'topaz', 'Per ogni risposta sbagliata perdi un quarto del tempo').setScale(.5);;
        this.add.image(200, 217, 'excl').setScale(.03);
        this.add.image(750, 270, 'clock').setScale(.1);
        this.x = this.add.image(this.game.canvas.width - 50, 40 , 'x').setScale(.05);
        this.x.setInteractive().on("pointerdown", () => { this.scene.start('Lava1'); })
    }

    update(time: number, delta: number): void {}
}