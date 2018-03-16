class BossEnemy {
  constructor(player, turret_data, level) {
    this.level = level;
    this.player = player;
    console.log(turret_data);
    this.turret_data = turret_data;

    this.sprite = game.add.sprite(game.world.width / 2, 0, 'boss_1');
    this.sprite.anchor.set(0.5, 0.5);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.all_bullets = game.add.group();
    this.turrets = game.add.group();
    this.turret_data.forEach(function(turret, index) {
      var turret = new BossTurret(game, this.player, turret_data[index]);
      turret.revive();
      this.turrets.add(turret);
      this.all_bullets.add(turret.bullets)
    }, this);
    this.sprite.addChild(this.turrets);

    // Circle shields
    this.shield_stack = [];
    this.shield_stack.push(new BossShield(this.sprite.position, 0, 'red'));
    this.shield_stack.push(new BossShield(this.sprite.position, 1, 'blue'));
    this.shield_stack.push(new BossShield(this.sprite.position, 2, 'red'));
    this.shield_stack.push(new BossShield(this.sprite.position, 3, 'red'));
    this.shield_stack.push(new BossShield(this.sprite.position, 4, 'red'));
    this.shield_stack.push(new BossShield(this.sprite.position, 5, 'blue'));

    // this.shield_stack.forEach(function(shield) {
    //   this.sprite.addChild(shield.sprite);
    //  }, this)
    //this.shield_destroyed_this_loop = false;
  }

  update() {
    this.update_turrets();
    this.check_shield_collisions();
    this.check_boss_hits_player();
  }

  update_turrets() {
    this.turrets.forEach(function(turret) {
      turret.update();
    }, this);
  }

  check_shield_collisions() {
    // get the outermost shield
    var outermost_shield = this.shield_stack.pop();
    // test Red weapon collision
    if(outermost_shield) {
      game.physics.arcade.overlap(this.player.bullet_weapon.bullets, outermost_shield.sprite, this.handle_bullet_collision);
      // test Blue weapon collision
      if(this.player.circle_weapon.active) {
        game.physics.arcade.overlap(this.player.circle_weapon.sprite, outermost_shield.sprite, this.handle_circle_weapon_collision, null, this);
      }

      if(outermost_shield.sprite.alive) {
        this.shield_stack.push(outermost_shield);
      }

    } else {
      console.log("all shields dead, we won?")
      this.level.boss_died();
    }
  }

  check_boss_hits_player() {
    var visible_bullets = this.all_bullets.getAll('alive', true);
    game.physics.arcade.overlap(this.player.sprite, visible_bullets, this.handle_player_hit, null, this);
  }

  handle_circle_weapon_collision(circle_weapon_sprite, boss_shield_sprite) {
    if(boss_shield_sprite.key == 'boss_shield_blue') {
      boss_shield_sprite.kill();
      console.log("Circle weapon collision");
    }
  }

  handle_bullet_collision(boss_shield_sprite, bullet_sprite) {
    if(boss_shield_sprite.key == 'boss_shield_red') {
      boss_shield_sprite.kill();
      console.log("Bullet collision");
    }
    bullet_sprite.kill();
  }

  handle_player_hit(player, bullet) {
    bullet.kill();
    var player_died = this.player.process_hit();
    if(player_died) {
      this.level.end_game();
    }
  }

  render() {
    // this.shield_stack.forEach(function(shield) {
    //   shield.render();
    // }, this);
  }

  destroy() {
    this.sprite.destroy();
    this.turrets.forEach(function(boss_turret) {
      boss_turret.destroy();
    }, this);
    this.turrets.destroy();
    this.shield_stack.forEach(function(boss_shield) {
      boss_shield.destroy();
    }, this);
  }
}

















// const ENEMY_BULLET_LIFESPAN = 7000;
// Enemy = function(game, player, sprite, bullet_delay, bullet_speed, initial_delay) {
//   Phaser.Sprite.call(this, game, 0, 0, 'turret_base_' + sprite);
//   this.rotation = Math.PI/4;
//   this.player = player;
//   this.game = game;
//   this.turret = game.add.sprite(0, 0, 'turret_top_' + sprite);
//   this.turret.anchor.x = 0.5;
//   this.turret.anchor.y = 0.3;
//   this.addChild(this.turret);
//   this.bullet_delay = bullet_delay;
//   this.bullet_speed = bullet_speed;
//   this.initial_delay = initial_delay;

//   this.bullets = this.game.add.group();
//   this.bullets.enableBodyDebug = true;
//   this.bullets.enableBody = true;
//   this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
//   this.bullets.createMultiple(100, 'enemy_bullet');
//   this.bullets.setAll('anchor.x', 0.5);
//   this.bullets.setAll('anchor.y', 0.5);
//   this.bullets.setAll('alive', false);
//   this.bullets.setAll('checkWorldBounds', true);
//   this.bullets.forEach(function(bullet) {
//     bullet.events.onOutOfBounds.add(function(bullet) { bullet.kill(); }, this);
//   }, this);

//   this.bullet_time = this.game.time.now + initial_delay;

//   this.graphics = game.add.graphics(this.x, this.y);
//   this.spinner_angle = 0;
// };

// ShootingEnemy.prototype = Object.create(Phaser.Sprite.prototype);
// ShootingEnemy.prototype.constructor = constructor;

// ShootingEnemy.prototype.update = function() {
//   this.turret.rotation = game.physics.arcade.angleToXY(this.player.sprite, this.x, this.y) + Math.PI/4;
//   if(this.alive && this.visible && this.game.time.now > this.bullet_time) {
//     var bullet = this.bullets.getFirstExists(false);
//     if(bullet) {
//       bullet.reset(this.x, this.y);
//       bullet.lifespan = ENEMY_BULLET_LIFESPAN;
//       this.game.physics.arcade.moveToXY(bullet, this.player.sprite.x, this.player.sprite.y, this.bullet_speed);
//       this.bullet_time = game.time.now + this.bullet_delay;
//     }
//   }

//   this.graphics.clear();
//   if(this.alive && this.visible) {
//     var ms_till_shot = this.bullet_time - game.time.now;
//     // (range 0 to this.bullet_time) must map to (0 to 360)
//     var degree_multiplier = ms_till_shot / this.bullet_delay;
//     var degrees = degree_multiplier * 360;

//     this.graphics.beginFill(0x000000);
//     this.graphics.arc(this.x, this.y, 9, this.turret.rotation + Math.PI / 1.31, this.turret.rotation + game.math.degToRad(degrees) + Math.PI / 1.31 , true);  //
//     this.graphics.endFill();
// }};

// // ShootingEnemy.prototype.render = function() {
// //   this.draw_spinner();
// // }

// // ShootingEnemy.prototype.draw_spinner = function() {

// //   // this.graphics.clear();
// //   // if(this.visible){
// //   //   //console.log(angle2);
// //   //   this.graphics.beginFill(0x000000);
// //   //   this.graphics.arc(this.x, this.y, 9, this.angle_data.min, game.math.degToRad(this.angle_data.max), true);
// //   //   this.graphics.endFill();
// //   // }
// // };

// ShootingEnemy.prototype.get_initial_delay = function() { return this.initial_delay };
// ShootingEnemy.prototype.destroy = function() { this.graphics.clear(); this.graphics.destroy(); };
