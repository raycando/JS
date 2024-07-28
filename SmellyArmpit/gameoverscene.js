class gameoverScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: "gameoverScene" });
    }

    preload() {
      this.load.image('gameoverScene', 'assets/gameoverscene.png')
  
  }
  
 create () {
      this.intro1 = this.add.image(0, 0, 'gameoverScene').setOrigin(0, 0).setScale(1);
     
       console.log("menu page - welcome");
       let map = this.make.tilemap({ key: "world" });
  
       var spaceDown = this.input.keyboard.addKey('SPACE');
      
       spaceDown.on('down', function(){
       console.log("Spacebar pressed, go to next menu");
       this.scene.stop("gameoverScene");
       this.scene.start("Map_1");
       }, this );
  
   }
    
}