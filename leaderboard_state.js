var leaderboard_state = {
    create: function() {
        this.get_leaderboard_data();
        Utils.create_centered_text("Leaderboard", 60, 45, "#FFD700");

        Utils.create_text("Name", 440, 140, 40);
        Utils.create_text("Score", 940, 140, 40);

        this.create_menu_button();
        this.create_refresh_button();
    },

    create_menu_button: function() {
        var g = this.add.graphics(0, 0);
        g.lineStyle(2, 0x0000FF, 0.5);
        g.beginFill(0x527cc5, 1);
        g.drawRect(this.world.centerX - 600, this.world.centerY+250, 200, 100);
        g.endFill();

        g.inputEnabled = true;
        g.events.onInputDown.add(function() { game.state.start('menu'); }, this);
        Utils.create_text("Back to\nMenu", 200, this.world.centerY + 300);
    },

    create_refresh_button: function() {
        var g = this.add.graphics(0, 0);
        g.lineStyle(2, 0x0000FF, 0.5);
        g.beginFill(0x527cc5, 1);
        g.drawRect(this.world.centerX - 600, this.world.centerY + 120, 200, 100);
        g.endFill();

        g.inputEnabled = true;
        g.events.onInputDown.add(function() {
            this.get_leaderboard_data();
        }, this);
        Utils.create_text("Refresh\nScores", 200, this.world.centerY + 170);
    },

    get_leaderboard_data: function() {
        var spinner = game.add.sprite(700, 450,'spinner');
        spinner.scale.x = 3;
        spinner.scale.y = 3;
        spinner.anchor.set(0.5);
        spinner.visible = true;
        game.add.tween(spinner).to( { angle: 359 }, 1500, null, true, 0, Infinity);
        var request = new XMLHttpRequest();
        request.open('GET', game.config.backend_url + "/leaderboard", true);

        request.onload = function() {
            if(request.status == 200) {
                spinner.visible = false;
                console.log("Got data");
                var resp = request.responseText;
                console.log(resp);
                leaderboard_data = JSON.parse(resp);
                leaderboard_data.sort(function(a, b) {
                    return b.score - a.score;
                });
                console.log("sorted: " + leaderboard_data);

                if(leaderboard_data.length == 0) {
                    Utils.create_centered_text("No data", 400, 40);
                } else {
                    counter = 0;
                    leaderboard_data.slice(0, 21).forEach(function(element) {
                        Utils.create_text(element.name, game.width/2 - 260, 190 + (30 * counter), 25);
                        Utils.create_text(element.score, game.width/2 + 230, 190 + (30 * counter), 25);
                        counter++;
                    });
                }
            } else {
                console.log("unable to fetch leaderboard");
                spinner.visible = false;
                var x = game.add.sprite(700, 450,'x');
                x.scale.x = 3;
                x.scale.y = 3;
                x.anchor.set(0.5);
                x.visible = true;
            }
        }
        request.send();
    }
};