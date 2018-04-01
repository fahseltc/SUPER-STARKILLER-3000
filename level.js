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

    this.bg_sprite = game.add.tileSprite(0, 0, 1400, 700, "game_background");

    this.bg_sprite.sendToBack();

    this.UI = new RootUI(
      this.player,
      this.level_data,
      this.level_data.LEVEL_NUMBER
    );

    this.enemy_manager = new EnemyManager(
      game,
      this.player,
      this.level_data,
      this.UI
    );
    game.world.bringToTop(this.player.sprite);

    this.powerup_manager = new PowerupManager(this.player);
    this.destroyed = false;
    this.ending = false;

    if (CURRENT_LEVEL_INDEX <= 17) {
      console.log("playing song 1");
      this.music = sound_manager.play("song_1", GLOBAL_MUSIC_VOLUME, true);
    } else if (CURRENT_LEVEL_INDEX >= 18 && CURRENT_LEVEL_INDEX < 34) {
      console.log("playing song 2");
      this.music = sound_manager.play("song_2", GLOBAL_MUSIC_VOLUME, true);
    } else if (CURRENT_LEVEL_INDEX >= 34) {
      console.log("playing song 3");
      this.music = sound_manager.play("song_3", GLOBAL_MUSIC_VOLUME, true);
    }
  }

  update() {
    // player circle weapon overlaps bad guys
    if (this.player.circle_weapon.active) {
      game.physics.arcade.overlap(
        this.player.circle_weapon.sprite,
        this.enemy_manager.bad_guys,
        this.handle_circle_weapon_collision,
        null,
        this
      );
    }
    // player bullet weapon overlaps bad guys
    game.physics.arcade.overlap(
      this.player.bullet_weapon.bullets,
      this.enemy_manager.bad_guys,
      this.handle_bullet_collision,
      null,
      this
    );

    // enemy bullets hitting player
    var visible_bullets = this.enemy_manager.all_bullets.getAll("alive", true);
    game.physics.arcade.overlap(
      this.player.sprite,
      visible_bullets,
      this.handle_player_hit,
      null,
      this
    );

    // spike enemies hitting player
    game.physics.arcade.overlap(
      this.player.sprite,
      this.enemy_manager.spike_enemie_sprites,
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

      // kill all bullets + enemies
      this.enemy_manager.kill_all_bullets();
      this.music.fadeOut(1500);

      game.camera.fade(0x000000, 1500, true);
      game.camera.onFadeComplete.addOnce(function() {
        this.music.stop();
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
      console.log("circle hit!");
      this.powerup_manager.enemy_died(turret.x, turret.y);
      turret = turret.kill(); // does lots of things
      this.enemy_manager.spawn = true;
    }
  }

  handle_bullet_collision(bullet_sprite, turret) {
    if (turret.key == "turret_base_red" && turret.alive) {
      console.log("bullet hit!");
      this.powerup_manager.enemy_died(turret.x, turret.y);
      turret = turret.kill(); // does a bunch of stuff!
      bullet_sprite.kill();
      this.enemy_manager.spawn = true;
    }
  }

  handle_player_hit(player, bullet) {
    console.log("something intersected player");
    bullet.kill();
    var player_died = this.player.process_hit();
    if (player_died) {
      this.music.fadeOut(1500);
      GLOBAL_SCORE = this.UI.score.score + this.UI.score.score_buffer;
      CURRENT_LEVEL_INDEX = 0;
      game.camera.fade(0x000000, 1500, true);
      game.camera.onFadeComplete.addOnce(function() {
        this.music.stop();
        game.state.start("game_over");
      }, this);
    }
  }

  destroy() {
    this.destroyed = true;
    this.player.destroy();
    this.enemy_manager.destroy();
    this.UI.destroy();
    this.bg_sprite.destroy();
  }
}