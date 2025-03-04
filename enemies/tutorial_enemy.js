class TutorialEnemy {
  constructor(player, sprite_name, ui) {
    this.player = player;
    this.sprite_name = sprite_name;
    this.UI = ui;

    this.sprite = game.add.sprite(0, 0, "turret_base_" + sprite_name);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.rotation = Math.PI / 4;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.turret = game.add.sprite(0, 0, "turret_top_" + sprite_name);
    this.turret.anchor.set(0.5, 0.3);
    this.sprite.addChild(this.turret);

    this.sprite.events.onKilled.add(function() {
      sound_manager.play("turret_death", GLOBAL_SFX_VOLUME);
      game.add.particleEffect(
        this.sprite.position.x,
        this.sprite.position.y,
        game.cache.getJSON(this.sprite_name + "_explosion")
      );
      this.UI.score.score_buffer += 5;
    }, this);

    if (sprite_name == "red") {
      this.icon = game.add.sprite(50, 50, "left_click");
    } else {
      // blue
      this.icon = game.add.sprite(50, 50, "right_click");
    }
    this.icon.anchor.set(0.5, 0.5);
    this.icon.rotation = -Math.PI / 4;
    // this.icon.
    this.icon.scale.set(0.5, 0.5);
    this.sprite.addChild(this.icon);

    this.bullet_delay = 1500;
    this.bullet_speed = 300;
    this.initial_delay = 1000;

    this.bullets = game.add.group();
    this.bullets.enableBodyDebug = true;
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(100, "enemy_bullet");
    this.bullets.setAll("anchor.x", 0.5);
    this.bullets.setAll("anchor.y", 0.5);
    this.bullets.setAll("alive", false);
    this.bullets.setAll("checkWorldBounds", true);
    this.bullets.forEach(function(bullet) {
      bullet.events.onOutOfBounds.add(function(bullet) {
        bullet.kill();
      }, this);
    }, this);

    this.bullet_time = game.time.now + 1000;

    this.graphics = game.add.graphics(this.sprite.x, this.sprite.y);
    this.spinner_angle = 0;
  }

  update() {
    this.turret.rotation =
      game.physics.arcade.angleToXY(
        this.player.sprite,
        this.sprite.x,
        this.sprite.y
      ) +
      Math.PI / 4;

    if (this.sprite.alive && game.time.now > this.bullet_time) {
      var bullet = this.bullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(this.sprite.worldPosition.x, this.sprite.worldPosition.y);
        bullet.lifespan = ENEMY_BULLET_LIFESPAN;
        game.physics.arcade.moveToXY(
          bullet,
          this.player.sprite.x,
          this.player.sprite.y,
          this.bullet_speed
        );
        this.bullet_time = game.time.now + this.bullet_delay;
      }
    }

    this.graphics.clear();
    if (this.sprite.alive) {
      var ms_till_shot = this.bullet_time - game.time.now;
      // (range 0 to this.bullet_time) must map to (0 to 360)
      var degree_multiplier = ms_till_shot / this.bullet_delay;
      var degrees = degree_multiplier * 360;

      this.graphics.beginFill(0x000000);
      this.graphics.arc(
        this.sprite.x,
        this.sprite.y,
        9,
        this.turret.rotation + Math.PI / 1.31,
        this.turret.rotation + game.math.degToRad(degrees) + Math.PI / 1.31,
        true
      ); //
      this.graphics.endFill();
    }
  }
}