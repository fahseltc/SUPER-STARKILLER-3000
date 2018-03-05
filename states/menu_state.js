var menu_state = {
  create: function() {
    var background_sprite = game.add.tileSprite(0, 0, 1400, 900, 'pat_bg');
    //var title_text = Utils.create_centered_text('Mega\nMecha\nMarxist\nII', 300, 100, "#FF0000");
    var title_text = Utils.create_centered_stroke_text('Super', 110, 100, "#FF0000");
    var title_text_old_x = title_text.x;
    title_text.x = 0;
    title_text.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
    game.add.tween(title_text).to({ x: title_text_old_x}, 300, "Linear", true);

    var title_text1 = Utils.create_centered_stroke_text('Space', 220, 100, "#FF0000");
    var title_text1_old_x = title_text1.x;
    title_text1.x = game.world.width;
    title_text1.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
    game.add.tween(title_text1).to({ x: title_text1_old_x}, 300, "Linear", true);

    var title_text2 = Utils.create_centered_stroke_text('Somethin', 330, 100, "#FF0000");
    var title_text2_old = title_text2.x;
    title_text2.x = 0;
    title_text2.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
    game.add.tween(title_text2).to({ x: title_text2_old}, 300, "Linear", true);

    var title_text3 = Utils.create_centered_stroke_text('VIII', 440, 100, "#FF0000");
    var title_text3_old = title_text3.y;
    title_text3.y = 0;
    title_text3.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
    game.add.tween(title_text3).to({ y: title_text3_old}, 300, Phaser.Easing.Exponential.In, true);


    var space_to_begin_text = Utils.create_centered_stroke_text('Press Space to begin', 850, 35);

    var now_with_text = Utils.create_stroke_text('Now with more\nbetter art!', 1200, 500, 20, "#FFD700");
    var now_with_text2 = Utils.create_stroke_text('and a new song!', 1200, 550, 10, "#FFD700");
    now_with_text.angle = -2;
    game.add.tween(now_with_text).to({ angle: 2 }, 5000, function(k) {
       return Math.sin(Math.PI * 2 * k);
     }, true, 0, -1);

    game.add.tween(now_with_text2).to({ angle: 2 }, 5000, function(k) {
       return Math.sin(Math.PI * 2 * k);
     }, true, 0, -1);

    var start_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    start_button.onDown.addOnce(this.start, this);
    //game.input.activePointer.leftButton.onDown.addOnce(this.start, this);

    var leaderboard_button = game.input.keyboard.addKey(Phaser.Keyboard.L);
    leaderboard_button.onDown.addOnce(function(){ game.state.start('leaderboard') }, this);

    // sounds
    this.music1 = sound_manager.add('music1');
    this.music2 = sound_manager.add('music2');
    this.music2.loop = true;
    this.music3 = sound_manager.add('music3');
    this.music4 = sound_manager.add('music4');
    this.new_music = sound_manager.add('mm_xanadont_song');

    this.music1.onStop.addOnce(function() { this.music2.play(); }, this);
    //this.music3.onStop.addOnce(function() { this.music4.play(); game.state.start('play'); }, this);

    var no_icon = game.add.sprite(60, 570, 'no');
    no_icon.scale.x = 0.3;
    no_icon.scale.y = 0.3;
    no_icon.anchor.set(0.5, 0.5);
    no_icon.visible = true;

    var sound_icon = game.add.sprite(60, 570, 'sound_white');
    sound_icon.scale.x = 0.2;
    sound_icon.scale.y = 0.2;
    sound_icon.anchor.set(0.5, 0.5);
    sound_icon.inputEnabled = true;

    game.sound.mute = true;
    //if(conf.env == 'dev') { game.sound.mute = true; }
    sound_icon.events.onInputDown.add(function() {
      if(game.sound.mute == true) {
        console.log('unmuting');
        game.sound.mute = false;
        sound_manager.stopAll();
        no_icon.visible = false;
        //this.music2.play();

        this.new_music.play();
        this.new_music.volume = 0.5;
      } else {
        console.log('muting');
        game.sound.mute = true;
        no_icon.visible = true;
        sound_manager.stopAll();
      }
    }, this);

    //this.music1.play();
    

  },

  start: function() {
    // todo fix music for ready state
    // this.music1.stop();
    // this.music2.stop();
    // this.music4.play();
    game.state.start('ready');
  }
}