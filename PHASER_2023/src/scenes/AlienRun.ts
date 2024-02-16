export default class AlienRun extends Phaser.Scene 
{
    private m_alien: Phaser.GameObjects.Sprite;

    constructor() {
        super({key: "AlienRun"});
    }

    preload() 
    {
        this.load.image('mars-bg', 'assets/images/bg/mars8.png');
    }

    create() 
    {
        let alienAnim = {
            key: "alienRun",
            frames: this.anims.generateFrameNumbers("alien", { frames: [1,2,3,4,5,6]}),
            frameRate: 6,
            repeat: -1
        };
        this.anims.create(alienAnim);
        
        this.add.image(0, 0, 'mars-bg').setOrigin(0).setDepth(-1);
        this.m_alien = this.add.sprite(500, 500, 'alien').setScale(.6);
        this.m_alien.play('alienRun');
    }

    update() 
    {
        
    }
}