class Slider {
  constructor(x, y, initial_value=0) {
    console.log("slider x: "+ x +". y: "+ y);
    this.slider_bg = game.add.sprite(x, y, "menu_button");
    this.slider = game.add.sprite(x, y, "debug_button");
    this.slider_text = Utils.create_text("", 32, 38, 20, BLACK_HEX_COLOR);
    this.slider_text.anchor.set(0.5, 0.5)

    this.slider.addChild(this.slider_text);

    this.slider.inputEnabled = true;

    this.slider.input.enableDrag();
    this.slider.input.allowVerticalDrag = false;
    this.slider.input.boundsSprite = this.slider_bg;

    this.value = initial_value;
    this.slider.position.set(x + ((this.slider_bg.width - this.slider.width) * this.value), this.slider.position.y)
    this.slider_text.text = Math.round(Number(this.value * 100));

  }

  update() {
    this.value = (this.slider.x - this.slider_bg.x) / 192;
    this.slider_text.text = Math.round(Number(this.value * 100));
  }
}