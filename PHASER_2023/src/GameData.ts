export let GameData: any = {
	
	globals: {
	  leaderboard: false,
	  gameWidth: 1024,
	  gameHeight: 600,
	  bgColor: "#ffffff",
	  debug: false,
	},
  
	preloader: {
	  bgColor: "",
	  image: "phaser",
	  imageX: 512,
	  imageY: 300,
	  loadingText: "",
	},
  
	background: {
	  bgColor: "",
	  image: "background",
	  imageX: 512,
	  imageY: 300,
	  loadingText: "",
	},
  
	logo: {
	  bgColor: "",
	  image: "logo-phaser",
	  imageX: 120,
	  imageY: 130,
	  loadingText: "",
	},
  
	intro: {
	  bgColor: "",
	  image: "intro",
	  imageX: 512,
	  imageY: 300,
	  loadingText: "",
	},
  
	tileMap: [
	  {
		name: "tilemap",
		path: "assets/images/Map/Lava-1.png",
		imageX: 950,
		imageY: 540,
		width: 1920,
		height: 1080,
	  },
  
	  {
		name: "lava2",
		path: "assets/images/Map/Lava-2.png",
		imageX: 950,
		imageY: 540,
		width: 1920,
		height: 1080,
	  },
	],
  
	spritesheets: [
		{
      name: "n1",
      path: "assets/images/Sprite/nave1.png",
      width: 6,
      height: 14,
      frames: 1, 
  },
  {
	name: "spaceship",
	path: "assets/images/spaceship.png",
	width: 32,
	height: 44,
	imageX: 480,
	imageY: 560,
	frames: 4
  },
  {
    name: "n2",
    path: "assets/images/Sprite/nave2.png",
    width: 6,
      height: 14,
      frames: 1, 
},
{
  name: "n3",
  path: "assets/images/Sprite/nave3.png",
  width: 6,
      height: 14,
      frames: 1, 
},
{
  name: "n4",
  path: "assets/images/Sprite/nave4.png",
  width: 6,
      height: 14,
      frames: 1,  
},
	{
	name: "n5",
	path: "assets/images/Sprite/nave5.png",
	width: 6,
		height: 14,
		frames: 1,   
	},
		{
			name: "player",
			path: "assets/images/Sprite/Domfy1.png",
			width: 38,
			height: 50,
			frames: 12, 
		},

		{
			name: "masso",
			path: "assets/images/masso.png",
			width: 80,
			height: 80,
			frames: 12, 
		},
		{
			name: "SpaceShip",
			path: "assets/images/spaceship.png",
			imageX: 480,
			imageY: 560,
			width: 33,
			height: 47,
			frames: 4,
	  
		},
		{
		  name: "coll",
		  path: "assets/images/coll.jpg",
		  width: 1,
		  height: 1,
		  frames: 1,
		},
	
		{
		  name: "chestLava",
		  path: "assets/images/chest.png",
		  width: 128,
		  height: 112,
		  frames: 2,
		},
	
		{
		  name: "ossa",
		  path: "assets/images/Bones.png",
		  width: 316,
		  height: 177,
		  frame: 1,
		},
	
		{
		  name: "alien",
		  path: "assets/images/Mafiosi/alieno.png",
		  width: 155,
		  height: 115,
		  frames: 6,
		},
		{
		  name: "bullet",
		  path: "assets/images/flares.png",
		  width: 130,
		  height: 132,
		  frames: 5
		},
		
    ],

	images: [
		{ name: "logo", path: "assets/images/galaxian.png" },
		{ name: "layer", path: "assets/images/layer.png" },
		{ name: "logo-phaser", path: "assets/images/logo-phaser.png", },
	],

	dialog: [
		
		{ question: "Quanto dura una rotazione terrestre sul proprio asse?",
		  answ1: "23h 58m", answ2: "24h", answ3: "23h 56m", rightAnswer: 3, },

		{ question: "Quale fu il primo popolo ad utilizzare l'ora?", 
		  answ1: "Aztechi", answ2: "Babilonesi", answ3: "Maya", rightAnswer: 2, },

		{ question: "Come si chiama l'orologio tradizione del sud della Germania?",
		  answ1: "Cucu' nero", answ2: "Cucu' bianco", answ3: "Cucu' giallo", rightAnswer: 1, },

		{ question: "In quale strato atmosferico si verifica la maggior parte del tema atmosferico?", 
		  answ1: "Troposfera", answ2: "Litosfera", answ3: "Termosfera", rightAnswer: 1, },
	],
	
	finalDate: ["1", "9", "3", "2"],
	key: true,

	
	atlas: [],
	sounds: [],
	audio: [],
	bitmapfont: [],
	posLava1: {
		x: 30,
		y:220,
	},
	anyQuestion: true,
	diamonds: 0
  };
