var ready_state = {
  preload: function() {
    game.stage.backgroundColor = BLACK_HEX_COLOR;
    var level_data = game.cache.getJSON("levels");

    this.create_score_label();

    Utils.create_centered_stroke_text(
      "DEFENSIVE FORCES\nELIMINATED",
      100,
      50,
      WHITE_HEX_COLOR
    );

    Utils.create_centered_stroke_text(
      "--INCOMING TRANSMISSION--",
      780,
      50,
      WHITE_HEX_COLOR
    );

    var circle_button = game.add.graphics(0, 0);
    circle_button.beginFill(0xffffff, 1);
    circle_button.drawCircle(game.width / 2, game.height / 2, 100);
    this.go = Utils.create_centered_stroke_text(
      "GO!",
      (game.height / 2) + 10
    );

    circle_button.inputEnabled = true;
    circle_button.events.onInputDown.addOnce(function() {
      game.camera.fade(0x000000, 100, false);
      game.camera.onFadeComplete.addOnce(function() {
        CURRENT_LEVEL_INDEX++;
        game.state.start("play");
      }, this);
    }, this);

    this.progress_meter = new ProgressMeter();
  },

  create_score_label: function() {
    var score_total_digits = 4;
    var digits_to_create = score_total_digits - GLOBAL_SCORE.toString().length;

    var score_label_text = "";
    for (var i = 0; i < digits_to_create; i++) {
      score_label_text += "0";
    }
    score_label_text += GLOBAL_SCORE;

    Utils.create_centered_stroke_text(
      score_label_text,
      600,
      50,
      WHITE_HEX_COLOR
    );
  }
};