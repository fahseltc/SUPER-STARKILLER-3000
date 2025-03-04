var game_over_state = {
  create: function() {
    game.stage.backgroundColor = BLACK_HEX_COLOR;

    Utils.create_centered_text(
      "SYSTEM MALFUNCTION\n\nSIGNAL LOST",
      200,
      70,
      RED_HEX_COLOR
    );
    Utils.create_centered_text("SCORE: " + GLOBAL_SCORE, 500, 50);
    var submit_score_button = Utils.create_button(
      game.width / 2,
      765,
      "SUBMIT SCORE",
      ScoreboardHelper.name_entry_and_submit_score,
      1.5
    );
    var play_again_button = Utils.create_button(
      game.width / 2,
      850,
      "MAIN MENU",
      function() {
        GLOBAL_SCORE = 0;
        game.state.start("menu");
      },
      1.5
    );
  }
};