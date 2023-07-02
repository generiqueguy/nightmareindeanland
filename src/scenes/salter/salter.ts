import { Bottle, Bottles } from "../../sprites/weapons/bottles";
import * as Phaser from 'phaser';
import { Thug } from "../../sprites/enemies/thug";
import HUD from "../hud";
import { Dean } from "../../sprites/characters/dean";

export class Salter extends Phaser.Scene{
    constructor(){
        super("Salter")
    }

    preload ()
    {

        //deansprite
        this.load.atlas('deanAtlas', '../../assets/atlases/dean.png', '../../assets/atlases/dean.json');
        //dean idle anim
        this.load.image('dean', '../../assets/dean/deanidle.png');

        //dean run animations
        this.load.image('deanRun1', '../../assets/dean/deanrun2.png');
        this.load.image('deanRun2', '../../assets/dean/deanrun3.png');
        this.load.image('deanRun3', '../../assets/dean/deanrun4.png');
        this.load.image('deanRun4', '../../assets/dean/deanrun5.png');
        this.load.image('deanRun5', '../../assets/dean/deanrun6.png');
        
        //dean jump animations
        this.load.image('deanJump1', '../../assets/dean/deanjump.png');
        this.load.image('deanJump2', '../../assets/dean/deanjump2.png');
        this.load.image('deanJump3', '../../assets/dean/deanjump3.png');

        //deandamage
        this.load.atlas('deandamage', '../../assets/dean/deandamage.png', '../../assets/dean/deandamage.json');   
       

        //dean crouch animation
        this.load.image('deanCrouch1', '../../assets/dean/deancrouch.png');

        //dean throw animations
        this.load.image('deanThrow1', '../../assets/dean/deanthrow1.png');
        this.load.image('deanThrow2', '../../assets/dean/deanthrow2.png');
        this.load.image('deanThrow3', '../../assets/dean/deanthrow3.png'); 

        //shithawk
        this.load.atlas('shithawkAtlas', '../../assets/enemies/shithawk/shithawk.png', '../../assets/atlases/shithawk.json');
        
        //murt
        this.load.atlas('murtAtlas', '../../assets/murt/murt.png', '../../assets/atlases/murt.json');
 
        //joss
        this.load.atlas('jossAtlas', '../../assets/joss/JPSPRITES3.png', '../../assets/atlases/joss.json');
        
        

        //car
        this.load.image('car', '../../assets/objects/CAR.png');
        this.load.image('carbottom', '../../assets/objects/carbottom.png');
        this.load.image('cartop', '../../assets/objects/cartop.png');

        //fero
        this.load.image('dumpster', '../../assets/objects/ferobin.png')


        //bottle
        this.load.image('bottle', '../../assets/placeholders/bottle.png');
        this.load.image('bottlebreak', '../../assets/placeholders/bottlebreak.png')

        //thug walking
        this.load.image('thug', '../../assets/enemies/thug/walking/thug1.png');
        this.load.image('thugwalk1', '../../assets/enemies/thug/walking/thugwalk1.png');
        this.load.image('thugwalk2', '../../assets/enemies/thug/walking/thugwalk2.png');
        this.load.image('thugwalk3', '../../assets/enemies/thug/walking/thugwalk3.png');
        this.load.image('thugwalk4', '../../assets/enemies/thug/walking/thugwalk4.png');

        //thug damaged
        this.load.image('thugdamage1', '../../assets/enemies/thug/damage/thugdamage1.png');
        this.load.image('thugdamage2', '../../assets/enemies/thug/damage/thugdamage2.png');
        this.load.image('thugdamage3', '../../assets/enemies/thug/damage/thugdamage3.png');
        this.load.image('thugdamage4', '../../assets/enemies/thug/damage/thugdamage4.png');
        this.load.image('thugdamage5', '../../assets/enemies/thug/damage/thugdamage5.png');
        this.load.image('thugdamage6', '../../assets/enemies/thug/damage/thugdamage6.png');

        //thug attack
        this.load.image('thugcut1', '../../assets/enemies/thug/attack/thugcut1.png');
        this.load.image('thugcut2', '../../assets/enemies/thug/attack/thugcut2.png');
        this.load.image('thugcut3', '../../assets/enemies/thug/attack/thugcut3.png');
        this.load.image('thugcut4', '../../assets/enemies/thug/attack/thugcut4.png');

        //murt

        this.load.image('salterbg', '../../assets/scenes/salter/salterbg.png');

    }
    //x4370 - 4880
    projectiles;
    platforms;
    player;
    bottles;
    cursors;
    input;
    spacebar;
    carTop;
    carBottom;
    lastFired = 0;
    enemies;
    arialEnemies;
    objects;
    dumpster;
    holeDumpster;
    duration = 0;
    lastDuration = 0;
    isPlayerHit = false;
    playerHealth = 4;
    streetLevelY = 750;
    murt;
    joss;

