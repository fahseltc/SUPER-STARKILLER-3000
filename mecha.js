class Mecha {
  constructor(x, y, controls) {

    this.controls = controls;
    this.flames = new MechaFlame(this);

    // mecha setup
    this.sprite = game.add.sprite(x, y, 'mecha');
    this.sprite.anchor.setTo(0.25, 0.5);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.angularDrag = 800;
    this.sprite.body.drag.set(150);
    this.sprite.body.maxAngular = 200;
    this.sprite.body.maxVelocity.set(900);

    // weapons
    this.circle_weapon = new CircleWeapon(this);
    this.bullet_weapon = new BulletWeapon(this);
    this.sprite.addChild(this.circle_weapon.sprite);
  }

  update() {
    this.sprite.rotation = game.physics.arcade.moveToPointer(this.sprite, 60, game.input.activePointer, 300);

    this.bullet_weapon.update(this.controls);
    this.circle_weapon.update(this.controls);
  }

  render() {
    this.flames.render();
    this.bullet_weapon.render();
  }

};
