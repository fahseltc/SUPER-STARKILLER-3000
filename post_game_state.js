var post_game_state = {
    create: function() {
        console.log('menu');
        var game_label = this.create_label('U died', 200);
        this.create_button();
        var game_label = this.create_label('Push the button\nto submit score', 450);
    },

    send_score: function() {
        var player = prompt("Please enter your name", "");
        console.log(player);
        if(!player) { alert("You gotta enter a name"); return; };
        console.log("button pressed");
        var body = "name=" + player + "&score=" + last_score;

        var request = new XMLHttpRequest();
        request.open('POST', 'https://secure-atoll-50869.herokuapp.com/leaderboard', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function () {
            // do something to response
            console.log(this.responseText);
        };
        request.onerror = function(){ alert (request.responseText); } // failure case
        request.send(body);
    },

    create_label: function(text, height) {
        var label = game.add.text(game.width/2, height, text, {
            font: "35px prstart",
            fill: "#FFFFFF",
            align: "center"
        });
        label.anchor.set(0.5);
        return label;
    },

    create_button: function() {
        var g = this.add.graphics(0, 0);
        g.lineStyle(2, 0x0000FF, 0.5);
        g.beginFill(0x527cc5, 1);
        g.drawRect(this.world.centerX - 150, this.world.centerY-100, 300, 200);
        g.endFill();

        g.inputEnabled = true;
        g.events.onInputDown.add(this.send_score, this);
    }
}