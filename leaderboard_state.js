var leaderboard_state = {

    preload: function() {
        console.log("preload in leaderboard");
        //get_leaderboard_data();
    },

    create: function() {
        this.get_leaderboard_data();
        this.create_label("Leaderboard", 40, 40);
        this.create_label("Name        Score", 140, 40);
        this.create_menu_button();
    },

    create_menu_button: function() {
        var g = this.add.graphics(0, 0);
        g.lineStyle(2, 0x0000FF, 0.5);
        g.beginFill(0x527cc5, 1);
        g.drawRect(this.world.centerX - 600, this.world.centerY+250, 200, 100);
        g.endFill();

        g.inputEnabled = true;
        g.events.onInputDown.add(function() { game.state.start('menu'); }, this);
        this.create_label("u wanna\n go agin?", this.world.centerY+300, 20,200);
    },

    create_label: function(text, y, px=20, x=game.width/2) {
        var label = game.add.text(x, y, text, {
            font: px + "px prstart",
            fill: "#FFFFFF",
            align: "center"
        });
        label.anchor.set(0.5);
        return label;
    },

    get_leaderboard_data: function() {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://secure-atoll-50869.herokuapp.com/leaderboard', true);

        request.onload = function() {
            if(request.status == 200) {
                console.log("Got data");
                var resp = request.responseText;
                console.log(resp);
                leaderboard_data = JSON.parse(resp);
                leaderboard_data.sort(function(a, b) {
                    return b.score - a.score;
                });
                console.log("sorted: " + leaderboard_data);

                counter = 0;
                leaderboard_data.slice(0, 21).forEach(function(element) {
                    var label1 = game.add.text(game.width/2 - 260, 190 + (30 * counter), element.username, {
                        font: "25px prstart",
                        fill: "#FFFFFF",
                        align: "center"
                    });
                    label1.anchor.set(0.5);

                    var label2 = game.add.text(game.width/2 + 230, 190 + (30 * counter), element.score, {
                        font: "25px prstart",
                        fill: "#FFFFFF",
                        align: "center"
                    });
                    label2.anchor.set(0.5);
                    counter++;
                });
            } else {
                // things went wrong
                console.log("unable to fetch leaderboard");
            }
        }
        request.send();
    }
};