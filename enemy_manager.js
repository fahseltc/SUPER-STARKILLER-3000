//const SPAWN_DELAY_MIN = 1000;
//const SPAWN_DELAY_MULTIPLIER = 1000;
//const MAX_ENEMIES_SPAWNED = 5;
const ENEMY_SPAWN_TWEEN_TIME = 500;

const SCREEN_EDGE_SPAWN_DISTANCE = 50;
const TOP_SCREEN_EDGE_SPAWN_DISTANCE = 130;
const ENEMY_PLAYER_SPAWN_DISTANCE = 150;

class EnemyManager {
  constructor(game, mecha, level_data) {
    console.log(level_data);
    this.game = game;
    this.mecha = mecha;
    this.level_data = level_data;
    this.bad_guys = game.add.group();
    this.all_bullets = game.add.group();
    this.create_enemies();
    this.next_spawn_time = 0;
  }

  create_enemies() {
    var bullet_delay = this.level_data.ENEMY_BULLET_DELAY;
    var bullet_speed = this.level_data.ENEMY_BULLET_SPEED;
    var initial_delay = this.level_data.ENEMY_BULLET_INITIAL_DELAY
    for(var i = 0; i < 10; i++){
      var bg1 = new ShootingEnemy(this.game, this.mecha, 'red', bullet_delay, bullet_speed, initial_delay);
      bg1.alive = false;
      this.bad_guys.add(bg1);
      this.all_bullets.add(bg1.bullets);
    }
    for(var i = 0; i < 10; i++){
      var bg2 = new ShootingEnemy(this.game, this.mecha, 'blue', bullet_delay, bullet_speed, initial_delay);
      bg2.alive = false;
      this.bad_guys.add(bg2);
      this.all_bullets.add(bg2.bullets);
    }
    this.bad_guys.setAll('anchor.x', 0.5);
    this.bad_guys.setAll('anchor.y', 0.5);
    this.bad_guys.setAll('immovable', true);
    this.bad_guys.setAll('exists', false);
    game.physics.enable(this.bad_guys, Phaser.Physics.ARCADE);
  }

  update() {
  // console.log("bad guys visible: " + this.bad_guys.count('visible', true));
    if(game.time.now > this.next_spawn_time
      && this.bad_guys.count('visible', true) < this.bad_guys.length
      && this.bad_guys.count('visible', true) < this.level_data.MAX_ENEMIES) {
      this.spawn_bad_guy();
      this.next_spawn_time = game.time.now + this.level_data.SPAWN_DELAY_MIN + Math.random() * this.level_data.SPAWN_DELAY_MULTI;
    }
  }

  debug_render(sprite) {
    //this.game.debug.body(sprite);
  }

  spawn_bad_guy() {
    var dead_bad_guys = this.bad_guys.children.filter(function(element){ return !element.alive; });
    if(dead_bad_guys) {
      var random_dead_bad_guy = dead_bad_guys[game.rnd.integerInRange(0, dead_bad_guys.length - 1)]
      var temp_x = this.get_random_x();
      var temp_y = this.get_random_y();
      var distance_to_player = Phaser.Math.distance(temp_x, temp_y, this.mecha.sprite.x, this.mecha.sprite.y);

      while(distance_to_player < ENEMY_PLAYER_SPAWN_DISTANCE) {
        temp_x = this.get_random_x();
        temp_y = this.get_random_y();
        distance_to_player = Phaser.Math.distance(temp_x, temp_y, this.mecha.sprite.x, this.mecha.sprite.y);
      }

      if(temp_x < game.width / 2) { // swoosh in from left
        random_dead_bad_guy.reset(game.width, temp_y);
      } else { // swoosh from right
        random_dead_bad_guy.reset(0, temp_y);
      }
      game.add.tween(random_dead_bad_guy).to({ x: temp_x }, ENEMY_SPAWN_TWEEN_TIME, Phaser.Easing.Exponential.Out, true);

      random_dead_bad_guy.bullet_time = game.time.now + random_dead_bad_guy.get_initial_delay();
      random_dead_bad_guy.visible = true;
      random_dead_bad_guy.revive();

      random_dead_bad_guy.alpha = 0.3;
      game.add.tween(random_dead_bad_guy).to({ alpha: 1 } , ENEMY_SPAWN_TWEEN_TIME, Phaser.Easing.Exponential.In, true);
    }
  }


  get_random_x() {
    var temp_x = game.world.randomX;
    while(temp_x < SCREEN_EDGE_SPAWN_DISTANCE || temp_x > (game.world.width - SCREEN_EDGE_SPAWN_DISTANCE)) {
      temp_x = game.world.randomX;
    }
    return temp_x;
  }

  get_random_y() {
    var temp_y = game.world.randomY;
    while(temp_y < TOP_SCREEN_EDGE_SPAWN_DISTANCE || temp_y > (game.world.height - SCREEN_EDGE_SPAWN_DISTANCE)) {
      temp_y = game.world.randomY;
    }
    return temp_y;
  }

  destroy() {
    this.bad_guys.destroy();
    this.all_bullets.destroy();
  }
}
