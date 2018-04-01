var boss_dead_state = {
  preload: function() {
    game.stage.backgroundColor = BLACK_HEX_COLOR;

    var background_sprite = game.add.tileSprite(
      game.width / 2,
      game.height / 2,
      768,
      780,
      "after_boss_bg"
    );
    background_sprite.anchor.set(0.5, 0.5);
    background_sprite.alpha = 0.5;

    Utils.create_centered_stroke_text(
      "STAR\nDESTROYED",
      280,
      50,
      WHITE_HEX_COLOR
    );

    var circle_button = game.add.graphics(0, 0);
    circle_button.beginFill(0xffffff, 1);
    circle_button.drawCircle(game.width / 2, game.height / 2, 100);

    circle_button.inputEnabled = true;
    circle_button.events.onInputDown.addOnce(function() {
      game.camera.fade(0x000000, 100, true);
      game.camera.onFadeComplete.addOnce(function() {
        CURRENT_LEVEL_INDEX++;
        game.state.start("play");
      }, this);
    }, this);
  }
};