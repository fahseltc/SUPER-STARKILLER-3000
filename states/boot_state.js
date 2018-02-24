var boot_state = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.plugins.add(ParticleEditorPlugin);
    game.state.start('load');
  }
};
