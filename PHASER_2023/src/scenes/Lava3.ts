import { GameData } from "../GameData";
import Player from "../components/player/Player"
import Obstacle from "../components/obstacle/Obstacle"
import { Game } from "phaser";

export default class Lava3 extends Phaser.Scene {

  private timebar: Phaser.GameObjects.Graphics;
  private timebarWidth: number;
  private timer: Phaser.Time.TimerEvent;
  private totalSeconds: number = 116.67;
  private lastSecond: number = 117.67;  
  private secondsInterval: number = 1.028;
  private actTime = 120;
  private seconds: Phaser.GameObjects.BitmapText;
  private timebarHolder: Phaser.GameObjects.Graphics;

  private _player: Player;
  private teschio: Phaser.GameObjects.Sprite;
  private interazione: boolean;

  private _obstacleKill: Array<Obstacle> = [];
  private _obstacle: Array<Obstacle> = [];

  private collisione: Phaser.GameObjects.Sprite;
  private spazio: Phaser.Input.Keyboard.Key;
  private _invPos: Array<{x: number, y: number}> =[ 
    {//
      x: 375, 
      y: 555,
    },    
    {//2
      x: 445, 
      y: 555,
    },
    {//3
      x: 515, 
      y: 555,
    },
    {//4
      x: 585, 
      y: 555,
    },
    {//5
      x: 645, 
      y: 555,
    },
    ];
  private _spawnPos: Array<{x: number, y: number}> =[ 
  {
    x: 972, 
    y: 75,
  },    
  {
    x: 972, 
    y: 150,
  },
  {
    x: 822, 
    y: 75,
  },
  {
    x: 822, 
    y: 150,
  },
  {
    x: 700, 
    y: 75,
  },
  {
    x: 700, 
    y: 150,
  },{
    x: 550, 
    y: 75,
  },
  {
    x: 550, 
    y: 150,
  },
  {
    x: 260, 
    y: 450,
  },
  {
    x: 50, 
    y: 450,
  },
  ];

   private _positions: Array<{x: number, y:number, radians: number, scaleX: number, scaleY: number}> = [
    //parte 1 - 8 pezzi
    {
      x: 83,
      y: 93,
      radians: 1,
      scaleX: 1,
      scaleY: 184,
    }, 
    {
        x: 42,
        y: 185,
        radians: 1,
        scaleX: 83,
        scaleY: 1,
    },
    {
        x: 15,
        y: 343,
        radians: 1,
        scaleX: 1,
        scaleY: 300,
    },
    {
        x: 165,
        y: 500,
        radians: 1,
        scaleX: 300,
        scaleY: 1,
    },
    {
        x: 315,
        y: 460,
        radians: 1,
        scaleX: 1,
        scaleY: 80,
    },
    {
        x: 357,
        y: 420,
        radians: 1,
        scaleX: 86,
        scaleY: 1,
    },
    {
        x: 400,
        y: 380,
        radians: 1,
        scaleX: 1,
        scaleY: 80,
    },
    {
        x: 713,
        y: 340,
        radians: 1,
        scaleX: 624,
        scaleY: 1,
    },

    // parte 2 - 5 pezzi
    {
      x: 415,
      y: 50,
      radians: 1,
      scaleX: 1,
      scaleY: 100,
    },
    {
        x: 285,
        y: 100,
        radians: 1,
        scaleX: 260,
        scaleY: 1,
      },
    {
        x: 155,
        y: 140,
        radians: 1,
        scaleX: 1,
        scaleY: 80,
      },
    {
        x: 327,
        y: 180,
        radians: 1,
        scaleX: 345,
        scaleY: 1,
      },
    {
        x: 500,
        y: 90,
        radians: 1,
        scaleX: 1,
        scaleY: 180,
      }
  ];

  private _tileMap: Phaser.GameObjects.TileSprite;
 

  constructor() {
    super({
      key: "Lava3",
    });
  }

  preload() { 
    this.load
      .image(
        GameData.tileMap[0].name,
        GameData.tileMap[2].path
    );
    console.log(GameData.tileMap[2].name + " - " + GameData.tileMap[2].path);
    this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
    this.load.audio('bg-mario-lava', 'assets/sounds/mars_volcano.mp3');
  }

