var leaderboard_state = {
  create: function() {
    var background_sprite = game.add.tileSprite(
      0,
      0,
      1400,
      900,
      "title_screen_no_text"
    );

    this.get_leaderboard_data();
    Utils.create_centered_stroke_text("HISCORES", 60, 45, WHITE_HEX_COLOR);

    Utils.create_stroke_text("NAME", 440, 140, 40);
    Utils.create_stroke_text("SCORE", 940, 140, 40);

    this.refresh_button = Utils.create_button(
      1250,
      765,
      "RERESH",
      this.get_leaderboard_data
    );
    this.back_button = Utils.create_button(1250, 850, "BACK", function() {
      sound_manager.stopAll();
      game.state.start("menu");
    });
  },

  get_leaderboard_data: function() {
    var spinner = game.add.sprite(700, 450, "spinner");
    spinner.scale.x = 3;
    spinner.scale.y = 3;
    spinner.anchor.set(0.5);
    spinner.visible = true;
    game.add.tween(spinner).to({ angle: 359 }, 1500, null, true, 0, Infinity);
    var request = new XMLHttpRequest();
    request.open("GET", game.config.backend_url + "/leaderboard", true);

    request.onload = function() {
      if (request.status == 200) {
        spinner.visible = false;
        console.log("Got data");
        var resp = request.responseText;
        console.log(resp);
        leaderboard_data = JSON.parse(resp);
        leaderboard_data.sort(function(a, b) {
          return b.score - a.score;
        });
        console.log("sorted: " + leaderboard_data);

        if (leaderboard_data.length == 0) {
          Utils.create_centered_stroke_text("No data", 400, 40);
        } else {
          counter = 0;
          leaderboard_data.slice(0, 21).forEach(function(element) {
            Utils.create_stroke_text(
              element.name,
              game.width / 2 - 260,
              190 + 30 * counter,
              25
            );
            Utils.create_stroke_text(
              element.score,
              game.width / 2 + 230,
              190 + 30 * counter,
              25
            );
            counter++;
          });
        }
      } else {
        console.log("unable to fetch leaderboard");
        spinner.visible = false;
        var x = game.add.sprite(700, 450, "x");
        x.scale.x = 3;
        x.scale.y = 3;
        x.anchor.set(0.5);
        x.visible = true;
      }
    };
    request.send();
  }
};