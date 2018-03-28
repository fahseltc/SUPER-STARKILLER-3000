class PauseMenu {
  constructor() {
    this.sprite = game.add.sprite(
      game.world.width / 2,
      game.world.height / 2,
      "debug_button"
    );
    this.sprite.width = 1300;
    this.sprite.height = 600;
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.visible = false;

    this.text = Utils.create_centered_text("PAUSED", this.sprite.y, 50, BLACK_HEX_COLOR);
    this.text.visible = false;

    this.pause_wait = 30;
    this.current_pause = 0;
  }

  paused() {
    console.log("Play state paused");
    this.sprite.visible = true;
    this.sprite.bringToTop();
    this.text.visible = true;
    this.text.bringToTop();
    this.current_pause = 0;
  }

  resumed() {
    console.log("Play state resumed");
    this.sprite.visible = false;
    this.text.visible = false;
    this.current_pause = 0;
  }

  update() {
    // when not paused
    if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
      game.paused = !game.paused;
    }
  }

  pauseUpdate() {
    // when paused
    if (this.current_pause >= this.pause_wait) {
      if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
        game.paused = !game.paused;
      }
    } else {
      this.current_pause++;
    }
  }
}