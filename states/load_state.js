var load_state = {
  preload: function() {
    game.time.advancedTiming = true;
    console.log("load state");

    this.progress_bar = game.add.sprite(
      game.width / 2,
      game.height / 2,
      "loading_bar"
    );
    this.progress_bar.anchor.setTo(0.5, 0.5);
    this.ready = false;
    game.load.setPreloadSprite(this.progress_bar);

    //HACK TO PRELOAD A CUSTOM FONT first font will always be funky
    Utils.create_centered_stroke_text("LOADING", game.height / 2, 50);

    var assets_path = "/assets/";
    var images_path = assets_path + "images/";
    var ui_images_path = images_path + "UI/";

    //game.load.audio('mm_xanadont_song', 'assets/music/Mystery_Mammal_Xanadont.ogg');

    game.load.image("player", images_path + "player_ship.png");
    //game.load.image('player_bullet', assets_path + 'images/player_bullet.png');
    game.load.spritesheet(
      "player_bullet_sprite_sheet",
      images_path + "player_bullet/player_bullet.png",
      16,
      16,
      4
    );
    game.load.image("flame", images_path + "flame.png");
    game.load.image("turret_top_blue", images_path + "turret_top_blue.png");
    game.load.image("turret_base_blue", images_path + "turret_base_blue.png");
    game.load.image("turret_top_red", images_path + "turret_top_red.png");
    game.load.image("turret_base_red", images_path + "turret_base_red.png");

    game.load.image("boss", images_path + "boss.png");
    game.load.image("boss_1", images_path + "boss_1.png");
    game.load.image("boss_shield_red", images_path + "boss_shield_red.png");
    game.load.image("boss_shield_blue", images_path + "boss_shield_blue.png");

    game.load.image("shield", images_path + "shield.png");
    game.load.image("circle", images_path + "circle.png");
    game.load.image("enemy_bullet", images_path + "enemy_bullet.png");
    game.load.image("powerup_p", images_path + "pat_powerup_4.png");

    //game.load.image('pat_bg', images_path + 'pat_bg.png');
    game.load.image(
      "title_screen_background",
      images_path + "title_screen.png"
    );
    game.load.image("game_background", images_path + "game_background.png");
    game.load.image("debug_button", images_path + "debug_button.png");

    // UI loading
    game.load.image("life_bar_single", ui_images_path + "life_bar_single.png");
    game.load.image("dashboard", ui_images_path + "dashboard.png");
    game.load.image("no", ui_images_path + "no.png");
    game.load.image(
      "white_speaker_icon",
      ui_images_path + "white_speaker_icon.png"
    );
    game.load.image(
      "remaining_enemies_bg",
      ui_images_path + "remaining_enemies_bg.png"
    );
    game.load.image(
      "remaining_enemies_bar_green",
      ui_images_path + "remaining_enemies_bar_green.png"
    );
    game.load.image(
      "remaining_enemies_black_bar",
      ui_images_path + "remaining_enemies_black_bar.png"
    );
    game.load.image("spinner", ui_images_path + "spinner.png");
    game.load.image("x", ui_images_path + "x.png");

    game.load.image("pixel_planet", images_path + "pixel_planet.jpg");

    game.load.image("pink_rect_filled", images_path + "pink_rect_filled.png");
    game.load.image("pink_rect_empty", images_path + "pink_rect_empty.png");

    game.load.json("red_explosion", "assets/particles/red_explosion.json");
    game.load.json("blue_explosion", "assets/particles/blue_explosion.json");
    game.load.json("space_blast", "assets/particles/space_blast.json");
    game.load.json("levels", "assets/levels.json");
    game.load.json("story", "assets/story.json");

    game.load.audio("ui2", "assets/sound_effects/ui2.ogg");
    game.load.audio(
      "dot_matrix_short",
      "assets/sound_effects/dot_matrix_short.wav"
    );
    game.load.audio(
      "dot_matrix_long_1",
      "assets/sound_effects/dot_matrix_long_1.wav"
    );
    game.load.audio(
      "dot_matrix_line_break",
      "assets/sound_effects/dot_matrix_line_break.wav"
    );

    game.load.spritesheet(
      "circle_weapon_sheet",
      "assets/images/circle_weapon/circle_weapon.png",
      512,
      512,
      7
    );
  },
  create: function() {
    this.progress_bar.cropEnabled = false;
  },

  update: function() {
    try {
      game.cache.getJSON("levels")[0];
    } catch (error) {
      alert("levels json is not valid");
    }
    // if(game.cache.isSoundDecoded('mm_xanadont_song') && this.ready == false) {
    //   this.ready = true;
    game.state.start("menu");
    //game.state.start('debug');
    //game.state.start('text');
    //   //game.state.start('ready');
    //   //game.state.start('leaderboard');
    //   //game.state.start('post');
    //   //game.state.start('play');
    //game.state.start('travel');
    //}
  }
};