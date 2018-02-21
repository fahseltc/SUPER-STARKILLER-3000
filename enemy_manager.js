class EnemyManager {
    constructor(game, mecha) {
        this.game = game;
        this.mecha = mecha;
        this.bad_guys = game.add.group();

        this.spawn = true;
        this.bad_guys.createMultiple(15, 'red');
        this.bad_guys.createMultiple(15, 'blue');
        this.bad_guys.setAll('anchor.x', 0.5);
        this.bad_guys.setAll('anchor.y', 0.5);
        this.bad_guys.setAll('immovable', true);
        this.bad_guys.setAll('exists', false);
        game.physics.enable(this.bad_guys, Phaser.Physics.ARCADE);
    }

    update() {
        if(this.spawn) {
            this.spawn_bad_guy();
            this.spawn = false;
        }
        this.bad_guys.forEach(this.debug_render, this, true)
    }

    debug_render(sprite) {
        this.game.debug.body(sprite);
    }

    spawn_bad_guy() {
        var bad_guy = this.bad_guys.getRandom();
        if(bad_guy) {
            var temp_x = this.get_random_x();
            var temp_y = this.get_random_y();
            var distance_to_player = Phaser.Math.distance(temp_x, temp_y, this.mecha.sprite.x, this.mecha.sprite.y);

            while(distance_to_player < 150) {
                temp_x = this.get_random_x();
                temp_y = this.get_random_y();
                distance_to_player = Phaser.Math.distance(temp_x, temp_y, this.mecha.sprite.x, this.mecha.sprite.y);
            }

            bad_guy.reset(temp_x, temp_y);
            bad_guy.revive();
        }
    }


    get_random_x() {
        var temp_x = game.world.randomX;
        while(temp_x < 50 || temp_x > (game.world.width - 50)) {
            temp_x = game.world.randomX;
        }
        return temp_x;
    }

    get_random_y() {
        var temp_y = game.world.randomY;
        while(temp_y < 50 || temp_y > (game.world.height - 50)) {
            temp_y = game.world.randomY;
        }
        return temp_y;
    }
}
