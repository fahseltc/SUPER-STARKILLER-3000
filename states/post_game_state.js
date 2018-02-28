var post_game_state = {
  create: function() {
    game.stage.backgroundColor = '#000000';

    Utils.create_centered_text('You\nDied', 200, 70, '#FF0000');
    Utils.create_centered_text('but you scored ' + last_score + ' points.', 400, 40);
    this.create_submit_score_button();
    this.create_play_again_button();

    this.music = sound_manager._sounds.find(item => { return item.name == "music4" });
    //var tween = game.add.tween(this.music).to( { volume: 0 }, 1000).start();
    //tween.onComplete.add(function() { this.music.stop(); sound_manager.destroy(); }, this);

    this.submit_button;
    this.submit_button_text;
  },

  send_score: function() {
    var player = prompt('Please enter your name', '');
    if(!player) { alert('You gotta enter a name'); return; }

    var body = 'name=' + player + '&score=' + last_score;
    var request = new XMLHttpRequest();
    request.open('POST', game.config.backend_url + '/leaderboard', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function () {
      game.state.start('leaderboard');
    };
    request.onerror = function(){
      console.log(request.responseText);
    }; // failure case
    request.send(body);
  },

  create_submit_score_button: function() {
    this.submit_button = this.add.graphics(0, 0);
    this.submit_button.lineStyle(2, 0x0000FF, 0.5);
    this.submit_button.beginFill(0x527cc5, 1);
    this.submit_button.drawRect(this.world.centerX - 250, this.world.centerY + 110, 500, 150);
    this.submit_button.endFill();

    this.submit_button.inputEnabled = true;
    this.submit_button.events.onInputDown.addOnce(this.send_score, this);
    this.submit_button_text = Utils.create_centered_text('Push to\nsubmit score', 640, 30);
  },

  create_play_again_button: function() {
    var g2 = this.add.graphics(0, 0);
    g2.lineStyle(2, 0x0000FF, 0.5);
    g2.beginFill(0x32a532, 1);
    g2.drawRect(this.world.centerX - 250, this.world.centerY + 300, 500, 120);
    g2.endFill();

    g2.inputEnabled = true;
    g2.events.onInputDown.add(function() { game.state.start('menu'); }, this);
    Utils.create_centered_text('Back to Menu', 810, 30);
  }
};