const WinWidth = window.innerWidth * window.devicePixelRatio;
const WinHeight = window.innerHeight * window.devicePixelRatio;

export let GameData: gameData = {
  globals: {
    gameWidth: WinWidth,
    gameHeight: WinHeight,
    bgColor: "#ffffff",
    debug: false
  },

  preloader: {
    bgColor: "#f2f2f2",
    image: "logo",
    imageX: WinWidth / 2,
    imageY: WinHeight / 2,
    loadingText: "Caricamento...",
    loadingTextFont: "roboto",
    loadingTextComplete: "Clicca per iniziare!",
    loadingTextY: (WinHeight / 2) + 350,
    loadingBarColor: 0xff0000,
    loadingBarY: (WinHeight / 2) + 295,
  },

  spritesheets: [

    { name: "player", path: "assets/images/player.png", width: 82, height: 70, frames: 50 },

  ],
  images: [

    { name: "phaser", path: "assets/images/logo-phaser.png" },
    { name: "freedoom", path: "assets/images/freedoom.png" },
    { name: "thelucasart", path: "assets/images/thelucasart.png" },
    { name: "intro-bg", path: "assets/images/intro-bg.jpg" },
    { name: "bg-1", path: "assets/images/bg/1.png" },
    { name: "bg-2", path: "assets/images/bg/2.png" },
    { name: "bg-3", path: "assets/images/bg/3.png" },
    { name: "bg-4", path: "assets/images/bg/4.png" },
    { name: "bg-5", path: "assets/images/bg/5.png" },
    { name: "bg-6", path: "assets/images/bg/6.png" },
    { name: "bg-7", path: "assets/images/bg/7.png" },



  ],
  atlas: [],
  sounds: [
    /*{
    name: "music",
    paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
    volume: 1,
    loop: true,
    frame: 1,
  }*/
  ],

  videos: [

    // { name: "video", path: "/assets/video/video.mp4" },

  ],
  audios: [

    /*{
    name: "sfx",
    jsonpath: "assets/sounds/sfx.json",
    paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
    instances: 10,
  }*/
  ],

  scripts: [],
  fonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }],
  bitmapfonts: [],
};
