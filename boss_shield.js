class BossShield {
  constructor(position, index, color) {
    this.index = index;
    this.sprite = game.add.sprite(position.x, position.y, 'boss_shield_' + color);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.width += 60 * (1 + index);
    this.sprite.height += 60 * (1 + index);

    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    var radius = (this.sprite.width / this.sprite.scale.x) / 2;
    this.sprite.body.setCircle(
      radius,
      (-radius + 0.5 * this.sprite.width  / this.sprite.scale.x),
      (-radius + 0.5 * this.sprite.height / this.sprite.scale.y)
    );
  }

  update() {

  }

  render() {
    //game.debug.body(this.sprite);
  }

  destroy() {
    this.sprite.destroy();
  }
}