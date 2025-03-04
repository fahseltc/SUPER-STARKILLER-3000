var menu_state = {
  create: function() {
    this.background_sprite = game.add.tileSprite(
      0,
      0,
      1400,
      900,
      "title_screen_background"
    );

    this.space_to_begin_text = Utils.create_centered_stroke_text(
      "Press Space to Start",
      850,
      35
    );

    this.now_with_text = Utils.create_stroke_text(
      "Now it remembers\nyour volume!",
      1200,
      500,
      20,
      "#FFD700"
    );
    this.now_with_text2 = Utils.create_stroke_text(
      "\n\nand you can actually\nbeat it now!",
      1200,
      550,
      18,
      "#FFD700"
    );
    this.now_with_text.angle = -2;
    game.add.tween(this.now_with_text).to(
      { angle: 2 },
      5000,
      function(k) {
        return Math.sin(Math.PI * 2 * k);
      },
      true,
      0,
      -1
    );

    game.add.tween(this.now_with_text2).to(
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

    // Credits button

    this.credits_button = Utils.create_button(150, 850, "CREDITS", function() {
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
        game.state.start("leaderboard");
      }
    );

    this.music = sound_manager.play("title_song", GLOBAL_MUSIC_VOLUME, true);

    this.music_icon = game.add.sprite(50, 600, "white_music_icon");
    this.music_icon.anchor.set(0.5, 0.5);
    this.music_icon.scale.set(0.2, 0.2);
    this.music_slider = new Slider(90, 570, GLOBAL_MUSIC_VOLUME);

    this.music_slider.slider.events.onDragStop.add(function() {
      Utils.set_cookie("GLOBAL_MUSIC_VOLUME", GLOBAL_MUSIC_VOLUME, 90);
    }, this);

    this.sound_icon = game.add.sprite(50, 675, "white_speaker_icon");
    this.sound_icon.anchor.set(0.5, 0.5);
    this.sound_icon.scale.set(0.2, 0.2);
    this.sound_slider = new Slider(90, 645, GLOBAL_SFX_VOLUME);
    this.sound_slider.slider.events.onDragStart.add(function() {
      sound_manager.play("red_bullet_shoot", GLOBAL_SFX_VOLUME);
    }, this);

    this.sound_slider.slider.events.onDragStop.add(function() {
      Utils.set_cookie("GLOBAL_SFX_VOLUME", GLOBAL_SFX_VOLUME, 90);
    }, this);

    this.build_controls_images();
  },

  build_controls_images: function() {
    this.mouse_icon = game.add.sprite(750, 670, "mouse");
    this.mouse_icon.scale.set(0.75, 0.75);
    this.space_icon = game.add.sprite(650, 670, "space_bar");
    this.space_icon.scale.set(0.75, 0.75);
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
      GLOBAL_SCORE = 0;
      game.state.start("play");
    }, this);
  },

  destroy: function() {
    this.music_slider.destroy();
    this.sound_slider.destroy();
    this.mouse_icon.destroy();
    this.space_icon.destroy();
    this.sound_icon.destroy();
    this.music_icon.destroy();
    this.leaderboard_button.destroy();
    this.credits_button.destroy();
    this.music.destroy();
    this.background_sprite.destroy();
    this.now_with_text.destroy();
    this.now_with_text2.destroy();
    this.space_to_begin_text.destroy();
  }
};