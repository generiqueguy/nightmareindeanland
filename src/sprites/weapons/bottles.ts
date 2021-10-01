export class Bottle extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bottle');
    }

    fire (x, y, flipX, deanCrouching)
    {
        if(deanCrouching)
            this.body.reset(x, y+10);
        else
            this.body.reset(x, y-50);

        //@ts-ignore sd
        this.body.setAllowGravity(false)

        this.setActive(true);
        this.setVisible(true);

        if(flipX)
            this.setVelocityX(-300);
        else
            this.setVelocityX(300);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.x <= -100)
        {
            this.setActive(false);
            this.setVisible(false);
        }
        this.rotation += 0.05;
    }
}

export class Bottles extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 6,
            key: 'bottle',
            active: false,
            visible: false,
            classType: Bottle
        });
    }

    fireBottle (player, deanCrouching)
    {
        let bottle = this.getFirstDead(false);

        if (bottle)
        {
            bottle.fire(player.x, player.y, player.flipX, deanCrouching);
        }
    }
}
