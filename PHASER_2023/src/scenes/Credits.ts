export default class Credits extends Phaser.Scene
{
    private x: Phaser.GameObjects.Image;
    private mariano: Phaser.GameObjects.BitmapText;
    private mariano2: Phaser.GameObjects.BitmapText;
    private desio: Phaser.GameObjects.BitmapText;
    private desio2: Phaser.GameObjects.BitmapText;
    private kungfu: Phaser.GameObjects.BitmapText;
    private kungfu2: Phaser.GameObjects.BitmapText;
    private tommaso: Phaser.GameObjects.BitmapText;
    private tommaso2: Phaser.GameObjects.BitmapText;
    private milito: Phaser.GameObjects.BitmapText;
    private milito2: Phaser.GameObjects.BitmapText;
    private jebbecs: Phaser.GameObjects.BitmapText;
    private jebbecs2: Phaser.GameObjects.BitmapText;
    private ryzen: Phaser.GameObjects.BitmapText;
    private ryzen2: Phaser.GameObjects.BitmapText;

    private offset: number = 100;
    private offset2: number = 70;

    constructor() {
        super({key: "Credits"});
    }

    preload() {
        this.load.image('x', 'assets/images/X.png');
        this.load.bitmapFont('topaz', 'assets/fonts/topaz.png', 'assets/fonts/topaz.xml');
        this.load.bitmapFont('topaz-green', 'assets/fonts/topaz-green.png', 'assets/fonts/topaz-green.xml');
    }
    
    create() 
    {
        this.cameras.main.setBackgroundColor(0x000000);

        this.x = this.add.image(this.game.canvas.width - 50, 40 , 'x').setScale(.05);
        this.x.setInteractive().on("pointerdown", () => { this.scene.stop(); })

        this.mariano =  this.add.bitmapText(this.offset2 + 0, 0 + this.offset, 'topaz-green',    'Mariano Avagliano').setScale(.5);
        this.mariano2 = this.add.bitmapText(this.offset2 + 370, 0 + this.offset, 'topaz',    'Coder, Beatmaker and Game Designer').setScale(.5);
        this.desio =    this.add.bitmapText(this.offset2 + 0, 45 + this.offset, 'topaz-green',   'Simone Desiderio' ).setScale(.5);
        this.desio2 =   this.add.bitmapText(this.offset2 + 370, 45 + this.offset, 'topaz',   'VFX and Graphics Designer' ).setScale(.5);
        this.kungfu =   this.add.bitmapText(this.offset2 + 0, 90 + this.offset, 'topaz-green',  'Leonardo Gaudiano' ).setScale(.5);
        this.kungfu2 =  this.add.bitmapText(this.offset2 + 370, 90 + this.offset, 'topaz',  'Coder' ).setScale(.5);
        this.tommaso =  this.add.bitmapText(this.offset2 + 0, 135 + this.offset, 'topaz-green',  'Thomas Giordano'  ).setScale(.5);
        this.tommaso2 = this.add.bitmapText(this.offset2 + 370, 135 + this.offset, 'topaz',  'Coder and Graphics Designer'  ).setScale(.5);
        this.milito =   this.add.bitmapText(this.offset2 + 0, 180 + this.offset, 'topaz-green',  'Vincenzo Milito'  ).setScale(.5);
        this.milito2 =  this.add.bitmapText(this.offset2 + 370, 180 + this.offset, 'topaz',  'Graphics Designer'  ).setScale(.5);
        this.jebbecs =  this.add.bitmapText(this.offset2 + 0, 225 + this.offset, 'topaz-green',  'Vincenzo Romano'  ).setScale(.5);
        this.jebbecs2 = this.add.bitmapText(this.offset2 + 370, 225 + this.offset, 'topaz',  'Graphics Designer'  ).setScale(.5);
        this.ryzen =    this.add.bitmapText(this.offset2 + 0, 270 + this.offset, 'topaz-green',  'Mario Vicidomini' ).setScale(.5);
        this.ryzen2 =   this.add.bitmapText(this.offset2 + 370, 270 + this.offset, 'topaz',  'Coder' ).setScale(.5);
    }

    update() {}
}