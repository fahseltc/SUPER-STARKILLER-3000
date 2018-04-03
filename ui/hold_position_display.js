class HoldPositionDisplay {
  constructor(player) {
    this.player = player;
    this.green_bar_sprite = game.add.sprite(1272,880, "green_bar");
    this.green_bar_sprite.anchor.set(0.5, 1);
    this.original_height = this.green_bar_sprite.height;
    this.green_bar_sprite.height = 0;
  }

  update() {
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.green_bar_sprite.height = this.original_height;
    } else {
      this.green_bar_sprite.height = 0;
    }
  }
}