    //murt scene started
    murtSceneStarted = false;

    fireProjectile(time) {
        if(time > this.lastFired){
            this.bottles.fireBottle(this.player, this.deanCrouching);
            this.player.anims.play('deanThrow', true);
            this.lastFired = time + 420;
        }
    }
    create ()
    {        
        let songLoader = this.load.audio('rockOver', ['../../assets/scenes/salter/RockOverMoncton.m4a'])
        songLoader.on('filecomplete', () => this.sound.add('rockOver').play({loop: true, volume: 0.07}))
        songLoader.start()

        //loadbg
        let image = this.add.image(5500, 400, 'salterbg');
        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        //spawn deano
        this.player = this.physics.add.sprite(400,this.streetLevelY,'dean');
        this.player.setScale(0.7);
        this.player.setBodySize(200,300, true);
        this.player.setBounce(0.1);

        //load deanweaps
        this.bottles = new Bottles(this);


        //spawn murt
        this.murt = this.physics.add.sprite(10425, 110, 'murtAtlas', 'murtstanding').setScale(0.56)
        this.murt.flipX = true;
        this.murt.body.allowGravity = false;

        //create camera
        this.cameras.main.setBounds(0, 0, 11000, 800);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBackgroundColor('#FFFFFF');
        
        //spawn thugs
        this.enemies = this.physics.add.group({
            key: 'thug',
            repeat: 11,
            setXY: { x: 640, y: this.streetLevelY, stepX: 300}
        });
        this.enemies.children.iterate((child)=>{
            child.setScale(0.4);
            child.flipX = true;
            child.setCollideWorldBounds(true);
        })

        this.platforms = this.physics.add.staticGroup();
        this.carTop = this.physics.add.staticImage(1513,this.streetLevelY-75,'cartop').setScale(0.5).refreshBody().setBodySize(200,50, true);
        this.carBottom = this.physics.add.staticImage(1500,this.streetLevelY,'carbottom').setScale(0.5).refreshBody().setSize(400, 100);
        this.dumpster = this.physics.add.staticImage(3000, this.streetLevelY-100, 'dumpster').setScale(0.5).refreshBody();
        this.holeDumpster = this.physics.add.staticImage(4613, this.streetLevelY, 'dumpster').setScale(0.5).refreshBody();
        
        this.arialEnemies = this.physics.add.group({
            key:'shitflap2',
            repeat: 11,
            setXY:{ x: 640, y: Phaser.Math.Between(300, 600), stepX: 700}
        });
        this.arialEnemies.children.iterate((child)=>{
            child.setScale(0.4);
            child.setBodySize(200, 200).setOffset(20,70);
            child.y = Phaser.Math.Between(300, 600);
            child.body.allowGravity = false;
            child.setCollideWorldBounds(true)
            child.body.onWorldBounds = true;
            child.body.world.on('worldbounds', function(body) {
                if (body.gameObject === this)
                this.flipX = !this.flipX;
                if(this.flipX) this.setVelocityX(150);
                else this.setVelocityX(-150)
              }, child);
        })
        

        // this.physics.add.sprite(640, this.streetLevelY, 'thug')
        //     .setScale(0.4)
        // this.enemies.flipX =true;
        // this.enemies.setImmovable();

        

        // this.physics.add.collider(this.player, this.platforms);
        // this.physics.add.collider(this.bottles, this.platforms);
        // this.physics.add.collider(this.bottles, this.enemies);

        this.physics.world.setBounds(0,0, 11000, 750);

        this.player.setCollideWorldBounds(true);
        this.murt.setCollideWorldBounds(true);

        //Dean KO
        let deanKnockdown = this.anims.generateFrameNames('deanAtlas', {
            start: 1, end: 7,
            prefix: 'deanknockdown'});
        this.anims.create({ key: 'deanKnockdown', frames: deanKnockdown, frameRate: 10, repeat: 0 });

        let deanDamage = this.anims.generateFrameNames('deanAtlas', {
            start: 1, end: 2,
            prefix: 'deandamage'});
        this.anims.create({ key: 'deanKnockback', frames: deanDamage, frameRate: 10, repeat: 0 });

        //Shitflap Animation
        let shitflap = this.anims.generateFrameNames('shithawkAtlas', {
            start: 1, end: 6,
            prefix: 'shitflap'});
        this.anims.create({ key: 'shitflap', frames: shitflap, frameRate: 10, repeat: -1 });

        //murtJump Animation
        let murtJump = this.anims.generateFrameNames('murtAtlas', {
            start: 1, end: 2,
            prefix: 'murtjump'});
        this.anims.create({ key: 'murtjump', frames: murtJump, frameRate: 4, repeat: 0 });

        //jossrun Animation
        let jossRun = this.anims.generateFrameNames('jossAtlas', {
            start: 1, end: 4,
            prefix: 'jossrun'});
        this.anims.create({ key: 'jossrun', frames: jossRun, frameRate: 10, repeat: -1 });
        
        //jossshoot Animation
        let jossShoot = this.anims.generateFrameNames('jossAtlas', {
            start: 1, end: 4,
            prefix: 'jossshoot'});
        this.anims.create({ key: 'jossshoot', frames: jossShoot, frameRate: 10, repeat: 0 });


        // let deanKnockback = this.anims.generateFrameNames('deandamage', {start: 1, end: 3, prefix: 'deandamage'});
        // this.anims.create({ key: 'deanKnockback', frames: deanKnockback, frameRate: 10, repeat: 0 });
    
        // let deanDeath = this.anims.generateFrameNames('deandamage', {
        //     start: 1, end: 6,
        //     prefix: 'deandamage'});
        //     this.anims.create({ key: 'deanDeath', frames: deanDeath, frameRate: 10, repeat: 0 });
    
        this.anims.create({
            key: 'deanRight',
            frames: [
                {key: 'dean'},
                {key: 'deanRun2'},
                {key: 'deanRun3'},
                {key: 'deanRun4'},
                {key: 'deanRun5'}
                //,{key: 'deanRun6'}
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deanIdle',
            frames: [
                {key: 'dean'}
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deanCrouch',
            frames: [
                {key: 'deanCrouch1'}
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deanJump',
            frames: [
                {key: 'deanCrouch1'},
                {key: 'deanJump1'},
                {key: 'deanJump2'},
                {key: 'deanJump3'}

            ],
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'deanThrow',
            frames: [
                {key: 'deanThrow1'},
                {key: 'deanThrow2'},
                {key: 'deanThrow3'},
                {key: 'dean'}
            ],
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'thugWalk',
            frames: [
                {key: 'thugwalk1'},
                {key: 'thugwalk2'},
                {key: 'thugwalk3'},
                {key: 'thugwalk4'}
            ],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'thugDamage',
            frames: [
                {key: 'thugdamage1'},
                {key: 'thugdamage2'},
                {key: 'thugdamage3'},
                {key: 'thugdamage4'},
                {key: 'thugdamage5'},
                {key: 'thugdamage6'}
            ],
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'thugAttack',
            frames: [
                {key: 'thugcut1'},
                {key: 'thugcut2'},
                {key: 'thugcut3'},
                {key: 'thugcut4'},
                {key: 'thug'}
            ],
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'thugIdle',
            frames: [
                {key: 'thug'}
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'breakBottle',
            frames: [
                {key: 'bottlebreak'}
            ],
            frameRate: 10,
            repeat: -1
        });

    

        this.enemies.children.iterate((thug)=>{
            thug.anims.play('thugWalk', true);
            thug.setVelocityX(-50);

            //to run into stuff
            this.physics.add.collider(thug, [this.carTop, this.carBottom],(thug, object)=>{
                (thug as Thug).flipX = !((thug as Thug).flipX);
                (thug as Thug).setVelocityX(-((thug as Thug).body.velocity['x']))
            }, null);
        })

        this.arialEnemies.children.iterate((child)=>{
            child.anims.play('shitflap', true);
            child.setVelocityX(-150);
        })


    //when the bottles hit the punk enemy
    this.physics.add.collider(this.bottles, this.enemies,(bottle, enemy)=>{
        enemy.body.stop();
        let thug = enemy as Thug;
        thug.flipX = false;
        console.log("hello");
        (bottle as Bottle).reset(this.player);
        thug.anims.play('thugDamage');
        thug.body.destroy();
        }, null);

    //when the bottles hit the aerial enemy
    this.physics.add.collider(this.bottles, this.arialEnemies,(bottle, enemy)=>{
        (bottle as Bottle).reset(this.player);
        this.arialEnemies.remove(enemy);
        enemy.destroy();
        }, null);

    //when the bottles hit the murt
    this.physics.add.collider(this.bottles, this.murt,(murt, bottle)=>{
        (bottle as Bottle).reset(this.player);
        this.murt.setFrame('murtdamage')
        this.murt.immune = true;
        setTimeout(()=>{
            this.murt.setVelocityX(0);
            this.murt.setFrame('')
            },250)
        }, null);

    //when dean hits the car
    this.physics.add.collider(this.player, [this.carTop, this.carBottom]);
    this.physics.add.collider(this.player, this.holeDumpster);
    //when the bottles hit the car
    this.physics.add.collider(this.bottles, [this.carTop, this.carBottom],(staticObject, bottle)=>{
        (bottle as Bottle).reset(this.player);    
    }, null);


    //when the thug hits the car

    //when birds hit dean
    this.physics.add.collider(this.player, this.arialEnemies, (player, enemy)=>{
        if(this.isPlayerHit == false){
            this.isPlayerHit = true;

            
            //TODO: probably should put player.damage() here and thug.attack
            this.player.immune = true;        
            
            //this.input.keyboard.enabled =  false;

            this.cameras.main.shake(32);
            this.player.anims.play('deanKnockback', 0);

            if(this.playerHealth >= 1){
                this.player.alpha = 0.5;
                this.events.emit('playerHit', this.player);
                if(this.player.flipX == false){
                    this.player.setVelocityX(-300);
                }
                else{
                    this.player.setVelocityX(300);
                }
            }
            else if(this.playerHealth <= 0 && !this.murtSceneStarted){
                this.player.anims.play('deanKnockdown',0);
                console.log("You should have died now" + this.playerHealth);
                this.player.body.destroy();
                // this.scene.stop();
                // //play gameover scene
                // this.scene.launch('GameOver');

                if(this.player.flipX == false){
                    this.player.setVelocityX(-300);
                }
                else{
                    this.player.setVelocityX(300);
                }
            }
            this.playerHealth--;
            setTimeout(()=>{
                if (this.playerHealth >= 0){
                    this.isPlayerHit = false;
                    this.input.keyboard.enabled =  true;
                    this.player.alpha = 1;
                }
                this.player.setVelocityX(0);
            },300);
        }   

    });
    //when dean and thug collide
    this.physics.add.collider(this.player, this.enemies, (player, enemy)=>{
        if(this.isPlayerHit == false){
            this.isPlayerHit = true;
            (enemy as Thug).anims.play('thugAttack');
            
            //TODO: probably should put player.damage() here and thug.attack
            this.player.immune = true;        
            
            //this.input.keyboard.enabled =  false;

            this.cameras.main.shake(32);
            this.player.anims.play('deanKnockback', 0);

            if(this.playerHealth >= 1){
                this.player.alpha = 0.5;
                this.events.emit('playerHit', this.player);
                if(this.player.flipX == false){
                    this.player.setVelocityX(-300);
                }
                else{
                    this.player.setVelocityX(300);
                }
            }
            else if(this.playerHealth <= 0 && !this.murtSceneStarted){
                this.player.anims.play('deanKnockdown',0);
                console.log("You should have died now" + this.playerHealth);
                this.player.body.destroy();
                //play gameover scene after 2 seconds
                this.scene.launch('GameOver');
                if(this.player.flipX == false){
                    this.player.setVelocityX(-300);
                }
                else{
                    this.player.setVelocityX(300);
                }
            }
            this.playerHealth--;
            setTimeout(()=>{
                if (this.playerHealth >= 0){
                    this.isPlayerHit = false;
                    this.input.keyboard.enabled =  true;
                    this.player.alpha = 1;
                }
                this.player.setVelocityX(0);
            },300);
        }   

    });
        this.scene.launch('HUD');
    }
                

    deanThrowing = false;
    deanCrouching = false;

    update (time, delta)
    {   
        this.arialEnemies.children.iterate((child)=>{
            if (child.x <= 400) child.flipX;
        })
        if(this.player.x >= 9750 && !this.murtSceneStarted){
            this.playMurtCutscene();
        }
        else{
        //console.log("Player Position:" + " x:"+this.player.x + " y:"+this.player.y)
        this.duration += time;
        
        // if(delta%2000 < 16.5){
        //     this.enemies.children.iterate((thug)=>{
        //         console.log('module 2000 thug')
        //         thug.flipX = !thug.flipX;
        //         if(thug.flipX) thug.setVelocityX(-100)
        //         else thug.setVelocityX(100);
        //         thug.anims.play('thugWalk')
        //     })
        // }

        if(!this.isPlayerHit){
        //listen to cursor inputs
        if (this.cursors.down.isUp && this.cursors.up.isUp 
            && this.cursors.right.isUp && this.cursors.left.isUp)
        {
            this.player.setVelocityX(0);
            this.player.anims.stop();
            this.player.anims.play('deanIdle', true)
        }

            if (this.cursors.up.isDown  
                && (this.cursors.right.isDown || this.cursors.left.isDown)
                && this.player.body.blocked.down
            )
            {
                this.player.setVelocityY(-400);
                this.player.anims.play('deanJump', true)
                this.deanCrouching = false;
            }
            else if (this.cursors.space.isDown){
                this.fireProjectile(time);
            }
            else if (this.cursors.left.isDown
                && this.player.body.blocked.down)
            {
                this.player.flipX = true;
                this.player.setVelocityX(-160);
                this.player.anims.play('deanRight', true);
                this.deanCrouching = false;            
            }
            else if (this.cursors.right.isDown
                && this.player.body.blocked.down)
            {
                this.player.flipX = false;
                this.player.setVelocityX(160);
                this.player.anims.play('deanRight', true);
                this.deanCrouching = false;
            
            }
            else if (this.cursors.up.isDown
            && this.player.body.blocked.down
            )
            {
                this.player.setVelocityY(-400);
                this.player.anims.play('deanJump', true)
                this.deanCrouching = false;
            }
            else if (this.cursors.down.isDown)
            {
                this.player.anims.play('deanCrouch', true);
                this.player.setVelocityX(0);
                this.deanCrouching = true;
            }
        }
    }
    }

    playMurtCutscene(){
        this.murt.anims.play('murtjump');
        
        this.murt.on('animationcomplete', ()=>{
            this.murt.setVelocityX(-200);
        })
        setTimeout(()=>{
            setTimeout(()=>{
                this.murt.setFrame('murtstanding');
                this.scene.launch('DialogBox', {dialog: "It's a nice day for a soft wedding.",
             camera: this.cameras.main, speaker: 'murt'});
            },1700)
            this.murt.setVelocityX(0)
            this.murt.body.allowGravity = true;
        }, 2000)
        // console.log(this.cameras.main);
        this.murtSceneStarted = true;
    }

    spawnJoss(){
        this.joss = this.physics.add.sprite(8000, 0, 'jossAtlas','jossstanding').setScale(0.65);
        this.joss.setVelocityX(300);
        this.joss.setCollideWorldBounds(true);
        this.joss.anims.play('jossrun', true);
        setTimeout(()=>{
            this.joss.setVelocityX(0);
            this.joss.anims.stop();
            // this.joss.setFrame('jossstanding');
            // this.player.setFrame('deanknockdown7');
            // this.scene.launch('DialogBox', {dialog: "FUCK OFF MURT! PREPARE TO GET FUCKED..\nAND I DON'T MEAN BY CENTIS!",
            // camera: this.cameras.main, speaker: 'joss'});
            
        
        },5000)
    }
}

