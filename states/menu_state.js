var menu_state = {
  create: function() {
    var title_text = Utils.create_centered_text('Mega\nMecha\nMarxist\nII', 300, 100, "#FF0000");

    var space_to_begin_text = Utils.create_centered_text('Press Space or Click to begin', 850, 35);

    var now_with_text = Utils.create_text('Cool enemy swooshes\nand spacebar!', 1100, 550, 20, "#FFD700");
    var now_with_text2 = Utils.create_text('and less difficulty?\nbecause its level 1', 1100, 600, 10, "#FFD700");
    now_with_text.angle = -2;
    game.add.tween(now_with_text).to({ angle: 2 }, 5000, function(k) {
       return Math.sin(Math.PI * 2 * k);
     }, true, 0, -1);

    game.add.tween(now_with_text2).to({ angle: 2 }, 5000, function(k) {
       return Math.sin(Math.PI * 2 * k);
     }, true, 0, -1);

    var start_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    start_button.onDown.addOnce(this.start, this);
    game.input.activePointer.leftButton.onDown.addOnce(this.start, this);

    var leaderboard_button = game.input.keyboard.addKey(Phaser.Keyboard.L);
    leaderboard_button.onDown.addOnce(function(){ game.state.start('leaderboard') }, this);

    // sounds
    this.music1 = sound_manager.add('music1');
    this.music2 = sound_manager.add('music2');
    this.music2.loop = true;
    this.music3 = sound_manager.add('music3');
    this.music4 = sound_manager.add('music4');

    this.music1.onStop.addOnce(function() { this.music2.play(); }, this);
    //this.music3.onStop.addOnce(function() { this.music4.play(); game.state.start('play'); }, this);
    this.music1.play();

    var no_icon = game.add.sprite(100, 700, 'no');
    no_icon.scale.x = 0.3;
    no_icon.scale.y = 0.3;
    no_icon.anchor.set(0.5, 0.5);
    no_icon.visible = false;

    var sound_icon = game.add.sprite(100, 700, 'sound_white');
    sound_icon.scale.x = 0.2;
    sound_icon.scale.y = 0.2;
    sound_icon.anchor.set(0.5, 0.5);
    sound_icon.inputEnabled = true;
    if(conf.env == 'dev') { game.sound.mute = true; }
    sound_icon.events.onInputDown.add(function() {
      if(game.sound.mute == true) {
        console.log('unmuting');
        game.sound.mute = false;
        sound_manager.stopAll();
        no_icon.visible = false;
        this.music2.play();
      } else {
        console.log('muting');
        game.sound.mute = true;
        no_icon.visible = true;
        sound_manager.stopAll();
      }
    }, this);
  },

  start: function() {
    this.music1.stop();
    this.music2.stop();
    this.music4.play();
    game.state.start('play')
  }
}