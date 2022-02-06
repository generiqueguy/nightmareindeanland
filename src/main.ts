import * as Phaser from 'phaser';
import DeanApt from './scenes/deanapt';
import DialogBox from './scenes/dialogbox';
import HUD from './scenes/hud';
import { Intro } from './scenes/intro';
import { Salter } from './scenes/salter';
import { Title } from './scenes/title';

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.NONE,
        //mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "game-container",
      },
    width: 1000,
    height: 800,
    scene: [Salter, HUD],
    //scene: [Title, Intro, DeanApt, DialogBox, Salter, HUD],
    //scene: [DeanApt, DialogBox, Salter, HUD],
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 400 },
        debug: true
    }
}
};



var game = new Phaser.Game(config);
