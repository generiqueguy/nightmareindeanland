import * as Phaser from 'phaser';
import DeanApt from './scenes/deanapt/deanapt';
import DialogBox from './scenes/dialogbox';
import HUD from './scenes/hud';
import { Intro } from './scenes/intro';
import { Salter } from './scenes/salter/salter';
import { Title } from './scenes/title';
import GameOver from './scenes/gameover';

var config = {
    type: Phaser.AUTO,
    scale: {
        //mode: Phaser.Scale.FIT,
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "game-container",
      },
    width: 1000,
    height: 800,
    backgroundColor: "#FFFFFF",
    //scene: [Salter, HUD, DialogBox],
    scene: [Title, Intro, DeanApt, DialogBox, Salter, HUD, GameOver],
    //scene: [DeanApt, Salter, HUD, DialogBox],
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 800 },
        debug: true
    }
}
};



var game = new Phaser.Game(config);
