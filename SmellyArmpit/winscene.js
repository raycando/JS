class winscene extends Phaser.Scene {

    constructor ()
    {
        super({ key: "winScene" });
    }

    preload() {
      this.load.image('winScene', 'assets/winScene.png')
  
  }
  
 create () {
      this.winScene = this.add.image(0, 0, 'winScene').setOrigin(0, 0).setScale(1);
     
       console.log("menu page - welcome");
       let map = this.make.tilemap({ key: "world" });
  
       var spaceDown = this.input.keyboard.addKey('SPACE');
      
       spaceDown.on('down', function(){
       console.log("Spacebar pressed, go to next menu");
       this.scene.stop("winscene");
       this.scene.start("voucherScene");
       }, this );
   }
    
}