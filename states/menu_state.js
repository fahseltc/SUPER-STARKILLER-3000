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
      "Now with Volume sliders!",
      1200,
      500,
      20,
      "#FFD700"
    );
    var now_with_text2 = Utils.create_stroke_text(
      "and lots of songs!!",
      1200,
      550,
      18,
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
      sound_manager.stopAll();
      game.state.start("debug");
    }, this);

    // credits button

    this.credits_button = Utils.create_button(150, 850, "CREDITS", function() {
      sound_manager.stopAll();
      game.state.start("credits");
    });

    this.tutorial_button = Utils.create_button(
      1250,
      765,
      "TUTORIAL",
      function() {
        sound_manager.stopAll();
        game.state.start("tutorial");
      }
    );
    this.leaderboard_button = Utils.create_button(
      1250,
      850,
      "HISCORES",
      function() {
        sound_manager.stopAll();
        game.state.start("leaderboard");
      }
    );

    this.music = sound_manager.play("title_song", GLOBAL_MUSIC_VOLUME, true);

    this.music_icon = game.add.sprite(50, 600, "white_music_icon");
    this.music_icon.anchor.set(0.5, 0.5);
    this.music_icon.scale.set(0.2, 0.2);
    this.music_slider = new Slider(90, 570, GLOBAL_MUSIC_VOLUME);

    this.sound_icon = game.add.sprite(50, 675, "white_speaker_icon");
    this.sound_icon.anchor.set(0.5, 0.5);
    this.sound_icon.scale.set(0.2, 0.2);
    this.sound_slider = new Slider(90, 645, GLOBAL_SFX_VOLUME);
    this.sound_slider.slider.events.onDragStart.add(function() {
      sound_manager.play("red_bullet_shoot", GLOBAL_SFX_VOLUME);
    }, this);
  },

  update: function() {
    this.music_slider.update();
    GLOBAL_MUSIC_VOLUME = this.music_slider.value;
    this.music.volume = GLOBAL_MUSIC_VOLUME;

    this.sound_slider.update();
    GLOBAL_SFX_VOLUME = this.sound_slider.value;
  },

  start: function() {
    sound_manager.play("ui2", GLOBAL_SFX_VOLUME);
    this.music.fadeOut(200);
    game.camera.fade(0x000000, 200, true);
    game.camera.onFadeComplete.addOnce(function() {
      sound_manager.stopAll();
      game.state.start("play");
    }, this);
  },

  destroy: function() {}
};