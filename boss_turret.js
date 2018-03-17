BossTurret = function(game, player, turret_data) {
  this.turret_data = turret_data;
  Phaser.Sprite.call(this, game, this.turret_data.OFFSET_X, this.turret_data.OFFSET_Y, 'turret_top_red');
  this.scale.set(0.6, 0.6);
  this.rotation = Math.PI / 4;
  this.anchor.x = 0.5;
  this.anchor.y = 0.3;
  this.player = player;
  this.game = game;

  this.bullet_delay = this.turret_data.BULLET_DELAY;
  this.bullet_speed = this.turret_data.BULLET_SPEED;;
  this.initial_delay = 1000;
  this.aim_at = this.turret_data.AIM_AT;

  this.bullets = this.game.add.group();
  this.bullets.enableBodyDebug = true;
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bullets.createMultiple(100, 'enemy_bullet');
  this.bullets.setAll('anchor.x', 0.5);
  this.bullets.setAll('anchor.y', 0.5);
  this.bullets.setAll('alive', false);
  this.bullets.setAll('scale.y', 0.5);
  this.bullets.setAll('scale.x', 0.5);
  this.bullets.setAll('checkWorldBounds', true);
  this.bullets.forEach(function(bullet) {
    bullet.events.onOutOfBounds.add(function(bullet) { bullet.kill(); }, this);
  }, this);

  this.bullet_time = this.game.time.now + this.initial_delay;

  // this.graphics = game.add.graphics(this.x, this.y);
  // this.spinner_angle = 0;
};

BossTurret.prototype = Object.create(Phaser.Sprite.prototype);
BossTurret.prototype.constructor = constructor;

BossTurret.prototype.update = function() {

  if(this.aim_at == 'PLAYER') {
    this.rotation = game.physics.arcade.angleToXY(this.player.sprite, this.worldPosition.x, this.worldPosition.y) + Math.PI/2;
  } else if (this.aim_at == 'MOUSE') {
    this.rotation = game.physics.arcade.angleToPointer(this, game.input.activePointer, true) - Math.PI/2;
  }

  if(this.alive && this.visible && this.game.time.now > this.bullet_time) {
    var bullet = this.bullets.getFirstExists(false);
    if(bullet) {
      bullet.reset(this.worldPosition.x, this.worldPosition.y);
      bullet.lifespan = ENEMY_BULLET_LIFESPAN;
      if(this.aim_at == 'PLAYER') {
        this.game.physics.arcade.moveToXY(bullet, this.player.sprite.x, this.player.sprite.y, this.bullet_speed);
      } else if (this.aim_at == 'MOUSE') {
        this.game.physics.arcade.moveToPointer(bullet, this.bullet_speed);
      }

      this.bullet_time = game.time.now + this.bullet_delay;
    }
  }
};

BossTurret.prototype.destroy = function() { this.bullets.destroy();};
