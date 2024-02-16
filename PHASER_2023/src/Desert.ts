//import GamePlay from "./GamePlay";
// impddort GamePlay from "./GamePlay";
function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomPair(): [x: number, y: number] {
  let x = getRandomNumber(0, 1024);
  let y = getRandomNumber(0, 600);

  if (x < 87 && y >= 513) {
    y = getRandomNumber(0, 513);
  }

  return [x, y];
}


export default class Desert extends Phaser.Scene {
  private _background: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Desert",
    });
  }

  preload() {
    this.load.image("bg", "assets/images/bg.png");

    this.load.image("nave1", "assets/images/nave1.png");
    this.load.image("nave2", "assets/images/nave2.png");
    this.load.image("nave3", "assets/images/nave3.png");
    this.load.image("nave4", "assets/images/nave4.png");
    this.load.image("nave5", "assets/images/nave5.png");
  }

  create() {
    const randomPositions = [];

    for (let i = 0; i < 5; i++) {
      let [x, y] = getRandomPair();
      randomPositions.push(
        {
          x: x,
          y: y,
          image: `nave${(i) + 1}`
        });
    }

    this._background = this.add.image(512, 300, "bg");

    randomPositions.forEach(({ x, y, image }) => {
      this._background = this.add.image(x, y, image);
    });

    console.log("create:Desert");
  }


}
