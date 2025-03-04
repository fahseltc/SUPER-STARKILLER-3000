class SpikeEnemy {
  constructor(x, y, velocity) {
    this.sprite = game.add.sprite(x, y, "spike_enemy");
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.enableBody = true;
    this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
    game.physics.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(1);

    this.sprite.body.velocity.x = velocity.X;
    this.sprite.body.velocity.y = velocity.Y;
  }

  destroy() {
    this.sprite.destroy();
  }

}