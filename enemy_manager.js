class EnemyManager {
  constructor(game, mecha) {
    this.game = game;
    this.mecha = mecha;
    this.bad_guys = game.add.group();

    this.spawn = true;
    //this.bad_guys.add(new ShootingEnemy(this.game, mecha, 1, 1, 'red'));
    for(var i=0; i < 100; i++){ this.bad_guys.add(new ShootingEnemy(this.game, mecha, 1, 1, 'red')); }
    for(var i=0; i < 100; i++){ this.bad_guys.add(new ShootingEnemy(this.game, mecha, 1, 1, 'blue')); }
    //this.bad_guys.createMultiple(30, 'red');
    //this.bad_guys.createMultiple(30, 'blue');
    this.bad_guys.setAll('anchor.x', 0.5);
    this.bad_guys.setAll('anchor.y', 0.5);
    this.bad_guys.setAll('immovable', true);
    this.bad_guys.setAll('exists', false);
    game.physics.enable(this.bad_guys, Phaser.Physics.ARCADE);

    this.next_spawn_time = 0;
  }

  update() {
    console.log("bad guys visible: " + this.bad_guys.count('visible', true));
    if(game.time.now > this.next_spawn_time && this.bad_guys.count('visible', true) < 5) {
      this.spawn_bad_guy();
      //this.next_spawn_time = game.time.now + 300 + Math.random() * 400;
      this.next_spawn_time = game.time.now + 300 + Math.random() * 400;
    }
  }

  debug_render(sprite) {
    //this.game.debug.body(sprite);
  }

  spawn_bad_guy() {
    var bad_guy = this.bad_guys.getRandom();
    if(bad_guy) {
      var temp_x = this.get_random_x();
      var temp_y = this.get_random_y();
      var distance_to_player = Phaser.Math.distance(temp_x, temp_y, this.mecha.sprite.x, this.mecha.sprite.y);

      while(distance_to_player < 150) {
        temp_x = this.get_random_x();
        temp_y = this.get_random_y();
        distance_to_player = Phaser.Math.distance(temp_x, temp_y, this.mecha.sprite.x, this.mecha.sprite.y);
      }

      bad_guy.reset(temp_x, temp_y);
      bad_guy.bullet_time = game.time.now + 500;
      bad_guy.visible = true;
      bad_guy.revive();
    }
  }


  get_random_x() {
    var temp_x = game.world.randomX;
    while(temp_x < 50 || temp_x > (game.world.width - 50)) {
      temp_x = game.world.randomX;
    }
    return temp_x;
  }

  get_random_y() {
    var temp_y = game.world.randomY;
    while(temp_y < 50 || temp_y > (game.world.height - 50)) {
      temp_y = game.world.randomY;
    }
    return temp_y;
  }
}
