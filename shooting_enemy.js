// const ENEMY_BULLET_SPEED = 200;
// const ENEMY_BULLET_DELAY = 700;
const ENEMY_BULLET_INITIAL_DELAY = 1500;
const ENEMY_BULLET_LIFESPAN = 6000;


ShootingEnemy = function(game, mecha, sprite, bullet_delay, bullet_speed) {
  Phaser.Sprite.call(this, game, 1, 1, 'turret_base_' + sprite);
  this.rotation = Math.PI/4;
  this.mecha = mecha;
  this.game = game;
  this.turret = game.add.sprite(1, 1, 'turret_top_' + sprite);
  this.turret.anchor.x = 0.52;
  this.turret.anchor.y = 0.3;
  this.addChild(this.turret);
  this.bullet_delay = bullet_delay;
  this.bullet_speed = bullet_speed;
  //console.log('delay: ' + bullet_delay + '  speed: ' + bullet_speed)

  this.bullets = this.game.add.group();
  this.bullets.enableBodyDebug = true;
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bullets.createMultiple(100, 'enemy_bullet');
  this.bullets.setAll('anchor.x', 0.5);
  this.bullets.setAll('anchor.y', 0.5);
  this.bullets.setAll('alive', false);

  this.bullet_time = this.game.time.now + ENEMY_BULLET_INITIAL_DELAY;
};

ShootingEnemy.prototype = Object.create(Phaser.Sprite.prototype);
ShootingEnemy.prototype.constructor = constructor;

ShootingEnemy.prototype.update = function() {
  this.turret.rotation = game.physics.arcade.angleToXY(this.mecha.sprite, this.x, this.y) + Math.PI/4;
  if(this.alive && this.visible && this.game.time.now > this.bullet_time) {
    var bullet = this.bullets.getFirstExists(false);
    if(bullet) {
      bullet.reset(this.x, this.y);
      bullet.lifespan = ENEMY_BULLET_LIFESPAN;
      this.game.physics.arcade.moveToXY(bullet, this.mecha.sprite.x, this.mecha.sprite.y, this.bullet_speed);
      this.bullet_time = game.time.now + this.bullet_delay;
    }
  }
};

ShootingEnemy.prototype.get_initial_delay = function() { return ENEMY_BULLET_INITIAL_DELAY };
