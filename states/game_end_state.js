var game_end_state = {
  create: function() {
    game.stage.backgroundColor = BLACK_HEX_COLOR;

    Utils.create_centered_text(
      "CONGRATULATION",
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
      this.send_score,
      1.5
    );
    var play_again_button = Utils.create_button(
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

    //this.music = sound_manager.play("ending", GLOBAL_MUSIC_VOLUME, true);
  },

  send_score: function() {
    var player_name = prompt("Enter your name", "");
    if (!player_name) {
      alert("Enter a name");
      return;
    }

    var spinner = game.add.sprite(700, 450, "spinner");
    spinner.scale.x = 3;
    spinner.scale.y = 3;
    spinner.anchor.set(0.5);
    spinner.visible = true;
    game.add.tween(spinner).to({ angle: 359 }, 1500, null, true, 0, Infinity);

    var body = "name=" + player_name + "&score=" + GLOBAL_SCORE;
    var request = new XMLHttpRequest();
    request.open("POST", game.config.backend_url + "/leaderboard", true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    request.onload = function() {
      GLOBAL_SCORE = 0;
      game.state.start("leaderboard");
    };
    request.onerror = function() {
      console.log(request.responseText);
    }; // failure case
    request.send(body);
  }

};