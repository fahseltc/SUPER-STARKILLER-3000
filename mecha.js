const PLAYER_MAX_HEALTH = 4;
const INVULN_TIME = 150

class Mecha {
  constructor(x, y, controls) {

    this.controls = controls;
    this.flames = new MechaFlame(this);

    // mecha setup
    this.sprite = game.add.sprite(x, y, 'mecha');
    //this.sprite.scale.setTo()
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
  }

  update() {
    if(this.controls.space == true) {
      this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);
    } else {
      this.sprite.rotation = game.physics.arcade.moveToPointer(this.sprite, 60, game.input.activePointer, 300);
    }
    this.bullet_weapon.update(this.controls);
    this.circle_weapon.update(this.controls);
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

};
