var ready_state = {
  preload: function() {
    console.log('ready state');

    game.stage.backgroundColor = '#000000';

    var level_data = this.level_json = game.cache.getJSON('levels').levels;

    if(after_menu_level_index != -1) {
      Utils.create_centered_text("You beat Level " + (level_data[after_menu_level_index - 2].LEVEL_NUMBER), 220, 50, "#FFFFFF");

      this.create_score_label();

    }
    Utils.create_centered_text('Ready?', 100, 50, "#FF0000");

    Utils.create_centered_text('Click the circle\nto begin', 700, 50, "#FF0000");

    var circle_button = game.add.graphics(0, 0);
    circle_button.beginFill(0xFFFFFF, 1);
    circle_button.drawCircle(game.width / 2, game.height / 2, 100);

    circle_button.inputEnabled = true;
    circle_button.events.onInputDown.addOnce(function() { game.state.start('travel') }, this);

  },

  create_score_label: function() {
    var score_total_digits = 10;
    var digits_to_create = score_total_digits - last_score.toString().length;

    var score_label_text = "";
    for(var i = 0; i < digits_to_create; i++) {
      score_label_text += "0";
    }
    score_label_text += last_score;

    Utils.create_centered_text(score_label_text, 320, 50, "#FFFFFF");
  }
};