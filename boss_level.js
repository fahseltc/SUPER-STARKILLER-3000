class BossLevel {
  constructor(level_data, level_manager) {
    this.level_data = level_data;
    console.log(this.level_data);
    console.log('Starting BOSS level!');

    this.level_manager = level_manager;
    this.controls = new Controls(game);
    this.player = new PlayerShip(game.width / 2, game.height / 2, this.controls);
    this.UI = new RootUI(this.player, this.level_data, this.level_data.LEVEL_NUMBER);

    game.world.bringToTop(this.player.sprite);
    //this.powerup = new Powerup(this.player);
    //this.powerup_manager = new PowerupManager(this.player);
    this.destroyed = false;
    this.boss = new BossEnemy(this.player, this.level_data.TURRETS, this);
  }

  update() {
    if(!this.destroyed) {
      this.controls.update();
      this.player.update();
      this.boss.update();
      this.UI.update();
    }
    //this.powerup_manager.update();
  }

  render() {
    if(!this.destroyed) {
      this.player.render();
      this.boss.render();
      this.UI.render();
    }
    game.debug.text(game.time.fps, 1, 12, '#FFFFFF');
  }

  player_died() {
    last_score = this.UI.score.score + this.UI.score.score_buffer;
    console.log('player died');
    this.destroyed = true;
    this.destroy();
    game.state.start('post');
  }

  boss_died() {
    last_score = this.UI.score.score + this.UI.score.score_buffer;
    console.log('boss died');
    this.destroyed = true;
    this.destroy();
    game.state.start('boss_dead');
  }

  destroy() {
    console.log('boss level destroy')
    this.destroyed = true;
    this.player.destroy();
    this.boss.destroy();
    this.UI.destroy();
  }
}