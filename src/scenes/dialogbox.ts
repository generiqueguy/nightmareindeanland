export default class DialogBox extends Phaser.Scene{
    constructor(player) 
    {
      super({
        key: 'DialogBox'
      });
    }

    dialog;
    spacebar;
    originalSceneCamera;
    dialogBox;
    portrait = null;
    dialogBoxType;
    speaker;
  

    init(data){
        this.dialog = data.dialog;
        this.originalSceneCamera = data.camera;
        this.speaker = data.speaker;

    }

    preload(){

      this.load.image('boysBox', '../../assets/PLAYERTXTBOX.png');
      this.load.image('enemyBox', '../../assets/VILLAINTXTBOX.png');
      switch(this.speaker){
        case 'dean':
          this.load.image('deanPortrait', '../../assets/dean/dean_portrait.png');
          this.dialogBoxType = 'boysBox';
          this.portrait = 'deanPortrait';
          break;

        case 'murt':
          this.load.image('murtPortrait', '../../assets/murt/MURTPORTRAIT1.png');
          this.dialogBoxType = 'enemyBox';
          this.portrait = 'murtPortrait';
          break;

        case 'joss':
          this.load.image('jossPortrait', '../../assets/joss/JPPORTRAIT.png');
          this.dialogBoxType = 'boysBox';
          this.portrait = 'jossPortrait';
          break;

        default:
          this.dialogBoxType = 'boysBox';
          this.speaker = null;
          break;
      }
    }

    create(){
      
      console.log("dialogbox created")
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.dialogBox = this.add.image(this.cameras.main.width/2,200,this.dialogBoxType).setScale(0.6);
        let style = { font: "bold 24px Arial", fill: "white" };
        if(this.speaker){
          this.add.image(this.cameras.main.width/2-450,200, this.portrait).setScale(0.22);
        }
        let titleText = this.add.text(this.cameras.main.width/2 -250, 175, this.dialog, style);        
    }

    update(){
        if(this.spacebar.isDown){
          console.log("dialog spacebar pressed")
            this.scene.stop();
        }
    }
}