class Mecha {
    constructor(x, y) {

        // mecha setup
        this.sprite = game.add.sprite(x, y, 'mecha');
        this.sprite.anchor.setTo(0.25, 0.5);

        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.body.angularDrag = 800;
        this.sprite.body.drag.set(150);
        this.sprite.body.maxAngular = 200;
        this.sprite.body.maxVelocity.set(900);

        this.boost_count = 20;
        this.flame_counter = 0;

        // flames
        this.flames = game.add.group();
        this.flames.createMultiple(100, 'flame');
        this.flames.setAll('anchor.x', 0.5);
        this.flames.setAll('anchor.y', 0.5);
        this.flames.setAll('z',-1);


        // bullets
        this.bullets = game.add.group();
        this.bullets.enableBodyDebug = true;
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(40, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullet_time = 0;


        // sword setup
        this.sword = game.add.sprite(100, 100, 'sword');
        this.sword.scale.x = 2;
        this.sword.visible = false;
        this.sword.anchor.setTo(0.5, 0.5);
        this.sword.enableBody = true;
        this.sword.physicsBodyType = Phaser.Physics.ARCADE;
        game.physics.enable(this.sword, Phaser.Physics.ARCADE);
        this.sword.body.drag.set(1000);


        // group bullets
        this.attack_group = game.add.group();
        this.attack_group.add(this.bullets);
        this.attack_group.add(this.sword);
    }

    update() {
        this.sprite.rotation = game.physics.arcade.moveToPointer(this.sprite, 60, game.input.activePointer, 300);

        if(this.boost_count < 20) { this.boost_count++; }

        if(controls.fire)  { this.fire_bullet(); }
        if(controls.sword) { this.sword_chop();  }
    }

    render() {
        this.draw_flame_trail();
    }

    draw_flame_trail() {
        // if(this.flame_counter < 2) { this.flame_counter ++ }
        // else if (this.flame_counter == 2) {
            var flame = this.flames.getFirstExists(false);
            if(flame) {
                flame.rotation = this.sprite.rotation - 30;
                flame.reset(this.sprite.body.x + 10, this.sprite.body.y + 32);
                flame.alpha = 1;
                flame.lifespan = 1000;
                //game.add.tween(flame).to( { alpha: 0 }, duration, easetype, autostart, delay, repeat, yoyo);
                game.add.tween(flame).to( { alpha: 0 }, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, false);
            }
        //     this.flame_counter = 0;
        // }
    }

    sword_chop(){
        this.sword.reset(this.sprite.body.x + 10, this.sprite.body.y + 32);
        this.sword.visible = true;
        this.sword.lifespan = 200;
        this.sword.angle = this.sprite.angle + 90;
        game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.sprite.body.speed + 1000, this.sword.body.velocity);
    }

    fire_bullet() {
         if (game.time.now > this.bullet_time) {
            var bullet = this.bullets.getFirstExists(false);

            if (bullet) {
                bullet.reset(this.sprite.body.x + 10, this.sprite.body.y + 32);
                bullet.lifespan = 2000;
                //bullet.rotation = sprite.rotation;
                game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.sprite.body.speed + 100, bullet.body.velocity);
                this.bullet_time = game.time.now + 100;
            }
        }
    }
}