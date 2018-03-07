var boot_state = {
  preload: function() {
    // assets for loading screen
    game.load.image('loading_bar', 'assets/images/loading_bar.png');
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
    game.input.mouse.capture = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.plugins.add(ParticleEditorPlugin);

    game.state.start('load');
  }
};
