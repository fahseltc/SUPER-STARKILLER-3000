var menu_state = {
  create: function() {
    var background_sprite = game.add.tileSprite(
      0,
      0,
      1400,
      900,
      "title_screen_background"
    );
    // var title_text = Utils.create_centered_stroke_text('SUPER', 110, 100, RED_HEX_COLOR);
    // var title_text_old_x = title_text.x;
    // title_text.x = 0;
    // title_text.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
    // game.add.tween(title_text).to({ x: title_text_old_x}, 300, 'Linear', true);

    // var title_text1 = Utils.create_centered_stroke_text('STARKILLER', 220, 100, RED_HEX_COLOR);
    // var title_text1_old_x = title_text1.x;
    // title_text1.x = game.world.width;
    // title_text1.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
    // game.add.tween(title_text1).to({ x: title_text1_old_x}, 300, 'Linear', true);

    // var title_text2 = Utils.create_centered_stroke_text('', 330, 100, RED_HEX_COLOR);
    // var title_text2_old = title_text2.x;
    // title_text2.x = 0;
    // title_text2.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
    // game.add.tween(title_text2).to({ x: title_text2_old}, 300, 'Linear', true);

    // var title_text3 = Utils.create_centered_stroke_text('3000', 330, 100, RED_HEX_COLOR);
    // var title_text3_old = title_text3.y;
    // title_text3.y = 0;
    // title_text3.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
    // game.add.tween(title_text3).to({ y: title_text3_old}, 300, Phaser.Easing.Exponential.In, true);

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
        //this.music2.play();

        this.new_music.play();
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
  },

  start: function() {
    sound_manager.play("ui2", GLOBAL_VOLUME);
    game.camera.fade(0x000000, 200, true);
    game.camera.onFadeComplete.addOnce(function() {
      game.state.start("play");
    }, this);
  },

  destroy: function() {
  }
};