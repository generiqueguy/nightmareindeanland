import * as Phaser from 'phaser';
import { Salter } from './scenes/salter';

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    //scene: [Title, Intro, Salter],
    scene: [Salter],
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 400 },
        debug: true
    }
}
};

var player;
var cursors;
var platforms;
var cameras;

var game = new Phaser.Game(config);
