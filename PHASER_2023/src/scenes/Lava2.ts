import Player from "../components/player/Player";
import Obstacle from "../components/obstacle/Obstacle"
import { GameData } from "../GameData";

export default class Lava2 extends Phaser.Scene {
    private timebar: Phaser.GameObjects.Graphics;
    private timebarWidth: number;
    private timer: Phaser.Time.TimerEvent;
    private totalSeconds: number = 116.67;
    private lastSecond: number = 117.67;  
    private secondsInterval: number = 1.028;
    private actTime = 120;
    private seconds: Phaser.GameObjects.BitmapText;
    private timebarHolder: Phaser.GameObjects.Graphics;

	private _dialogText: Phaser.GameObjects.Text;
	private _firstQuestion: Phaser.GameObjects.Text;
	private _secondQuestion: Phaser.GameObjects.Text;
	private _thirdQuestion: Phaser.GameObjects.Text;
	private _fourthQuestion: Phaser.GameObjects.Text;
	private _dialogLayer: Phaser.GameObjects.Image;
	private _dialogContainer: Phaser.GameObjects.Container;
	private _numberDialog: number = 4;
	private _dialogCurrentIndex: number = -1;
	private _dialogInProgress: boolean = false;

	private finalDate: Array<string> = ["1", "9", "3", "2"];

    private player: Player;

    private mappa: Phaser.GameObjects.TileSprite;

    private chest: Phaser.GameObjects.Sprite;

	private keyOne: Phaser.Input.Keyboard.Key;
	private keyNine: Phaser.Input.Keyboard.Key;
	private keyThree: Phaser.Input.Keyboard.Key;
	private keyTwo: Phaser.Input.Keyboard.Key;

    private spazio: Phaser.Input.Keyboard.Key;
    private interazione: boolean;
    private interazioneTeschio: boolean;

    private collisioneKill: Phaser.GameObjects.Sprite;
    private positionKill: Array<{x: number, y: number, scaleX: number, scaleY: number, }> = [
        {
            x: 780,
            y: 35,
            scaleX: 130,
            scaleY: 10,
        },

        {
            x: 860,
            y: 300,
            scaleX: 10,
            scaleY: 540,
        },
    ];

	private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    private collisione: Phaser.GameObjects.Sprite;
    private positions: Array<{x: number, y:number, radians: number, scaleX: number, scaleY: number}> = [
        {
            x: 50,
            y: 160,
            radians: 1,
            scaleX: 2,
            scaleY: .75,
        },

        {
            x: 100,
            y: 90,
            radians: 1,
            scaleX: .1,
            scaleY: 5,
        },

        {
            x: 225,
            y: 150,
            radians: 1,
            scaleX: .1,
            scaleY: 10,
        },

        {
            x: 260,
            y: 170,
            radians: 1,
            scaleX: .5,
            scaleY: .1,
        },

        {
            x: 640,
            y: 40,
            radians: 1,
            scaleX: 1.9,
            scaleY: .3,
        },

        {
            x: 705,
            y: 230,
            radians: 1,
            scaleX: .1,
            scaleY: 15,
        },

        {
            x: 680,
            y: 455,
            radians: 1,
            scaleX: 1.6,
            scaleY: 1,
        },

        {
            x: 650,
            y: 472,
            radians: 1,
            scaleX: .1,
            scaleY: 2,
        },

        {
            x: 595,
            y: 472,
            radians: 1,
            scaleX: .1,
            scaleY: 2,
        },

        {
            x: 565,
            y: 455,
            radians: 1,
            scaleX: 1.6,
            scaleY: 1,
        },

        {
            x: 530,
            y: 270,
            radians: 1,
            scaleX: .1,
            scaleY: 8,
        },

        {
            x: 560,
            y: 345,
            radians: 1,
            scaleX: .8,
            scaleY: .4,
        },

        {
            x: 495,
            y: 405,
            radians: 1,
            scaleX: 1,
            scaleY: .1,
        },

        {
            x: 470,
            y: 480,
            radians: 1,
            scaleX: .1,
            scaleY: 5,
        },

        {
            x: 350,
            y: 385,
            radians: 1,
            scaleX: .1,
            scaleY: 15,
        },

        {
            x: 440,
            y: 140,
            radians: 1,
            scaleX: 5.5,
            scaleY: .1,
        },

        {
            x: 180,
            y: 550,
            radians: 1,
            scaleX: 10,
            scaleY: .1,
        },

        {
            x: 201,
            y: 335,
            radians: 1,
            scaleX: 1.5,
            scaleY: 1,
        },

        {
            x: 60,
            y: 335,
            radians: 1,
            scaleX: 3,
            scaleY: 1,
        },

        {
            x: 50,
            y: 460,
            radians: 1,
            scaleX: 2,
            scaleY: 1.5,
        },
    ];

	private interattivaTeschio: Array<Phaser.Physics.Arcade.Sprite> = [];

