BossReactionaryTurret = function(game, player, turret_data) {
  this.turret_data = turret_data;
  Phaser.Sprite.call(
    this,
    game,
    this.turret_data.OFFSET_X,
    this.turret_data.OFFSET_Y,
    "turret_top_blue"
  );
  this.scale.set(0.6, 0.6);
  this.rotation = Math.PI / 4;
  this.anchor.x = 0.5;
  this.anchor.y = 0.3;
  this.player = player;
  this.game = game;

  this.bullet_delay = this.turret_data.BULLET_DELAY;
  this.bullet_speed = this.turret_data.BULLET_SPEED;
  this.initial_delay = 1000;
  this.aim_at = this.turret_data.AIM_AT;

  this.bullets = this.game.add.group();

  this.bullets.enableBodyDebug = true;
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

  this.bullets.createMultiple(this.turret_data.BULLET_COUNT, "enemy_bullet");
  this.bullets.setAll("anchor.x", 0.5);
  this.bullets.setAll("anchor.y", 0.5);
  this.bullets.setAll("alive", false);
  this.bullets.setAll("scale.y", 0.5);
  this.bullets.setAll("scale.x", 0.5);
  this.bullets.setAll("checkWorldBounds", true);
  this.bullets.forEach(function(bullet) {
    bullet.events.onOutOfBounds.add(function(bullet) {
      bullet.kill();
    }, this);
  }, this);

  this.bullet_time = this.game.time.now + this.initial_delay;
};

BossReactionaryTurret.prototype = Object.create(Phaser.Sprite.prototype);
BossReactionaryTurret.prototype.constructor = constructor;

BossReactionaryTurret.prototype.update = function() {};

BossReactionaryTurret.prototype.damaged = function() {
  var bullets = this.bullets.getAll();
  bullets.forEach(function(bullet, index) {
    bullet.reset(this.worldPosition.x, this.worldPosition.y);
    bullet.lifespan = ENEMY_BULLET_LIFESPAN;
    game.physics.arcade.moveToXY(
      bullet,
      this.player.sprite.x + (index * this.turret_data.BULLET_SPREAD) - (0.5 * this.bullets.length * this.turret_data.BULLET_SPREAD),
      this.player.sprite.y,
      this.bullet_speed
    );
  }, this);
};

BossReactionaryTurret.prototype.destroy = function() {
  this.bullets.destroy();
};