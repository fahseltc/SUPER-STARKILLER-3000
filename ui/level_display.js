class LevelDisplay {
  constructor(current_level_index) {
    this.level_display = game.add.text(1100, 50, "Lvl: " + current_level_index, {
      font: "30px prstart",
      fill: "#FFFFFF",
      align: "center"
    });

    this.level_display.anchor.setTo(0.5, 0.5);
    this.level_display.text = "Lvl: " + current_level_index;
  }
}