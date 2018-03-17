class LevelDisplay {
  constructor(current_level_index) {
    this.level_display = game.add.text(1230, 730, 'STAR ' + current_level_index, {
      font: '30px prstart',
      fill: WHITE_HEX_COLOR,
      align: 'center'
    });

    this.level_display.anchor.setTo(0.5, 0.5);
  }

  destroy() {
    this.level_display.destroy();
  }
}