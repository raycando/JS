class Map_3 extends Phaser.Scene {
   constructor ()
   {
       super({ key: 'Map_3' });
   }

   preload() {

       // Step 1, load JSON
this.load.tilemapTiledJSON("map3","assets/Map_3.tmj")

       // Step 2 : Preload any images here
       this.load.image("buildingPng","assets/Buildings2x32.png")
       this.load.image("streetPng","assets/Inside_B.png")

       this.load.spritesheet("gen", "assets/charac1.png", {
        frameWidth: 64,
        frameHeight: 64,
      });
      this.load.spritesheet("heart3", "assets/germs.png", {
        frameWidth: 64,
        frameHeight: 64,
     });
     this.load.spritesheet("heart4", "assets/charac2.png", {
      frameWidth: 64,
      frameHeight: 64,
   });
     this.load.spritesheet("strawberry", "assets/strawberry.png", {
      frameWidth: 64,
      frameHeight: 64,
   });
   this.load.audio("death", "assets/death.mp3");
   this.load.audio("ching", "assets/ching.mp3");
   } // end of preload //

   create (){
    this.death = this.sound.add("death");
    this.ching = this.sound.add("ching");
   console.log("map3")

   
   //Step 3 - Create the map from main
   let map = this.make.tilemap({ key: "map3" });
   
   // Step 4 Load the game tiles
   // 1st parameter is name in Tiled,
   // 2nd parameter is key in Preload

   let groundTiles = map.addTilesetImage("Buildings2x32", "buildingPng");
   let furniture1Tiles = map.addTilesetImage("Inside_B", "streetPng");
   let furniture2Tiles = map.addTilesetImage("Inside_B", "streetPng");

   //Step 5  create an array of tiles
   let tilesArray = [
          groundTiles,
          furniture1Tiles,
          furniture2Tiles
        ];

   // Step 6  Load in layers by layers
   this.groundLayer = map.createLayer("ground",tilesArray,0,0);

   this.furiture1Layer = map.createLayer("furniture1",tilesArray,0,0);

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
    key: "heart3",
    frames: this.anims.generateFrameNumbers("heart3", { start: 144, end: 151 }),
    frameRate: 5,
    repeat: -1,
  });
  this.anims.create({
    key: "heart4",
    frames: this.anims.generateFrameNumbers("heart4", { start: 144, end: 151 }),
    frameRate: 5,
    repeat: -1,
  });
  this.anims.create({
    key: "strawberry",
    frames: this.anims.generateFrameNumbers("strawberry", { start: 144, end: 151 }),
    frameRate: 5,
    repeat: -1,
  });

  var start = map.findObject("objectLayer2",obj => obj.name === "start");
this.player = this.physics.add.sprite(start.x, start.y, "gen");
window.player = this.player;

var heart3 = map.findObject("objectLayer2",obj => obj.name === "heart3");
this.enemy1 = this.physics.add.sprite(heart3.x, heart3.y, "heart3")

var heart4 = map.findObject("objectLayer2",obj => obj.name === "heart4");
this.enemy3 = this.physics.add.sprite(heart4.x, heart4.y, "heart4")
var strawberry = map.findObject("objectLayer2",obj => obj.name === "strawberry");
this.enemy2 = this.physics.add.sprite(strawberry.x, strawberry.y, "strawberry")
// create the arrow keys
this.cursors = this.input.keyboard.createCursorKeys();
this.cameras.main.startFollow(this.player);

// make the camera follow the player
// this.tweens.add({
//   targets: this.enemy1,
//   x: 200,
//   flipX: true,
//   yoyo: true,
//   duration: 1500,
//   repeat: -1
// })

} // end of create //

update() {
// enemy follow after player
this.physics.moveToObject( this.enemy1, this.player,100,1000);
this.physics.moveToObject( this.enemy3, this.player,100,1000);

  this.furiture1Layer.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.furiture1Layer);
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
  this.player.x < 76 &&
  this.player.x > 60 &&
  this.player.y > 563
  ) {
    console.log("Door4");
    this.winScene();
  }
  
  
}
// end of update //
winScene(player, tile) {
  console.log("winScene");
  this.scene.start("winScene",);
}

hitFire(player, item) {
  console.log("Enemy Attacked");
  this.cameras.main.shake(200);
  this.death.play()
  item.disableBody(true, true); //remove fire
  this.scene.start("gameoverScene")
  return false;
}
hitstrawberry(player, item) {
  console.log("collected");
  // this.cameras.main.shake(200);
  this.ching.play()
  item.disableBody(true, true); //remove fire
  return false;
}
}