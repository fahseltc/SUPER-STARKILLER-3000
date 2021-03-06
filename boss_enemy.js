const BOSS_INVULN_TIME = 100;

class BossEnemy {
  constructor(player, level_data, level) {
    this.level = level;
    this.player = player;
    this.turret_data = level_data.TURRETS;
    this.shield_data = level_data.SHIELDS;

    this.sprite = game.add.sprite(game.world.width / 2, 0, "boss_" + level_data.BOSS_NUMBER);
    this.sprite.anchor.set(0.5, 0.5);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    if(level_data.BOSS_NUMBER == 3) {
      this.sprite.scale.set(0.75, 0.75);
      this.sprite.anchor.set(0.5, 0.2);
    }

    this.all_bullets = game.add.group();
    this.turrets = game.add.group();
    this.turret_data.forEach(function(turret, index) {
      switch(this.turret_data[index].TYPE) {
        case "NORMAL":
          var turret = new BossTurret(game, this.player, this.turret_data[index]);
          break;
        case "REACTIONARY":
          var turret = new BossReactionaryTurret(game, this.player, this.turret_data[index]);
          break;
      }
      turret.revive();
      this.turrets.add(turret);
      this.all_bullets.add(turret.bullets);
    }, this);
    this.sprite.addChild(this.turrets);

    // Circle shields
    this.shield_stack = [];
    this.shield_data.forEach(function(shield_color, index) {
      this.shield_stack.push(
        new BossShield(this.sprite.position, index, shield_color)
      );
    }, this);

    this.invuln = false;
    this.dead = false;
    this.ending = false;

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
    if (!this.invuln) {
      // get the outermost shield
      var outermost_shield = this.shield_stack.pop();
      // test Red weapon collision
      if (outermost_shield) {
        game.physics.arcade.overlap(
          this.player.bullet_weapon.bullets,
          outermost_shield.sprite,
          this.handle_bullet_collision,
          null,
          this
        );
        // test Blue weapon collision
        if (this.player.circle_weapon.active) {
          game.physics.arcade.overlap(
            this.player.circle_weapon.sprite,
            outermost_shield.sprite,
            this.handle_circle_weapon_collision,
            null,
            this
          );
        }

        if (outermost_shield.sprite.alive) {
          this.shield_stack.push(outermost_shield);
        }
      } else if (this.dead == false) {
        if (this.player.circle_weapon.active) {
          game.physics.arcade.overlap(
            this.player.circle_weapon.sprite,
            this.sprite,
            this.died,
            null,
            this.level
          );
        }
        game.physics.arcade.overlap(
          this.player.bullet_weapon.bullets,
          this.sprite,
          this.died,
          null,
          this.level
        );
      }
    }
  }

  check_boss_hits_player() {
    var visible_bullets = this.all_bullets.getAll("alive", true);
    game.physics.arcade.overlap(
      this.player.sprite,
      visible_bullets,
      this.handle_player_hit,
      null,
      this
    );
  }

  // PLAYER CIRCLE HITS BOSS SHIELD
  handle_circle_weapon_collision(circle_weapon_sprite, boss_shield_sprite) {
    if (boss_shield_sprite.key == "boss_shield_blue") {
      this.handle_boss_hit(boss_shield_sprite);
    }
  }

  // PLAYER BULLETS HITS BOSS SHIELD
  handle_bullet_collision(boss_shield_sprite, bullet_sprite) {
    if (boss_shield_sprite.key == "boss_shield_red") {
      this.handle_boss_hit(boss_shield_sprite);
    }
    bullet_sprite.kill();
  }

  handle_boss_hit(sprite) {
    sound_manager.play("boss_shield_damaged", GLOBAL_SFX_VOLUME);
    this.level.add_score(10);
    this.invuln = true;
    this.set_blinky_death(sprite);
    this.turrets.forEach(function(turret) {
      turret.damaged();
    }, this);
  }

  set_blinky_death(sprite) {
    var tween = game.add
      .tween(sprite)
      .to({ tint: 0x000000 }, BOSS_INVULN_TIME, "Linear", true)
      .yoyo(true)
      .repeat(10);
    tween.onComplete.addOnce(function() {
      sprite.kill();
      this.invuln = false;
    }, this);
    return tween;
  }

  died() {
    if(this.death_sound == undefined) {
      this.death_sound = sound_manager.play("boss_destroyed", GLOBAL_SFX_VOLUME, true);
      this.death_sound.fadeTo(BOSS_INVULN_TIME * 25, 0);
    }
    this.boss.turrets.forEach(function(turret) {
      turret.bullets.forEach(function(bullet) {
        bullet.kill();
      }, this);
      turret.kill();
      this.spike_enemies.forEach(function(spikey) { spikey.destroy(); })
    }, this);

    if(!this.dead) {
      var tween = this.boss.set_blinky_death(this.boss.sprite);
      tween.onComplete.addOnce(function() {
        this.boss_died();
        this.death_sound.stop();
      }, this);
    }
    this.dead = true;
  }

  handle_player_hit(player, bullet) {
    bullet.kill();
    var player_died = this.player.process_hit();
    if (player_died) {
      this.level.player_died();
    }
  }

  render() {
    //game.debug.body(this.sprite)
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