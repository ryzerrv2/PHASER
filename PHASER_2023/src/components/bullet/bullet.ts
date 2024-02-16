import IPlayer from "./IPlayer";
import GamePlay from "../../scenes/SpaceWar";
import { GameData } from "../../GameData";

export default class Bullet extends Phaser.GameObjects.Sprite implements IPlayer 
{
    private _config: genericConfig;
    private _scene: GamePlay;
    private _body: Phaser.Physics.Arcade.Body;
    private _velocity: number = 200;

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this.create();
    }

    preload() {

    }

    create(): void {
        this._scene = <GamePlay>this._config.scene;
        this._scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setCollideWorldBounds(false);
        this.setDepth(11);
        this._scene.add.existing(this);

        
    }

    update(...args: any[]): void {
        
    }
}