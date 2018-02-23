ShootingEnemy = function(game, mecha, x, y, sprite) {
  Phaser.Sprite.call(this, game, x, y, sprite);
  this.mecha = mecha;
  this.game = game;

  this.bullets = this.game.add.group();
  this.bullets.enableBodyDebug = true;
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bullets.createMultiple(10, 'enemy_bullet');
  this.bullets.setAll('anchor.x', 0.5);
  this.bullets.setAll('anchor.y', 0.5);
  this.bullets.setAll('alive', false);

  this.bullet_time = this.game.time.now + 500;
};

ShootingEnemy.prototype = Object.create(Phaser.Sprite.prototype);
ShootingEnemy.prototype.constructor = constructor;

ShootingEnemy.prototype.update = function() {
  if(this.alive && this.visible && this.game.time.now > this.bullet_time) {
    var bullet = this.bullets.getFirstExists(false);
    if(bullet) {
      // var rotation = this.game.physics.arcade.angleBetween(this, this.mecha.sprite);
      // bullet.rotation = rotation;
      // var plz = this.game.physics.arcade.velocityFromRotation(this.angle, 300, this.velocity);
      // bullet.velocity = plz;
      bullet.reset(this.x, this.y);
      bullet.lifespan = 10000;
      //console.log(this.mecha.sprite.position)
      //console.log(game.input.activePointer)

      this.rotation = this.game.physics.arcade.moveToXY(bullet, this.mecha.sprite.x, this.mecha.sprite.y, 150);

      //console.log(bullet);
      this.bullet_time = game.time.now + 3000;
    }
  }
};
