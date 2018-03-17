var ready_state = {
  preload: function() {
    console.log('ready state');
    game.stage.backgroundColor = '#000000';
    var level_data = this.level_json = game.cache.getJSON('levels').levels;

    // if this is not the first level
    if(after_menu_level_index != -1) {
      var background_sprite = game.add.sprite(1400, 900, 'pixel_planet');
      background_sprite.anchor.x = 0.5;
      background_sprite.anchor.y = 0.5;
      background_sprite.position.set(game.width/2, game.height/2);
      Utils.create_centered_stroke_text("STAR " + (level_data[after_menu_level_index - 2].LEVEL_NUMBER + " DESTROYED"), 240, 50, "#FFFFFF");

      this.create_score_label();
    }
    this.create_score_label();

    Utils.create_centered_stroke_text('ELIMINATE ALL\nDEFENSIVE FORCES', 100, 50, RED_HEX_COLOR);

    Utils.create_centered_stroke_text('CLICK TO INITIATE\nWARP', 700, 50, RED_HEX_COLOR);

    var circle_button = game.add.graphics(0, 0);
    circle_button.beginFill(0xFFFFFF, 1);
    circle_button.drawCircle(game.width / 2, game.height / 2, 100);

    circle_button.inputEnabled = true;
    circle_button.events.onInputDown.addOnce(function() {
      game.camera.fade(0x000000, 100, false);
      game.camera.onFadeComplete.add(function(){
        game.state.start("travel");
      }, this);
    }, this);

  },

  create_score_label: function() {
    var score_total_digits = 10;
    var digits_to_create = score_total_digits - last_score.toString().length;

    var score_label_text = "";
    for(var i = 0; i < digits_to_create; i++) {
      score_label_text += "0";
    }
    score_label_text += last_score;

    Utils.create_centered_stroke_text(score_label_text, 320, 50, "#FFFFFF");
  }
};