import { GameData } from "../GameData";
import Player from "../components/player/Player";
import { Physics } from "phaser";

export default class Earth extends Phaser.Scene
{
    private _player: Player;
    private player: Phaser.Physics.Arcade.Sprite;
    private mafioso: Physics.Arcade.Sprite;
    private dialog: Phaser.GameObjects.BitmapText;

    constructor() {
        super({key: "Earth"});
    }

    preload() {
        this.load.spritesheet('bg-mario-earth', 'assets/images/room_bg.jpg', {frameWidth: 1024, frameHeight: 512});
        this.load.spritesheet('mafioso_sedia', 'assets/images/Mafiosi/mafioso_seduto.png', {frameWidth: 200, frameHeight: 200});
        this.load.bitmapFont('topaz-green', 'assets/fonts/topaz-green.png', 'assets/fonts/topaz-green.xml');
        this.load.image('black', 'assets/images/intro/intro-4.jpg');
    }

    create() 
    {
        console.log("ciao");

        this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'bg-mario-earth').setOrigin(.5, .5).setScale(1.2, 1.2).setFlipX(true).setDepth(1);
        this.mafioso = this.physics.add.sprite(100, 360, 'mafioso_sedia').setScale(2).setDepth(2).setImmovable(true);

        this._player = new Player({
            scene: this,
            x: 800,
            y: 400,
            key: "player",
        });
        this._player.setScale(6);

        this.physics.add.collider(this._player, this.mafioso, () => {
            console.log(GameData.diamonds);
            if(GameData.diamonds >= 150) {
                this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'black').setOrigin(.5, .5).setScale(2, 2).setDepth(99).setInteractive().on("pointerdown", () => {
                    this.scene.start("GameWin");
                });;
                this.dialog = this.add.bitmapText(60, 70, 'topaz-green', 'Grazie dei diamanti picciotto, fu un piacere!').setDepth(100).setScale(.6);
                console.log('a');
            }
            else {
                this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'black').setOrigin(.5, .5).setScale(2, 2).setDepth(99).setInteractive().on("pointerdown", () => {
                    this.scene.start("GameOver");
                });
                this.dialog = this.add.bitmapText(60, 70, 'topaz-green', 'Grazie dei diamanti picciotto, ma fossero pochi!').setDepth(100).setScale(.6);
                console.log('b');
            }
        });

    }

    update(time: number, delta: number) {
        this._player.update(time, delta);
    }

}