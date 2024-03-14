import "phaser";
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import Intro from "./scenes/Intro";
import Hud from "./scenes/Hud";
import GameOver from "./scenes/GameOver";
import GamePlay from "./scenes/GamePlay";
import Mars from "./scenes/Mars"
import AlienRun from "./scenes/AlienRun";
import Uranus from "./scenes/Uranus";
import Menu from "./scenes/Menu"
import Loading from "./scenes/Loading";
import SpaceWar from "./scenes/SpaceWar";
import Lava1 from "./scenes/Lava1";
import Lava2 from "./scenes/Lava2";
import Timer from "./scenes/Timer";
// import Lava3 from "./scenes/Lava3";
import { GameData } from "./GameData";
import HowToPlay from "./scenes/HowToPlay";
import Credits from "./scenes/Credits";
import HowToPlayLava from "./scenes/HowToPlayLava";
import Earth from "./scenes/Earth";

window.addEventListener("load", () => {

  const config: any = {
    type: Phaser.WEBGL,
    title: "Phaser",
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
	pixelArt: true,
    scale: {
      mode: Phaser.Scale.FIT,
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },

    scene: [
      Boot,
      Preloader,
      Intro,
      Hud,
      GamePlay,
      GameOver,
      Mars,
      Uranus,
      AlienRun,
      Menu,
      Loading,
      SpaceWar,
      Lava1,
      Lava2,
      HowToPlay,
      Credits,
      Timer,
      // Lava2, 
      HowToPlayLava,
      Earth
      // Lava3
    ],

    physics: {
      default: "arcade",
      arcade: {
        debug: GameData.globals.debug,

      }
    },
    input: {
      activePointers: 2,
      keyboard: true,
    },
    render: {
      pixelArt: false,
      antialias: true,
    },
  };

  const game = new Phaser.Game(config);


});
