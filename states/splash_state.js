var splash_state = {
  create: function() {
    console.log("splash enter");
    this.splash_text_1 = space_to_begin_text = Utils.create_centered_stroke_text(
      "FAT",
      350,
      70
    );
    this.splash_text_2 = space_to_begin_text = Utils.create_centered_stroke_text(
      "THUMBZ",
      450,
      70
    );
    this.splash_text_3 = space_to_begin_text = Utils.create_centered_stroke_text(
      "STUDIOZ",
      550,
      70
    );

    this.splash_screen_end = game.time.events.add(
      600,
      function() {
        game.camera.fade(0x000000, 100, true);
        console.log("go to menu from splash");
        game.camera.onFadeComplete.add(function() {
          game.state.start("menu");
        }, this);
      },
      this
    );
  },

  destroy: function() {
    this.splash_text_1.destroy();
    this.splash_text_2.destroy();
    this.splash_text_3.destroy();
  }
};