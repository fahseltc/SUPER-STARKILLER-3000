class LevelDisplay {
  constructor(current_level_index) {

    this.background = game.add.sprite(1250, 855, "life_bg");
    this.background.anchor.setTo(0.5, 0.5);
    this.level_display = game.add.text(1250, 860, "Lvl: " + current_level_index, {
      font: "30px prstart",
      fill: "#FFFFFF",
      align: "center"
    });

    this.level_display.anchor.setTo(0.5, 0.5);
    this.level_display.text = "STAR " + current_level_index;
  }

  destroy() {
    this.background.destroy();
    this.level_display.destroy();
  }
}