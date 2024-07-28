class intro3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: "intro3" });
    }

    preload() {
      this.load.image('intro3', 'assets/intro3.png')
      this.load.audio("bgsong", "assets/BGsong.mp3");
  }
  
 create () {
    this.music = this.sound.add("bgsong",{loop: true}).setVolume(0.1);
    this.music.play();
      this.intro1 = this.add.image(0, 0, 'intro3').setOrigin(0, 0).setScale(1);
     
       console.log("menu page - welcome");
       let map = this.make.tilemap({ key: "world" });
  
       var spaceDown = this.input.keyboard.addKey('SPACE');
      
       spaceDown.on('down', function(){
       console.log("Spacebar pressed, go to next menu");
       this.scene.stop("intro3");
       this.scene.start("Map_1");
       }, this );

   }
    
}