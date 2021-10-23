export class Intro extends Phaser.Scene{
    constructor(){
        super("Intro")
    }

    preload(){
        
    }

    titleText;
    sceneCounter = 0;
    cursors;
    justPressed = false;

    create(){
        console.log("Intro Created");
        this.cameras.main.setBackgroundColor('white')
        this.cursors = this.input.keyboard.createCursorKeys();
        const style = { font: "bold 32px Arial", fill: "white" };
        this.titleText = this.add.text(300, 300, 'One day on Salter Ave...', style);
        
    }

    update(){
        if(this.cursors.space.isDown && this.justPressed == false){
            this.justPressed = true;
            this.moveForward();
            setTimeout(()=>{
                this.justPressed = false;
            },200)
        }

    }

    moveForward(){
        switch (this.sceneCounter){
            case 0:
                this.titleText.setText("Some Shit happened..")
                break;
            
            case 1:
                this.titleText.setText("Then some other shit happened..")
                break;

            case 2:
                this.titleText.setText("And Centis' reign began again..")
                break;

            case 3:
                this.titleText.setText("And only one man could stop it..")
                break;

            case 4:
                this.scene.start('DeanApt');
                break;
        }
        this.sceneCounter++
    }
}