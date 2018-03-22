class RootUI {
  constructor(player, level_data, current_level_index) {
    this.ui_background = game.add.sprite(0, 700, "dashboard");
    this.health_bar = new HealthBar(player);
    this.level_display = new LevelDisplay(current_level_index);
    this.remaining_enemies_bar = new RemainingEnemiesBar(level_data);
    this.score = new Score();
    this.bullet_weapon_display = new BulletWeaponDisplay(player);
    this.shield_weapon_display = new ShieldWeaponDisplay(player);
  }

  update() {
    this.score.update();
    this.bullet_weapon_display.update();
    this.shield_weapon_display.update();
  }

  render() {
    this.health_bar.render();
  }

  destroy() {
    console.log("rootUI destroy");
    this.ui_background.destroy();
    this.health_bar.destroy();
    this.level_display.destroy();
    this.remaining_enemies_bar.destroy();
    this.score.destroy();
    this.bullet_weapon_display.destroy();
  }
}