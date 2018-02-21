var play_state = {

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.stage.backgroundColor = '#0072bc';
        game.stage.backgroundColor = '#d3d3d3';
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
        game.input.mouse.capture = true;

        this.controls = new Controls(game);
        this.graphics = game.add.graphics(0, 0);
        this.mecha = new Mecha(400, 300, this.controls);
        this.score = new Score();
        this.enemy_manager = new EnemyManager(game, this.mecha);
        this.timer = new GameTimer(this.score);
        this.timer.start();
        game.world.bringToTop(this.mecha.sprite);
    },

    update: function() {
        game.physics.arcade.overlap(this.mecha.new_sword, this.enemy_manager.bad_guys, this.handle_collision, null, this);
        game.physics.arcade.overlap(this.mecha.bullets, this.enemy_manager.bad_guys, this.handle_collision, null, this);

        this.controls.update();
        this.enemy_manager.update();
        this.mecha.update();
        this.score.update();
    },

    render: function() {
        this.timer.render();
        this.mecha.render();
    },

    handle_collision: function (obj, enemy) {
         this.game.debug.body(obj);
         this.game.debug.body(enemy);

        console.log("hit!");
        if((obj.key == 'bullet') && (enemy.key == 'red')) {
            enemy.kill();
            this.score.score_buffer += 5;
            this.enemy_manager.spawn = true;
        }
        if((obj.key == 'sword_long') && (enemy.key == 'blue')) {
            enemy.kill();
            this.score.score_buffer += 5;
            this.enemy_manager.spawn = true;
        }

    }
}






