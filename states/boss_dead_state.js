var boss_dead_state = {
  preload: function() {
    console.log("ready state");
    game.stage.backgroundColor = BLACK_HEX_COLOR;
    Utils.create_centered_stroke_text(
      "STAR\nDEFENSES\nERADICATED",
      280,
      50,
      WHITE_HEX_COLOR
    );

    var circle_button = game.add.graphics(0, 0);
    circle_button.beginFill(0xffffff, 1);
    circle_button.drawCircle(game.width / 2, game.height / 2, 100);

    circle_button.inputEnabled = true;
    circle_button.events.onInputDown.addOnce(function() {
      game.camera.fade(0x000000, 100, false);
      game.camera.onFadeComplete.add(function() {
        CURRENT_LEVEL_INDEX++;
        game.state.start("play");
      }, this);
    }, this);
  }
};