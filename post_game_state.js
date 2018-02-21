var post_game_state = {
    create: function() {
        game.stage.backgroundColor = '#000000';
        console.log('menu');
        var game_label = this.create_label('U died', 200, 100);
        var game_label2 = this.create_label('but u scored ' + last_score + " points. gj", 350);
        this.create_submit_score_button();
        this.create_play_again_button();

    },

    send_score: function() {
        var player = prompt("Please enter your name", "");
        console.log(player);
        if(!player) { alert("You gotta enter a name"); return; };


        var body = "name=" + player + "&score=" + last_score;
        var request = new XMLHttpRequest();
        request.open('POST', 'https://secure-atoll-50869.herokuapp.com/leaderboard', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function () {
            console.log(this.responseText);
            game.state.start('leaderboard');
        };
        request.onerror = function(){ alert (request.responseText); } // failure case
        request.send(body);
    },

    create_label: function(text, height, px = 35) {
        var label = game.add.text(game.width/2, height, text, {
            font: px + "px prstart",
            fill: "#FFFFFF",
            align: "center"
        });
        label.anchor.set(0.5);
        return label;
    },

    create_submit_score_button: function() {
        var g = this.add.graphics(0, 0);
        g.lineStyle(2, 0x0000FF, 0.5);
        g.beginFill(0x527cc5, 1);
        g.drawRect(this.world.centerX - 400, this.world.centerY + 80, 800, 200);
        g.endFill();

        g.inputEnabled = true;
        g.events.onInputDown.add(this.send_score, this);
        this.create_label('Push the button\nto submit score', 650);
    },

    create_play_again_button: function() {
        var g2 = this.add.graphics(0, 0);
        g2.lineStyle(2, 0x0000FF, 0.5);
        g2.beginFill(0x32a532, 1);
        g2.drawRect(this.world.centerX - 400, this.world.centerY + 320, 800, 120);
        g2.endFill();

        g2.inputEnabled = true;
        g2.events.onInputDown.add(function() { game.state.start('menu') }, this);
        this.create_label('or just\nplay again', 830);
    }
}