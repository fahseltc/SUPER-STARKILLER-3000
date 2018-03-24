class BossLevel {
  constructor(level_data, level_manager) {
    this.level_data = level_data;
    console.log(this.level_data);
    console.log("Starting BOSS level!");

    this.level_manager = level_manager;
    this.controls = new Controls(game);
    this.player = new PlayerShip(
      game.width / 2,
      game.height / 2,
      this.controls
    );

    this.bg_sprite = game.add.tileSprite(
      0,
      0,
      1400,
      700,
      "game_background_clean"
    );
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

    this.player_damaged_sound = sound_manager.add("player_damaged");
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
    last_score = this.UI.score.score + this.UI.score.score_buffer;
    console.log("player died");
    this.destroyed = true;
    this.destroy();
    CURRENT_LEVEL_INDEX = 0;
    game.state.start("post");
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

  boss_died() {
    console.log("boss died");
    this.destroyed = true;
    console.log("increasing lvl index");
    CURRENT_LEVEL_INDEX++;
    this.level_manager.change_level(CURRENT_LEVEL_INDEX);
  }

  add_score(amount) {
    this.UI.score.score_buffer += amount;
  }

  destroy() {
    console.log("boss level destroy");
    this.destroyed = true;
    this.player.destroy();
    this.boss.destroy();
    this.UI.destroy();
    this.bg_sprite.destroy();
  }
}