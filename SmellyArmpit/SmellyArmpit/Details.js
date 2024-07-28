class Details extends Phaser.Scene {

    constructor ()
    {
        super({ key: "Details" });
    }

    preload() {
      this.load.image('Details', 'assets/Details.png')

  }
  
 create () {

      this.intro1 = this.add.image(0, 0, 'Details').setOrigin(0, 0).setScale(1);
     
       console.log("menu page - welcome");
       let map = this.make.tilemap({ key: "world" });
  
       var spaceDown = this.input.keyboard.addKey('SPACE');
      
       spaceDown.on('down', function(){
       console.log("Spacebar pressed, go to next menu");
       this.scene.stop("Details");
       this.scene.start("intro1");
       }, this );
  
   }
    
}