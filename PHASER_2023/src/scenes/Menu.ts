	import { AUTO } from 'phaser';
import { GameData } from '../GameData';

export default class Menu extends Phaser.Scene 
{
    private name: Phaser.GameObjects.BitmapText;
    private author: Phaser.GameObjects.BitmapText;
    private play: Phaser.GameObjects.BitmapText;
    private credits: Phaser.GameObjects.BitmapText;
    private comandi: Phaser.GameObjects.BitmapText;
    private play_hover: Phaser.GameObjects.Sprite;
    private credits_hover: Phaser.GameObjects.Sprite;
    private comandi_hover: Phaser.GameObjects.Sprite;
    
    private music: Phaser.Sound.BaseSound;

    constructor() {
        super({key: 'Menu'});
    }

    preload() {
        this.load.bitmapFont('chiller', 'assets/fonts/chiller.png', 'assets/fonts/chiller.xml');
        this.load.bitmapFont('topaz', 'assets/fonts/topaz.png', 'assets/fonts/topaz.xml');
        this.load.bitmapFont('topaz-green', 'assets/fonts/topaz-green.png', 'assets/fonts/topaz-green.xml');
        this.load.image('logo-gab', 'assets/images/logo.png');
        this.load.image('carlo', 'assets/images/carlo.jpg');
        this.load.audio('bg-mario-menu', 'assets/sounds/menu.mp3');
    }

    create() 
    {
        this.cameras.main.setBackgroundColor(0x000000);
        this.sound.stopAll();
        this.music = this.sound.add('bg-mario-menu', {loop: true, volume: 1.3});
        this.music.play();

        this.name = this.add.bitmapText(this.game.canvas.width / 2, 100, 'chiller', 'Oh no, I played again').setScale(.7).setOrigin(.5, .5);
        this.author = this.add.bitmapText(this.game.canvas.width / 2, 175, 'chiller', '</noname>').setScale(.4).setOrigin(.5, .5);
    
        this.play_hover = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'asf').setAlpha(0.001).setDepth(1).setScale(2.5, 1.5).setInteractive();
        this.play_hover.on('pointerdown', () => { 
            this.music.stop();
            //this.scene.start('Lava1'); 
            this.scene.start('Lava1'); 
        });
        this.play_hover.on('pointerover', () => { this.play.setTexture('topaz-green'); });
        this.play_hover.on('pointerout', () => { this.play.setTexture('topaz'); });
        
        this.credits_hover = this.add.sprite((this.game.canvas.width / 2) + 150, (this.game.canvas.height / 2) + 100, 'asf').setAlpha(0.0001).setScale(3.5, 1.5).setInteractive();
        this.credits_hover.on('pointerdown', () => { 
            this.scene.launch('Credits');
        });
        this.credits_hover.on('pointerover', () => { this.credits.setTexture('topaz-green'); });
        this.credits_hover.on('pointerout', () => { this.credits.setTexture('topaz'); });
        
        this.comandi_hover = this.add.sprite((this.game.canvas.width / 2) - 150, (this.game.canvas.height / 2) + 100, 'asf').setAlpha(0.0001).setScale(5.5, 1.5).setInteractive();
        this.comandi_hover.on('pointerdown', () => { 
            this.scene.launch('HowToPlay');
        });
        this.comandi_hover.on('pointerover', () => { this.comandi.setTexture('topaz-green'); });
        this.comandi_hover.on('pointerout', () => { this.comandi.setTexture('topaz'); });
        
        
    

        this.play = this.add.bitmapText(this.game.canvas.width / 2, this.game.canvas.height / 2, 'topaz', 'PLAY').setScale(.5).setOrigin(.5, .5);

        this.comandi = this.add.bitmapText((this.game.canvas.width / 2) - 150, (this.game.canvas.height / 2) + 100, 'topaz', 'HOW TO PLAY').setScale(.5).setOrigin(.5, .5);
        this.comandi.setInteractive();
        
        this.credits = this.add.bitmapText((this.game.canvas.width / 2) + 150, (this.game.canvas.height / 2) + 100, 'topaz', 'CREDITS').setScale(.5).setOrigin(.5, .5);
        this.credits.setInteractive();

        this.add.image(100, 100, 'logo-gab');
        this.add.image(900, 100, 'carlo').setScale(.4).setAlpha(.7);


    }

    update(time: number, delta: number) {
    }

    nextScene() :void 
    {
        this.scene.start('Intro');
    }

    showTopazPlay() :void
    {
        
    }
    
    showTopazGreenPlay() :void
    {
        this.play.setTexture('topaz-green');
    }
}