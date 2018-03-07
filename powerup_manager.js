const POWERUP_SCREEN_EDGE_SPAWN_DISTANCE = 50;
const POWERUP_TOP_SCREEN_EDGE_SPAWN_DISTANCE = 180;

const POWERUP_SPAWN_TIME = 4000;

class PowerupManager {
  constructor(mecha) {
    this.mecha = mecha;
    this.powerup = null;

    this.spawn_powerup_at = game.time.now + game.rnd.integerInRange(0, 3000) + POWERUP_SPAWN_TIME;

    this.powerup_alive = false;
  }

  update() {
    if(this.powerup){
      game.physics.arcade.overlap(this.powerup.sprite, this.mecha.sprite, this.collide_player, null, this);
    }
    if(game.time.now > this.spawn_powerup_at && this.powerup_alive == false) { this.spawn_powerup() };
  }

  collide_player(obj, enemy) {
    this.mecha.activate_shield();
    this.powerup.sprite.visible = false;
    this.powerup.sprite.active = false;
    this.powerup_alive = false;
    this.spawn_powerup_at = game.time.now + POWERUP_SPAWN_TIME;
  }

  spawn_powerup() {
    this.powerup = new Powerup(this.mecha);
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