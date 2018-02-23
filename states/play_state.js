var play_state = {

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#717993';
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
    game.input.mouse.capture = true;

    this.controls = new Controls(game);
    this.graphics = game.add.graphics(0, 0);
    this.mecha = new Mecha(400, 300, this.controls);
    this.score = new Score();
    this.health_bar = new HealthBar(this.mecha);
    this.enemy_manager = new EnemyManager(game, this.mecha);
    this.timer = new GameTimer(this.score);
    this.timer.start();
    game.world.bringToTop(this.mecha.sprite);
  },

  update: function() {
    game.physics.arcade.overlap(this.mecha.circle_weapon.sprite,  this.enemy_manager.bad_guys, this.handle_collision, null, this);
    game.physics.arcade.overlap(this.mecha.bullet_weapon.bullets, this.enemy_manager.bad_guys, this.handle_collision, null, this);
    var visible_bullets = this.enemy_manager.all_bullets.getAll('alive', true);
    game.physics.arcade.overlap(this.mecha.sprite, visible_bullets, this.handle_player_hit, null, this);

    this.controls.update();
    this.enemy_manager.update();
    this.mecha.update();
    this.score.update();
  },

  render: function() {
    this.timer.render();
    this.mecha.render();
    this.health_bar.render(this.mecha);
  },

  handle_collision: function (obj, enemy) {
    this.game.debug.body(obj);
    this.game.debug.body(enemy);

    console.log('hit!');
    if((obj.key == 'bullet') && (enemy.key == 'red')) {
      enemy.kill();
      this.score.score_buffer += 5;
      this.enemy_manager.spawn = true;
    }
    if((obj.key == 'circle') && (enemy.key == 'blue')) {
      enemy.kill();
      this.score.score_buffer += 5;
      this.enemy_manager.spawn = true;
    }
  },

  handle_player_hit: function(mecha, bullet) {
    bullet.kill();
    if(!this.mecha.invuln){ this.mecha.take_damage(); }

    if(!mecha.alive) {
      console.log("u ded");
      last_score = this.score.score + this.score.score_buffer;
      mecha.heal();
      this.timer.timer.stop();
      game.state.start('post');
    }
    console.log("ouch");
  }
};