    private posScheletri: Array<{x: number, y: number, collX: number, collY: number}> = [
        {
            x: 155,
            y: 100,
            collX: 160,
            collY: 60,
        },

        {
            x: 650,
            y: 120,
            collX: 650,
            collY: 80,
        },

        {
            x: 280,
            y: 500,
            collX: 280,
            collY: 500,
        },
    ];

    constructor() {
        super({ key: "Lava2" });
    }

    preload()
    {
        this.load.image(GameData.tileMap[1].name, GameData.tileMap[1].path);
        this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
  
        this.interazione = false;
    }
  
    create() {
        this.createDialog();
  
        this.mappa = this.add.tileSprite(
            GameData.tileMap[1].imageX,
            GameData.tileMap[1].imageY,
            GameData.tileMap[1].width,
            GameData.tileMap[1].height,
            GameData.tileMap[1].name
        );

        this.player = new Player({
            scene: this, 
            x: 40, 
            y: 250, 
            key: "player",
        });

        // this.player = new Player({
        //     scene: this, 
        //     x: 700, 
        //     y: 250, 
        //     key: "player",
        // });
        this.player.setScale(1.15);
        this.player.setDepth(100);

        this.newObstacle();
        this.newObstacleKill();

		this.keyOne  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		this.keyNine  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE);
		this.keyThree  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		this.keyTwo  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        this.spazio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        /* ******************** CHEST ******************** */
        this.chest = this.add.sprite(775, 150, "chestLava");
        this.chest.setScale(.5);
        this.chest.setDepth(2);

        let colliderChest = this.physics.add.sprite(770, 130, "coll");
        colliderChest.setScale(50, 10);

        // Collisione con la cassa
        this.physics.add.collider(colliderChest, this.player);
        colliderChest.setImmovable(true);
        colliderChest.setDepth(-1);

        // Area per interagire con la cassa
        let areaInteractivChest = this.physics.add.sprite(770, 170, "coll");
        areaInteractivChest.setScale(80);
        areaInteractivChest.setDepth(-1);

        this.physics.add.overlap(areaInteractivChest, this.player, () => {
            this.interazione = true;
        }, null);

        /* *********************************************** */

        const timebarHeight = 20;
        this.timebarWidth = this.sys.game.config.width as number - 100;
        const background = this.add.graphics().setDepth(2);
        background.fillStyle(0x000000, 0.2);
        background.fillRect(50, 25, this.timebarWidth, timebarHeight);
        this.timebar = this.add.graphics().setDepth(2);
        this.timebar.fillStyle(0xffffff, 1);
        this.timebar.fillRect(50, 25, this.timebarWidth, timebarHeight);
        this.timer = this.time.addEvent({
        delay: this.totalSeconds * 1000,
        callback: this.onTimerComplete,
        callbackScope: this,
        loop: false,
        });
        this.seconds = this.add.bitmapText(800, 50, 'arcade', '').setScale(.5).setOrigin(0, 0).setDepth(2);
    
        this.timebarHolder = this.add.graphics().fillStyle(0x12345, .6).setDepth(0);
        this.timebarHolder.fillRect(0, 0, this.sys.game.config.width as number, 80);

        /* ==================== IMPOSTO SCHELETRI ==================== */
        this.posScheletri.forEach((element, i) => {
            this.add.sprite(element.x, element.y, "ossa").setDepth(9).setScale(.2);

            let colliderTeschio = this.physics.add.sprite(element.collX, element.collY, "coll").setOrigin(.5).setScale(30, 20).setDepth(-1);

            this.physics.add.collider(colliderTeschio, this.player);
            colliderTeschio.setImmovable(true);

            this.interattivaTeschio[i] = this.physics.add.sprite(element.x, element.y, "coll").setOrigin(.5).setScale(40).setDepth(-1);
            this.physics.add.overlap(this.interattivaTeschio[i], this.player, () => { this.interazioneTeschio = true; });
        });
        /* =========================================================== */

		this.input.keyboard.on("keydown-SPACE", () => {
			if(this.interazioneTeschio) {
				console.log("aaa");
				if(GameData.anyQuestion)
					this.openDialog();
			}
			else if (this.interazione) {
				this.chest.setFrame(1);
				this.dialogChest();
			}

		});

