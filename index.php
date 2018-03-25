<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" type = "text/css" href ="assets/css/font_loader.css">
    <script src="assets/js/phaser.min.js"></script>
    <script src="assets/js/phaser-particle-editor-plugin.js"></script>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <title>SUPER STARKILLER 3000</title>
  </head>
  <body bgcolor="#000000">
    <script type="text/javascript">
      // the grossest, 'never used php before' hack to get heroku environment variables in a client-side js game.
      var div = document.createElement('div');
      div.id = 'environment';
      div.hidden = true;
      div.appendChild(document.createTextNode("<?php echo getenv('environment')?>"));
      document.body.appendChild(div);
    </script>

    <!-- Player -->
    <script type="text/javascript" src="player/player_ship.js"></script>
    <script type="text/javascript" src="player/circle_weapon.js"></script>
    <script type="text/javascript" src="player/bullet_weapon.js"></script>
    <script type="text/javascript" src="player/player_ship_flame.js"></script>

    <!-- UI -->
    <script type="text/javascript" src="ui/timer_display.js"></script>
    <script type="text/javascript" src="ui/root_ui.js"></script>
    <script type="text/javascript" src="ui/health_bar.js"></script>
    <script type="text/javascript" src="ui/score.js"></script>
    <script type="text/javascript" src="ui/level_display.js"></script>
    <script type="text/javascript" src="ui/remaining_enemies_bar.js"></script>
    <script type="text/javascript" src="ui/bullet_weapon_display.js"></script>
    <script type="text/javascript" src="ui/shield_weapon_display.js"></script>

    <script type="text/javascript" src="utils.js"></script>
    <script type="text/javascript" src="controls.js"></script>
    <script type="text/javascript" src="level.js"></script>
    <script type="text/javascript" src="tutorial_level.js"></script>
    <script type="text/javascript" src="boss_level.js"></script>
    <script type="text/javascript" src="boss_enemy.js"></script>
    <script type="text/javascript" src="boss_turret.js"></script>
    <script type="text/javascript" src="boss_reactionary_turret.js"></script>
    <script type="text/javascript" src="boss_shield.js"></script>
    <script type="text/javascript" src="level_manager.js"></script>
    <script type="text/javascript" src="powerup.js"></script>
    <script type="text/javascript" src="powerup_manager.js"></script>
    <script type="text/javascript" src="shooting_enemy.js"></script>
    <script type="text/javascript" src="spike_enemy.js"></script>
    <script type="text/javascript" src="tutorial_enemy.js"></script>
    <script type="text/javascript" src="enemy_manager.js"></script>


    <!-- Game States -->
    <script type="text/javascript" src="states/menu_state.js"></script>
    <script type="text/javascript" src="states/travel_state.js"></script>
    <script type="text/javascript" src="states/play_state.js"></script>
    <script type="text/javascript" src="states/load_state.js"></script>
    <script type="text/javascript" src="states/boot_state.js"></script>
    <script type="text/javascript" src="states/ready_state.js"></script>
    <script type="text/javascript" src="states/post_game_state.js"></script>
    <script type="text/javascript" src="states/leaderboard_state.js"></script>
    <script type="text/javascript" src="states/story_state.js"></script>
    <script type="text/javascript" src="states/boss_dead_state.js"></script>
    <script type="text/javascript" src="states/debug_state.js"></script>
    <script type="text/javascript" src="states/splash_state.js"></script>
    <script type="text/javascript" src="states/credits_state.js"></script>
    <script type="text/javascript" src="states/tutorial_state.js"></script>

    <!-- Main entry point to game  -->
    <script type="text/javascript" src="main.js"></script>

    <div id="game" style="margin:0 auto;"></div>
  </body>
</html>