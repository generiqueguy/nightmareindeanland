export default class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOver'
        });
    }
    preload() {
    }
    create() {
        this.add.text(100, 100, 'Game Over');
    }
    update() {
    }
}