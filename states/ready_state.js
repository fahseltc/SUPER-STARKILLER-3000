var ready_state = {
  preload: function() {
    console.log("ready state");
    game.stage.backgroundColor = BLACK_HEX_COLOR;
    var level_data = (this.level_json = game.cache.getJSON("levels"));

    this.create_score_label();

    Utils.create_centered_stroke_text(
      "DEFENSIVE FORCES\nELIMINATED",
      100,
      50,
      RED_HEX_COLOR
    );

    Utils.create_centered_stroke_text(
      "--INCOMING TRANSMISSION--",
      700,
      50,
      RED_HEX_COLOR
    );

    var circle_button = game.add.graphics(0, 0);
    circle_button.beginFill(0xffffff, 1);
    circle_button.drawCircle(game.width / 2, game.height / 2, 100);

    circle_button.inputEnabled = true;
    circle_button.events.onInputDown.addOnce(function() {
      game.camera.fade(0x000000, 100, false);
      game.camera.onFadeComplete.addOnce(function() {
        console.log("increasing lvl index");
        CURRENT_LEVEL_INDEX++;
        game.state.start("play");
      }, this);
    }, this);
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
      320,
      50,
      WHITE_HEX_COLOR
    );
  }
};