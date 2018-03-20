var debug_state = {
  preload: function() {
    DEBUG_MODE = true;
  },
  create: function() {
    var title_text = Utils.create_centered_stroke_text('DEBUG MENU', 50, 40, RED_HEX_COLOR);



    this.button_array = []
    this.text_array = [];


    // create buttons for story screens
    var story_base_x = 100;
    var story_base_y = 100;
    var story_text = Utils.create_text('STORY', story_base_x + 136, story_base_y - 25, 30, RED_HEX_COLOR);
    story_text.anchor.set(0.5, 0.5);
    this.text_array.push(story_text);

    var story_columns = 4;
    var story_rows = 3;
    var counter = 0;

    for(var col = 0; col < story_rows; col++) {
      for(var row = 0; row < story_columns; row++) {
        if(counter < 11){
          this.create_button(story_base_x + (70 * row), story_base_y + (70 * col), counter, 'story');
          counter++;
        }
      }
    }


    // create buttons for level screens
    var levels_base_x = 1100;
    var levels_base_y = 100;
    var levels_text = Utils.create_text('LEVELS', levels_base_x - 128, levels_base_y - 25, 30, RED_HEX_COLOR);
    levels_text.anchor.set(0.5, 0.5);
    this.text_array.push(levels_text);

    var levels_columns = 4;
    var levels_rows = 5;
    var counter = 0;

    for(var col = 0; col < levels_rows; col++) {
      for(var row = 0; row < levels_columns; row++) {
        if(counter < 20){
          this.create_button(levels_base_x + (70 * row), levels_base_y + (70 * col), counter, 'play');
          counter++;
        }
      }
    }
  },

  create_button: function(x, y, index, value) {
    // new Button( [, x] [, y] [, key] [, callback] [, callbackContext] [, overFrame] [, outFrame] [, downFrame] [, upFrame])
    var temp_button = game.add.button(x, y, 'debug_button', this.go_to_state, { "index": index, "value": value } );
    var temp_text = Utils.create_text(index.toString(), x + 32, y + 38, 30, 'FFFFFF');
    this.button_array.push(temp_button);
    this.text_array.push(temp_text);
  },

  go_to_state: function() {
    if(this.value == "story") {
      CURRENT_STORY_INDEX = this.index;
      game.state.start(this.value);
    }else if(this.value == "play") {
      CURRENT_LEVEL_INDEX = this.index;
      game.state.start(this.value);
    }
  },

  destroy: function() {
    this.button_array.forEach(function(button) { button.destroy(); });
    this.text_array.forEach(function(button) { button.destroy(); });
  }
}