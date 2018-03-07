<!doctype html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <link rel="stylesheet" type = "text/css" href ="assets/css/font_loader.css">
    <script src="assets/js/phaser.min.js"></script>
    <script src="assets/js/phaser-particle-editor-plugin.js"></script>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <title>Mega Mecha Marxist II</title>
  </head>
  <body>
    <script type="text/javascript">
      // the grossest, 'never used php before' hack to get heroku environment variables in a client-side js game.
      var div = document.createElement('div');
      div.id = 'environment';
      div.hidden = true;
      div.appendChild(document.createTextNode("<?php echo getenv('environment')?>"));
      document.body.appendChild(div);
    </script>

    <script type="text/javascript" src="controls.js"></script>
    <script type="text/javascript" src="utils.js"></script>
    <script type="text/javascript" src="level.js"></script>

    <script type="text/javascript" src="ui/timer_display.js"></script>
    <script type="text/javascript" src="ui/health_bar.js"></script>
    <script type="text/javascript" src="ui/score.js"></script>
    <script type="text/javascript" src="ui/level_display.js"></script>
    <script type="text/javascript" src="ui/remaining_enemies_bar.js"></script>

    <script type="text/javascript" src="level_manager.js"></script>
    <script type="text/javascript" src="powerup.js"></script>
    <script type="text/javascript" src="powerup_manager.js"></script>
    <script type="text/javascript" src="shooting_enemy.js"></script>
    <script type="text/javascript" src="enemy_manager.js"></script>
    <script type="text/javascript" src="mecha_flame.js"></script>
    <script type="text/javascript" src="mecha.js"></script>
    <script type="text/javascript" src="circle_weapon.js"></script>
    <script type="text/javascript" src="bullet_weapon.js"></script>
    <script type="text/javascript" src="states/menu_state.js"></script>
    <script type="text/javascript" src="states/travel_state.js"></script>
    <script type="text/javascript" src="states/play_state.js"></script>
    <script type="text/javascript" src="states/load_state.js"></script>
    <script type="text/javascript" src="states/boot_state.js"></script>
    <script type="text/javascript" src="states/ready_state.js"></script>
    <script type="text/javascript" src="states/post_game_state.js"></script>
    <script type="text/javascript" src="states/leaderboard_state.js"></script>
    <script type="text/javascript" src="main.js"></script>
    <div id="game" style="margin:0 auto;"></div>
  </body>
</html>