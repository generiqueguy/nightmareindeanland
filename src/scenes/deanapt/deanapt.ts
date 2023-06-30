import DeanAptDialog from "./deanaptdialog";
import DialogBox from "../dialogbox";

export default class DeanApt extends Phaser.Scene {
    constructor(player) 
    {
      super({
        key: 'DeanApt'
      });
    }

    player;
    cursors;
    pc;
    fridge;
    sink;
    tv;
    rabbitCage;
    spacebar;
    door;

    SCENE_DIALOG = new DeanAptDialog();

    preload(){
        // Listen to space keys
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //bg
        this.load.image('deanaptbg', '../../assets/scenes/deansapt/RHGdeansapt2.png');
        
        //deansprite
        this.load.atlas('8bitdean', '../../assets/atlases/8bitdean.png', '../../assets/atlases/8bitdean.json');   
        
        //apartment assets
        this.load.image('fridge', '../../assets/scenes/deansapt/RHDEANFRIDGE.png');
        this.load.image('sink', '../../assets/scenes/deansapt/RHGDEANSINKSTOVE.png');
        this.load.image('pc', '../../assets/scenes/deansapt/RHGDEANSPC.png');
        this.load.image('tv', '../../assets/scenes/deansapt/RHGDEANSTV.png');
        this.load.image('rabbitCage', '../../assets/scenes/deansapt/RHGRABBITCAGE.png');

    }

    create(){
      let songLoader = this.load.audio('song', ['../../assets/scenes/deansapt/42salter.m4a'])
      songLoader.on('filecomplete', () => this.sound.add('song').play({loop: true, volume: 0.1}))
      songLoader.start();

      let image = this.add.image(500,500, 'deanaptbg')
      let scaleX = this.cameras.main.width / image.width
      let scaleY = this.cameras.main.height / image.height
      let scale = Math.max(scaleX, scaleY)

      //add objects
      this.pc = this.physics.add.staticImage(-170,650,'pc').setScale(2)
      this.tv = this.physics.add.staticImage(0,650,'tv').setScale(2.3);

      this.rabbitCage = this.physics.add.staticImage(600,650,'rabbitCage').setScale(2.3)
      this.sink = this.physics.add.staticImage(1150,740,'sink').setScale(2);
      this.fridge = this.physics.add.staticImage(950,700,'fridge').setScale(2);
      this.sink.body.setSize(300, 100, true);


      this.player = this.physics.add.sprite(600,700,'8bitdean', "deanfront1").setScale(4);
      this.cameras.main.centerOn(this.player.x-100, this.player.y-150);
      this.cameras.main.setBackgroundColor('#629171');
      
      
      let frontframeNames = this.anims.generateFrameNames('8bitdean', {
        start: 1, end: 7,
        prefix: 'deanfront'});
        this.anims.create({ key: 'walkDown', frames: frontframeNames, frameRate: 10, repeat: 0 });

      let backframeNames = this.anims.generateFrameNames('8bitdean', {
        start: 1, end: 7,
        prefix: 'deanback'})
        this.anims.create({ key: 'walkUp', frames: backframeNames, frameRate: 10, repeat: 0 });

      let sideframeNames = this.anims.generateFrameNames('8bitdean', {
        start: 2, end: 7,
        prefix: 'deanside'})
        this.anims.create({ key: 'walkSide', frames: sideframeNames, frameRate: 10, repeat: 0 });

      

      image.setScale(scale)
      //this.add.image(400, 150, 'bg');
      this.cursors = this.input.keyboard.createCursorKeys();
      this.physics.world.setBounds(-200, 600, 2800, 300);
      this.player.setCollideWorldBounds(true);
      this.player.body.setAllowGravity(false);

      this.door = this.physics.add.existing(new Phaser.GameObjects.Zone(this, 350, 590, 100, 200), true)

      
      this.physics.add.overlap(this.player, this.door, ()=>{
        if(this.spacebar.isDown){
          this.sound.stopByKey('song');
          this.scene.stop('DeanApt');
          this.scene.remove('DeanApt');
          this.scene.start('Salter');
        }
      }, null)

      this.physics.add.collider(this.player, this.tv, ()=>{
        if(this.spacebar.isDown)
        console.log("you touched the tv");
      }, null);
      this.physics.add.collider(this.player, this.sink, ()=>{
        if(this.spacebar.isDown)
        console.log("you touched the sink");
      }, null);
      this.physics.add.collider(this.player, this.fridge, ()=>{
        if(this.spacebar.isDown)
        this.scene.pause().launch('DialogBox', {dialog: this.SCENE_DIALOG.FRIDGE_DIALOG[0],
          camera: this.cameras.main, speaker: 'dean'})
          this.scene.resume();;
      }, null);
      this.physics.add.collider(this.player, this.pc, ()=>{
        if(this.spacebar.isDown){
          this.scene.pause().launch('DialogBox', {dialog: this.SCENE_DIALOG.PC_DIALOG[Math.floor(Math.random() * 3)],
          camera: this.cameras.main, speaker:'enemyBox'})
          this.scene.resume();
        }
      }, null);
      this.physics.add.collider(this.player, this.rabbitCage, ()=>{
        if(this.spacebar.isDown)
        console.log("you touched the cage");
      }, null);
    }

    update(){
      //listen to cursor inputs
      if (this.cursors.up.isDown)
      {
          this.player.setVelocityY(-150);
          this.player.anims.play('walkUp', true);
      }
      else if (this.cursors.left.isDown)
      {
          this.player.flipX = true;
          this.player.setVelocityX(-150); 
          this.player.anims.play('walkSide', true);        
      }
      else if (this.cursors.right.isDown)
      {
          this.player.flipX = false;
          this.player.setVelocityX(150);
          this.player.anims.play('walkSide', true);
      
      }
      else if (this.cursors.down.isDown)
      {
          this.player.setVelocityY(150);
          this.player.anims.play('walkDown', true);
      }
      else if (this.cursors.down.isUp && this.cursors.up.isUp 
      && this.cursors.right.isUp && this.cursors.left.isUp)
      {
          this.player.setVelocity(0);
          this.player.anims.stop();
      }
  }
}