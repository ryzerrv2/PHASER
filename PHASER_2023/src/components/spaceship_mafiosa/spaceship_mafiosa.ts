import IPlayer from "./IPlayer";
import GamePlay from "../../scenes/Intro";
import { GameData } from "../../GameData";

export default class SpaceshipMafiosa extends Phaser.GameObjects.Sprite implements IPlayer {

    private _config: genericConfig;
    private _scene: GamePlay;
    private _body: Phaser.Physics.Arcade.Body;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _velocity: number = 100;
    private _w: Phaser.Input.Keyboard.Key;
    private _a: Phaser.Input.Keyboard.Key;
    private _s: Phaser.Input.Keyboard.Key;
    private _d: Phaser.Input.Keyboard.Key; 
    private _animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
        {
            key: "spaceshipFlightMafia",
            frames: [2,2,2,2,3,3,3,2,2,3,3,3,3,2,2,2,3,3,3,3],
            frameRate: 20,
            yoyo: true,
            repeat: -1
        },
        {
            key: "spaceshipFlightMafiaMovement",
            frames: [1,1,2,2,3,3,2,2],
            frameRate: 8,
            yoyo: false,
            repeat: -1
        }
    ];

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this.create();
        this.createAnimations(); 
    }

    create() {
        this._scene = <GamePlay>this._config.scene;
        this._scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setCollideWorldBounds(true);
        this._cursors = this._scene.input.keyboard.createCursorKeys();
        this.setDepth(11);
        this._scene.add.existing(this);

        

        // this._scene.input.keyboard.on("keydown-D", () => {
        //     this.anims.play("destra");
        // });

        // this._scene.input.keyboard.on("keydown-W", () => {
        //     this.anims.play("sopra");
        // });

        // this._scene.input.keyboard.on("keydown-A", () => {
        //     this.anims.play("sinistra");
        // });

        // this._scene.input.keyboard.on("keydown-S", () => {
        //     this.anims.play("sotto");
        // });

        this._w = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        //this._a = this._scene.input.keyboard.addKey(Phaser. Input.Keyboard.KeyCodes.A);
        this._s = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        //this._d = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // this._scene.input.keyboard.on("keyup-D", () => {
        //     if(this._w.isUp && this._a.isUp && this._s.isUp && this._d.isUp)
        //         this.anims.play("idle_destra");
        // });

        // this._scene.input.keyboard.on("keyup-W", () => {
        //     if(this._w.isUp && this._a.isUp && this._s.isUp && this._d.isUp)
        //         this.anims.play("idle_sopra")
        // });

        // this._scene.input.keyboard.on("keyup-A", () => {
        //     if(this._w.isUp && this._a.isUp && this._s.isUp && this._d.isUp)
        //         this.anims.play("idle_sinistra")
        // });

        // this._scene.input.keyboard.on("keyup-S", () => {
        //     if(this._w.isUp && this._a.isUp && this._s.isUp && this._d.isUp)
        //         this.anims.play("idle_sotto")
        // });

    }

    createAnimations() {
        this._animations.forEach((element, i) => {

            if (!this._scene.anims.exists(element.key)) {

                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers('spaceship', { frames: element.frames }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat
                };

                this._scene.anims.create(_animation);
            }

        });
    }


    update(time: number, delta: number) {
        
        this._body.setVelocity(0);

        //se il il cursore in alto è premuto
        if (this._cursors.up.isDown || this._w.isDown) {
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityY(-this._velocity);
        }
        //se il il cursore in basso è premuto
        else if (this._cursors.down.isDown || this._s.isDown) {
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityY(this._velocity);
        }

    }

}