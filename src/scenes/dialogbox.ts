export default class DialogBox extends Phaser.Scene{
    constructor(player) 
    {
      super({
        key: 'DialogBox'
      });
    }

    dialog;
    spacebar;

    init(data){
        this.dialog = data.dialog;
    }

    preload(){}

    create(){
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        let dialogBox = this.add.rectangle(500,600,700,200, 152238);
        let style = { font: "bold 24px Arial", fill: "white" };
        let titleText = this.add.text(175, 600, this.dialog, style);
        
    }

    update(){
        if(this.spacebar.isDown)
            this.scene.stop();
    }
}