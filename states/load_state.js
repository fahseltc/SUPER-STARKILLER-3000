var load_state = {
  preload: function() {
    game.time.advancedTiming = true;
    console.log('load state');

    this.progress_bar = game.add.sprite(game.width/2, game.height/2, 'loading_bar');
    this.progress_bar.anchor.setTo(0.5, 0.5);
    this.ready = false;
    game.load.setPreloadSprite(this.progress_bar);

    //HACK TO PRELOAD A CUSTOM FONT first font will always be funky
    Utils.create_centered_text("LOADING", game.height/2 , 50, "#FFFFFF");

    game.load.image('player', 'assets/images/mecha.png');
    game.load.image('player_bullet', 'assets/images/player_bullet.png');
    game.load.image('flame', 'assets/images/flame.png');
    game.load.image('turret_top_blue', 'assets/images/turret_top_blue.png');
    game.load.image('turret_base_blue', 'assets/images/turret_base_blue.png');
    game.load.image('turret_top_red', 'assets/images/turret_top_red.png');
    game.load.image('turret_base_red', 'assets/images/turret_base_red.png');
    game.load.image('circle', 'assets/images/circle.png');
    game.load.image('spinner', 'assets/images/spinner.png');
    game.load.image('x', 'assets/images/x.png');
    game.load.image('enemy_bullet', 'assets/images/enemy_bullet.png');
    game.load.image('sound_white', 'assets/images/sound_white.png');
    game.load.image('no', 'assets/images/no.png');

    game.load.json('red_explosion', 'assets/particles/red_explosion.json');
    game.load.json('blue_explosion', 'assets/particles/blue_explosion.json');
    game.load.json('levels', 'assets/levels.json');

    game.load.audio('music1', 'assets/music/lite_buildup.ogg');
    game.load.audio('music2', 'assets/music/chillin.ogg');
    game.load.audio('music3', 'assets/music/buildup.ogg');
    game.load.audio('music4', 'assets/music/the_song.ogg');
  },
  create: function() {
    this.progress_bar.cropEnabled = false;
  },

  update: function() {
    if(game.cache.isSoundDecoded('music1') && this.ready == false) {
      this.ready = true;
      game.state.start('menu');
      //game.state.start('ready');
      //game.state.start('leaderboard');
      //game.state.start('post');
      //game.state.start('play');
    }
  }

};