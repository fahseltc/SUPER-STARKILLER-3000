var load_state = {

  preload: function() {

    //HACK TO PRELOAD A CUSTOM FONT
    var loadingLabel = game.add.text(80, 150, 'loading...', {font:"1px prstart", fill:"#FFFFFF"});
    console.log('load');

    game.time.advancedTiming = true;
    game.load.image('mecha', 'assets/mecha.png');
    game.load.image('bullet', 'assets/bullets.png');
    game.load.image('flame', 'assets/flame.png');
    game.load.image('red', 'assets/red.png');
    game.load.image('blue', 'assets/blue.png');
    game.load.image('button', 'assets/button.png');
    game.load.image('circle', 'assets/circle.png');
    game.load.image('spinner', 'assets/spinner.png');
    game.load.image('x', 'assets/x.png');
    game.load.image('enemy_bullet', 'assets/enemy_bullet.png');
    game.load.image('sound_white', 'assets/sound_white.png');
    game.load.image('no', 'assets/no.png');

    game.load.json('red_explosion', 'assets/particles/red_explosion.json');
    game.load.json('blue_explosion', 'assets/particles/blue_explosion.json');
    game.load.json('levels', 'assets/levels.json');

    game.load.audio('music1', 'assets/music/lite_buildup.ogg');
    game.load.audio('music2', 'assets/music/chillin.ogg');
    game.load.audio('music3', 'assets/music/buildup.ogg');
    game.load.audio('music4', 'assets/music/the_song.ogg');
  },
  create: function() {
    game.state.start('menu');
    //game.state.start('leaderboard');
    //game.state.start('post');
    //game.state.start('play');
  }
};