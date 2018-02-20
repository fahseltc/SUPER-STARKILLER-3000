var menu_state = {
    create: function() {
        console.log('menu');
        var game_label = game.add.text(game.width/2, 200, 'Mega\nMecha\nMarxist\nII', {
            font: "35px prstart",
            fill: "#FFFFFF",
            align: "center"
        });
        game_label.anchor.set(0.5);

        var press_button_Label = game.add.text(game.width/2, game.height/2, 'Press Space to begin', {
            font: "35px prstart",
            fill: "#FFFFFF",
            align: "center"
        });
        press_button_Label.anchor.set(0.5);


        var start_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        start_button.onDown.addOnce(this.start, this);
    },

    start: function() {
        console.log('do it');
        game.state.start('play');
    }
}