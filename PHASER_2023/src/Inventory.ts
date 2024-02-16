export default class Inventory extends Phaser.Scene {

  private _myPopUp: Phaser.GameObjects.Container;

  private _myButton: Phaser.GameObjects.Text;

  private _myImage: Phaser.GameObjects.Image;
  private inventoryItemCount: number = 0;

  constructor() {
    super({
      key: "Inventory",
    });


  }

  preload() {
    var inventory = this.make.graphics({ x: 0, y: 0, add: false });
    var book = this.make.graphics({ x: 0, y: 0, add: false });

    //bordo verticale
    inventory.fillStyle(0xffffff, 1);
    inventory.fillRect(270, 300, 5, 45);
    inventory.fillRect(320, 300, 5, 45);
    inventory.fillRect(370, 300, 5, 45);
    inventory.fillRect(420, 300, 5, 45);
    inventory.fillRect(470, 300, 5, 45);
    inventory.fillRect(520, 300, 5, 45);

    //bordo orizzontale
    inventory.fillRect(270, 295, 255, 5);
    inventory.fillRect(270, 345, 255, 5);


    //celle
    inventory.fillStyle(0xffffff, 0.4);
    inventory.fillRect(275, 300, 45, 45);
    inventory.fillRect(325, 300, 45, 45);
    inventory.fillRect(375, 300, 45, 45);
    inventory.fillRect(425, 300, 45, 45);
    inventory.fillRect(475, 300, 45, 45);
    inventory.generateTexture("popup", 800, 400);

    //bottone
    book.fillStyle(0x0000ff, 1)
    book.fillRect(275, 75, 255, 50);
    book.generateTexture("write", 800, 400);
  }
  create() {

    this.cameras.main.setBackgroundColor(0xff00ff);

    this._myPopUp = this.add.container();

    this._myButton = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 - 100, "Clicca", { fontSize: "50px" }).setTint(0x00ff00).setOrigin(.5).setInteractive().on("pointerdown", () => {
      if (this.inventoryItemCount < 5) {
        this._myImage = this.add.image(410 + (this.inventoryItemCount * 50), 425, "logo-phaser");
        this._myImage.displayWidth = 40;
        this._myImage.displayHeight = 40;
        this.inventoryItemCount++;

        this._myPopUp.add(this._myImage);
      }
    });

    let _myPopupPopup: Phaser.GameObjects.Image = this.add.image(512, 300, "popup");
    let _myWrite: Phaser.GameObjects.Image = this.add.image(512, 300, "write");

    this._myPopUp.add([_myWrite, _myPopupPopup]);
  }

  update(time: number, delta: number): void { }

}
