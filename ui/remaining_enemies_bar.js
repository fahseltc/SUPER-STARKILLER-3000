class RemainingEnemiesBar {
  constructor(level_data) {
    this.level_data = level_data;
    this.enemies_to_spawn = level_data.ENEMIES_IN_WAVE;
    this.bar = game.add.sprite(605, 140, 'level_progress');
    this.bar.anchor.set(0, 0.5);
    this.enemies_alive = this.enemies_to_spawn;
  }


   enemy_died() {
    this.enemies_alive--;
    var percentage = this.enemies_alive / this.enemies_to_spawn;
    console.log(percentage);
    this.bar.scale.x = percentage;
  }
}