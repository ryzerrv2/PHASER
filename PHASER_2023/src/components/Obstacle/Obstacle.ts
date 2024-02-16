import IPlayer from "./IPlayer";
import GamePlay from "../../scenes/Lava1";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {

    private _config: genericConfig;
    private _scene: GamePlay;
    private _body: Phaser.Physics.Arcade.Body;
    
    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this.create();
        /* this.createAnimations(); */

    }

    create() {
        this._scene = <GamePlay>this._config.scene;
        this._scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setCollideWorldBounds(false);
        this._body.setImmovable(true);
        this._body.setAllowRotation(true);
        this.setDepth(-1);
        this._scene.add.existing(this);
    }

    update(time: number, delta: number) {
        
    }
}