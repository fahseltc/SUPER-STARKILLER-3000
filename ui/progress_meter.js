class ProgressMeter {
  constructor(level_index) {
    this.level_data = game.cache.getJSON("levels");
    this.base_x = game.width / 2;
    this.base_y = 290;
    this.bg = game.add.sprite(this.base_x, this.base_y, "meter_bg");
    this.bg.anchor.set(0.5, 0.5);

    this.ready_levels = [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47];

    this.pip_index = this.ready_levels.indexOf(CURRENT_LEVEL_INDEX);
    console.log("pip index: " + this.pip_index);

    this.pips = [];

    if (this.pip_index >= 0) {
      this.make_pip(this.base_x - 218, "rounded_pip");
    }

    if (this.pip_index >= 0) {
      this.make_pip(this.base_x - 184);
    }

    if (this.pip_index >= 1) {
      this.make_pip(this.base_x - 150);
    }

    if (this.pip_index >= 2) {
      this.make_pip(this.base_x - 106, "circle_pip");
    }

    if (this.pip_index >= 3) {
      this.make_pip(this.base_x - 62);
    }

    if (this.pip_index >= 4) {
      this.make_pip(this.base_x - 28);
    }

    if (this.pip_index >= 5) {
      this.make_pip(this.base_x + 6);
    }

    if (this.pip_index >= 6) {
      this.make_pip(this.base_x + 50, "circle_pip");
    }

    if (this.pip_index >= 7) {
      this.make_pip(this.base_x + 94);
    }

    if (this.pip_index >= 8) {
      this.make_pip(this.base_x + 128);
    }

    if (this.pip_index >= 9) {
      this.make_pip(this.base_x + 162);
    }

    if (this.pip_index >= 10) {
      this.make_pip(this.base_x + 206, "circle_pip");
    }

    var last_pip = this.pips[this.pips.length - 1];
    game.add
      .tween(last_pip)
      .to({ alpha: 0 }, 600, Phaser.Easing.Bounce.InOut, true, 0, -1, true);
  }

  make_pip(x, sprite = "meter_pip") {
    var pip = game.add.sprite(x, this.base_y, sprite);
    pip.anchor.set(0.5, 0.5);
    this.pips.push(pip);
  }
}