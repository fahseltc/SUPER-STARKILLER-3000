var play_state = {
  preload: function() {
    //console.log(this.level_data);
  },

  create: function() {
    game.add.tileSprite(0, 0, 1400, 900, 'game_background');

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
