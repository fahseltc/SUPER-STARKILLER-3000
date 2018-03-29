class PowerupManager {
  constructor(player) {
    this.player = player;
    this.powerups = game.add.group();
  }

  enemy_died(x, y) {
    var spawn_chance = game.rnd.integerInRange(1, 20);
    if (spawn_chance <= 2) {
      var powerup = new Powerup(this.player, x, y);
      this.powerups.add(powerup.sprite);
    }
  }

  update() {
    game.physics.arcade.overlap(
      this.powerups,
      this.player.sprite,
      this.collide_player,
      null,
      this
    );
  }

  collide_player(obj, powerup) {
    powerup.kill();
    console.log("powerup hit player")
    this.player.shield_sprite.revive();
  }

  spawn_powerup() {
    this.powerup = new Powerup(this.player);
    this.powerup.sprite.revive();
    this.powerup_alive = true;
  }
}