export default class HUD extends Phaser.Scene {
    constructor(player) 
    {
      super({
        key: 'HUD'
      });
      this.currentPlayer = player;
    }
    
    currentPlayer;
    smokes;
    smokeCounter = 3;
    
    preload(){
        this.load.image('deanPortrait', '../../assets/dean/dean_portrait.png');
        this.load.image('lifeCig', '../../assets/placeholders/pngaaa-cigplaceholder.png');
    }

    create(){
        this.smokes = this.add.group();
        this.add.image(75, 75, 'deanPortrait').setScale(0.2);
        for (var i=0; i <= 3; i++)
        {
            this.smokes.create(175+30*i, 30, 'lifeCig').setScale(0.2);
        }
        this.smokes.children.each(entity => entity.flipX = true);
        console.log(this.smokes.children.entries[0]);
        this.scene.get('Salter').events.on('playerHit', ()=>{
            this.smokes.children.entries[this.smokeCounter].setVisible(false);
            this.smokeCounter--;
        });
    }

    update(){

    }

    takeDamage(player){

    }

    getHealth(player){

    }
}