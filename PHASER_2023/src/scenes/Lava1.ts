import { GameData } from "../GameData";
import Player from "../components/player/Player";
import Obstacle from "../components/obstacle/Obstacle";
import Hud from "./Hud";
import anyq from "./Hud";

export default class Lava1 extends Phaser.Scene {

  private timebar: Phaser.GameObjects.Graphics;
  private timebarWidth: number;
  private timer: Phaser.Time.TimerEvent;
  private totalSeconds: number = 116.67;
  private lastSecond: number = 117.67;  
  private secondsInterval: number = 1.028;
  private actTime = 120;
  private seconds: Phaser.GameObjects.BitmapText;
  private timebarHolder: Phaser.GameObjects.Graphics;
  private _spaceShip: Obstacle;
  private colliderNavicella: boolean = false;

  private _dialogText: Phaser.GameObjects.Text;
  private _firstQuestion: Phaser.GameObjects.Text;
  private _secondQuestion: Phaser.GameObjects.Text;
  private _thirdQuestion: Phaser.GameObjects.Text;
  private _dialogLayer: Phaser.GameObjects.Image;
  private _dialogContainer: Phaser.GameObjects.Container;
  private _numberDialog: number = 4;
  private _dialogCurrentIndex: number = -1;
  private _dialogInProgress: boolean = false;

  private _player: Player;
  private areaInteractivTeschio: Phaser.Physics.Arcade.Sprite;
  private teschio: Phaser.GameObjects.Sprite;
  private interazione: boolean;

  private _obstacleKill: Array<Obstacle> = [];
  private _obstacle: Array<Obstacle> = [];

  private collisione: Phaser.GameObjects.Sprite;
  private spazio: Phaser.Input.Keyboard.Key;

  private _positionsKill: Array<{x: number, y:number, scaleX: number, scaleY: number}> = [
    {
      x: 30,
      y: 33,
      scaleX: 100,
      scaleY: 10,
    },
    {
      x: 75,
      y: 75,
      scaleX: 10,
      scaleY: 80,
    },
    {
      x: 135,
      y: 138,
      scaleX: 85,
      scaleY: 10,
    },
    {
      x: 200,
      y: 75,
      scaleX: 10,
      scaleY: 80,
    },
    {
      x: 275,
      y: 33,
      scaleX: 125,
      scaleY: 10,
    },
    {
      x: 740,
      y: 33,
      scaleX: 130,
      scaleY: 10,
    },
    {
      x: 800,
      y: 75,
      scaleX: 10,
      scaleY: 80,
    },
    {
      x: 860,
      y: 138,
      scaleX: 85,
      scaleY: 10,
    },
    {
      x: 930,
      y: 75,
      scaleX: 10,
      scaleY: 80,
    },
    {
      x: 965,
      y: 33,
      scaleX: 100,
      scaleY: 10,
    },
    {
      x: 975,
      y: 400,
      scaleX: 70,
      scaleY: 10,
    },
    {
      x: 930,
      y: 355,
      scaleX: 10,
      scaleY: 75,
    },
    {
      x: 860,
      y: 290,
      scaleX: 85,
      scaleY: 10,
    },
    {
      x: 800,
      y: 350,
      scaleX: 10,
      scaleY: 70,
    },
    {
      x: 675,
      y: 400,
      scaleX: 200,
      scaleY: 10,
    },
    {
      x: 300,
      y: 400,
      scaleX: 200,
      scaleY: 10,
    },
    {
      x: 200,
      y: 350,
      scaleX: 10,
      scaleY: 70,
    },
    {
      x: 135,
      y: 290,
      scaleX: 85,
      scaleY: 10,
    },
    {
      x: 75,
      y: 350,
      scaleX: 10,
      scaleY: 80,
    },
    {
      x: 30,
      y: 400,
      scaleX: 100,
      scaleY: 10,
    },
  ];

