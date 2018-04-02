class LevelDisplay {
  constructor(current_level_index) {
    this.text = game.add.text(
      1230,
      730,
      "STAR " + current_level_index,
      {
        font: "30px prstart",
        fill: WHITE_HEX_COLOR,
        align: "center"
      }
    );

    this.text.anchor.setTo(0.5, 0.5);
  }

  destroy() {
    this.text.destroy();
  }
}