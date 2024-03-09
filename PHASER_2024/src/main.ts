import "phaser"

import HelloWorldScene from "./scenes/HelloWorldScene"
import Preloader from "./scenes/Preloader"

import { gameSettings } from "./consts/GameSettings"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: gameSettings.bgColor,
	parent: 'my-game',
  width: gameSettings.gameWidth,
	height: gameSettings.gameHeight,
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
  physics: {
    default: "arcade",
    arcade: { 
      gravity: gameSettings.gravity,
      debug: gameSettings.debug 
    }
  },

  scene: [
    Preloader,
    HelloWorldScene,
  ],
}

export default new Phaser.Game(config)