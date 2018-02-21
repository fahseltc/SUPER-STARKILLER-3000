var menu_state = {
    create: function() {
        console.log('menu');
        var game_label = game.add.text(game.width/2, 300, 'Mega\nMecha\nMarxist\nII', {
            font: "100px prstart",
            fill: "#FF0000",
            align: "center"
        });
        game_label.anchor.set(0.5);

        var press_button_label = game.add.text(game.width/2, game.height/2 + 400, 'Press Space to begin', {
            font: "35px prstart",
            fill: "#FFFFFF",
            align: "center"
        });
        press_button_label.anchor.set(0.5);

        var now_with_label = game.add.text(game.width/2 + 400, game.height/2 + 100, 'Now with a leaderboard!', {
            font: "20px prstart",
            fill: "#FFD700",
            align: "center"
        });
        now_with_label.anchor.set(0.5);
        now_with_label.angle = -2;
        //game.add.tween(now_with_label).to( { rotation: -0.1 }, 1500, Phaser.Easing.Quadratic.InOut, true).repeat(-1);

        game.add.tween(now_with_label).to({ angle: 2 }, 5000, function(k) {
           return Math.sin(Math.PI * 2 * k);
         }, true, 0, -1);


        var start_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        start_button.onDown.addOnce(this.start, this);

        var leaderboard_button = game.input.keyboard.addKey(Phaser.Keyboard.L);
        leaderboard_button.onDown.addOnce(function(){ game.state.start('leaderboard') }, this);
    },

    start: function() {
        console.log('do it');
        game.state.start('play');
    }
}