import { Bottle, Bottles } from "../sprites/weapons/bottles";
import * as Phaser from 'phaser';
import { Thug } from "../sprites/enemies/thug";
import HUD from "./hud";
import { Dean } from "../sprites/characters/dean";

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
        this.load.image('murt', '../../assets/enemies/murt.png');

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
    objects;
    dumpster;
    holeDumpster;
    duration = 0;
    lastDuration = 0;
    isPlayerHit = false;
    playerHealth = 4;
    streetLevelY = 750;
    murt;

    fireProjectile(time) {
        if(time > this.lastFired){
            this.bottles.fireBottle(this.player, this.deanCrouching);
            this.player.anims.play('deanThrow', true);
            this.lastFired = time + 420;
        }
    }
    create ()
    {        
        let image = this.add.image(5500, 400, 'salterbg');
        console.log("background image loaded");
        //let background = this.add.image(0, 500, 'salterbg');

        // Listen to space keys
        //this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(280,this.streetLevelY,'dean');
        this.player.setScale(0.7);
        this.player.setBodySize(200,300, true);
        this.player.setBounce(0.1);

        this.cameras.main.setBounds(0, 0, 11000, 800);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBackgroundColor('#FFFFFF');
        
        this.bottles = new Bottles(this);

        
       
        this.platforms = this.physics.add.staticGroup();
        this.carTop = this.physics.add.staticImage(1513,this.streetLevelY-75,'cartop').setScale(0.5).refreshBody().setBodySize(200,50, true);
        this.carBottom = this.physics.add.staticImage(1500,this.streetLevelY,'carbottom').setScale(0.5).refreshBody().setSize(400, 100);
        this.dumpster = this.physics.add.staticImage(3000, this.streetLevelY-100, 'dumpster').setScale(0.5).refreshBody();
        this.holeDumpster = this.physics.add.staticImage(4613, this.streetLevelY, 'dumpster').setScale(0.5).refreshBody();
        

        this.murt = this.physics.add.staticImage(10425, 110, 'murt').setScale(0.4);

        this.enemies = this.physics.add.sprite(640, this.streetLevelY, 'thug');
        this.enemies.setScale(0.4);
        this.enemies.flipX = true;
        this.enemies.setImmovable();
        

        // this.physics.add.collider(this.player, this.platforms);
        // this.physics.add.collider(this.bottles, this.platforms);
        // this.physics.add.collider(this.bottles, this.enemies);

        this.physics.world.setBounds(0, 0, 11000, 750);

        this.player.setCollideWorldBounds(true);
        this.enemies.setCollideWorldBounds(true);

        //Dean KO
        let deanKnockdown = this.anims.generateFrameNames('deanAtlas', {
            start: 1, end: 7,
            prefix: 'deanknockdown'});
        this.anims.create({ key: 'deanKnockdown', frames: deanKnockdown, frameRate: 10, repeat: 0 });

        let deanDamage = this.anims.generateFrameNames('deanAtlas', {
            start: 1, end: 2,
            prefix: 'deandamage'});
        this.anims.create({ key: 'deanKnockback', frames: deanDamage, frameRate: 10, repeat: 0 });
        
    

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
            frameRate: 10,
            repeat: 0
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

    //when the bottles hit the enemy
    this.physics.add.collider(this.bottles, this.enemies,(enemy, bottle)=>{
        enemy.body.stop();
        let thug = enemy as Thug;
        thug.flipX = false;
        console.log("hello");
        (bottle as Bottle).reset(this.player);
        thug.anims.play('thugDamage');
        thug.body.destroy();
        }, null);

    //when dean hits the car
    this.physics.add.collider(this.player, [this.carTop, this.carBottom]);
    this.physics.add.collider(this.player, this.holeDumpster);
    //when the bottles hit the car
    this.physics.add.collider(this.bottles, [this.carTop, this.carBottom],(collidee, bottle)=>{
        (bottle as Bottle).reset(this.player);    
    }, null);
    //when dean hits the thug
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
            else if(this.playerHealth <= 0){
                this.player.anims.play('deanKnockdown',0);
                console.log("You should have died now" + this.playerHealth);
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
        console.log("Player Position:" + " x:"+this.player.x + " y:"+this.player.y)
        this.duration += time;
        

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
                this.player.setVelocityY(-300);
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
                this.player.setVelocityY(-200);
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

