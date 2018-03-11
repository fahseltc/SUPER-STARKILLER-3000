const PLAYER_MAX_HEALTH = 4;
const INVULN_TIME = 150

class Mecha {
  constructor(x, y, controls) {

    this.controls = controls;
    this.flames = new MechaFlame(this);

    // mecha setup
    this.sprite = game.add.sprite(x, y, 'player');
    this.sprite.scale.setTo(0.4, 0.4);
    this.sprite.anchor.setTo(0.5, 0.5);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.angularDrag = 800;
    this.sprite.body.drag.set(1550);
    this.sprite.body.maxAngular = 200;
    this.sprite.body.maxVelocity.set(900);

    // weapons
    this.circle_weapon = new CircleWeapon(this);
    this.bullet_weapon = new BulletWeapon(this);
    this.sprite.addChild(this.circle_weapon.sprite);

    // health
    this.sprite.maxHealth = PLAYER_MAX_HEALTH;
    this.sprite.health = PLAYER_MAX_HEALTH;

    this.invuln = false;

    // shield powerup
    this.shield_sprite = game.add.sprite(0,0, 'shield');
    this.shield_sprite.anchor.set(0.5, 0.5);
    this.shield_sprite.scale.set(0.5,0.5);
    game.physics.enable(this.shield_sprite, Phaser.Physics.ARCADE);
    this.shield_sprite.visible = false;
    this.shield_sprite.active = false;
  }

  update() {
    //this.shield_sprite.reset(this.sprite.x, this.sprite.y);
    this.shield_sprite.x = this.sprite.x
    this.shield_sprite.y = this.sprite.y
    if(this.controls.space == true) {
      this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);
    } else {
      var distance_to_mouse = Phaser.Math.distance(game.input.activePointer.x, game.input.activePointer.y, this.sprite.x, this.sprite.y);

      if(distance_to_mouse > 100) {
        this.sprite.rotation = game.physics.arcade.moveToPointer(this.sprite, 60, game.input.activePointer, 300);
      } else {
        // were close to mouse so rotate but dont move
        this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);
      }

    }
    this.bullet_weapon.update(this.controls);
    this.circle_weapon.update(this.controls);
  }

  activate_shield() {
    this.shield_sprite.visible = true;
    this.shield_sprite.active = true;
    //game.add.tween(this.shield_sprite).to( { } )
  }

  destroy_shield() {
    this.shield_sprite.visible = false;
    this.shield_sprite.active = false;
  }

  render() {
    this.flames.render();
    this.bullet_weapon.render();
  }

  take_damage() {
    this.sprite.damage(1);
    if(this.sprite.alive) {
      this.invuln = true;
      var tween = game.add.tween(this.sprite).to( { tint: 0x000000 }, INVULN_TIME, "Linear", true).yoyo(true).repeat(3);
      tween.onComplete.add(function() { this.tint = 0xFFFFFF; this.invuln = false; }, this);
    }
  }

  destroy() {
    this.sprite.destroy();
    this.circle_weapon.sprite.destroy();
    this.bullet_weapon.bullets.destroy();
  }
};
