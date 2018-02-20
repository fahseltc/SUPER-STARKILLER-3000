var boot_state = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        console.log('boot');
        game.state.start('load');
    }
};
