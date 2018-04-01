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

    this.enemies = [];
    this.spikes = [];

    this.music = sound_manager.play("song_1", GLOBAL_MUSIC_VOLUME, true);
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
      game.add
        .tween(this.space_group)
        .to({ alpha: 0 }, TUTORAL_FADE_TIME, Phaser.Easing.None, true);
      this.tutorial_2();
    }, this);
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
      game.add
        .tween(this.red_group)
        .to({ alpha: 0 }, TUTORAL_FADE_TIME, Phaser.Easing.None, true);
      this.tutorial_3();
    }, this);
  }

  // show player how to shoot shield right click
  tutorial_3() {
    this.blue_group = game.add.group();
    this.blue_circle = game.add.sprite(350, 350, "circle_weapon_sheet", 0);
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
      game.add
        .tween(this.blue_group)
        .to({ alpha: 0 }, TUTORAL_FADE_TIME, Phaser.Easing.None, true);
      this.tutorial_4();
    }, this);
  }

  // spawn one of each enemy
  tutorial_4() {
    this.red_enemy = new TutorialEnemy(this.player, "red", this.UI);
    this.red_enemy.sprite.reset(200, 200);
    this.enemies.push(this.red_enemy);

    this.blue_enemy = new TutorialEnemy(this.player, "blue", this.UI);
    this.blue_enemy.sprite.reset(1200, 200);
    this.enemies.push(this.blue_enemy);

    this.red_enemy.sprite.events.onKilled.addOnce(function() {
      if (!this.blue_enemy.sprite.alive) {
        this.tutorial_5();
      }
    }, this);

    this.blue_enemy.sprite.events.onKilled.addOnce(function() {
      if (!this.red_enemy.sprite.alive) {
        this.tutorial_5();
      }
    }, this);
  }

  // spawn a powerup
  tutorial_5() {
    this.powerup = new Powerup(this.player, 400, 400);
    this.powerup.sprite.events.onKilled.addOnce(function() {
      this.tutorial_6();
    }, this);
  }

  // spawn spikes to show that shield absorbs a hit
  tutorial_6() {
    for (var i = 0; i < 10; i++) {
      var spike = new SpikeEnemy(100, 100 * i, { X: 300, Y: 0 });
      this.spikes.push(spike);
    }
  }

  tutorial_7() {
    var text = Utils.create_centered_text("TUTORIAL\nCOMPLETED", 150, 50);
    this.tutorial_end = game.time.events.add(
      1500,
      function() {
        this.music.fadeOut(2000);
        game.camera.fade(0x000000, 2000, true);
        game.camera.onFadeComplete.addOnce(function() {
          this.music.stop();
          game.state.start("menu");
        }, this);
      },
      this
    );
  }

  update() {
    this.controls.update();
    this.player.update();

    this.UI.update();

    if (this.powerup != undefined) {
      this.powerup.update();
    }

    this.enemies.forEach(function(enemy) {
      enemy.update();

      if (enemy.sprite_name == "red") {
        game.physics.arcade.overlap(
          this.player.bullet_weapon.bullets,
          enemy.sprite,
          this.red_enemy_hit,
          null,
          this
        );
      } else {
        // blue
        if (this.player.circle_weapon.active) {
          game.physics.arcade.overlap(
            this.player.circle_weapon.sprite,
            enemy.sprite,
            this.blue_enemy_hit,
            null,
            this
          );
        }
      }
    }, this);

    // spike enemies hitting player
    this.spikes.forEach(function(spike) {
      game.physics.arcade.overlap(
        this.player.sprite,
        spike.sprite,
        this.handle_player_hit_spike,
        null,
        this
      );
    }, this);
  }

  red_enemy_hit(enemy, weapon) {
    enemy.kill();
  }

  blue_enemy_hit(weapon, enemy) {
    enemy.kill();
  }

  handle_player_hit_spike(player, spike) {
    spike.kill();
    this.player.process_hit();
    this.spikes.forEach(function(spike) {
      spike.destroy();
    }, this);
    this.tutorial_7();
  }

  render() {}

  destroy() {
    this.all_sprites.destroy();
    this.UI.destroy();
    this.player.destroy();
  }
}