class Map_2 extends Phaser.Scene {
  constructor ()
  {
      super({ key: 'Map_2' });
  }

  preload() {

      // Step 1, load JSON
this.load.tilemapTiledJSON("map2","assets/Map_2.tmj")

      // Step 2 : Preload any images here
      this.load.image("buildingPng","assets/Buildings32x32.png")
      this.load.image("streetPng","assets/Inside_B.png")

      this.load.spritesheet("gen", "assets/charac1.png", {
       frameWidth: 64,
       frameHeight: 64,
      })
       this.load.spritesheet("heart2", "assets/germs.png", {
        frameWidth: 64,
        frameHeight: 64,
     });
     this.load.spritesheet("orange", "assets/orange.png", {
      frameWidth: 64,
      frameHeight: 64,
   });
  this.load.spritesheet("health", "assets/heart.png", {
   frameWidth: 64,
   frameHeight: 64,
});
   this.load.audio("bgsong", "assets/BGsong.mp3");
   this.load.audio("death", "assets/death.mp3");
   this.load.audio("ching", "assets/ching.mp3");
  } // end of preload //

  create (){
    this.ching = this.sound.add("ching");
  console.log("map2")

  
  //Step 3 - Create the map from main
  let map = this.make.tilemap({ key: "map2" });
  this.death = this.sound.add("death");
  // Step 4 Load the game tiles
  // 1st parameter is name in Tiled,
  // 2nd parameter is key in Preload

  let groundTiles = map.addTilesetImage("Buildings32x32", "buildingPng");
  let furnitureTiles = map.addTilesetImage("Inside_B", "streetPng");
  let furniture2Tiles = map.addTilesetImage("Inside_B", "streetPng");



  //Step 5  create an array of tiles
  let tilesArray = [
         groundTiles,
         furnitureTiles,
         furniture2Tiles
       ];

  // Step 6  Load in layers by layers
  this.groundLayer = map.createLayer("ground",tilesArray,0,0);

  this.furitureLayer = map.createLayer("furniture",tilesArray,0,0);

  this.furiture2Layer = map.createLayer("furniture2",tilesArray,0,0);


  this.anims.create({
   key: "gen-up",
   frames: this.anims.generateFrameNumbers("gen", { start: 105, end: 112 }),
   frameRate: 5,
   repeat: -1,
 });

 this.anims.create({
   key: "gen-left",
   frames: this.anims.generateFrameNumbers("gen", { start: 118, end: 125 }),
   frameRate: 5,
   repeat: -1,
 });

 this.anims.create({
   key: "gen-down",
   frames: this.anims.generateFrameNumbers("gen", { start: 131, end: 138 }),
   frameRate: 5,
   repeat: -1,
 });

 this.anims.create({
   key: "gen-right",
   frames: this.anims.generateFrameNumbers("gen", { start: 144, end: 151 }),
   frameRate: 5,
   repeat: -1,
 });

 this.anims.create({
  key: "orange",
  frames: this.anims.generateFrameNumbers("orange", { start: 144, end: 151 }),
  frameRate: 5,
  repeat: -1,
});



  var start = map.findObject("objectLayer1",obj => obj.name === "start");
 this.player = this.physics.add.sprite(start.x, start.y, "gen");
 window.player = this.player;

 var heart2 = map.findObject("objectLayer1",obj => obj.name === "heart2");
 this.enemy1 = this.physics.add.sprite(heart2.x, heart2.y, "heart2")

 var orange = map.findObject("objectLayer1",obj => obj.name === "orange");
this.enemy2 = this.physics.add.sprite(orange.x, orange.y, "orange")
 // create the arrow keys
 this.cursors = this.input.keyboard.createCursorKeys();   

// var level3Down = this.input.keyboard.addKey("3");

// rDown.on(
//   "down",
//   function () {
//     console.log("R pressed (reload game)");
//     this.scene.start("gameScene");
//   },
//   this
// );

// aDown.on(
//   "down",
//   function () {
//     console.log("A pressed (main menu)");
//     this.scene.start("preloadScene");
//   },
//   this
// );

var level2Down = this.input.keyboard.addKey(49);

// level2Down.on(
//   "down",
//   function () {
//     console.log("2 pressed, jump to level 2");
//     this.scene.start("level2");
//   },
//   this
// );

 // make the camera follow the player
 this.cameras.main.startFollow(this.player);

 this.tweens.add({
  targets: this.enemy1,
  y: 500,
 // flipX: true,
  yoyo: true,
  duration: 1500,
  repeat: -1
})
this.physics.add.overlap(this.player, this.enemy1, this.hitFire, null, this);
this.physics.add.overlap(this.player, this.enemy2, this.hitOrange, null, this);
// hitHeart function definition


 } // end of create //

update() {
 this.furitureLayer.setCollisionByExclusion(-1, true);
 this.furiture2Layer.setCollisionByExclusion(-1, true);
 this.physics.add.collider(this.player, this.furitureLayer);
 this.physics.add.collider(this.player, this.furiture2Layer);
 this.player.body
 .setSize(this.player.width * 0.3, this.player.height * 0.3)
 .setOffset(22,45)

if (this.cursors.left.isDown) {
 this.player.setVelocityX(-160);
 this.player.anims.play("gen-left", true);
} else if (this.cursors.right.isDown) {
 this.player.setVelocityX(160);
 this.player.anims.play("gen-right", true);
} else if (this.cursors.up.isDown) {
 this.player.setVelocityY(-160);
 this.player.anims.play("gen-up", true);
} else if (this.cursors.down.isDown) {
 this.player.setVelocityY(160);
 this.player.anims.play("gen-down", true);
} else {
 this.player.setVelocity(0);
 this.player.anims.stop();
}
if (
  this.player.x < 598 &&
  this.player.x > 554 &&
  this.player.y < 64 &&
  this.player.y > 59

  ) {
    console.log("Door2");
    this.Map_3();
  
  }
} // end of update //
Map_3(player, tile) {
  console.log("map3function");
  this.scene.start("Map_3",);
}
hitFire(player, item) {
  console.log("Enemy Attacked");
  this.cameras.main.shake(200);
  this.death.play()
  item.disableBody(true, true); //remove fire
  this.scene.start("gameoverScene")
  return false;
}
hitOrange(player, item) {
  console.log("Collected");
  // this.cameras.main.shake(200);
  this.ching.play()
  item.disableBody(true, true); //remove fire
  return false;
}
}