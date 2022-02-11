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
    dialogBox;

    init(data){
        this.dialog = data.dialog;
        this.camera = data.camera;
    }

    preload(){}

    create(){
      console.log("dialogbox created")
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.dialogBox = this.add.rectangle(this.cameras.main.width/2,200,700,200, 152238);
        let style = { font: "bold 24px Arial", fill: "black" };
        let titleText = this.add.text(this.cameras.main.width/2 -250, 175, this.dialog, style);        
    }

    update(){
        if(this.spacebar.isDown)
            this.scene.stop();
    }
}