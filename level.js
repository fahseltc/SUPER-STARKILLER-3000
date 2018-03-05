class Level {
  constructor(level_data, level_manager) {
    this.level_data = level_data;
    console.log(this.level_data)
    this.level_manager = level_manager;
    this.controls = new Controls(game);
    this.mecha = new Mecha(game.width / 2, game.height / 2, this.controls);

    var ui_background_sprite = game.add.tileSprite(0, 0, 1400, 900, 'ui_background');
    this.score = new Score();
    this.health_bar = new HealthBar(this.mecha);
    this.enemy_manager = new EnemyManager(game, this.mecha, this.level_data);
    game.world.bringToTop(this.mecha.sprite);
    console.log("level duration: " + this.level_data.DURATION * Phaser.Timer.SECOND)

    this.timer = game.time.events.add(Phaser.Timer.SECOND * this.level_data.DURATION, this.change_level, this);
    this.timer_display = new TimerDisplay(this.timer);
    this.timer.timer.start();
  }

  change_level() {
    this.level_manager.change_level(this.level_data.INDEX + 1)
  }

  update() {
    game.physics.arcade.overlap(this.mecha.circle_weapon.sprite,  this.enemy_manager.bad_guys, this.handle_collision, null, this);
    game.physics.arcade.overlap(this.mecha.bullet_weapon.bullets, this.enemy_manager.bad_guys, this.handle_collision, null, this);
    var visible_bullets = this.enemy_manager.all_bullets.getAll('alive', true);
    game.physics.arcade.overlap(this.mecha.sprite, visible_bullets, this.handle_player_hit, null, this);

    this.controls.update();
    this.enemy_manager.update();
    this.mecha.update();
    this.score.update();
  }

  render() {
    this.mecha.render();
    this.health_bar.render(this.mecha);
    this.timer_display.render();
    game.debug.text(game.time.fps, 1, 12, "#FFFFFF");
    //game.debug.text(this.timer.timer.duration / 1000, 1, 80, "#FFFFF");
  }

  handle_collision(obj, enemy) {
    console.log('hit!');
    if((obj.key == 'player_bullet') && (enemy.key == 'turret_base_red')) {
      enemy.kill();
      this.score.score_buffer += 5;
      game.add.particleEffect(enemy.position.x, enemy.position.y, game.cache.getJSON('red_explosion'));
      this.enemy_manager.spawn = true;
    }
    if((obj.key == 'circle') && (enemy.key == 'turret_base_blue')) {
      enemy.kill();
      game.add.particleEffect(enemy.position.x, enemy.position.y, game.cache.getJSON('blue_explosion'));
      this.score.score_buffer += 5;
      this.enemy_manager.spawn = true;
    }
  }

  handle_player_hit(mecha, bullet) {
    bullet.kill();
    if(!this.mecha.invuln) {
      this.mecha.take_damage();
    }

    if(!mecha.alive) {
      console.log("u ded");
      this.timer.timer.destroy();
      console.log("timer stopped");
      last_score = this.score.score + this.score.score_buffer;
      mecha.heal();
      game.state.start('post');
    }
    console.log("ouch");
  }

  destroy() {
    this.mecha.destroy();
    this.score.destroy();
    this.health_bar.destroy();
    this.enemy_manager.destroy();
    this.timer_display.destroy();
    this.timer.timer.destroy();
  }

}