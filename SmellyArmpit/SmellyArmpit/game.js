
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
    scene: [Details,intro1,intro2,intro3,Map_1,Map_2,Map_3, winscene, gameoverScene, voucherScene]

};

let game = new Phaser.Game(config);

window.ingredient_1=0