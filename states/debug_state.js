var debug_state = {
  preload: function() {
    DEBUG_MODE = true;
  },
  create: function() {
    var title_text = Utils.create_centered_stroke_text(
      "DEBUG MENU",
      50,
      40,
      RED_HEX_COLOR
    );

    this.button_array = [];
    this.text_array = [];

    // create buttons for story screens
    var story_base_x = 100;
    var story_base_y = 100;
    var story_text = Utils.create_text(
      "STORY",
      story_base_x + 136,
      story_base_y - 25,
      30,
      RED_HEX_COLOR
    );
    story_text.anchor.set(0.5, 0.5);
    this.text_array.push(story_text);

    var story_columns = 4;
    var story_rows = 5;
    var counter = 0;
    var story_count = game.cache.getJSON("story").length;

    for (var col = 0; col < story_rows; col++) {
      for (var row = 0; row < story_columns; row++) {
        if (counter < story_count) {
          this.create_button_story(
            story_base_x + 70 * row,
            story_base_y + 70 * col,
            counter,
            "story"
          );
          counter++;
        }
      }
    }

    // create buttons for level screens
    var levels_base_x = 400;
    var levels_base_y = 400;
    var levels_text = Utils.create_text(
      "LEVELS",
      levels_base_x + 286,
      levels_base_y - 25,
      30,
      RED_HEX_COLOR
    );
    levels_text.anchor.set(0.5, 0.5);
    this.text_array.push(levels_text);

    var levels_columns = 8;
    var levels_rows = 12;
    var counter = 0;
    var level_count = game.cache.getJSON("levels").length;
    var spacing = 0;

    for (var col = 0; col < levels_rows; col++) {
      for (var row = 0; row < levels_columns; row++) {
        if (counter < level_count) {
          var spacing = 0;
          if(col % 2 == 0) {
            spacing = 25;
          }
          this.create_button_level(
            levels_base_x + 70 * row,
            levels_base_y + 70 * col + spacing,
            counter,
            "play"
          );
          counter++;
        }
      }
    }

    // Text to explain what colors mean
    Utils.create_centered_text("PINK=TRAVEL", 200, 20, PINK_HEX_COLOR);
    Utils.create_centered_text("GREY=STORY", 225, 20, GREY_HEX_COLOR);
    Utils.create_centered_text("RED=BOSS", 250, 20, RED_HEX_COLOR);
    Utils.create_centered_text("YELLOW=COMBAT", 275, 20, YELLOW_HEX_COLOR);

    // button for credits screen
    var credits_button = game.add.button(
      1200,
      700,
      "debug_button",
      function() {
        game.state.start("credits");
      },
      this
    );

    var credits_text = Utils.create_stroke_text(
      "CREDITS",
      1230,
      680,
      30,
      GREY_HEX_COLOR
    );

    this.button_array.push(credits_button);
    this.text_array.push(credits_text);

    // tutorial buttons
    var tutorial_button = game.add.button(
      1200,
      580,
      "debug_button",
      function() {
        game.state.start("tutorial");
      },
      this
    );

    var tutorial_text = Utils.create_stroke_text(
      "TUTORIAL",
      1230,
      560,
      30,
      GREY_HEX_COLOR
    );

    this.button_array.push(tutorial_button);
    this.text_array.push(tutorial_text);

    // post_game buttons
    var post_game_button = game.add.button(
      1200,
      460,
      "debug_button",
      function() {
        game.state.start("post");
      },
      this
    );

    var post_game_text = Utils.create_stroke_text(
      "POST",
      1230,
      440,
      30,
      GREY_HEX_COLOR
    );

    this.button_array.push(post_game_button);
    this.text_array.push(post_game_text);
  },

  create_button_level: function(x, y, index, value) {
    var temp_button = game.add.button(x, y, "debug_button", this.go_to_state, {
      index: index,
      value: value
    });

    var text_color = BLACK_HEX_COLOR;
    if (game.cache.getJSON("levels")[index].LEVEL_TYPE == "BOSS") {
      text_color = RED_HEX_COLOR;
    }
    if (game.cache.getJSON("levels")[index].LEVEL_TYPE == "TRAVEL") {
      text_color = PINK_HEX_COLOR;
    }
    if (game.cache.getJSON("levels")[index].LEVEL_TYPE == "STORY") {
      text_color = GREY_HEX_COLOR;
    }
    if (game.cache.getJSON("levels")[index].LEVEL_TYPE == "COMBAT") {
      text_color = YELLOW_HEX_COLOR;
    }

    var temp_text = Utils.create_stroke_text(
      index.toString(),
      x + 32,
      y + 38,
      30,
      text_color
    );

    this.button_array.push(temp_button);
    this.text_array.push(temp_text);
  },

  create_button_story: function(x, y, index, value) {
    // new Button( [, x] [, y] [, key] [, callback] [, callbackContext] [, overFrame] [, outFrame] [, downFrame] [, upFrame])
    var temp_button = game.add.button(x, y, "debug_button", this.go_to_state, {
      index: index,
      value: value
    });

    var text_color = GREY_HEX_COLOR;
    var temp_text = Utils.create_stroke_text(
      index.toString(),
      x + 32,
      y + 38,
      30,
      text_color
    );

    this.button_array.push(temp_button);
    this.text_array.push(temp_text);
  },

  go_to_state: function() {
    CURRENT_LEVEL_INDEX = this.index;
    CURRENT_STORY_INDEX = this.index;
    game.state.start(this.value);
  },

  destroy: function() {
    this.button_array.forEach(function(button) {
      button.destroy();
    });
    this.text_array.forEach(function(button) {
      button.destroy();
    });
  }
};