        /* ==================== RITORNA IN LAVA 1 ==================== */
        let ritorna = this.physics.add.sprite(-9, 0, "coll").setScale(10, this.game.canvas.height).setOrigin(0).setImmovable(true).setDepth(-1);
        this.physics.add.collider(ritorna, this.player, () => {this.scene.start("Lava1")});
        /* =========================================================== */

    }

    update(time: number, delta: number): void {

        this.player.update(time, delta);

		if(!this.physics.overlap(this.player, this.interattivaTeschio))
			this.interazioneTeschio = false;


		const remainingSeconds = Math.max(0, this.timer.getRemainingSeconds());
        const remainingWidth = this.timebarWidth * (remainingSeconds / this.totalSeconds);
        this.timebar.clear();
        this.timebar.fillStyle(0xffffff, 1);
        this.timebar.fillRect(50, 25, remainingWidth, 20);
        if(this.lastSecond - remainingSeconds >= this.secondsInterval) {
        	this.actTime -= 1;  
        //console.log(this.actTime);
        this.seconds.setText(this.actTime.toString());
        this.lastSecond = remainingSeconds;
        }
    }

    newObstacle() {
        this.positions.forEach((element) => {
            this.collisione = new Obstacle({
                scene: this,
                x: element.x,
                y: element.y,
                key: "null",
            });

            this.collisione.setScale(element.scaleX, element.scaleY);
            this.physics.add.collider(this.player, this.collisione);
        });
    }

    newObstacleKill() {
        this.positionKill.forEach((element, i) => {
            this.collisioneKill = this.physics.add.sprite(element.x, element.y, "coll");
            this.collisioneKill.setScale(element.scaleX, element.scaleY);
            this.physics.add.overlap(this.collisioneKill, this.player, () => {this.scene.start("GameOver")}, null);
            this.collisioneKill.setDepth(-1);
        });
    }

	createDialog() {

		this._dialogContainer = this.add.container().setDepth(111);
		
		//aggiungo un layer di sfondo opaco 
		//layer-dialog è una texture creata in boot.ts
		this._dialogLayer = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2 + 150 , "layer");
		this._dialogLayer.setOrigin(.5).setScale(.5, .3);
		//aggiungo un il testo
		
		this._dialogText = this.add.text(this.game.canvas.width / 2 + 300	, this.game.canvas.height / 2, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600);
    
		this._firstQuestion = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 130, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600).setInteractive().on("pointerdown", (index: number) => { this.showPhrase(1) });
	
		this._secondQuestion = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 160, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600).setInteractive().on("pointerdown", (index: number) => { this.showPhrase(2) });
	
		this._thirdQuestion = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 190, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600).setInteractive().on("pointerdown", (index: number) => { this.showPhrase(3) });

		this._fourthQuestion = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 220, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600);

		
		//aggiungo tutti gli elementi al container
		this._dialogContainer.add([this._dialogLayer, this._firstQuestion, this._secondQuestion, this._thirdQuestion, this._fourthQuestion, this._dialogText]);
		
		//setto il container invisibile
		this._dialogContainer.setAlpha(0);
	
	}
	
	openDialog() {

		this._dialogCurrentIndex = Math.floor(Math.random() * this._numberDialog);

		console.log("indexdialog: " + this._dialogCurrentIndex);

		//se c'è già un dialogo in corso esco dal metodo
		if (this._dialogInProgress) return;
		
		//setto il dialogo in corso
		this._dialogInProgress = true;

		//recupero l'oggetto corrente per settare il testo e l'immagine iniziale
		let _textObj = GameData.dialog[this._dialogCurrentIndex];

		// setto il testo con il testo corretto
		this._dialogText.setText(_textObj.question).setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2 + 70);

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
			  //rimuovo il timer
			  //setto il container trasparente
			  this._dialogContainer.setAlpha(0);
			  //riattivo la scena di game play
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

	dialogChest() {

		this._dialogText.setText('Hai ottenuto x1 chiave').setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2 + 150);
				
		this._firstQuestion.setText('');
		this._secondQuestion.setText('');
		this._thirdQuestion.setText('');
		this._fourthQuestion.setText('');

		this.tweens.add({
			targets: this._dialogContainer, duration: 300, alpha: 1
		});

		GameData.key = true;

		/* let input: string;

		this._dialogText.setText('Inserisci le cifre in modo ordinato suugerimento \'Arthur Eddington\'').setPosition(this.game.canvas.width / 2 , this.game.canvas.height / 2 + 70);

		this._firstQuestion.setText('_').setPosition(this.game.canvas.width / 2 - 50, this.game.canvas.height / 2 + 120);		
		this._secondQuestion.setText('_').setPosition(this.game.canvas.width / 2  , this.game.canvas.height / 2 + 120);
		this._thirdQuestion.setText('_').setPosition(this.game.canvas.width / 2 + 50, this.game.canvas.height / 2 + 120);
		this._fourthQuestion.setText('_').setPosition(this.game.canvas.width / 2 + 100, this.game.canvas.height / 2 + 120);
		
		this.tweens.add({
			targets: this._dialogContainer, duration: 300, alpha: 1
		});

		setTimeout(() => {
			
			input = prompt('Inserisci la data in cui Arthur Eddington ha fotografato la prima eclissi solare: ');
		
			this._firstQuestion.setText(input[0]);
			this._secondQuestion.setText(input[1]);
			this._thirdQuestion.setText(input[2]);
			this._fourthQuestion.setText(input[3]);

			if (GameData.finalDate[0] == input[0] && GameData.finalDate[1] == input[1] && GameData.finalDate[2] == input[2] && GameData.finalDate[3] == input[3] ) {
		 */	
		
		setTimeout(() => {
				this.closeDialog();
		}, 2000);
	
	  }
	
	  closeDialogChest() {
		this.tweens.add({
			targets: this._dialogContainer, duration: 300, alpha: 0,
		});
	  }

    private onTimerComplete() {
        this.scene.start("Menu");
    }
  }
  