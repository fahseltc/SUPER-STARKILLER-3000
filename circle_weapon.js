const CIRCLE_SHOOT_DELAY = 200;

class CircleWeapon {
  constructor(mecha) {
    this.mecha = mecha;
    this.sprite = game.add.sprite(1, 1, 'circle');

    game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.x = 0.1;
    this.sprite.scale.y = 0.1;

    var radius = this.sprite.width / 2;
    this.sprite.body.setCircle(
      radius,
      (-radius + 0.5 * this.sprite.width / this.sprite.scale.x),
      (-radius + 0.5 * this.sprite.height / this.sprite.scale.y)
    );
    this.sprite.visible = false;
    this.active = false;

    this.shoot_time = 0;
  }

  update(controls) {
    //game.debug.body(this.sprite);
    if(controls.sword && !this.active && game.time.now > this.shoot_time) {
      this.sprite.visible = true;
      this.active = true;
      var tween = game.add.tween(this.sprite.scale).to( { x:1, y:1 }, CIRCLE_SHOOT_DELAY, Phaser.Easing.Exponential.Out, true).yoyo(true);
      tween.onComplete.add(function() {
        this.active = false;
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.visible = false;
        this.shoot_time = game.time.now + CIRCLE_SHOOT_DELAY;
      }, this)
    }

    var radius = this.sprite.width/2;
    this.sprite.body.setCircle(
      radius,
      (-radius + 0.5 * this.sprite.width / this.sprite.scale.x),
      (-radius + 0.5 * this.sprite.height / this.sprite.scale.y)
    );
  }
};
