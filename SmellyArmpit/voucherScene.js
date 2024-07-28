class voucherScene extends Phaser.Scene {

  constructor ()
  {
      super({ key: "voucherScene" });
  }

  preload() {
    this.load.image('voucherScene', 'assets/voucher.png')

}

create () {
    this.winScene = this.add.image(0, 0, 'voucherScene').setOrigin(0, 0).setScale(1);
   
     console.log("menu page - welcome");
     let map = this.make.tilemap({ key: "world" });

     var spaceDown = this.input.keyboard.addKey('SPACE');
    
     spaceDown.on('down', function(){
     console.log("Spacebar pressed, go to next menu");
     this.scene.stop("voucherScene");
     this.scene.start("Map_1");
     }, this );
    // delay 1 sec
    this.time.delayedCall(1000,function() {
      // Reset counter before a restart
      this.isDead = false;
      this.liveCount = 3;
  this.de.loop = false;
  this.bgmSnd.stop()
      this.scene.stop('voucherScene');
      this.scene.start('Map_1');
  },[], this);	
 }
  
}