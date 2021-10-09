import * as Phaser from 'phaser';
import HUD from './scenes/hud';
import { Intro } from './scenes/intro';
import { Salter } from './scenes/salter';
import { Title } from './scenes/title';

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    //scene: [Title, Intro, Salter],
    scene: [Salter, HUD],
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 400 },
        debug: true
    }
}
};



var game = new Phaser.Game(config);
