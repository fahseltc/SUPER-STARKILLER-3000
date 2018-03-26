const RED_HEX_COLOR = "#FD0006";
const BLACK_HEX_COLOR = "#000000";
const GREEN_HEX_COLOR = "#0ACF00";
const WHITE_HEX_COLOR = "#FFFFFF";
const BLUE_HEX_COLOR = "#1B1BB3";
const PINK_HEX_COLOR = "#FF69B4";
const GREY_HEX_COLOR = "#808080";
const YELLOW_HEX_COLOR = "#ffff00";

class Utils {
  static create_text(text, x, y, px = 20, color = WHITE_HEX_COLOR) {
    var label = game.add.text(x, y, text, {
      font: px + "px prstart",
      fill: color,
      align: "center"
    });
    label.anchor.set(0.5);
    return label;
  }

  static create_centered_text(text, y, px = 20, color = WHITE_HEX_COLOR) {
    var label = game.add.text(game.width / 2, y, text, {
      font: px + "px prstart",
      fill: color,
      align: "center"
    });
    label.anchor.set(0.5);
    return label;
  }

  static create_centered_stroke_text(
    text,
    y,
    px = 20,
    color = WHITE_HEX_COLOR,
    stroke = ""
  ) {
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

  static create_stroke_text(text, x, y, px = 20, color = WHITE_HEX_COLOR) {
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

  static create_button(x, y, text, callback, width = 4) {
    var button = game.add.button(x, y, "debug_button", callback, this);
    button.width = button.width * width;
    button.anchor.set(0.5, 0.5);

    var text = Utils.create_text(text, x, y + 6, 30, BLACK_HEX_COLOR);
    text.anchor.set(0.5, 0.5);
  }
}