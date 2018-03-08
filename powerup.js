// const POWERUP_SCREEN_EDGE_SPAWN_DISTANCE = 50;
// const POWERUP_TOP_SCREEN_EDGE_SPAWN_DISTANCE = 180;


class Powerup {
  constructor(mecha) {
    this.mecha = mecha;
    this.sprite = game.add.sprite(this.get_random_x(), this.get_random_y(), "powerup_p");
    this.sprite.enableBody = true;
    this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(1);
    this.sprite.reset(this.get_random_x(), this.get_random_y());


    this.sprite.body.velocity.x = game.rnd.sign() * 500;
    this.sprite.body.velocity.y = game.rnd.sign() * 500;
  }

  update() {
    game.physics.arcade.overlap(this.sprite, this.mecha.sprite, this.collide_player, null, this);
  }

  collide_player(obj, enemy) {
    this.mecha.activate_shield();
    this.sprite.visible = false;
    this.sprite.active = false;
  }

  get_random_x() {
    var temp_x = game.world.randomX;
    while(temp_x < POWERUP_SCREEN_EDGE_SPAWN_DISTANCE || temp_x > (game.world.width - POWERUP_SCREEN_EDGE_SPAWN_DISTANCE)) {
      temp_x = game.world.randomX;
    }
    return temp_x;
  }

  get_random_y() {
    var temp_y = game.world.randomY;
    while(temp_y < POWERUP_TOP_SCREEN_EDGE_SPAWN_DISTANCE || temp_y > (game.world.height - POWERUP_SCREEN_EDGE_SPAWN_DISTANCE)) {
      temp_y = game.world.randomY;
    }
    return temp_y;
  }

  destroy() {
    this.sprite.destroy();
  }
}