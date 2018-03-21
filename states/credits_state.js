var credits_state = {
  create: function() {
    this.credit_count = 0;
    this.credits = game.cache.getJSON("credits");

    this.credits.forEach(function(credit) {
      this.add_credit(credit.TITLE, credit.NAME);
    }, this);

    this.credits_button = game.add.button(50, 800, "debug_button", function() { game.state.start('menu'); }, this);
    this.credits_button.width = this.credits_button.width * 2.5;
    this.credits_button.anchor.setTo(0.5, 0.5);
    this.credits_button_text = Utils.create_text("BACK", 67, 805, 25, BLACK_HEX_COLOR);
    this.credits_button_text.anchor.setTo(0.5, 0.5);
    //this.credits_button.addChild(this.credits_button_text);
  },

  add_credit: function(title, name) {
    var title_text = Utils.create_centered_stroke_text(
      title,
      1000,
      40
    );
    var name_text = Utils.create_centered_stroke_text(
      name,
      1045,
      50
    );

    game.add.tween(title_text).to( { y: -500 }, 20000, Phaser.Easing.Cubic.Out, true, this.credit_count * 5000);
    game.add.tween(name_text).to(  { y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.credit_count * 5000);
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