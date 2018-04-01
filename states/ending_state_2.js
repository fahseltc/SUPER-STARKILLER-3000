var ending_state_2 = {
  create: function() {
    this.story_json = game.cache.getJSON("story");

    this.printer_sound_1 = sound_manager.add("dot_matrix_short");
    this.printer_sound_long_1 = sound_manager.add("dot_matrix_long_1");
    this.printer_sound_newline = sound_manager.add("dot_matrix_line_break");
    this.message = this.story_json[13].TEXT;

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

    this.counter = 1;
    this.displayLetterByLetterText(function() {
      this.all_text_displayed = true;
    });
  },

  displayNextLetter: function() {
    var new_text = this.message.substr(0, this.counter);
    this.counter += 1;
    this.message_label.text = new_text;
    var num = game.rnd.integerInRange(0, 3);
    if (this.line_breaks.indexOf(this.counter) > -1) {
      this.printer_sound_newline.play("", 0, GLOBAL_SFX_VOLUME, false, false);
    } else if (num == 3) {
      var num2 = game.rnd.integerInRange(0, 3);
      if (num2 == 0) {
        this.printer_sound_long_1.play(
          "",
          0,
          GLOBAL_SFX_VOLUME,
          false,
          false
        );
      } else {
        this.printer_sound_1.play("", 0, GLOBAL_SFX_VOLUME, false, false);
      }
    }
  },

  update: function() {
    if (this.all_text_displayed && !this.ending) {
      this.ending = true;
      sound_manager.play("shutdown_sound", GLOBAL_SFX_VOLUME);
      game.camera.resetFX();
      game.camera.fade(0x000000, 5000, true);
      game.camera.onFadeComplete.addOnce(function() {
        var ending_timer = game.time.events.add(
          3000,
          function() { game.state.start("ending_3"); },
          this
        );
      }, this);
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