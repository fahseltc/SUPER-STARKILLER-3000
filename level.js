class Level {
  constructor(level_data, level_manager) {
    this.level_data = level_data;
    console.log(this.level_data);
    this.level_manager = level_manager;
    this.controls = new Controls(game);
    this.player = new PlayerShip(
      game.width / 2,
      game.height / 2,
      this.controls
    );

    this.UI = new RootUI(
      this.player,
      this.level_data,
      this.level_data.LEVEL_NUMBER
    );

    this.enemy_manager = new EnemyManager(game, this.player, this.level_data);
    game.world.bringToTop(this.player.sprite);

    this.powerup_manager = new PowerupManager(this.player);
    this.destroyed = false;


    this.player_damaged_sound = sound_manager.add("player_damaged");


    // this.level_end_explosion = sound_manager.add("level_end_explosion");
    // this.level_end_explosion.loop = true;
    // this.current_loop = 0;

    // this.level_end_explosion.onLoop.add(function(sound) {
    //   this.current_loop++;
    //   console.log("onLoop: " + this.current_loop);
    //   if(this.current_loop == 3) { sound.stop(); }
    // }, this);
    // this.level_end_explosion.onStop.addOnce(function() {
    //   console.log("onStop");
    //   CURRENT_LEVEL_INDEX++;
    //   this.level_manager.change_level(CURRENT_LEVEL_INDEX);
    // }, this);
     this.ending = false;
  }

  update() {
    if (this.player.circle_weapon.active) {
      game.physics.arcade.overlap(
        this.player.circle_weapon.sprite,
        this.enemy_manager.bad_guys,
        this.handle_circle_weapon_collision,
        null,
        this
      );
    }

    game.physics.arcade.overlap(
      this.player.bullet_weapon.bullets,
      this.enemy_manager.bad_guys,
      this.handle_bullet_collision,
      null,
      this
    );
    var visible_bullets = this.enemy_manager.all_bullets.getAll("alive", true);
    game.physics.arcade.overlap(
      this.player.sprite,
      visible_bullets,
      this.handle_player_hit,
      null,
      this
    );

    this.controls.update();
    this.enemy_manager.update();
    this.player.update();

    this.UI.update();
    this.powerup_manager.update();

    if (this.enemy_manager.are_all_enemies_dead() && !this.ending) {
      this.ending = true;
      console.log("all enemies defeated");

      game.camera.fade(0x000000, 1500, true);
      game.camera.onFadeComplete.addOnce(function() {
        console.log("increasing lvl index");
        CURRENT_LEVEL_INDEX++;
        this.level_manager.change_level(CURRENT_LEVEL_INDEX);
      }, this);
    }
  }

  render() {
    if (!this.destroyed) {
      this.player.render();
      this.UI.render();
      game.debug.text(game.time.fps, 1, 12, WHITE_HEX_COLOR);
    }
  }

  handle_circle_weapon_collision(circle_weapon_sprite, turret) {
    if (turret.key == "turret_base_blue" && turret.alive) {
      turret = turret.kill();
      console.log("circle hit!");
      console.log(turret);
      game.add.particleEffect(
        turret.position.x,
        turret.position.y,
        game.cache.getJSON("blue_explosion")
      );
      this.UI.score.score_buffer += 5;
      this.enemy_manager.spawn = true;
      this.UI.remaining_enemies_bar.enemy_died();
    }
  }

  handle_bullet_collision(bullet_sprite, turret) {
    if (turret.key == "turret_base_red" && turret.alive) {
      console.log("bullet hit!");
      turret = turret.kill();
      bullet_sprite.kill();
      this.UI.score.score_buffer += 5;
      game.add.particleEffect(
        turret.position.x,
        turret.position.y,
        game.cache.getJSON("red_explosion")
      );
      this.enemy_manager.spawn = true;
      this.UI.remaining_enemies_bar.enemy_died();
    }
  }

  handle_player_hit(player, bullet) {
    console.log("bullet intersected player");
    bullet.kill();
    var player_died = this.player.process_hit();
    this.player_damaged_sound.play("", 0, GLOBAL_VOLUME, false, true);
    if (player_died) {
      last_score = this.UI.score.score + this.UI.score.score_buffer;
      CURRENT_LEVEL_INDEX = 0;
      game.state.start("post");
    }
  }

  destroy() {
    this.destroyed = true;
    this.player.destroy();
    this.enemy_manager.destroy();
    this.UI.destroy();
  }
}