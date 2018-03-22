var play_state = {
  preload: function() {
    game.world.setBounds(0, 0, 1400, 700);
  },

  create: function() {
    this.level_manager = new LevelManager();
  },

  update: function() {
    this.level_manager.update();
  },

  render: function() {
    this.level_manager.render();
  },

  resumed: function() {
    console.log("Play state resumed");
  },

  paused: function() {
    console.log("Play state paused");
  }
};