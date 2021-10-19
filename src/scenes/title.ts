export class Title extends Phaser.Scene{
    constructor(){
        super("Title")
    }

    preload(){

    }
    titleText;
    text;
    enter;
    create(){
        console.log("Title Created");
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        const style = { font: "bold 32px Arial", fill: "white" };
        this.text = this.add.text(600, 600, 'PRESS START', style);
        this.titleText = this.add.text(300, 300, 'Nightmare In Deanland', style);

    }

    update(){
        if(this.enter.isDown){
            this.moveForward();
        }
    }

    moveForward(){
        this.scene.start('Intro');
    }
}