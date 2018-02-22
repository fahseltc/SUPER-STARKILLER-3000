


<!doctype html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <link rel="stylesheet" type = "text/css" href = "font_loader.css">
        <script src="phaser.min.js"></script>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
        <title>Mega Mecha Marxist II</title>
    </head>
    <body>
        <script type="text/javascript">
            // the grossest, never used php before hack to get heroku environment variables in a client-side js game.
            console.log("environment: " + <?php echo getenv('environment'); ?> ;
            var div = document.createElement('div');
            div.id = 'environment';
            div.value = <?php echo getenv('environment'); ?>;
            document.body.appendChild(div);
        </script>

        <script type="text/javascript" src="controls.js"></script>
        <script type="text/javascript" src="game_timer.js"></script>
        <script type="text/javascript" src="score.js"></script>
        <script type="text/javascript" src="enemy_manager.js"></script>
        <script type="text/javascript" src="mecha.js"></script>
        <script type="text/javascript" src="circle_weapon.js"></script>
        <script type="text/javascript" src="menu_state.js"></script>
        <script type="text/javascript" src="play_state.js"></script>
        <script type="text/javascript" src="load_state.js"></script>
        <script type="text/javascript" src="boot_state.js"></script>
        <script type="text/javascript" src="post_game_state.js"></script>
        <script type="text/javascript" src="leaderboard_state.js"></script>
        <script type="text/javascript" src="main.js"></script>
        <div id="game" style="margin:0 auto;"></div>
    </body>
</html>