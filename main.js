var conf = {
  width: 1400,
  height: 900,
  renderer: Phaser.AUTO,
  parent: "game",
  transparent: false,
  antialias: false,
  scaleMode: Phaser.ScaleManager.NO_SCALE, //RESIZE //SHOW_ALL //NO_SCALE
  scoreboard_get_url: "https://dreamlo.com/lb/67c71f928f40be02406e3b44/",
  scoreboard_submit_url: "https://dreamlo.com/lb/SrdVQ4-A50qcqEwLLAsVYQEdDLF3PJxEq6r3ZfRMppHg/"
};

var game = new Phaser.Game(conf);
var sound_manager = new Phaser.SoundManager(game);
sound_manager.boot();
sound_manager.muteOnPause = false;

var GLOBAL_SCORE = 0;

var GLOBAL_MUSIC_VOLUME = Utils.get_cookie("GLOBAL_MUSIC_VOLUME") || 0.25;
var GLOBAL_SFX_VOLUME = Utils.get_cookie("GLOBAL_SFX_VOLUME") || 0.5;
var CURRENT_LEVEL_INDEX = 0;
var CURRENT_STORY_INDEX = 0;
var leaderboard_data;

game.state.add("menu", menu_state);
game.state.add("play", play_state);
game.state.add("boot", boot_state);
game.state.add("load", load_state);
game.state.add("game_over", game_over_state);
game.state.add("leaderboard", leaderboard_state);
game.state.add("ready", ready_state);
game.state.add("travel", travel_state);
game.state.add("story", story_state);
game.state.add("boss_dead", boss_dead_state);
game.state.add("debug", debug_state);
game.state.add("splash", splash_state);
game.state.add("credits", credits_state);
game.state.add("tutorial", tutorial_state);
game.state.add("game_end", game_end_state);
game.state.add("ending_1", ending_state_1);
game.state.add("ending_2", ending_state_2);
game.state.add("ending_3", ending_state_3);

game.state.start("boot");