class ShieldWeaponDisplay {
  constructor(player) {
    this.player = player;

    this.green_bar = game.add.sprite(1216, 880, "green_bar");
    this.green_bar.anchor.set(0.5, 1);
    this.original_height = this.green_bar.height;
    this.green_bar.height = 0;
    this.rising = false;
    this.falling = false;
  }

  update() {
    if (this.player.circle_weapon.active && !this.rising) {
      this.rising = true;
      var tween = game.add
        .tween(this.green_bar)
        .to(
          { height: this.original_height },
          50,
          Phaser.Easing.Linear.None,
          true
        );
      tween.onComplete.addOnce(function() {
        this.rising = false;
      }, this);
    } else if (
      !this.player.circle_weapon.active &&
      this.green_bar.height == this.original_height &&
      !this.falling
    ) {
      this.falling = true;
      var tween = game.add
        .tween(this.green_bar)
        .to({ height: 0 }, 100, Phaser.Easing.Linear.None, true);
      tween.onComplete.addOnce(function() {
        this.falling = false;
      }, this);
    }
  }
}