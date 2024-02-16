export default class HowToPlay extends Phaser.Scene
{
    private x: Phaser.GameObjects.Image;
    private moves: Phaser.GameObjects.BitmapText;
    private moves1: Phaser.GameObjects.BitmapText;
    private interact: Phaser.GameObjects.BitmapText;
    private interact1: Phaser.GameObjects.BitmapText;
    private raccomandazioni: Phaser.GameObjects.BitmapText;

    private wasd: Phaser.GameObjects.Image;
    private space: Phaser.GameObjects.Image;
    private bones: Phaser.GameObjects.Image;
    private mafioso: Phaser.GameObjects.Sprite;

    private offset: number = 80;

    constructor() {
        super({key: "HowToPlay"});
    }

    preload() {
        this.load.image('x', 'assets/images/X.png');
        this.load.image('wasd', 'assets/images/wasd.png');
        this.load.image('space', 'assets/images/spacekey.png');
        this.load.image('bones', 'assets/images/Bones.png');
        this.load.spritesheet('mafiosonapoli', 'assets/images/Mafiosi/mafioso3.png',{frameWidth: 32, frameHeight: 50});
        this.load.bitmapFont('topaz', 'assets/fonts/topaz.png', 'assets/fonts/topaz.xml');
        this.load.bitmapFont('topaz-green', 'assets/fonts/topaz-green.png', 'assets/fonts/topaz-green.xml');
    }
    
    create() 
    {
        this.cameras.main.setBackgroundColor(0x000000);

        this.x = this.add.image(this.game.canvas.width - 50, 40 , 'x').setScale(.05);
        this.x.setInteractive().on("pointerdown", () => { this.scene.stop(); })

        this.moves = this.add.bitmapText(20, this.offset + 0, 'topaz', 'Usa WASD per muoverti nelle varie direzioni e').setScale(.5);
        this.moves1 = this.add.bitmapText(20, this.offset + 50, 'topaz', 'SPACE per saltare').setScale(.5);
        this.interact = this.add.bitmapText(20, this.offset + 160, 'topaz', 'Interagisci con gli oggetti premendo SPACE').setScale(.5);
        this.interact1 = this.add.bitmapText(20, this.offset + 200, 'topaz', 'quando sei nelle vicinanze').setScale(.5);
        this.raccomandazioni = this.add.bitmapText(20, this.offset + 320, 'topaz', 'Scappa dai mafiosi e diveriti ;)').setScale(.5);
    
        this.wasd = this.add.image(850, 140, 'wasd').setOrigin(.5, .5).setScale(.4);
        this.space = this.add.image(850, 300, 'space').setOrigin(.5, .5).setScale(.2);
        this.bones = this.add.image(600, 330, 'bones').setOrigin(.5, .5).setScale(.3);
    
        this.mafioso = this.add.sprite(650, 450, 'mafiosonapoli').setFrame(3).setScale(2);
        let napoli_backward = {
            key: "napoli_backward",
            frames: this.anims.generateFrameNumbers("mafiosonapoli", { frames: [3, 5, 3, 4]}),
            frameRate: 10,
            repeat: -1
        };
        this.anims.create(napoli_backward);
        this.mafioso.play('napoli_backward');
    }

    update() {}
}