export default class GameOver extends Phaser.Scene {
  private logo: Phaser.GameObjects.Image;
  private text: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "GameOver",
    });
  }

  preload()
  {
    this.load.image('bg-mario-sad-gab', 'assets/images/sadchrono.png');
    this.load.image('logo-loading', 'assets/images/logo-loading.png');
    this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
    this.load.audio('bg-mario-gameover', 'assets/sounds/game_over.mp3');
  }

  create() {
    this.cameras.main.setBackgroundColor(0x000000);
    this.sound.stopAll();
    const music = this.sound.add('bg-mario-gameover', {loop: true, volume: 1});
    music.play();

    this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'bg-mario-sad-gab').setOrigin(.5, .5).setScale(6).setDepth(1);
    this.logo = this.add.image(this.game.canvas.width / 2, (this.game.canvas.height / 2), 'logo-loading').setAlpha(.2).setDepth(0);
    this.add.bitmapText(this.game.canvas.width / 2, (this.game.canvas.height / 2) + 150, 'arcade', 'Game Over').setOrigin(.5, .5);
  
    this.input.on('pointerdown', () => { this.scene.start('Menu'); });
  }

  update(time: number, delta: number): void {
    this.logo.rotation += 1;
  }

}
