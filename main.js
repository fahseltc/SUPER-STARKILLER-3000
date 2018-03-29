var conf = {
  width: 1400,
  height: 900,
  renderer: Phaser.CANVAS,
  parent: "game",
  transparent: false,
  antialias: false,
  scaleMode: Phaser.ScaleManager.NO_SCALE //RESIZE//SHOW_ALL //NO_SCALE
};

var temp_env = document.getElementById("environment").innerText;
if (temp_env == "<?php echo getenv('environment')?>") {
  temp_env = "dev";
}
conf.env = temp_env;

console.log("inside JS, env: " + conf.env);

switch (conf.env) {
  case "production":
    conf.backend_url = "https://mecha-leaderboard.herokuapp.com";
    break;
  case "staging":
    conf.backend_url = "https://mecha-leaderboard-staging.herokuapp.com";
    break;
  case "dev":
  default:
    conf.backend_url = "";
}

// estup google analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
if (conf.env == "staging") {
  gtag("config", "UA-116549101-1");
} else if (conf.env == "production") {
  gtag("config", "UA-116549101-2");
}

var game = new Phaser.Game(conf);
var sound_manager = new Phaser.SoundManager(game);
sound_manager.boot();
sound_manager.muteOnPause = false;

var last_score = 0;

var GLOBAL_MUSIC_VOLUME = Utils.get_cookie("GLOBAL_MUSIC_VOLUME") || 0.25;
var GLOBAL_SFX_VOLUME = Utils.get_cookie("GLOBAL_SFX_VOLUME") || 0.5;
var CURRENT_LEVEL_INDEX = 0;
var CURRENT_STORY_INDEX = 0;
var DEBUG_MODE = false;
var leaderboard_data;

game.state.add("menu", menu_state);
game.state.add("play", play_state);
game.state.add("boot", boot_state);
game.state.add("load", load_state);
game.state.add("post", post_game_state);
game.state.add("leaderboard", leaderboard_state);
game.state.add("ready", ready_state);
game.state.add("travel", travel_state);
game.state.add("story", story_state);
game.state.add("boss_dead", boss_dead_state);
game.state.add("debug", debug_state);
game.state.add("splash", splash_state);
game.state.add("credits", credits_state);
game.state.add("tutorial", tutorial_state);

game.state.start("boot");