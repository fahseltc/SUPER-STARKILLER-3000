var play_state = {
  preload: function() {
    this.level_data = game.cache.getJSON('levels');
    console.log(this.level_data);
  },

  create: function() {
    game.stage.backgroundColor = '#717993';

    this.level_manager = new LevelManager();
  },

  update: function() {
    this.level_manager.update();
  },

  render: function() {
    this.level_manager.render();
  }
};
