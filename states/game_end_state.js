var game_end_state = {
  create: function() {
    game.stage.backgroundColor = BLACK_HEX_COLOR;

    Utils.create_centered_text(
      "CONGRATULATIONS",
      200,
      80,
      WHITE_HEX_COLOR
    );

    Utils.create_centered_text(
      "YOU WON",
      320,
      60,
      WHITE_HEX_COLOR
    );
    Utils.create_centered_text("SCORE: " + GLOBAL_SCORE, 500, 50);
    var submit_score_button = Utils.create_button(
      game.width / 2,
      765,
      "SUBMIT SCORE",
      ScoreboardHelper.name_entry_and_submit_score,
      1.5
    );
    var main_menu_button = Utils.create_button(
      game.width / 2,
      850,
      "MAIN MENU",
      function() {
        GLOBAL_SCORE = 0;
        sound_manager.stopAll();
        game.state.start("menu");
      },
      1.5
    );
  }
};