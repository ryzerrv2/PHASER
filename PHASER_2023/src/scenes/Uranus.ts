import PlayerXY from "../components/PlayerXY/PlayerXY"
import { GameData } from "../GameData";

export default class Uranus extends Phaser.Scene
{
  private timebar: Phaser.GameObjects.Graphics;
  private timebarWidth: number;
  private timer: Phaser.Time.TimerEvent;
  private totalSeconds: number = 86.4;
  private lastSecond: number = 90;  
  private secondsInterval: number = 0.72;
  private actTime = 120;
  private seconds: Phaser.GameObjects.BitmapText;
  private diamondCounter: Phaser.GameObjects.BitmapText;
  private timebarHolder: Phaser.GameObjects.Graphics;

  private _player: PlayerXY;
  private _diamonds: Array<Phaser.Physics.Arcade.Sprite> = [null, null, null, null, null];
  private pedana: Phaser.Physics.Arcade.Sprite;
  private rock: Phaser.Physics.Arcade.Sprite;
  private index: number = 0;
  private scales: Array<number> = [.6, .3, .4, .65, .5];
  private values: Array<number> = [3, 1, 1, 5, 2];

  constructor() 
  {
    super({key: "Uranus"});
  }

  preload() {
    this.load.image('bg-mario-uranus', 'assets/images/bg/Ghiaccio/ice-bg.png');
    this.load.image('bg-mario-uranus-pedana', 'assets/images/bg/Ghiaccio/ice-tile.png');
    this.load.image('bg-mario-uranus-obstacle', 'assets/images/bg/Ghiaccio/ice-collide.png');
    this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
    this.load.image('bg-mario-diamond', 'assets/images/Sprite/Diamante.png');
    this.load.audio('bg-mario-uranus-music', 'assets/sounds/uranus.mp3');
  }

  create() 
  {
    this.sound.stopAll();
    this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'bg-mario-uranus').setOrigin(.5, .5);
    const music = this.sound.add('bg-mario-uranus-music', {loop: false, volume: 1});
    music.play();

    this._player = new PlayerXY({ 
      scene: this, 
      x: this.game.canvas.width / 2, 
      y: 450, 
      key: "player",
    }),
    this._player.setScale(1.15);

    this.input.keyboard.on("keydown-X", () => this.scene.start("Loading"));

    this.pedana = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height - 55, 'bg-mario-uranus-pedana').setOrigin(.5, .5);
    this.pedana.setImmovable(true);
    this.physics.add.collider(this.pedana, this._player, () => { this._player.canJump = true });

    this.rock = this.physics.add.sprite(880, 440, 'axs').setImmovable(true).setScale(5, 2).setOrigin(0, .5).setDepth(-1);
    this.physics.add.collider(this.rock, this._player);


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
    this.diamondCounter = this.add.bitmapText(50, 50, 'arcade', '0').setScale(.5).setOrigin(0, 0).setDepth(2);

    this.timebarHolder = this.add.graphics().fillStyle(0x12345, .6).setDepth(0);
    this.timebarHolder.fillRect(0, 0, this.sys.game.config.width as number, 80);
  }

  update(time: number, delta: number) 
  {
    this._player.update(time, delta);

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

      let this_spwaned = this.index;
      if(this.index >= 5) {
        this.index = 0;
        this_spwaned = 0;
      }
      this._diamonds[this_spwaned] = this.physics.add.sprite(Math.floor(Math.random() * (this.sys.game.config.width as number)),0,'bg-mario-diamond').setOrigin(.5,.5).setImmovable(true).setGravityY(100).setScale(this.scales[this_spwaned]);
      this.physics.add.collider(this._diamonds[this_spwaned], this._player, () => {
        console.log(this_spwaned);
        GameData.diamonds += this.values[this_spwaned];
        this.diamondCounter.setText(GameData.diamonds.toString());
        this._diamonds[this_spwaned].destroy();
      });
      this.physics.add.collider(this._diamonds[this_spwaned], this.pedana, () => {
        this._diamonds[this_spwaned].destroy();
      });
      this.physics.add.collider(this._diamonds[this_spwaned], this.rock, () => {
        this._diamonds[this_spwaned].destroy();
      });
      this.index += 1;
    }
  }

  private onTimerComplete() {
    this.scene.start("Menu");
  }
}