<!doctype html>
<html lang="en">
  <head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-116549101-1"></script>
    <link rel="stylesheet" type = "text/css" href ="assets/css/font_loader.css">
    <script src="assets/js/phaser.min.js"></script>
    <script src="assets/js/phaser-particle-editor-plugin.js"></script>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <title>SUPER STARKILLER 3000</title>
    <link rel="shortcut icon" type="image/ico" href="favicon.ico" />
    <link rel="icon" type="image/ico" href="favicon.ico" />
  </head>
  <body bgcolor="#FFFFFF">
    <script type="text/javascript">
      // the grossest, 'never used php before' hack to get heroku environment variables in a client-side js game.
      var div = document.createElement('div');
      div.id = 'environment';
      div.hidden = true;
      div.appendChild(document.createTextNode("<?php echo getenv('environment')?>"));
      document.body.appendChild(div);

      document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
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
    <script type="text/javascript" src="ui/hold_position_display.js"></script>
    <script type="text/javascript" src="ui/pause_menu.js"></script>
    <script type="text/javascript" src="ui/slider.js"></script>
    <script type="text/javascript" src="ui/progress_meter.js"></script>

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
    <script type="text/javascript" src="states/game_over_state.js"></script>
    <script type="text/javascript" src="states/leaderboard_state.js"></script>
    <script type="text/javascript" src="states/story_state.js"></script>
    <script type="text/javascript" src="states/boss_dead_state.js"></script>
    <script type="text/javascript" src="states/debug_state.js"></script>
    <script type="text/javascript" src="states/splash_state.js"></script>
    <script type="text/javascript" src="states/credits_state.js"></script>
    <script type="text/javascript" src="states/tutorial_state.js"></script>
    <script type="text/javascript" src="states/game_end_state.js"></script>
    <script type="text/javascript" src="states/ending_state_1.js"></script>
    <script type="text/javascript" src="states/ending_state_2.js"></script>
    <script type="text/javascript" src="states/ending_state_3.js"></script>

    <!-- Main entry point to game  -->
    <script type="text/javascript" src="main.js"></script>

    <div id="game" style="margin:0 auto;"></div>
    <div style="padding: 25px 25px 0px 0px; display: inline-block;">
      <a href='https://ko-fi.com/V7V4BDH7' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi1.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
      <a class="github-button" href="https://github.com/fahseltc/SUPER-STARKILLER-3000" data-size="large" aria-label="Follow @fahseltc on GitHub">GitHub</a>
    </div>

    <!-- Guthub button tag. must be last. -->
    <script async defer src="https://buttons.github.io/buttons.js"></script>
  </body>
</html>