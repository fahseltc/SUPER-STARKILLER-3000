const REMAINING_ENEMIES_BASE_POSITION_X = 355;
const REMAINING_ENEMIES_BASE_POSITION_Y = 800;

class RemainingEnemiesBar {
  constructor(level_data) {
    console.log(level_data);
    // this.level_data = level_data;
    // this.enemies_to_spawn = 1;

    //if(level_data.hasOwnProperty("ENEMY_DATA")) { // if this is not a boss level, fill in all the things
    this.level_data = level_data.ENEMY_DATA;
    this.enemies_to_spawn = level_data.ENEMY_DATA.ENEMIES_IN_WAVE;
    this.enemies_alive = this.enemies_to_spawn;
    console.log("after: level data:");
    console.log(this.level_data);

    this.bar = game.add.sprite(REMAINING_ENEMIES_BASE_POSITION_X, REMAINING_ENEMIES_BASE_POSITION_Y, 'remaining_enemies_bar_green');

    this.black_bar = game.add.sprite(REMAINING_ENEMIES_BASE_POSITION_X+ this.bar.width, REMAINING_ENEMIES_BASE_POSITION_Y, 'remaining_enemies_black_bar');
    this.black_bar.anchor.set(1, 0);
    this.black_bar_original_width = this.black_bar.width;
    this.black_bar.width = 0;

    this.foreground = game.add.sprite(REMAINING_ENEMIES_BASE_POSITION_X - 8, REMAINING_ENEMIES_BASE_POSITION_Y - 10, 'remaining_enemies_bg');
    this.defenses_text = game.add.text(REMAINING_ENEMIES_BASE_POSITION_X + 170, REMAINING_ENEMIES_BASE_POSITION_Y + 15 , 'DEFENSES\nREMAINING', {
      font: '14px prstart',
      fill: '#FFFFFF',
      align: 'center',
      fontWeight: 'bold'
    });
    this.defenses_text.anchor.setTo(0.5, 0.5);
    this.defenses_text.align = 'center';
  }

   enemy_died() {
    this.enemies_alive--;
    var percentage = this.enemies_alive / this.enemies_to_spawn;
    console.log(this.enemies_alive);
    console.log(this.enemies_to_spawn);
    var new_width = this.black_bar_original_width * (1 - percentage);
    game.add.tween(this.black_bar).to({ width: new_width }, 100, Phaser.Easing.Linear.None, true)
  }

  destroy() {
    this.bar.destroy();
    this.defenses_text.destroy();
    this.black_bar.destroy();
  }
}