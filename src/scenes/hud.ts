export default class HUD extends Phaser.Scene {
    constructor(player) 
    {
      super({
        key: 'HUD'
      });
      this.currentPlayer = player;
    }
    
    currentPlayer;
    
    preload(){
        
    }

    create(){
        //use portrait of the currentPlayer
    }

    update(){
        
    }
}