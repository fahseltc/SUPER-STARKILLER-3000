var leaderboard_state = {

    preload: function() {
        console.log("preload in leaderboard");
        var request = new XMLHttpRequest();
        request.open('GET', 'https://secure-atoll-50869.herokuapp.com/leaderboard', true);

        request.onload = function() {
            if(request.status == 200) {
                console.log("Got data");
                var resp = request.responseText;
                console.log(resp);
                leaderboard_data = JSON.parse(resp);
                counter = 0;
                leaderboard_data.forEach(function(element) {
                    var label = game.add.text(game.width/2, 150 + (20 * counter), element.username + "                " + element.score, {
                        font: "20px prstart",
                        fill: "#FFFFFF",
                        align: "center"
                    });
                    label.anchor.set(0.5);
                    counter++;
                });
            } else {
                // things went wrong
                console.log("unable to fetch leaderboard");
            }
        }
        request.send();

        this.create_label("Leaderboard", 40);
        this.create_label("Name                   Score", 100);
    },

    create: function() {
        // if(!leaderboard_data) {
        //     this.poll();
        // }
    },

    create_label: function(text, height) {
        var label = game.add.text(game.width/2, height, text, {
            font: "20px prstart",
            fill: "#FFFFFF",
            align: "center"
        });
        label.anchor.set(0.5);
        return label;
    },

};