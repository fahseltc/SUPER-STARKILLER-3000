const TUTORAL_FADE_TIME = 1000;

class TutorialLevel {
  constructor(level_index) {
    this.level_index = level_index;

    this.controls = new Controls(game);
    this.player = new PlayerShip(
      game.width / 2,
      game.height / 2,
      this.controls
    );
    game.world.bringToTop(this.player.sprite);

    this.bg_sprite = game.add.tileSprite(0, 0, 1400, 700, "game_background");

    this.bg_sprite.sendToBack();

    this.UI = new RootUI(
      this.player,
      undefined,
      "TUT" // level number
    );

    //this.enemy_manager = new EnemyManager(game, this.player, this.level_data, this.UI);
    //this.powerup_manager = new PowerupManager(this.player);

    this.enemies = [];
    //this.all_sprites.add(this.bg_sprite);
    this.tutorial_1();
  }

  // show player how to spacebar
  tutorial_1() {
    this.space_group = game.add.group();
    this.space_bar = game.add.sprite(700, 200, "space_bar");
    this.space_bar.anchor.set(0.5, 0.5);

    this.space_text = Utils.create_text("HOLD\n\n\nPOSITION", 700, 205, 18);
    this.space_group.add(this.space_bar);
    this.space_group.add(this.space_text);
    var start_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    start_button.onDown.addOnce(function() {
      console.log("space once");
      game.add
        .tween(this.space_group)
        .to({ alpha: 0 }, TUTORAL_FADE_TIME, Phaser.Easing.None, true);
      this.tutorial_2();
    }, this);
    //this.all_sprites.add(this.space_group);
  }

  // show player how to shoot a bullet left click
  tutorial_2() {
    this.red_group = game.add.group();
    this.red_bullet = game.add.sprite(
      1050,
      350,
      "player_bullet_sprite_sheet",
      0
    );
    this.red_bullet.animations.add("blinky", [0, 1, 2, 3], 10, true);
    this.red_bullet.animations.play("blinky");
    this.red_bullet.anchor.set(0.5, 0.5);
    this.red_group.add(this.red_bullet);

    this.blue_mouse_icon = game.add.sprite(1050, 400, "left_click");
    this.blue_mouse_icon.scale.set(0.5, 0.5);
    this.blue_mouse_icon.anchor.set(0.5, 0.5);
    this.red_group.add(this.blue_mouse_icon);

    game.input.mousePointer.leftButton.onDown.addOnce(function() {
      console.log("lcikc once");
      game.add
        .tween(this.red_group)
        .to({ alpha: 0 }, TUTORAL_FADE_TIME, Phaser.Easing.None, true);
      this.tutorial_3();
    }, this);
    //this.all_sprites.add(this.red_group);
  }

  // show player how to shoot shield right click
  tutorial_3() {
    this.blue_group = game.add.group();
    this.blue_circle = game.add.sprite(
      350,
      350,
      "circle_weapon_sheet",
      0
    );
    this.blue_circle.animations.add("lightning", [0, 1, 2, 3, 4], 10, true);
    this.blue_circle.animations.play("lightning");
    this.blue_circle.anchor.set(0.5, 0.5);
    this.blue_circle.scale.set(0.5, 0.5);
    this.blue_group.add(this.blue_circle);

    this.blue_mouse_icon = game.add.sprite(350, 350, "right_click");
    this.blue_mouse_icon.scale.set(0.5, 0.5);
    this.blue_mouse_icon.anchor.set(0.5, 0.5);
    this.blue_group.add(this.blue_mouse_icon);

    game.input.mousePointer.rightButton.onDown.addOnce(function() {
      console.log("click 2nd time once");
      game.add
        .tween(this.blue_group)
        .to({ alpha: 0 }, TUTORAL_FADE_TIME, Phaser.Easing.None, true);
      this.tutorial_4();
    }, this);
    //this.all_sprites.add(this.blue_group);
  }

  // spawn one of each enemy
  tutorial_4() {
    console.log("tut 4");
    this.red_enemy = new TutorialEnemy(this.player, 'blue', this.UI);
    this.red_enemy.sprite.reset(200, 200);
    this.enemies.push(this.red_enemy);

    this.blue_enemy = new TutorialEnemy(this.player, 'red', this.UI);
    this.blue_enemy.sprite.reset(1200, 200);
    this.enemies.push(this.blue_enemy);
  }

  // tutorial_3() {
  //   this.red_group = game.add.group();
  //   this.red_enemy = game.add.sprite(1250, 150, 'turret_base_red');
  //   this.red_enemy.anchor.set(0.5, 0.5);
  //   this.red_group.add(this.red_enemy);

  //   this.blue_mouse_icon = game.add.sprite(1250, 200, 'left_click');
  //   this.blue_mouse_icon.scale.set(0.5, 0.5);
  //   this.blue_mouse_icon.anchor.set(0.5, 0.5);
  //   this.red_group.add(this.blue_mouse_icon);
  // }

  update() {
    this.controls.update();
    this.player.update();

    this.UI.update();

    this.enemies.forEach(function(enemy) { enemy.update(); }, this)
  }

  render() {

  }

  destroy() {
    this.all_sprites.destroy();
    this.UI.destroy();
    this.player.destroy();
  }
}