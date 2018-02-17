class Controls {
    constructor(game) {
        this.game = game;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.boost = false;
        this.fire = false;
        this.sword = false

    }

    up_update()    { this.up    = game.input.keyboard.isDown(Phaser.Keyboard.W); }
    down_update()  { this.down  = game.input.keyboard.isDown(Phaser.Keyboard.S); }
    left_update()  { this.left  = game.input.keyboard.isDown(Phaser.Keyboard.A); }
    right_update() { this.right = game.input.keyboard.isDown(Phaser.Keyboard.D); }
    boost_update() { this.boost = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR); }
    fire_update()  { this.fire  = game.input.activePointer.leftButton.isDown; }
    sword_update() { this.sword = game.input.activePointer.rightButton.isDown; }

    update() {
        this.up_update();
        this.down_update();
        this.left_update();
        this.right_update();
        this.boost_update();
        this.fire_update();
        this.sword_update();

        //console.log("UP: "+ this.up + " DOWN: " + this.down + " LEFT: " + this.left + " RIGHT: " + this.right + " BOOST: " + this.boost);
    }



}