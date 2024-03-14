import { globalEval } from 'jquery'
import Phaser from 'phaser'

import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'

export default class HelloWorldScene extends Phaser.Scene
{

	private _controls: Phaser.Cameras.Controls.FixedKeyControl;
	private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	private _player: Phaser.Physics.Arcade.Sprite;

	constructor()
	{
		super(SceneKeys.Game)
	}

    create()
    {	
		
		const map = this.make.tilemap({ key: TextureKeys.tilemap})

		// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  		// Phaser's cache (i.e. the name you used in preload)
		const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", TextureKeys.tileset)

		// Parameters: layer name (or index) from Tiled, tileset, x, y
		const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
		const worldLayer = map.createLayer("World", tileset, 0, 0);
		const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);
		
		//imposta le collision in base alla proprietà collides dell'oggetto tilemap
		worldLayer.setCollisionByProperty({ collides: true });

		//per mostarare i collider
		const debugGraphics = this.add.graphics().setAlpha(0);
		worldLayer.renderDebug(debugGraphics, {
			tileColor: null, // Color of non-colliding tiles
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
		});

		// Phaser supports multiple cameras, but you can access the default camera like this:
		const camera = this.cameras.main;

		//Set up the arrows to control the camera
		this._cursors = this.input.keyboard.createCursorKeys();
		this._controls = new Phaser.Cameras.Controls.FixedKeyControl({
			camera: camera,
			left: this._cursors.left,
			right: this._cursors.right,
			up: this._cursors.up,
			down: this._cursors.down,
			speed: 0.5
		});
	
		//Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
		camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	}

	update(time: number, delta: number): void {
		this._controls.update(delta);

		this._player.body.setVelocity(0);

		// Horizontal movement
		if (cursors.left.isDown) {
			this._player.body.setVelocityX(-speed);
		} else if (cursors.right.isDown) {
			this._player.body.setVelocityX(speed);
		}

		// Vertical movement
		if (cursors.up.isDown) {
			this._player.body.setVelocityY(-speed);
		} else if (cursors.down.isDown) {
			this._player.body.setVelocityY(speed);
		}

		// Normalize and scale the velocity so that this._player can't move faster along a diagonal
		this._player.body.velocity.normalize().scale(speed);

	}
	
}