class LevelDisplay {
  constructor(current_level_index, boss_number=0) {
    var level_text = "";
    if(boss_number == 0) {
      level_text = "STAR " + current_level_index;
    } else {
      level_text = "BOSS " + boss_number;
    }

    this.text = game.add.text(
      1230,
      730,
      level_text,
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