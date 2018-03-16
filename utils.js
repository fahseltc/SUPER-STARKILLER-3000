const RED_HEX_COLOR = '#FD0006'
const GREEN_HEX_COLOR = '#0ACF00'
const WHITE_HEX_COLOR = '#FFFFFF'
const BLUE_HEX_COLOR = '#1B1BB3'


class Utils {
  static create_text(text, x, y, px=20, color=WHITE_HEX_COLOR) {
    var label = game.add.text(x, y, text, {
      font: px + "px prstart",
      fill: color,
      align: "center"
    });
    label.anchor.set(0.5);
    return label;
  }

  static create_centered_text(text, y, px=20, color=WHITE_HEX_COLOR) {
    var label = game.add.text(game.width / 2, y, text, {
      font: px + "px prstart",
      fill: color,
      align: "center"
    });
    label.anchor.set(0.5);
    return label;
  }

  static create_centered_stroke_text(text, y, px=20, color=WHITE_HEX_COLOR, stroke='') {
    var label = game.add.text(game.width / 2, y, text, {
      font: px + "px prstart",
      fill: color,
      align: "center",
      stroke: "",
      strokeThickness: 6
    });
    label.anchor.set(0.5);
    return label;
  }

    static create_stroke_text(text, x, y, px=20, color=WHITE_HEX_COLOR) {
    var label = game.add.text(x, y, text, {
      font: px + "px prstart",
      fill: color,
      stroke: "",
      strokeThickness: 6,
      align: "center"
    });
    label.anchor.set(0.5);
    return label;
  }
}