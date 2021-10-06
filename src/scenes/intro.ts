export class Intro extends Phaser.Scene{
    constructor(){
        super("Intro")
    }

    preload(){
        
    }

    titleText;
    sceneCounter = 0;

    create(){
        console.log("Intro Created");
        this.cameras.main.setBackgroundColor('white')
        this.input.keyboard.on('keydown_ENTER', this.moveForward, this);
        const style = { font: "bold 32px Arial", fill: "white" };
        this.titleText = this.add.text(300, 300, 'One day on Salter Ave...', style);
    }

    update(){
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
                this.scene.start('Salter');
                break;
        }
        this.sceneCounter++
    }
}