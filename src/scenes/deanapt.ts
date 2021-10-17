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


      let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2-100, 'deanaptbg')
      let scaleX = this.cameras.main.width / image.width
      let scaleY = this.cameras.main.height / image.height
      let scale = Math.max(scaleX, scaleY)

            //add objects
      this.pc = this.physics.add.staticImage(-170,450,'pc').setScale(2)//.refreshBody().setBodySize(200,50, true);
      this.tv = this.physics.add.staticImage(0,450,'tv').setScale(2.3);

      this.rabbitCage = this.physics.add.staticImage(600,450,'rabbitCage').setScale(2.3)
      this.sink = this.physics.add.staticImage(1150,540,'sink').setScale(2);
      this.fridge = this.physics.add.staticImage(950,500,'fridge').setScale(2);


      this.player = this.physics.add.sprite(600,500,'8bitdean', "deanfront1").setScale(4);
      this.cameras.main.startFollow(this.player);
      
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
      this.physics.world.setBounds(-200, 400, 2800, 300);
      this.player.setCollideWorldBounds(true);
      this.player.body.setAllowGravity(false);

      this.door = this.physics.add.existing(new Phaser.GameObjects.Zone(this, 350, 390, 100, 200), true)

      
      this.physics.add.overlap(this.player, this.door, ()=>{
        if(this.spacebar.isDown){
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
        console.log("you touched the fridge");
      }, null);
      this.physics.add.collider(this.player, this.pc, ()=>{
        if(this.spacebar.isDown){
        let style = { font: "bold 32px Arial", fill: "white" };
        console.log("you unsent a message about berzerk");
        let titleText = this.add.text(-400, 800, "you unsent a message about berzerk", style);
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