var boot_state = {
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
