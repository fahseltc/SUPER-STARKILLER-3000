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

    Utils.create_stroke_text("NAME", 300, 140, 40);
    Utils.create_stroke_text("SCORE", 700, 140, 40);
    Utils.create_stroke_text("DATE", 1000, 140, 40);

    this.refresh_button = Utils.create_button(
      1250,
      765,
      "REFRESH",
      this.get_leaderboard_data
    );
    this.back_button = Utils.create_button(1250, 850, "BACK", function() {
      sound_manager.stopAll();
      game.state.start("menu");
    });
  },

  get_leaderboard_data: async function() {
    var spinner = Utils.create_spinner();

    var scores = await ScoreboardHelper.get_scoreboard();
    scores = scores.dreamlo.leaderboard.entry;
    spinner.visible = false;
    console.log(scores);
    if(scores == null) {
      Utils.create_centered_stroke_text("Unable to fetch leaderboard", 400, 40);
      return;
    }
    if (scores.length == 0) {
      Utils.create_centered_stroke_text("No leaderboard data", 400, 40);
      return;
    }
    for (var i = 0; i < scores.length; i++) {
      this.print_leaderboard_row(scores[i], i);
    }
  },

  print_leaderboard_row: function (data, i) {
    if(data.name.length > 20) {
      data.name = data.name.substring(0, 20) + "...";
    }
    Utils.create_stroke_text(
      data.name,
      300,
      190 + 30 * i,
      25
    );
    Utils.create_stroke_text(
      data.score,
      700,
      190 + 30 * i,
      25
    );
    Utils.create_stroke_text(
      data.date.split(" ")[0],
      1000,
      190 + 30 * i,
      25
    );
  }
};