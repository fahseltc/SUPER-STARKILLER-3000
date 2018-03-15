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

  if(this.aim_at == "PLAYER") {
    this.rotation = game.physics.arcade.angleToXY(this.player.sprite, this.worldPosition.x, this.worldPosition.y) + Math.PI/2;
  } else if (this.aim_at == "MOUSE") {
    console.log(this.rotation);
    this.rotation = game.physics.arcade.angleToPointer(this, game.input.activePointer, true) - Math.PI/2;
  }

  if(this.alive && this.visible && this.game.time.now > this.bullet_time) {
    var bullet = this.bullets.getFirstExists(false);
    if(bullet) {
      bullet.reset(this.worldPosition.x, this.worldPosition.y);
      bullet.lifespan = ENEMY_BULLET_LIFESPAN;
      if(this.aim_at == "PLAYER") {
        this.game.physics.arcade.moveToXY(bullet, this.player.sprite.x, this.player.sprite.y, this.bullet_speed);
      } else if (this.aim_at == "MOUSE") {
        this.game.physics.arcade.moveToPointer(bullet, this.bullet_speed);
      }

      this.bullet_time = game.time.now + this.bullet_delay;
    }
  }

  // this.graphics.clear();
  // if(this.alive && this.visible) {
  //   var ms_till_shot = this.bullet_time - game.time.now;
  //   // (range 0 to this.bullet_time) must map to (0 to 360)
  //   var degree_multiplier = ms_till_shot / this.bullet_delay;
  //   var degrees = degree_multiplier * 360;

  //   this.graphics.beginFill(0x000000);
  //   this.graphics.arc(this.x, this.y, 9, this.turret.rotation + Math.PI / 1.31, this.turret.rotation + game.math.degToRad(degrees) + Math.PI / 1.31 , true);  //
  //   this.graphics.endFill();
};

// ShootingEnemy.prototype.render = function() {
//   this.draw_spinner();
// }

// ShootingEnemy.prototype.draw_spinner = function() {

//   // this.graphics.clear();
//   // if(this.visible){
//   //   //console.log(angle2);
//   //   this.graphics.beginFill(0x000000);
//   //   this.graphics.arc(this.x, this.y, 9, this.angle_data.min, game.math.degToRad(this.angle_data.max), true);
//   //   this.graphics.endFill();
//   // }
// };

BossTurret.prototype.destroy = function() { this.sprite.destroy(); };
