class intro2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: "intro2" });
    }

    preload() {
      this.load.image('intro2', 'assets/intro2.png')
  
  }
  
 create () {
      this.intro1 = this.add.image(0, 0, 'intro2').setOrigin(0, 0).setScale(1);
     
       console.log("menu page - welcome");
       let map = this.make.tilemap({ key: "world" });
  
       var spaceDown = this.input.keyboard.addKey('SPACE');
      
       spaceDown.on('down', function(){
       console.log("Spacebar pressed, go to next menu");
       this.scene.stop("intro2");
       this.scene.start("intro3");
       }, this );
  
   }
    
}