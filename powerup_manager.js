const POWERUP_SCREEN_EDGE_SPAWN_DISTANCE = 50;
const POWERUP_TOP_SCREEN_EDGE_SPAWN_DISTANCE = 180;

const POWERUP_SPAWN_TIME = 7000;

class PowerupManager {
  constructor(player) {
    this.player = player;
    this.powerup = null;

    this.spawn_powerup_at = game.time.now + game.rnd.integerInRange(0, 3000) + POWERUP_SPAWN_TIME;

    this.powerup_alive = false;
  }

  update() {
    if(this.powerup){
      game.physics.arcade.overlap(this.powerup.sprite, this.player.sprite, this.collide_player, null, this);
    }
    if(game.time.now > this.spawn_powerup_at && this.powerup_alive == false) { this.spawn_powerup() };
  }

  collide_player(obj, enemy) {
    this.player.shield_sprite.revive();
    this.powerup.sprite.kill();
    this.powerup_alive = false;
    this.spawn_powerup_at = game.time.now + POWERUP_SPAWN_TIME;
  }

  spawn_powerup() {
    this.powerup = new Powerup(this.player);
    this.powerup.sprite.revive();
    this.powerup_alive = true;
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
}