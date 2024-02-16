// import Spaceship from '../components/spaceship/spaceship';
import SpaceshipMafiosa from '../components/spaceship_mafiosa/spaceship_mafiosa';
import {GameData} from '../GameData';
import { Coppia } from "./Intro";

export default class SpaceWar extends Phaser.Scene
{
    
    // private spaceship: Spaceship;
    // private spaceship_mafiosa: SpaceshipMafiosa;

    private explosion: Phaser.GameObjects.Sprite;
    private bullet: Phaser.GameObjects.Sprite;
    private asteroids: Array<Phaser.GameObjects.Sprite> = [null, null, null, null, null];
    private spawn_positions: Array<Coppia> = [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 4}, {x: 5, y: 5}];

    private timebarWidth: number;
    private timer: Phaser.Time.TimerEvent;
    private timerSpeed: Phaser.Time.TimerEvent;
    private totalSeconds: number = 60;
    private lastSecond: number = 200;  
    private secondsInterval: number = 1;
    private actTime = 180;
    private seconds: Phaser.GameObjects.BitmapText;

    private bg: Phaser.GameObjects.TileSprite;

    private navicella: Phaser.Physics.Arcade.Sprite;
    private navicellaNemica: Phaser.Physics.Arcade.Sprite;

    private w: Phaser.Input.Keyboard.Key;
    private s: Phaser.Input.Keyboard.Key;
    private a: Phaser.Input.Keyboard.Key;
    private d: Phaser.Input.Keyboard.Key;

    private velocita: number = 300;
    private velocitaNemici: number = 150;
    
    private boost: boolean;

    constructor() {
        super({key: "SpaceWar"});
    }

    preload() {
        this.load.image('bg-mario-space', 'assets/images/bg-space.jpeg');
        this.load.audio('bg-mario-war', 'assets/sounds/back_to_earth.mp3');
    }
    
    create() 
    {
        this.input.keyboard.on("keydown-X", () => this.scene.start("Loading"));

        this.sound.stopAll();

        this.boost = true;

        let anima = {
            key: "rotazione",
            frames: this.anims.generateFrameNames("masso", {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}),
            frameRate: 15,
            yoyo: false,
            repeat: -1,
        };
        this.anims.create(anima);

        const music = this.sound.add('bg-mario-war', {loop: false, volume: 1});
        music.play();

        this.bg = this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'bg-mario-space');
        this.bg.setOrigin(0, 0);
        this.bg.tileScaleX = 1;
        this.bg.tileScaleY = 1;
        this.bg.setTilePosition(0, 0);

        //this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'bg-mario-space').setOrigin(.5, .5);
        this.navicella = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, "spaceship").setRotation(-(Math.PI / 2)).setScale(1.5);
        this.navicellaNemica = this.physics.add.sprite((this.game.canvas.width / 2) + 450, this.game.canvas.height / 2, "spaceship").setRotation(-(Math.PI / 2));

        this.navicella.setCollideWorldBounds(true);

        this.totalSeconds = 180;
        this.lastSecond = 200;  
        this.secondsInterval = 1;
        this.actTime = 180;
        
        // this.spaceship = new Spaceship({
        //     scene: this,
        //     x: this.game.canvas.width / 2,
        //     y: this.game.canvas.height / 2,
        //     key: GameData.spritesheets[1].name,
        // });
        // this.spaceship.setRotation(-(Math.PI/2)).setScale(2);

        // this.spaceship_mafiosa = new SpaceshipMafiosa({
        //     scene: this,
        //     x: this.game.canvas.width - 150,
        //     y: this.game.canvas.height / 2,
        //     key: GameData.spritesheets[1].name,
        // });
        // this.spaceship_mafiosa.setRotation(-(Math.PI/2)).setScale(1.1);


        this.timer = this.time.addEvent({
            delay: this.totalSeconds * 1000,
            callback: this.onTimerComplete,
            callbackScope: this,
            loop: false,
        });

        this.timerSpeed = this.time.addEvent({
            delay: 5000,
            callback: () => {this.boost = true},
            callbackScope: this,
            loop: true,
        });

        const timer2 = this.time.addEvent({
            delay: 50,
            callback: () => {
                this.bg.tilePositionX += 100;
                this.bg.tilePositionY += 100;
            },
            callbackScope: this,
            loop: true,
        });

        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

         this.input.keyboard.on("keydown-SPACE", () => {
            if(this.boost)
            {
                this.velocita *= 2;
                let ora = this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        this.velocita = 300;
                    },
                    callbackScope: this,
                    loop: false,
                });
                this.boost = false;
            }
         })
    }

    update(time: number, delta: number): void {
        this.navicella.setVelocity(0).setDepth(2);
        this.navicellaNemica.setVelocity(0).setDepth(2);
        console.log(Math.random() * (1.2 - 0.4 + 1) + 0.4);
        // this.spaceship.update(time, delta);
        // this.spaceship_mafiosa.update(time, delta);

        const remainingSeconds = Math.max(0, this.timer.getRemainingSeconds());
        
        // console.log('ls: ' + String(this.lastSecond));
        // console.log('rs: ' + String(remainingSeconds));
        if((this.lastSecond - remainingSeconds) >= this.secondsInterval) {
            // console.log('aaa');

            let pietra = this.physics.add.sprite(0, (Math.floor(Math.random() * ((this.game.canvas.height-80) + 1))), "masso").setOrigin(0).setScale(Math.random() * (1.2 - 0.4) + 0.4);
            let proiettile = this.physics.add.sprite(this.navicellaNemica.x - 100, this.navicellaNemica.y, "bullet").setOrigin(0, .5).setFrame(2).setScale(.5)
            pietra.setImmovable(true);
            
            //pietra.play("rotazione");

            this.tweens.add({
                targets: pietra,
                x: this.game.canvas.width + 80,
                ease: "Linear in",
                duration: 2500,
            });

            this.tweens.add({
                targets: proiettile,
                x: -this.game.canvas.width + 80,
                ease: "Linear in",
                duration: 5000,
            });

            this.physics.add.collider(pietra, this.navicella, () => this.scene.start("GameOver"));
            this.physics.add.collider(proiettile, this.navicella, () => this.scene.start("GameOver"));

            this.actTime -= 1;  
            this.lastSecond = remainingSeconds;
        }

        if(this.w.isDown)
        {
            this.navicella.setVelocityY(-this.velocita);
        }
        else if(this.s.isDown)
        {
            this.navicella.setVelocityY(this.velocita);
        }

        if(this.a.isDown)
        {
            this.navicella.setVelocityX(-(this.velocita-50));
        }
        else if(this.d.isDown)
        {
            this.navicella.setVelocityX(this.velocita-50);
        }

        if(this.navicella.y > this.navicellaNemica.y && this.navicella.y - 20 > this.navicellaNemica.y)
            this.navicellaNemica.setVelocityY(this.velocitaNemici);
        else if(this.navicella.y < this.navicellaNemica.y && this.navicella.y + 20 < this.navicellaNemica.y)
            this.navicellaNemica.setVelocityY(-this.velocitaNemici);
    }

    private onTimerComplete() {}
}