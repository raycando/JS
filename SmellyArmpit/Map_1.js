class Map_1 extends Phaser.Scene {
   constructor ()
   {
       super({ key: 'Map_1' });
   }

   preload() {

       // Step 1, load JSON
this.load.tilemapTiledJSON("map1","assets/Map_1.tmj")

       // Step 2 : Preload any images here
       this.load.image("buildingPng","assets/Buildings2x32.png")
       this.load.image("streetPng","assets/Inside_B.png")

       this.load.spritesheet("gen", "assets/charac1.png", {
        frameWidth: 64,
        frameHeight: 64,
      });
  
      this.load.spritesheet("heart", "assets/germs.png", {
        frameWidth: 64,
        frameHeight: 64,
     });
     this.load.spritesheet("lemon", "assets/lemon.png", {
      frameWidth: 64,
      frameHeight: 64,
   });
   this.load.spritesheet("health", "assets/heart.png", {
    frameWidth: 64,
    frameHeight: 64,
 });

   this.load.audio("death", "assets/death.mp3");
   this.load.audio("ching", "assets/ching.mp3");
  } // end of preload //

   create (){

   this.death = this.sound.add("death");
   this.ching = this.sound.add("ching");
   console.log("animationScene")



   //Step 3 - Create the map from main
   let map = this.make.tilemap({ key: "map1" });
   
   // Step 4 Load the game tiles
   // 1st parameter is name in Tiled,
   // 2nd parameter is key in Preload

   let groundTiles = map.addTilesetImage("Buildings2x32", "buildingPng");
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
    key: "heart",
    frames: this.anims.generateFrameNumbers("heart", { start: 0, end: 2 }),
    frameRate: 5,
    repeat: -1,
  });
  this.anims.create({
    key: "lemon",
    frames: this.anims.generateFrameNumbers("lemon", { start: 10, end: 100 }),
    frameRate: 5,
    repeat: -1,
  });

  var start = map.findObject("objectLayer",obj => obj.name === "start");
this.player = this.physics.add.sprite(start.x, start.y, "gen");
window.player = this.player;
var heart = map.findObject("objectLayer",obj => obj.name === "heart");
this.enemy1 = this.physics.add.sprite(heart.x, heart.y, "heart")
var lemon = map.findObject("objectLayer",obj => obj.name === "lemon");
this.enemy2 = this.physics.add.sprite(lemon.x, lemon.y, "lemon")



// create the arrow keys
this.cursors = this.input.keyboard.createCursorKeys();


var level2Down = this.input.keyboard.addKey(50);

// make the camera follow the player
this.cameras.main.startFollow(this.player);

this.tweens.add({
  targets: this.enemy1,
  x: 100,
  flipX: true,
  yoyo: true,
  duration: 1500,
  repeat: -1
})

this.physics.add.overlap(this.player, this.enemy1, this.hitFire, null, this);
this.physics.add.overlap(this.player, this.enemy2, this.hitEnemy1, null, this);
   {
  

}
   
} // end of create //

update() {


  this.furitureLayer.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.furitureLayer);
  this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.3)
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
this.player.x < 500 &&
this.player.x > 460 &&
this.player.y > 572
) {
  console.log("Door1");
  this.Map_2();
}
	
}
// end of update //

Map_2(player, tile) {
  console.log("map2function");
  this.scene.start("Map_2");
}

hitFire(player, item) {
  console.log("Enemy Attacked");
  this.death.play()
  this.cameras.main.shake(200);
  item.disableBody(true, true); //remove fire
  this.scene.start("gameoverScene")
  return false;

}
hitEnemy1(player, item) {
  console.log("Collected");
  this.ching.play()
 // this.cameras.main.shake(200);
  item.disableBody(true, true); //remove fire
  return false;
}

}