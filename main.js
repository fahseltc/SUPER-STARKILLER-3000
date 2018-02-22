
var env = document.getElementById("environment").innerText || 'dev';
console.log("inside JS, env: " + env);

var backend_url;
switch(env) {
    case 'production':
        backend_url = 'https://mecha-leaderboard.herokuapp.com';
    break;
    case 'staging':
        backend_url = 'https://mecha-leaderboard-staging.herokuapp.com';
    break;
    case 'dev':
    default:
        backend_url = 'https://mecha-leaderboard-staging.herokuapp.com';
}

var conf = {
    width: 1400,
    height: 900,
    renderer: Phaser.CANVAS,
    parent: 'game',
    transparent: false,
    antialias: false,
    scaleMode: Phaser.ScaleManager.NO_SCALE,
    env: env,
    backend_url: backend_url

    // add more config here and use as global config.
};



var game = new Phaser.Game(conf);
console.log("game.config.env " + game.config.env);
console.log("game.config.url " + game.config.backend_url);
var last_score = 0;
var leaderboard_data;

game.state.add('menu', menu_state);
game.state.add('play', play_state);
game.state.add('boot', boot_state);
game.state.add('load', load_state);
game.state.add('post', post_game_state);
game.state.add('leaderboard', leaderboard_state);

game.state.start('boot');
