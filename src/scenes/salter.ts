import { Bottles } from "../sprites/weapons/bottles";
import * as Phaser from 'phaser';

export class Salter extends Phaser.Scene{
    constructor(){
        super("Salter")
    }

    preload ()
    {
        this.load.image('bg', '../../assets/background.png');

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

        //dean crouch animation
        this.load.image('deanCrouch1', '../../assets/dean/deancrouch.png');

        //dean throw animations
        this.load.image('deanThrow1', '../../assets/dean/deanthrow1.png');
        this.load.image('deanThrow2', '../../assets/dean/deanthrow2.png');
        this.load.image('deanThrow3', '../../assets/dean/deanthrow3.png');

        //car
        this.load.image('car', '../../assets/objects/CAR.png');

        //bottle
        this.load.image('bottle', '../../assets/placeholders/bottle.png')
    }

    projectiles;
    platforms;
    player;
    bottles;
    cursors;

    create ()
    {
        this.add.image(4000, 300, 'bg')

        // Listen to space keys
        this.input.keyboard.on('keydown_SPACE', this.fireProjectile, this);
        console.log("after keyboard input ")

        

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(1500,600,'car').setScale(0.5).setSize(0.5).refreshBody();

        this.bottles = new Bottles(this);
        console.log(this.bottles);

        this.player = this.physics.add.sprite(280,550,'dean');
        this.player.setScale(0.7);
        this.player.setBounce(0.1);



        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.bottles, this.platforms);
        this.physics.world.setBounds(0, 0, 8000, 650);

        this.player.setCollideWorldBounds(true);

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, 8000, 800);
        this.cameras.main.startFollow(this.player);   



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
                {key: 'deanRun2'}

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
    }

    deanThrowing = false;
    deanCrouching = false;

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.player.flipX = true;
            this.player.setVelocityX(-160);
            this.player.anims.play('deanRight', true);
            this.deanCrouching = false;

            
        }
        else if (this.cursors.right.isDown)
        {
            this.player.flipX = false;
            this.player.setVelocityX(160);
            this.player.anims.play('deanRight', true);
            this.deanCrouching = false;
        
        }
        else if (this.cursors.up.isDown
        //&& this.player.body.touching.down
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
        else if (this.cursors.down.isUp && this.cursors.up.isUp 
        && this.cursors.right.isUp && this.cursors.left.isUp)
        {
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            this.player.anims.stop();
            this.player.anims.play('deanIdle', true)
        }
            
        this.bottles.children.entries.forEach(element => {
            element.angle +=1
        });

    }

    fireProjectile() {
        console.log("hello");
        this.bottles.fireBottle(this.player, this.deanCrouching);
        this.player.anims.play('deanThrow', true);
    }
}

