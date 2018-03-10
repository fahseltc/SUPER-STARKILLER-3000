class RemainingEnemiesBar {
  constructor(level_data) {
    this.background = game.add.sprite(game.width / 2, 55, 'remaining_enemies_bg');
    this.background.anchor.setTo(0.5, 0.5);

    this.level_data = level_data;
    this.enemies_to_spawn = level_data.ENEMIES_IN_WAVE;
    this.bar = game.add.sprite(game.width / 2, 55, 'level_progress');
    this.bar.anchor.set(0.5, 0.5);
    this.enemies_alive = this.enemies_to_spawn;


    this.defenses_text = game.add.text(game.width / 2, 17, "DEFENSES", {
      font: "18px prstart",
      fill: "#FF0000",
      align: "center",
      fontWeight: "bold"
    });
    this.defenses_text.anchor.setTo(0.5, 0.5);
    this.defenses_text.align = 'center';

    this.remaining_text = game.add.text(game.width / 2, 101, "REMAINING", {
      font: "18px prstart",
      fill: "#FF0000",
      align: "center",
      fontWeight: "bold"
    });
    this.remaining_text.anchor.setTo(0.5, 0.5);
    this.remaining_text.align = 'center';
  }


   enemy_died() {
    this.enemies_alive--;
    var percentage = this.enemies_alive / this.enemies_to_spawn;
    console.log(percentage);
    this.bar.scale.x = percentage;
  }
}