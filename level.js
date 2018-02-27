class Level {
  constructor(level_data) {
    this.level_data = level_data;
    this.controls = new Controls(game);
    this.mecha = new Mecha(400, 300, this.controls);
    this.score = new Score();
    this.health_bar = new HealthBar(this.mecha);
    //console.log(this.level_data);
    //console.log('playstate: ' + this.current_level)
    this.enemy_manager = new EnemyManager(game, this.mecha, this.level_data);

    game.world.bringToTop(this.mecha.sprite);
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
    game.debug.text(game.time.fps, 1, 50, "#00ff00");
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
    if(!this.mecha.invuln){ this.mecha.take_damage(); }

    if(!mecha.alive) {
      console.log("u ded");
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
  }

}