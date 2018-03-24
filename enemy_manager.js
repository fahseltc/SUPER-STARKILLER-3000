const ENEMY_SPAWN_TWEEN_TIME = 500;

const SCREEN_EDGE_SPAWN_DISTANCE = 50;
const ENEMY_PLAYER_SPAWN_DISTANCE = 150;

class EnemyManager {
  constructor(game, player, level_data, ui) {
    this.game = game;
    this.player = player;
    this.level_data = level_data.ENEMY_DATA;
    this.UI = ui;
    this.bad_guys = game.add.group();
    this.all_bullets = game.add.group();
    this.create_enemies();
    this.next_spawn_time = 0;

    this.enemies_left_to_spawn = this.level_data.ENEMIES_IN_WAVE;
    this.all_enemies_spawned = false;

    // spike enemies
    this.spike_enemies = [];
    this.spike_enemie_sprites = game.add.group();
    if(this.level_data.SPIKE_ENEMIES != undefined) {
      this.level_data.SPIKE_ENEMIES.forEach(function(data) {
        var spikey = new SpikeEnemy(data.X, data.Y, data.VELOCITY);
        this.spike_enemies.push(spikey);
        this.spike_enemie_sprites.add(spikey.sprite);
      }, this);
    }
  }

  create_enemies() {
    var bullet_delay = this.level_data.ENEMY_BULLET_DELAY;
    var bullet_speed = this.level_data.ENEMY_BULLET_SPEED;
    var initial_delay = this.level_data.ENEMY_BULLET_INITIAL_DELAY;
    for (var i = 0; i < 10; i++) {
      var bg1 = new ShootingEnemy(
        this.game,
        this.player,
        "red",
        bullet_delay,
        bullet_speed,
        initial_delay,
        this.UI
      );
      bg1.alive = false;
      this.bad_guys.add(bg1);
      this.all_bullets.add(bg1.bullets);
    }
    for (var i = 0; i < 10; i++) {
      var bg2 = new ShootingEnemy(
        this.game,
        this.player,
        "blue",
        bullet_delay,
        bullet_speed,
        initial_delay,
        this.UI
      );
      bg2.alive = false;
      this.bad_guys.add(bg2);
      this.all_bullets.add(bg2.bullets);
    }
    this.bad_guys.setAll("anchor.x", 0.5);
    this.bad_guys.setAll("anchor.y", 0.5);
    this.bad_guys.setAll("immovable", true);
    this.bad_guys.setAll("exists", false);
    game.physics.enable(this.bad_guys, Phaser.Physics.ARCADE);
  }

  update() {
    if (this.enemies_left_to_spawn <= 0) {
      this.all_enemies_spawned = true;
    }
    if (this.ready_to_spawn_enemy()) {
      console.log("enemies to spawn: " + this.enemies_left_to_spawn);
      this.enemies_left_to_spawn--;
      this.spawn_bad_guy();
      this.next_spawn_time =
        game.time.now +
        this.level_data.SPAWN_DELAY_MIN +
        Math.random() * this.level_data.SPAWN_DELAY_MULTI;
    }
  }

  ready_to_spawn_enemy() {
    return (
      game.time.now > this.next_spawn_time &&
      this.bad_guys.count("visible", true) < this.bad_guys.length &&
      this.bad_guys.count("visible", true) < this.level_data.MAX_ENEMIES &&
      this.enemies_left_to_spawn > 0
    );
  }

  are_all_enemies_dead() {
    var result =
      this.bad_guys.count("visible", true) == 0 && this.all_enemies_spawned;

    return result;
  }

  debug_render(sprite) {
    //this.game.debug.body(sprite);
  }

  spawn_bad_guy() {
    var dead_bad_guys = this.bad_guys.children.filter(function(element) {
      return !element.alive;
    });
    if (dead_bad_guys) {
      var random_dead_bad_guy =
        dead_bad_guys[game.rnd.integerInRange(0, dead_bad_guys.length - 1)];
      var temp_x = this.get_random_x();
      var temp_y = this.get_random_y();
      var distance_to_player = Phaser.Math.distance(
        temp_x,
        temp_y,
        this.player.sprite.x,
        this.player.sprite.y
      );

      while (distance_to_player < ENEMY_PLAYER_SPAWN_DISTANCE) {
        temp_x = this.get_random_x();
        temp_y = this.get_random_y();
        distance_to_player = Phaser.Math.distance(
          temp_x,
          temp_y,
          this.player.sprite.x,
          this.player.sprite.y
        );
      }

      if (temp_x < game.width / 2) {
        // swoosh in from left
        random_dead_bad_guy.reset(game.width, temp_y);
      } else {
        // swoosh from right
        random_dead_bad_guy.reset(0, temp_y);
      }
      random_dead_bad_guy.revive();
      game.add
        .tween(random_dead_bad_guy)
        .to(
          { x: temp_x },
          ENEMY_SPAWN_TWEEN_TIME,
          Phaser.Easing.Exponential.Out,
          true
        );

      random_dead_bad_guy.bullet_time =
        game.time.now +
        random_dead_bad_guy.get_initial_delay() +
        ENEMY_SPAWN_TWEEN_TIME;
      random_dead_bad_guy.visible = true;

      random_dead_bad_guy.alpha = 0.3;
      var phase_in_tween = game.add
        .tween(random_dead_bad_guy)
        .to(
          { alpha: 1 },
          ENEMY_SPAWN_TWEEN_TIME,
          Phaser.Easing.Exponential.In,
          true
        );
      // phase_in_tween.onComplete.addOnce(function() {
      // }, this);
    }
  }

  get_random_x() {
    var temp_x = game.world.randomX;
    while (
      temp_x < SCREEN_EDGE_SPAWN_DISTANCE ||
      temp_x > game.world.width - SCREEN_EDGE_SPAWN_DISTANCE
    ) {
      temp_x = game.world.randomX;
    }
    return temp_x;
  }

  get_random_y() {
    var temp_y = game.world.randomY;
    while (
      temp_y < SCREEN_EDGE_SPAWN_DISTANCE ||
      temp_y > game.world.height - SCREEN_EDGE_SPAWN_DISTANCE
    ) {
      temp_y = game.world.randomY;
    }
    return temp_y;
  }

  destroy() {
    this.bad_guys.destroy();
    this.all_bullets.destroy();
    this.spike_enemies.forEach(function(elem) {
      elem.destroy();
    });
  }
}