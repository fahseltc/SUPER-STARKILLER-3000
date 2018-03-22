class BulletWeaponDisplay {
  constructor(player) {
    this.player = player;

    this.green_bar_sprite = game.add.sprite(1161, 880, "green_bar");
    this.green_bar_sprite.anchor.set(0.5, 1);
    this.original_height = this.green_bar_sprite.height;
    this.green_bar_sprite.height = 0;
  }

  update() {
    this.green_bar_sprite.height =
      this.player.bullet_weapon.heat / MAX_HEAT * this.original_height;
    if (this.player.bullet_weapon.overheated) {
      this.green_bar_sprite.height = this.original_height;
    }
  }

  destroy() {
    this.green_bar_sprite.destroy();
  }
}