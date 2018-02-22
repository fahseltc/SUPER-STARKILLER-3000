
var env = document.getElementById("environment").innerText;
console.log("inside JS, env: " + env);

var conf = {
    width: 1400,
    height: 900,
    renderer: Phaser.CANVAS,
    parent: 'game',
    transparent: false,
    antialias: false,
    scaleMode: Phaser.ScaleManager.NO_SCALE,

    // add more config here and use as global config.

    environment:
    leaderboard_url: {
        staging: "https://mecha-leaderboard.herokuapp.com/leaderboard",
        production: ""
    }
};

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
