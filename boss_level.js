class BossLevel {
  constructor(level_data, level_manager) {
    this.level_data = level_data;
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

    game.world.bringToTop(this.player.sprite);

    this.powerup_manager = new PowerupManager(this.player);
    this.destroyed = false;
    this.boss = new BossEnemy(this.player, this.level_data, this);

    this.spike_enemies = [];
    this.spike_enemie_sprites = game.add.group();
    if (this.level_data.SPIKE_ENEMIES != undefined) {
      this.level_data.SPIKE_ENEMIES.forEach(function(data) {
        var spikey = new SpikeEnemy(data.X, data.Y, data.VELOCITY);
        this.spike_enemies.push(spikey);
        this.spike_enemie_sprites.add(spikey.sprite);
      }, this);
    }

    this.boss_music = sound_manager.add("boss_main");
    this.intro_sound = sound_manager.play("boss_intro", GLOBAL_MUSIC_VOLUME);
    this.intro_sound.onStop.addOnce(function() {
      this.boss_music.play("", 0, GLOBAL_MUSIC_VOLUME, true);
    }, this);
  }

  update() {
    if (!this.destroyed) {
      this.controls.update();
      this.player.update();
      this.boss.update();
      this.UI.update();
      this.powerup_manager.update();
      this.check_spike_collisions();
    }
  }

  render() {
    if (!this.destroyed) {
      this.player.render();
      this.boss.render();
      this.UI.render();
    }
    game.debug.text(game.time.fps, 1, 12, WHITE_HEX_COLOR);
  }

  player_died() {
    GLOBAL_SCORE = this.UI.score.score + this.UI.score.score_buffer;
    this.destroyed = true;
    this.destroy();
    CURRENT_LEVEL_INDEX = 0;
    this.boss_music.stop();
    game.state.start("game_over");
  }

  check_spike_collisions() {
    game.physics.arcade.overlap(
      this.player.sprite,
      this.spike_enemie_sprites,
      this.handle_player_hit_spikes,
      null,
      this
    );
  }

  handle_player_hit_spikes(player, bullet) {
    bullet.kill();
    var player_died = this.player.process_hit();
    if (player_died) {
      GLOBAL_SCORE = this.UI.score.score + this.UI.score.score_buffer;
      CURRENT_LEVEL_INDEX = 0;
      game.state.start("game_over");
    }
  }

  boss_died() {
    this.destroyed = true;
    this.boss_music.fadeOut(1500);
    game.camera.fade(0x000000, 1500, true);
    game.camera.onFadeComplete.addOnce(function() {
      this.boss_music.stop();
      CURRENT_LEVEL_INDEX++;
      this.level_manager.change_level(CURRENT_LEVEL_INDEX);
    }, this);
  }

  add_score(amount) {
    this.UI.score.score_buffer += amount;
  }

  destroy() {
    this.destroyed = true;
    this.player.destroy();
    this.boss.destroy();
    this.UI.destroy();
    this.bg_sprite.destroy();
  }
}