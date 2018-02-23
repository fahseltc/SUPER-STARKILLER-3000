var conf = {
  width: 1400,
  height: 900,
  renderer: Phaser.CANVAS,
  parent: 'game',
  transparent: false,
  antialias: false,
  scaleMode: Phaser.ScaleManager.NO_SCALE
};

var temp_env = document.getElementById("environment").innerText;
if (temp_env == "<?php echo getenv('environment')?>") { temp_env = 'dev' }
conf.env = temp_env

console.log("inside JS, env: " + conf.env);

switch(conf.env) {
  case 'production':
    conf.backend_url = 'https://mecha-leaderboard.herokuapp.com';
  break;
  case 'staging':
    conf.backend_url = 'https://mecha-leaderboard-staging.herokuapp.com';
  break;
  case 'dev':
  default:
    conf.backend_url = 'https://mecha-leaderboard-staging.herokuapp.com';
}

var game = new Phaser.Game(conf);
var last_score = 0;
var leaderboard_data;

game.state.add('menu', menu_state);
game.state.add('play', play_state);
game.state.add('boot', boot_state);
game.state.add('load', load_state);
game.state.add('post', post_game_state);
game.state.add('leaderboard', leaderboard_state);

game.state.start('boot');
