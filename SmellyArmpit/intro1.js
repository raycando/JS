class intro1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: "intro1" });
    }

    preload() {
      this.load.image('intro1', 'assets/intro1.png')

  }
  
 create () {

      this.intro1 = this.add.image(0, 0, 'intro1').setOrigin(0, 0).setScale(1);
     
       console.log("menu page - welcome");
       let map = this.make.tilemap({ key: "world" });
  
       var spaceDown = this.input.keyboard.addKey('SPACE');
      
       spaceDown.on('down', function(){
       console.log("Spacebar pressed, go to next menu");
       this.scene.stop("intro1");
       this.scene.start("intro2");
       }, this );
  
   }
    
}