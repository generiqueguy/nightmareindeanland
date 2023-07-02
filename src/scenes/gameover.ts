export class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOver'
        });
    }
    gameOverImage;

    preload() {
        this.load.image('gameOver', '../../assets/scenes/gameover.png');
    }
    create() {
        this.gameOverImage = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2+75, 'gameOver').setScale(.3);
        //fade in game background to red with 50% alpha
        this.cameras.main.fadeIn(1000, 255, 0, 0);
        
    }
    update() {
    }
}