  create() {
    if(!GameData.isMarsSound) {
      this.sound.stopAll();
      const music = this.sound.add('bg-mario-lava', {loop: false, volume: 1});
      music.play();
      GameData.isMarsSound = true;
    }

    this._player = new Player({ 
      scene: this, 
      x: GameData.posLava3.x, 
      y: GameData.posLava3.y,
      key: "player",
    }),
    this._player.setScale(1.15);
    this.genRandomPieces();

    this.newObstacleKill(this._positions, "null")
    //this.newObstacleKill(this._positionsKill, "null");

    this._tileMap = this.add
      .tileSprite(
        GameData.tileMap[0].imageX,
        GameData.tileMap[0].imageY,
        GameData.tileMap[0].width,
        GameData.tileMap[0].height,
        GameData.tileMap[0].name
      ).setDepth(1)

    this.physics.add.collider(this._player, this._obstacle);
    //this.physics.add.collider(this._player, this._obstacleKill, this.onCollideKill, null, this)

    /* let _animation = {
      key: "rotation",
      frames: this.anims.generateFrameNumbers("bomb", { frames: this._animations }),
      frameRate: 10,
      yoyo: false,
      repeat: -1 // -1 ripete all'infinito
    };

    this.anims.create(_animation); */
  

    /* this._sprites = this.add.group();
    this._sprites.add(this._sprite1);
    this._sprites.setXY(25, 25, 50, 50); */
  
    /*
    this.input.on('pointerdown', () => {
      let bomb: any = <Phaser.GameObjects.Sprite>Phaser.Utils.Array.RemoveRandomElement(this._sprites.getChildren());

      if(bomb){
        bomb.destroy();
      }
    })
    */

    this.cameras.main.setBackgroundColor("#000000");

    console.log("create:Lava3");

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
    this.teschio.setDepth(1);
    this.teschio.setScale(.2);

    let collisioneTeschio = this.physics.add.sprite(590, 60, "coll");
    collisioneTeschio.setDepth(-99).setScale(20).setImmovable(true);

    this.physics.add.collider(collisioneTeschio, this._player);

    // interazione
    let areaInteractivTeschio = this.physics.add.sprite(600, 90, "coll");
    areaInteractivTeschio.setScale(50);
    areaInteractivTeschio.setDepth(-9);

    /*this.physics.add.overlap(areaInteractivTeschio, this._player, () => {
      this.interazione = true;
    });
    
    this.input.keyboard.on("keydown-SPACE", () => {
      if(this.interazione)
        console.log("MAMMT");
    });

    this.input.keyboard.on("keyup-SPACE", () => {this.interazione = false});*/
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
    GameData.posLava3.x = this._player.x;
    GameData.posLava3.y = this._player.y;
    // console.log("player x: " + this._player.x + " player y: " + this._player.y);
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

/*  newObstacle(position: Array<{x: number, y: number, radians: number, scaleX: number, scaleY: number}>, key?: string) {
    position.forEach((el, i) => {
        this._obstacle[i] = new Obstacle({
            scene: this,
            x: el.x,
            y: el.y,
            key: key,
        });
        this._obstacle[i].setScale(el.scaleX, el.scaleY);
        //this._obstacle[i].setRotation(Math.PI / el.radians);
        this.collisione[i] = this.physics.add.sprite(el.x, el.y, "coll");
        this.collisione[i].setScale(el.scaleX, el.scaleY);
        this.collisione[i].setDepth(9);
    });
  }111111111*/
  private genRandomPieces(){
    let collisionNave: Array<Phaser.Physics.Arcade.Sprite> = [];
    let oggetti: Array<Phaser.Physics.Arcade.Sprite> = [];
    let z = [false, false, false, false, false, false, false, false, false, false];
    let yes = ["n1", "n2", "n3", "n4", "n5"]
    let o = 0;
    for (var i = 0; i<5; i++){
      let a = Math.floor(Math.random() * 10);
      if (z[a]){
        i--;
      }else{
        console.log(a);
        collisionNave[i] = this.physics.add.sprite(this._spawnPos[a].x, this._spawnPos[a].y, yes[i]).setDepth(99).setScale(4).setImmovable(true);
        z[a] = true; 
      }
    } 
    this.physics.add.overlap(collisionNave[0], this._player, () => {
      oggetti[o] = this.physics.add.sprite(this._invPos[o].x, this._invPos[o].y, "n1").setDepth(99).setScale(3).setImmovable(true);
      collisionNave[0].destroy();
      o++;
    });
    this.physics.add.overlap(collisionNave[1], this._player, () => {
      oggetti[o] = this.physics.add.sprite(this._invPos[o].x, this._invPos[o].y, "n2").setDepth(99).setScale(3).setImmovable(true);
      collisionNave[1].destroy();
      o++;
    });
    this.physics.add.overlap(collisionNave[2], this._player, () => {
      oggetti[o] = this.physics.add.sprite(this._invPos[o].x, this._invPos[o].y, "n3").setDepth(99).setScale(3).setImmovable(true);
      collisionNave[2].destroy();
      o++;
    });
    this.physics.add.overlap(collisionNave[3], this._player, () => {
      oggetti[o] = this.physics.add.sprite(this._invPos[o].x, this._invPos[o].y, "n4").setDepth(99).setScale(3).setImmovable(true);
      collisionNave[3].destroy();
      o++;
    });
    this.physics.add.overlap(collisionNave[4], this._player, () => {
      oggetti[o] = this.physics.add.sprite(this._invPos[o].x, this._invPos[o].y, "n5").setDepth(99).setScale(3).setImmovable(true);
      collisionNave[4].destroy();
      o++;  
    });
    this.input.keyboard.on("keydown-SPACE", () => {
      console.log(o)
        console.log("MAMMT");
    });
    let aIT = this.physics.add.sprite(600, 90, "coll").setScale(50).setDepth(-9);
    this.physics.add.overlap(aIT, this._player, () => {
      this.input.keyboard.on("keydown-SPACE", () => {
        if(o === 5) this.scene.start("Uranus")
      });
    })
    //console.log(o)
  } 

  /*
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
  */ 
  newObstacleKill(position: Array<{x: number, y: number, scaleX: number, scaleY: number}>, key?: string) {
    this._positions.forEach((element, i) => {
      let collisione = this.physics.add.sprite(element.x, element.y, "coll");
      //this.collisione.setScale(element.scaleX, element.scaleY);
      collisione.setDepth(-1).setScale(element.scaleX, element.scaleY).setImmovable(true);
      this.physics.add.collider(collisione, this._player);
      //this.physics.add.overlap(this.collisione, this._player, () => {this.scene.start("GameOver")}, null);
      //this.collisione.setDepth(99);
    });
  }

  onCollideKill() {
    this.scene.start("GameOver");
    // this.scene.start("GamePlay");
  }

  private onTimerComplete() {
    this.scene.start("Menu");
  }
}