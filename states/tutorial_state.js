var tutorial_state = {
  preload: function() {
    game.world.setBounds(0, 0, 1400, 700);
  },

  create: function() {
    var level_index = 0;
    this.current_level = new TutorialLevel(level_index);
  },
  update: function() {
    this.current_level.update();
  },

  render: function() {
    this.current_level.render();
  }
};