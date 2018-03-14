class Level {
  constructor(level_data, level_manager) {
    this.level_data = level_data;
    console.log(this.level_data);
    this.level_manager = level_manager;
    this.controls = new Controls(game);
    this.player = new PlayerShip(game.width / 2, game.height / 2, this.controls);

    // UI ELEMENTS
    //var ui_background_sprite = game.add.tileSprite(0, 0, 1400, 900, 'ui_background');

    this.UI = new RootUI(this.player, this.level_data, this.level_data.LEVEL_NUMBER);
    // this.score = new Score();
    // this.health_bar = new HealthBar(this.player);
    // this.remaining_enemies_bar = new RemainingEnemiesBar(this.level_data);


    this.enemy_manager = new EnemyManager(game, this.player, this.level_data);
    game.world.bringToTop(this.player.sprite);
    console.log("level duration: " + this.level_data.DURATION * Phaser.Timer.SECOND)

    //this.powerup = new Powerup(this.player);
    this.powerup_manager = new PowerupManager(this.player);
    this.destroyed = false
  }

  update() {
    if(this.player.circle_weapon.active) {
      game.physics.arcade.overlap(this.player.circle_weapon.sprite,  this.enemy_manager.bad_guys, this.handle_collision, null, this);
    }

    game.physics.arcade.overlap(this.player.bullet_weapon.bullets, this.enemy_manager.bad_guys, this.handle_collision, null, this);
    var visible_bullets = this.enemy_manager.all_bullets.getAll('alive', true);
    game.physics.arcade.overlap(this.player.sprite, visible_bullets, this.handle_player_hit, null, this);


    //game.physics.arcade.overlap(this.player.sprite.body, this.powerup.sprite.body, this.powerup.collide_player(), null, this);


    this.controls.update();
    this.enemy_manager.update();
    this.player.update();

    this.UI.update();
    //this.score.update();
    this.powerup_manager.update();

    if(this.enemy_manager.are_all_enemies_dead()) {
      console.log("all enemies defeated");
      this.level_manager.change_level(this.level_data.INDEX + 1);
    }
  }

  render() {
    if(!this.destroyed) {
      this.player.render();
      this.UI.render();
      game.debug.text(game.time.fps, 1, 12, "#FFFFFF");
    }
  }

  handle_collision(obj, enemy) {
    console.log('hit!');
    if((obj.key == 'player_bullet') && (enemy.key == 'turret_base_red')) {
      enemy.kill();
      this.UI.score.score_buffer += 5;
      game.add.particleEffect(enemy.position.x, enemy.position.y, game.cache.getJSON('red_explosion'));
      this.enemy_manager.spawn = true;
      this.UI.remaining_enemies_bar.enemy_died();
    }
    if((obj.key == 'circle') && (enemy.key == 'turret_base_blue')) {
      enemy.kill();
      game.add.particleEffect(enemy.position.x, enemy.position.y, game.cache.getJSON('blue_explosion'));
      this.UI.score.score_buffer += 5;
      this.enemy_manager.spawn = true;
      this.UI.remaining_enemies_bar.enemy_died();
    }
  }

  handle_player_hit(player, bullet) {
    bullet.kill();
    if(!this.player.invuln) {
      if(this.player.shield_sprite.active) {
        this.player.destroy_shield();
      } else {
        this.player.take_damage();
      }
    }

    if(!player.alive) {
      console.log("u ded");
      last_score = this.UI.score.score + this.UI.score.score_buffer;
      player.heal();
      game.state.start('post');
    }
    console.log("ouch");
  }

  destroy() {
    this.destroyed = true;
    this.player.destroy();
    this.enemy_manager.destroy();
    this.UI.destroy();
  }
}