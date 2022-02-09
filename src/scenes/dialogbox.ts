export default class DialogBox extends Phaser.Scene{
    constructor(player) 
    {
      super({
        key: 'DialogBox'
      });
    }

    dialog;
    spacebar;
    camera;

    init(data){
        this.dialog = data.dialog;
        this.camera = data.camera;
    }

    preload(){}

    create(){
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        let dialogBox = this.add.rectangle(this.camera.width/2,200,700,200, 152238);
        let style = { font: "bold 24px Arial", fill: "white" };
        let titleText = this.add.text(this.camera.width/2 -250, 175, this.dialog, style);
        
    }

    update(){
        if(this.spacebar.isDown)
            this.scene.stop();
    }
}