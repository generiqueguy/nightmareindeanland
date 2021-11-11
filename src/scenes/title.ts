export class Title extends Phaser.Scene{
    constructor(){
        super("Title")
    }

    preload(){

    }
    titleText;
    text;
    enter;
    cursors;
    create(){
        console.log("Title Created");
        this.cursors = this.input.keyboard.createCursorKeys();
        const style = { font: "bold 32px Arial", fill: "white" };
        this.text = this.add.text(600, 600, 'PRESS SPACE', style);
        this.titleText = this.add.text(300, 300, 'Nightmare In Deanland', style);

    }

    update(){
        if(this.cursors.space.isDown){
            this.moveForward();
        }
    }

    moveForward(){
        this.scene.start('Intro');
    }
}