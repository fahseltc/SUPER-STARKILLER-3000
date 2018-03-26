var post_game_state = {
  create: function() {
    game.stage.backgroundColor = BLACK_HEX_COLOR;

    Utils.create_centered_text(
      "SYSTEM MALFUNCTION\n\nSIGNAL LOST",
      200,
      70,
      RED_HEX_COLOR
    );
    Utils.create_centered_text("SCORE: " + last_score, 500, 50);
    var submit_score_button = Utils.create_button(
      game.width / 2,
      765,
      "SUBMIT SCORE",
      this.send_score,
      1.5
    );
    var play_again_button = Utils.create_button(
      game.width / 2,
      850,
      "MAIN MENU",
      function() {
        last_score = 0;
        after_menu_level_index = -1;
        game.state.start("menu");
      },
      1.5
    );
  },

  send_score: function() {
    var player = prompt("Enter your name", "");
    if (!player) {
      alert("Enter a name");
      return;
    }

    var body = "name=" + player + "&score=" + last_score;
    var request = new XMLHttpRequest();
    request.open("POST", game.config.backend_url + "/leaderboard", true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    request.onload = function() {
      last_score = 0;
      game.state.start("leaderboard");
    };
    request.onerror = function() {
      console.log(request.responseText);
    }; // failure case
    request.send(body);
  }
};