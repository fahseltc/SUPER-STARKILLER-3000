var ready_state = {
  preload: function() {
    console.log('ready state');
    Utils.create_centered_text('Ready?', 200, 50);

    var circle_button = game.add.graphics(0, 0);
    circle_button.beginFill(0xFFFFFF, 1);
    circle_button.drawCircle(game.width / 2, game.height / 2, 100);

    circle_button.inputEnabled = true;
    circle_button.events.onInputDown.addOnce(this.next_state, this);

  },
  create: function() {},

  next_state() {
    // need a way to move to an arbitrary state via global string probablys
    game.state.start('play');
  }
};