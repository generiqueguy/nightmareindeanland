export default class HUD extends Phaser.Scene {
    constructor(player) 
    {
      super({
        key: 'DeanApt'
      });
    }

    preload(){
        //bg
        this.load.image('bg', '../../assets/scenes/deansapt/RHGdeansapt2.png');
        
        //deansprite
        this.load.atlas('8bitdean', '../../assets/dean/deanmovementsprites-Sheet.png', '../../assets/atlases/8bitdean.json');   
        
        //apartment assets
        this.load.image('fridge', '../../assets/scenes/deansapt/RHDEANFRIDGE.png');
        this.load.image('sink', '../../assets/scenes/deansapt/RHGDEANSINKSTOVE.png');
        this.load.image('pc', '../../assets/scenes/deansapt/RHGDEANSPC.png');
        this.load.image('tv', '../../assets/scenes/deansapt/RHGDEANSTV.png');
        this.load.image('rabbitCage', '../../assets/scenes/deansapt/RHGRABBITCAGE.png');

    }

    create(){
        this.add.image(4000, 300, 'bg');
    }

    update(){

    }
}