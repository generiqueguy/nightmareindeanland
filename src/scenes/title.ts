export class Title extends Phaser.Scene{
    constructor(){
        super("Title")
    }

    preload(){
        this.load.image('titleScreen', '../../assets/scenes/title/title1.png');
        this.load.image('bottle', '../../assets/placeholders/bottle.png');
    }
    titleImage;
    titleText;
    text;
    enter;
    cursors;
    selection;
    cursor;

    create(){
        this.cursor = this.add.image(280, this.cameras.main.height/2+15,'bottle');
        this.titleImage = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2+75, 'titleScreen').setScale(.8);
        console.log("Title Created");
        this.cursors = this.input.keyboard.createCursorKeys();
        const style = { font: "bold 32px Arial", fill: "black" };
        this.text = this.add.text(300, this.cameras.main.height/2, 'START', style);
        this.titleText = this.add.text(1200, this.cameras.main.height/2, 'Options', style);
    }

    update(){
        if(this.cursors.space.isDown){
            this.moveForward();
        }
        if(this.cursors.down.isDown){
            this.select();
        }
    }

    moveForward(){
        this.scene.start('Intro');
    }

    select(){
        this.selection++
        if(this.selection >= 2) this.selection = 0;
    }
}