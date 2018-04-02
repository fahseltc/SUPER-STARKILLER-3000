var play_state = {
  preload: function() {
    game.world.setBounds(0, 0, 1400, 700);
    this.pause_menu = new PauseMenu();
  },

  create: function() {
    this.level_manager = new LevelManager();
  },

  update: function() {
    this.pause_menu.update();
    this.level_manager.update();
  },

  render: function() {
    this.level_manager.render();
  },

  resumed: function() {
    this.pause_menu.resumed();
  },

  paused: function() {
    this.pause_menu.paused();
  },

  pauseUpdate: function() {
    this.pause_menu.pauseUpdate();
  }
};