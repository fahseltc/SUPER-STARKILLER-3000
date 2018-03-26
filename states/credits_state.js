var credits_state = {
  create: function() {
    this.credit_count = 0;
    this.credits = game.cache.getJSON("credits");

    var background_sprite = game.add.tileSprite(
      0,
      0,
      1400,
      900,
      "title_screen_no_text"
    );

    this.credits.forEach(function(credit) {
      this.add_credit(credit.TITLE, credit.NAME);
    }, this);

    this.back_button = Utils.create_button(150, 850, "BACK", function() {
      game.state.start("menu");
    });
  },

  add_credit: function(title, name) {
    var title_text = Utils.create_centered_stroke_text(title, 1000, 40);
    var name_text = Utils.create_centered_stroke_text(name, 1045, 50);

    game.add
      .tween(title_text)
      .to(
        { y: -500 },
        20000,
        Phaser.Easing.Cubic.Out,
        true,
        this.credit_count * 5000
      );
    game.add
      .tween(name_text)
      .to(
        { y: -200 },
        20000,
        Phaser.Easing.Cubic.Out,
        true,
        this.credit_count * 5000
      );
    this.credit_count++;
  },

  destroy: function() {
    this.splash_text_1.destroy();
    this.splash_text_2.destroy();
    this.splash_text_3.destroy();
    this.credits_button.destroy();
    this.credits_button_text.destroy();
  }
};