    private _positions: Array<{x: number, y:number, radians: number, scaleX: number, scaleY: number}> = [
		{
			x: 443,
			y: 95,
			radians: 1,
			scaleX: 1,
			scaleY: .05,
		}, 
		{
			x: 358,
			y: 126,
			radians: 1,
			scaleX: .05,
			scaleY: 5,
		},
		{
			x: 645,
			y: 126,
			radians: 1,
			scaleX: .05,
			scaleY: 5,
		},
		{
			x: 410,
			y: 210,
			radians: 1,
			scaleX: 3.55,
			scaleY: 1.25
		},
		{
			x: 591,
			y: 210,
			radians: 1,
			scaleX: 3.55,
			scaleY: 1.25,
		},
		{
			x: 320,
			y: 220,
			radians: 1,
			scaleX: .40,
			scaleY: .01,
		},
		{
		  x: 503,
		  y: 37,
		  radians: 1,
		  scaleX: 1.25,
		  scaleY: 1.25,
		},
		{
		  x: 685,
		  y: 110,
		  radians: 1,
		  scaleX: .1,
		  scaleY: .1,
		},
		{
		  x: 985,
		  y: 90,
		  radians: 1,
		  scaleX: .1,
		  scaleY: .1,
		},
		{
			x: 578,
			y: 530,
			radians: 1,
			scaleX: 1.75,
			scaleY: .35,
		},
		{
			x: 240,
			y: 590,
			radians: 1,
			scaleX: 1.75,
			scaleY: 2,
		}
	];

    private _tileMap: Phaser.GameObjects.TileSprite;
 

  constructor() {
    super({
      key: "Lava1",
    });
  }


  preload() {
      this.load.audio('lava1', 'assets/sounds/mars_volcano.mp3'); 
    this.load
      .image(
        GameData.tileMap[0].name,
        GameData.tileMap[0].path
    );
    this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
  }


  create() {

	this.createDialog();

    this._player = new Player({ 
      scene: this, 
      x: GameData.posLava1.x,
	  y: GameData.posLava1.y, 
      key: "player",
    }),
    this._player.setScale(1.15);

	this._spaceShip = new Obstacle({  
        scene: this,
        x: GameData.spritesheets[1].imageX,
        y: GameData.spritesheets[1].imageY,
        key: GameData.spritesheets[1].name,
    });
    this._spaceShip.setScale(1.25).setDepth(2);

    this.newObstacle(this._positions, "null")
    this.newObstacleKill(this._positionsKill, "null");

    this._tileMap = this.add
      .tileSprite(
        GameData.tileMap[0].imageX,
        GameData.tileMap[0].imageY,
        GameData.tileMap[0].width,
        GameData.tileMap[0].height,
        GameData.tileMap[0].name
      ).setDepth(1)

	this.spazio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.add.collider(this._player, this._obstacle);
    this.physics.add.collider(this._player, this._obstacleKill, this.onCollideKill, null, this);
	this.physics.add.collider(this._player, this._spaceShip, () => { if(this.spazio.isDown) this.dialogNavicella() } );


    this.cameras.main.setBackgroundColor("#000000");

	
    // Passa

    this.collisione = this.physics.add.sprite(this.game.canvas.width, 0, "coll");
    this.collisione.setScale(10, 1000);
    this.physics.add.overlap(this.collisione, this._player, () => {this.scene.start("Lava2")}, null);
    this.collisione.setDepth(-1);

    const timebarHeight = 20;
    this.timebarWidth = this.sys.game.config.width as number - 100;
    const background = this.add.graphics().setDepth(900);
    background.fillStyle(0x000000, 0.2);
    background.fillRect(50, 25, this.timebarWidth, timebarHeight);
    this.timebar = this.add.graphics().setDepth(900);
    this.timebar.fillStyle(0xffffff, 1);
    this.timebar.fillRect(50, 25, this.timebarWidth, timebarHeight);
    this.timer = this.time.addEvent({
      delay: this.totalSeconds * 1000,
      callback: this.onTimerComplete,
      callbackScope: this,
      loop: false,
    });
    this.seconds = this.add.bitmapText(800, 50, 'arcade', '').setScale(.5).setOrigin(0, 0).setDepth(900);
  
    this.timebarHolder = this.add.graphics().fillStyle(0x12345, .6).setDepth(899);
    this.timebarHolder.fillRect(0, 0, this.sys.game.config.width as number, 80);
    
    /* ==================== TESCHIO ==================== */
    this.teschio = this.add.sprite(600, 100, "ossa");
    this.teschio.setDepth(9);
    this.teschio.setScale(.2);

    let collisioneTeschio = this.physics.add.sprite(590, 60, "coll");
    collisioneTeschio.setDepth(-1).setScale(20).setImmovable(true);

    this.physics.add.collider(collisioneTeschio, this._player);

    // interazione
    this.areaInteractivTeschio = this.physics.add.sprite(600, 90, "coll");
    this.areaInteractivTeschio.setScale(50);
    this.areaInteractivTeschio.setDepth(-1);

    this.physics.add.overlap(this.areaInteractivTeschio, this._player, () => { this.interazione = true; } );
    
    this.input.keyboard.on("keydown-SPACE", () => {
		if(this.interazione) {
			if(GameData.anyQuestion)
				this.openDialog();
		}
		else if (this.colliderNavicella) {
			this.dialogNavicella();
		}
	  });

    if(!GameData.isMarsSound) {
      var m = this.sound.add('lava1');
      m.play();
      GameData.isMarsSound = true;
    }

    
    /* ================================================= */
  }

