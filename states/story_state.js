var story_state = {
  create: function() {
    var fragmentSrc = [
        'precision lowp float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',

        'void main() {',
            'vec4 sum = vec4(0);',
            'vec2 texcoord = vTextureCoord;',
            'for(int xx = -4; xx <= 4; xx++) {',
                'for(int yy = -3; yy <= 3; yy++) {',
                    'float dist = sqrt(float(xx*xx) + float(yy*yy));',
                    'float factor = 0.0;',
                    'if (dist == 0.0) {',
                        'factor = 2.0;',
                    '} else {',
                        'factor = 2.0/abs(float(dist));',
                    '}',
                    'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
                '}',
            '}',
            'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
        '}'
    ];

    this.filter = new Phaser.Filter(game, null, fragmentSrc);
    this.filter.setResolution(1400, 900);


    var background_sprite = game.add.tileSprite(
      0,
      0,
      1400,
      900,
      "story_background"
    );

    background_sprite.filters = [ this.filter ];

    this.story_json = game.cache.getJSON("story");

    this.printer_sound_1 = sound_manager.add("dot_matrix_short");
    this.printer_sound_long_1 = sound_manager.add("dot_matrix_long_1");
    this.printer_sound_newline = sound_manager.add("dot_matrix_line_break");
    this.message = this.story_json[CURRENT_STORY_INDEX].TEXT;

    this.message_label = game.add.text(game.width / 2, 440, "", {
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
    }
  },

  update: function() {
    if (game.input.activePointer.isDown) {
      if (this.all_text_displayed && !this.ending) {
        this.ending = true;
        game.camera.resetFX();
        game.camera.fade(0x000000, 250, true);
        game.camera.onFadeComplete.addOnce(function() {
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