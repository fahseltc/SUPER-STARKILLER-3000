var story_state = {
  create: function() {
    this.story_json = game.cache.getJSON("story");
    this.volume = 0.05;

    this.printer_sound_1 = sound_manager.add("dot_matrix_short");
    this.printer_sound_long_1 = sound_manager.add("dot_matrix_long_1");
    this.printer_sound_newline = sound_manager.add("dot_matrix_line_break");
    this.message = this.story_json[CURRENT_STORY_INDEX].TEXT;

    this.message_label = game.add.text(game.width / 2, 400, "", {
      font: "35px prstart",
      fill: WHITE_HEX_COLOR,
      align: "center",
      wordWrap: true,
      wordWrapWidth: 1200
    });
    this.message_label.anchor.set(0.5);

    var from_index = 0;
    this.line_breaks = [];

    while (this.message.indexOf("\n", from_index) > 0) {
      var index_of_newline = this.message.indexOf("\n", from_index);
      this.line_breaks.push(index_of_newline + 2);
      from_index = index_of_newline + 2;
    }

    this.player_clicked = false;
    this.all_text_displayed = false;
    this.timerEvent = null;
    this.ending = false;
    this.displaying_red = false;

    this.counter = 1;
    this.displayLetterByLetterText(function() {
      this.all_text_displayed = true;
      console.log("All text displayed!");
    });
  },

  displayNextLetter: function() {
    var new_text = this.message.substr(0, this.counter);
    this.counter += 1;
    if (new_text.slice(-1) == "~" && this.displaying_red == false) {
      this.displaying_red = true;
      this.message_label.addColor(RED_HEX_COLOR, this.counter - 2);
      this.message = this.message.replace("~", "");
    } else if (new_text.slice(-1) == "~" && this.displaying_red == true) {
      this.displaying_red = false;
      this.message_label.addColor(WHITE_HEX_COLOR, this.counter - 1);
      this.message = this.message.replace("~", "");
    } else {
      // we skip the ~ characters
      this.message_label.text = new_text;
      var num = game.rnd.integerInRange(0, 3);
      if (this.line_breaks.indexOf(this.counter) > -1) {
        this.printer_sound_newline.play("", 0, this.volume, false, false);
      } else if (num == 3) {
        var num2 = game.rnd.integerInRange(0, 3);
        if (num2 == 0) {
          this.printer_sound_long_1.play("", 0, this.volume, false, false);
        } else {
          this.printer_sound_1.play("", 0, this.volume, false, false);
        }
      }
    }
  },

  update: function() {
    if (game.input.activePointer.isDown) {
      if (this.all_text_displayed && !this.ending) {
        this.ending = true;
        game.camera.resetFX();
        game.camera.fade(0x000000, 250, true);
        game.camera.onFadeComplete.addOnce(function() {
          console.log("increasing lvl index");
          CURRENT_LEVEL_INDEX++;
          game.state.start("play");
        }, this);
      }
      if (!this.player_clicked) {
        this.player_clicked = true;
        this.show_all_text();
      }
    }
  },

  show_all_text: function() {
    this.message_label.text = this.message;
    game.time.events.remove(this.timerEvent);
    var event = game.time.events.add(
      500,
      function() {
        this.all_text_displayed = true;
      },
      this
    );
    event.timer.start();
  },

  displayLetterByLetterText: function(onCompleteCallback) {
    this.timerEvent = game.time.events.repeat(
      100,
      this.message.length,
      this.displayNextLetter,
      this
    );
    this.timerEvent.timer.onComplete.addOnce(onCompleteCallback, this);
  }
};