  init() {
    
      this.tweens.add({
        targets: [this._obstacle, this._tileMap],
        alpha: 1,
        duration: 500,
      });
      

  }


  update(time: number, delta: number): void {
    
    this._player.update(time, delta);

	if(!this.physics.overlap(this._player, this.areaInteractivTeschio))
		this.interazione = false;

	GameData.posLava1.x = this._player.x;
	GameData.posLava1.y = this._player.y;

    // console.log("player x: " + this._player.x + " player y: " + this._player.y);
    const remainingSeconds = Math.max(0, this.timer.getRemainingSeconds());
    const remainingWidth = this.timebarWidth * (remainingSeconds / this.totalSeconds);
    this.timebar.clear();
    this.timebar.fillStyle(0xffffff, 1);
    this.timebar.fillRect(50, 25, remainingWidth, 20);
    if(this.lastSecond - remainingSeconds >= this.secondsInterval) {
      this.actTime -= 1;  
      this.seconds.setText(this.actTime.toString());
      this.lastSecond = remainingSeconds;
    }
  }

  newObstacle(position: Array<{x: number, y: number, radians: number, scaleX: number, scaleY: number}>, key?: string) {
    position.forEach((el, i) => {
        this._obstacle[i] = new Obstacle({
            scene: this,
            x: el.x,
            y: el.y,
            key: key,
        });
        this._obstacle[i].setScale(el.scaleX, el.scaleY);
        this._obstacle[i].setRotation(Math.PI / el.radians);
    });
  }

  newObstacleKill(position: Array<{x: number, y: number, scaleX: number, scaleY: number}>, key?: string) {
    this._positionsKill.forEach((element, i) => {
      this.collisione = this.physics.add.sprite(element.x, element.y, "coll");
      this.collisione.setScale(element.scaleX, element.scaleY);
      this.physics.add.overlap(this.collisione, this._player, () => {this.scene.start("GameOver")}, null);
      this.collisione.setDepth(-1);
    });
  }

  onCollideKill() {
    this.scene.start("GameOver");
    // this.scene.start("GamePlay");
  }

  createDialog() {

	this._dialogContainer = this.add.container().setDepth(111);
	
    //aggiungo un layer di sfondo opaco 
    //layer-dialog è una texture creata in boot.ts
    this._dialogLayer = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2 + 150 , "layer");
	this._dialogLayer.setOrigin(.5).setScale(.5, .2);
    //aggiungo un il testo
	
