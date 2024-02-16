import IPlayer from "./IPlayer";
import GamePlay from "../../scenes/SpaceWar";
import { GameData } from "../../GameData";

export default class Spaceship extends Phaser.GameObjects.Sprite implements IPlayer {

    private _config: genericConfig;
    private _scene: GamePlay;
    private _body: Phaser.Physics.Arcade.Body;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _velocity: number = 200;
    private _w: Phaser.Input.Keyboard.Key;
    private _s: Phaser.Input.Keyboard.Key;

    private _animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
        {
            key: "spaceshipFlight",
            frames: [0,0,0,0,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1],
            frameRate: 20,
            yoyo: true,
            repeat: -1
        },
        
        {
            key: "spaceshipFlightMovement",
            frames: [2],
            frameRate: 1,
            yoyo: false,
            repeat: -1
        },
        
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

        this._w = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this._s = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
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
        this.anims.play('spaceshipFlight');

        //se il il cursore in alto è premuto
        if (this._cursors.up.isDown || this._w.isDown) {
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityY(-this._velocity);
            this.anims.play('spaceshipFlightMovement');
        }
        //se il il cursore in basso è premuto
        else if (this._cursors.down.isDown || this._s.isDown) {
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityY(this._velocity);
            this.anims.play('spaceshipFlightMovement');
        }

    }

}