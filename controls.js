class Controls {
  constructor(game) {
    this.game = game;
    this.space = false;
    this.left_click = false;
    this.right_click = false;
  }

  space_update() {
    this.space = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
  }
  left_click_update() {
    this.left_click = game.input.activePointer.leftButton.isDown;
  }
  right_click_update() {
    this.right_click = game.input.activePointer.rightButton.isDown;
  }

  update() {
    this.space_update();
    this.left_click_update();
    this.right_click_update();
  }
}