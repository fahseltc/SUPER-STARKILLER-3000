var menu_state = {
  create: function() {
    var background_sprite = game.add.tileSprite(
      0,
      0,
      1400,
      900,
      "title_screen_background"
    );

    var space_to_begin_text = Utils.create_centered_stroke_text(
      "Press Space to Start",
      850,
      35
    );

    var now_with_text = Utils.create_stroke_text(
      "Now with More Buttons!",
      1200,
      500,
      20,
      "#FFD700"
    );
    var now_with_text2 = Utils.create_stroke_text(
      "and a tutorial!!",
      1200,
      550,
      10,
      "#FFD700"
    );
    now_with_text.angle = -2;
    game.add.tween(now_with_text).to(
      { angle: 2 },
      5000,
      function(k) {
        return Math.sin(Math.PI * 2 * k);
      },
      true,
      0,
      -1
    );

    game.add.tween(now_with_text2).to(
      { angle: 2 },
      5000,
      function(k) {
        return Math.sin(Math.PI * 2 * k);
      },
      true,
      0,
      -1
    );

    // Buttons
    var start_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    start_button.onDown.addOnce(this.start, this);

    var debug_button = game.input.keyboard.addKey(
      Phaser.Keyboard.BACKWARD_SLASH
    );
    debug_button.onDown.addOnce(function() {
      this.music.stop();
      game.state.start("debug");
    }, this);

    var no_icon = game.add.sprite(60, 570, "no");
    no_icon.scale.x = 0.3;
    no_icon.scale.y = 0.3;
    no_icon.anchor.set(0.5, 0.5);
    no_icon.visible = false;

    var sound_icon = game.add.sprite(60, 570, "white_speaker_icon");
    sound_icon.scale.x = 0.2;
    sound_icon.scale.y = 0.2;
    sound_icon.anchor.set(0.5, 0.5);
    sound_icon.inputEnabled = true;

    game.sound.mute = false;
    //if(conf.env == 'dev') { game.sound.mute = true; }
    sound_icon.events.onInputDown.add(function() {
      if (game.sound.mute == true) {
        console.log("unmuting");
        game.sound.mute = false;
        sound_manager.stopAll();
        no_icon.visible = false;

        this.music.play();
      } else {
        console.log("muting");
        game.sound.mute = true;
        no_icon.visible = true;
        sound_manager.stopAll();
      }
    }, this);

    // credits button

    this.credits_button = Utils.create_button(150, 850, "CREDITS", function() {
      game.state.start("credits");
    });
    this.tutorial_button = Utils.create_button(
      1250,
      765,
      "TUTORIAL",
      function() {
        this.music.stop();
        game.state.start("tutorial");
      }
    );
    this.leaderboard_button = Utils.create_button(
      1250,
      850,
      "HISCORES",
      function() {
        game.state.start("leaderboard");
      }
    );

    this.music = sound_manager.play("title_song", GLOBAL_VOLUME / 2, true);
  },

  start: function() {
    sound_manager.play("ui2", GLOBAL_VOLUME);
    this.music.fadeOut(200);
    game.camera.fade(0x000000, 200, true);
    game.camera.onFadeComplete.addOnce(function() {
      this.music.stop();
      game.state.start("play");
    }, this);
  },

  destroy: function() {}
};