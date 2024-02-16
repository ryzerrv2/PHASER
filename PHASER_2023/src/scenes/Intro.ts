export interface Coppia {
  x?: number;
  y?: number;
};

type TextPositions = {
  [key: string]: Coppia;
};

export default class Intro extends Phaser.Scene {
  private images_names: Array<string> = ['intro-1', 'intro-2', 'intro-3', 'intro-4'];
  private dialogues: Array<string> = [
    'Chrono ha un problema con il gioco',
    'Per potersi permettere le giocate si indebita con persone losche',
    'I mafiosi lo inseguono per riavere il denaro ma cade...',
    'IN UN TUNNEL SPAZIO-TEMPORALE'
  ];

  private text_positions: Array<{x: number, y: number}> = [
    {x: 150, y: 525},
    {x: 50, y: 525},
    {x: 100, y: 525},
    {x: 250, y: 270},
  ];
  
  private index: number = 0;

  private dialogo: Phaser.GameObjects.BitmapText;
  private tavola: Phaser.GameObjects.Image;
  private dialogHolder: Phaser.GameObjects.Graphics;

  private fadeinDelays: Array<number> = [3000, 3000, 3000, 0];

  private music: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: "Intro",
    });
  }

  preload() 
  {
    this.load.image('intro-1', 'assets/images/intro/intro-1.jpg');
    this.load.image('intro-2', 'assets/images/intro/intro-2.jpg');
    this.load.image('intro-3', 'assets/images/intro/intro-3.jpg');
    this.load.image('intro-4', 'assets/images/intro/intro-4.jpg');
    this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
    this.load.audio('bg-mario-intro', 'assets/sounds/intro.mp3');
  }

  create() 
  {
    this.cameras.main.setBackgroundColor(0x000000);

    this.dialoghi(this.index);
    this.input.keyboard.on('keydown-SPACE', () => {
      this.dialogo.destroy();
      this.tavola.destroy(); 
      this.dialogHolder.destroy();
      this.index += 1;
      if(this.index == 4) {
        this.music.stop();
        //this.scene.start('Mars');
        this.scene.start('Loading');
      }
      else this.dialoghi(this.index);
    });

    this.music = this.sound.add('bg-mario-intro', {loop: true, volume: 1});
    this.music.play();
  }

  

  update(time: number, delta: number): void 
  {
  }

  dialoghi(index: number): void
  {
    this.tavola = this.add.image(0, 0, this.images_names[index]).setOrigin(0).setScale(1).setAlpha(0);
    this.dialogHolder = this.add.graphics().setDepth(1);
    this.dialogHolder.fillRect(0, 500, this.sys.game.config.width as number, 100);
    this.dialogHolder.fillStyle(0x000000, 0.7);
    
    this.tweens.add({
      targets: this.tavola,
      alpha: 1,
      duration: this.fadeinDelays[index],
      ease: 'Power2',
      yoyo: false
    })   
  
    var tween_timer = this.time.addEvent({
      delay: this.fadeinDelays[index],
      callback: () => {
        this.dialogo = this.add.bitmapText(this.game.canvas.width / 2, this.text_positions[index].y, 'arcade', '').setScale(.5).setOrigin(.5, .5).setDepth(2);

    var _dialogueIndex: number = 0;

    var timer = this.time.addEvent({
      delay: 80,
      callback: () => {
        this.dialogo.text += this.dialogues[index][_dialogueIndex];
        _dialogueIndex += 1;
        if(_dialogueIndex == this.dialogues[index].length) {
          timer.remove();
        }
      },
      args: [this],
      loop: true
      });
      },
      args: [this],
      loop: false
    });
    
  }
}

