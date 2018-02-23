const ENEMY_BULLET_SPEED = 250;
const ENEMY_BULLET_DELAY = 3000;
const ENEMY_BULLET_LIFESPAN = 10000;


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
      bullet.reset(this.x, this.y);
      bullet.lifespan = ENEMY_BULLET_LIFESPAN;
      this.rotation = this.game.physics.arcade.moveToXY(bullet, this.mecha.sprite.x, this.mecha.sprite.y, ENEMY_BULLET_SPEED);
      this.bullet_time = game.time.now + ENEMY_BULLET_DELAY;
    }
  }
};
