var load_state = {
  preload: function() {
    game.time.advancedTiming = true;

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
    var bosses_path = images_path + "bosses/";

    game.load.image("player", images_path + "player_ship.png");
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
    game.load.image("spike_enemy", images_path + "spike_enemy.png");

    game.load.image("boss_1", bosses_path + "boss_1.png");
    game.load.image("boss_2", bosses_path + "boss_2.png");

    game.load.image("boss_shield_red", bosses_path + "boss_shield_red.png");
    game.load.image("boss_shield_blue", bosses_path + "boss_shield_blue.png");

    game.load.image("shield", images_path + "shield.png");
    game.load.image("enemy_bullet", images_path + "enemy_bullet.png");
    game.load.image("powerup_p", images_path + "pat_powerup_4.png");

    game.load.image(
      "title_screen_background",
      images_path + "title_screen.png"
    );
    game.load.image(
      "title_screen_no_text",
      images_path + "title_screen_no_text.png"
    );
    game.load.image("game_background", images_path + "game_background.png");
    game.load.image("all_green", images_path + "all_green.png");
    game.load.image("story_background", images_path + "story_background.png");
    game.load.image(
      "game_background_clean",
      images_path + "game_background_clean.png"
    );
    game.load.image("after_boss_bg", images_path + "after_boss_bg.png");

    // UI loading
    game.load.image("debug_button", ui_images_path + "debug_button.png");
    game.load.image("menu_button", ui_images_path + "menu_button.png");
    game.load.image("life_bar_single", ui_images_path + "life_bar_single.png");
    game.load.image("dashboard", ui_images_path + "dashboard.png");
    game.load.image(
      "white_speaker_icon",
      ui_images_path + "white_speaker_icon.png"
    );

    game.load.image(
      "white_music_icon",
      ui_images_path + "white_music_icon.png"
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
    game.load.image("green_bar", ui_images_path + "green_bar.png");
    game.load.image("spinner", ui_images_path + "spinner.png");
    game.load.image("x", ui_images_path + "x.png");
    game.load.image("space_bar", ui_images_path + "space_bar.png");
    game.load.image("left_click", ui_images_path + "left_click.png");
    game.load.image("right_click", ui_images_path + "right_click.png");

    game.load.image("pink_rect_filled", images_path + "pink_rect_filled.png");
    game.load.image("pink_rect_empty", images_path + "pink_rect_empty.png");

    game.load.json("red_explosion", "assets/particles/red_explosion.json");
    game.load.json("blue_explosion", "assets/particles/blue_explosion.json");
    game.load.json("space_blast", "assets/particles/space_blast.json");
    game.load.json("levels", "assets/levels.json");
    game.load.json("story", "assets/story.json");
    game.load.json("credits", "assets/credits.json");

    // AUDIO
    game.load.audio("ui2", "assets/sound_effects/ui2.ogg");
    game.load.audio(
      "shutdown_sound",
      "assets/sound_effects/shutdown_sound.ogg"
    );
    game.load.audio(
      "shutdown_sound_reversed",
      "assets/sound_effects/shutdown_sound_reversed.ogg"
    );
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

    game.load.audio(
      "red_bullet_shoot",
      "assets/sound_effects/red_bullet_shoot.wav"
    );

    game.load.audio("turret_death", "assets/sound_effects/turret_death.wav");

    game.load.audio("powerup_get", "assets/sound_effects/powerup_get.wav");

    game.load.audio(
      "blue_weapon_shoot",
      "assets/sound_effects/blue_weapon_shoot.wav"
    );

    game.load.audio(
      "level_end_explosion",
      "assets/sound_effects/level_end_explosion.wav"
    );

    game.load.audio(
      "player_damaged",
      "assets/sound_effects/player_damaged.wav"
    );

    game.load.audio("travel_whoosh", "assets/sound_effects/travel_whoosh.wav");
    game.load.audio(
      "boss_shield_damaged",
      "assets/sound_effects/boss_shield_damaged.wav"
    );
    game.load.audio(
      "boss_destroyed",
      "assets/sound_effects/boss_destroyed.wav"
    );

    // GAME SONGS
    game.load.audio("song_1", "assets/music/level_1.ogg");
    game.load.audio("song_2", "assets/music/level_2.ogg");
    game.load.audio("song_3", "assets/music/level_3.ogg");
    game.load.audio("title_song", "assets/music/title_theme.ogg");
    game.load.audio("boss_intro", "assets/music/boss_intro.ogg");
    game.load.audio("boss_main", "assets/music/boss_main.ogg");
    game.load.audio("ending", "assets/music/ending.ogg");
    game.load.audio("game_complete", "assets/music/game_complete.ogg");

    // Add sounds to sound manager
    sound_manager.add("player_damaged");
    sound_manager.add("blue_weapon_shoot");
    sound_manager.add("powerup_get");
    sound_manager.add("turret_death");
    sound_manager.add("red_bullet_shoot");
    sound_manager.add("ui2");
    sound_manager.add("song_1");
    sound_manager.add("song_2");
    sound_manager.add("song_3");
    sound_manager.add("title_song");
    sound_manager.add("boss_intro");
    sound_manager.add("boss_main");
    sound_manager.add("boss_destroyed");
    sound_manager.add("boss_shield_damaged");

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

    try {
      game.cache.getJSON("story")[0];
    } catch (error) {
      alert("levels json is not valid");
    }

    try {
      game.cache.getJSON("credits")[0];
    } catch (error) {
      alert("levels json is not valid");
    }

    game.state.start("splash");
  }
};