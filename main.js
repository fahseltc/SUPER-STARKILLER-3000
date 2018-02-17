
var game = new Phaser.Game(1200, 900, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });



function preload() {
    game.time.advancedTiming = true;
    game.load.image('mecha', 'assets/mecha1.png');
    game.load.image('bullet', 'assets/bullets.png');
    game.load.image('sword', 'assets/sword.png');
    game.load.image('flame', 'assets/flame.png');
    game.load.image('red', 'assets/red.png');
    game.load.image('blue', 'assets/blue.png');
}


var controls;
var graphics;
var mecha;

var bad_guys;

var spawn = true;

function create() {
    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.stage.backgroundColor = '#0072bc';
    game.stage.backgroundColor = '#d3d3d3';
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    game.input.mouse.capture = true;

    controls = new Controls(game);
    graphics = game.add.graphics(0, 0);
    mecha = new Mecha(400, 300);

    build_bad_guys();


    game.world.bringToTop(mecha.sprite);
}

function update() {
    if(spawn) {
        spawn = false;
        spawn_bad_guy();
    }

    game.physics.arcade.overlap(mecha.attack_group, bad_guys, handle_collision, null, this);

    controls.update();
    mecha.update();
}

function render() {
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    mecha.render();
}

function build_bad_guys() {
    bad_guys = game.add.group();
    bad_guys.createMultiple(5, 'red');
    bad_guys.createMultiple(5, 'blue');
    bad_guys.setAll('anchor.x', 0.5);
    bad_guys.setAll('anchor.y', 0.5);
    bad_guys.setAll('immovable', true);
    bad_guys.setAll('exists', false);
    game.physics.enable(bad_guys, Phaser.Physics.ARCADE);
}

function spawn_bad_guy() {

    var bad_guy = bad_guys.getRandom();
    if(bad_guy) {
        var temp_x = game.world.randomX;
        while(temp_x < 50 || temp_x > (game.world.width - 50)) {
            temp_x = game.world.randomX;
        }
        var temp_y = game.world.randomY;
        while(temp_y < 50 || temp_y > (game.world.height - 50)) {
            temp_y = game.world.randomY;
        }
        bad_guy.reset(temp_x, temp_y);
        bad_guy.revive();
    }
}

function handle_collision(obj, enemy) {
    console.log("hit!");
    if((obj.key == 'bullet') && (enemy.key == 'red')) {
        enemy.kill();
        spawn = true;
    }
    if((obj.key == 'sword') && (enemy.key == 'blue')) {
        enemy.kill();
        spawn = true;
    }

}