	this._dialogText = this.add.text(this.game.canvas.width / 2 + 300	, this.game.canvas.height / 2, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600);
    
	this._firstQuestion = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 130, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600).setInteractive().on("pointerdown", (index: number) => { this.showPhrase(1) });
	
	this._secondQuestion = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 160, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600).setInteractive().on("pointerdown", (index: number) => { this.showPhrase(2) });
	
	this._thirdQuestion = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 190, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600).setInteractive().on("pointerdown", (index: number) => { this.showPhrase(3) });
    
	//aggiungo tutti gli elementi al container
	this._dialogContainer.add([this._dialogLayer, this._firstQuestion, this._secondQuestion, this._thirdQuestion, this._dialogText]);
    
	//setto il container invisibile
    this._dialogContainer.setAlpha(0);

  }

  openDialog() {
	
	this._dialogCurrentIndex = Math.floor(Math.random() * this._numberDialog);
	
	//se c'è già un dialogo in corso esco dal metodo
    if (this._dialogInProgress) return;
    
	//setto il dialogo in corso
    this._dialogInProgress = true;

    //recupero l'oggetto corrente per settare il testo e l'immagine iniziale
    let _textObj = GameData.dialog[this._dialogCurrentIndex];

	// setto il testo con il testo corretto
	this._dialogText.setText(_textObj.question).setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2 + 85);

	this._firstQuestion.setText(_textObj.answ1);
	this._secondQuestion.setText(_textObj.answ2);
	this._thirdQuestion.setText(_textObj.answ3);


    //rendo il container visibile usando un tween
    this.tweens.add({
      targets: this._dialogContainer, duration: 300, alpha: 1,
    });
  }

  closeDialog() {
	this.tweens.add({
		targets: this._dialogContainer, duration: 300, alpha: 0, onComplete: () => {
  
			GameData.dialog.splice(this._dialogCurrentIndex, 1);

			this._numberDialog--;

			if(this._numberDialog === 0) {
				GameData.anyQuestion = false;
			}

			//setto l'indice del dialogo a -1
			this._dialogCurrentIndex = -1
			
			//setto il container trasparente
			this._dialogContainer.setAlpha(0);
			
			//setto il dlialogo in progress a false
			this._dialogInProgress = false;

		}
	  });
  	}

  showPhrase(index: number) {
	
	let _textObj = GameData.dialog[this._dialogCurrentIndex];
    
	console.log('index: ' + index + '_textObj: ' + _textObj.rightAnswer);

    //se la action è di tipo next, setto un timer con il delay indicato dall'oggetto e nella callback richiamo la stessa funzione showPhrase passando la index incrementata di 1
    if (_textObj.rightAnswer === index) {
		
		let indexDate = Math.floor(Math.random() * this._numberDialog);
		
		this._dialogText.setText('Ricordati questo numero: ' + GameData.finalDate[indexDate]).setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2 + 150);

		this._firstQuestion.setText('');
		this._secondQuestion.setText('');
		this._thirdQuestion.setText('');

		GameData.finalDate.splice(indexDate, 1);
		
		setTimeout(() => {
			this.closeDialog();
		}, 3000);

    }
  }

  dialogNavicella() {
	
	if(!GameData.key) {
		this._dialogText.setText('Ancora non hai raccolto la chiave della navicella').setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2 + 150);
	}
	else {
		this._dialogText.setText('Partiamo per il prossimo pianeta!').setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2 + 150);
   
      this.scene.start("Loading");

	}	
		this.tweens.add({
			targets: this._dialogContainer, duration: 300, alpha: 1
		});

		setTimeout(() => {
			this.closeDialogNavicella();
		}, 2000);
  }

  closeDialogNavicella() {
	this.tweens.add({
		targets: this._dialogContainer, duration: 300, alpha: 0,
	});
  
  }

  private onTimerComplete() {
    this.scene.start("Menu");
  }
}