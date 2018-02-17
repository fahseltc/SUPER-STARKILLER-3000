var game = new Phaser.Game(1200, 900, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.time.advancedTiming = true;
    game.load.image('mecha', 'assets/mecha1.png');
    game.load.image('bullet', 'assets/bullets.png');
    game.load.image('sword', 'assets/sword.png');
    game.load.image('flame', 'assets/flame.png');
    game.load.image('red', 'assets/red.png');
    game.load.image('blue', 'assets/blue.png');
    game.load.image('sword_long', 'assets/sword_long.png');

    //HACK TO PRELOAD A CUSTOM FONT
    game.add.text(0, 0, "hack", {font:"1px prstart", fill:"#FFFFFF"});
}

var controls;
var graphics;
var mecha;
var score;
var enemy_manager;

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
    score = new Score();
    enemy_manager = new EnemyManager();

    game.world.bringToTop(mecha.sprite);
}

function update() {
    game.physics.arcade.overlap(mecha.attack_group, enemy_manager.bad_guys, handle_collision, null, this);

    controls.update();
    enemy_manager.update();
    mecha.update();
    score.update();
}

function render() {
    //game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    mecha.render();
}


function handle_collision(obj, enemy) {
    console.log("hit!");
    if((obj.key == 'bullet') && (enemy.key == 'red')) {
        enemy.kill();
        score.score_buffer += 5;
        enemy_manager.spawn = true;
    }
    if((obj.key == 'sword') && (enemy.key == 'blue')) {
        enemy.kill();
        score.score_buffer += 5;
        enemy_manager.spawn = true;
    }

}

