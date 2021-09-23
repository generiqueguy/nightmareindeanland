class Title extends Phaser.Scene{
    constructor(){
        super("Title")
    }

    preload(){

    }
    titleText;
    text;
    create(){
        console.log("Title Created");
        this.input.keyboard.on('keydown_ENTER', this.moveForward, this);
        const style = { font: "bold 32px Arial", fill: "white" };
        this.text = this.add.text(600, 600, 'PRESS START', style);
        this.titleText = this.add.text(300, 300, 'Nightmare In Deanland', style);
    }

    update(){
    }

    moveForward(){
        this.scene.start('Intro');
    }
}