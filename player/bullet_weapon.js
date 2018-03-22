const BULLET_ADDITIONAL_SPEED = 1000;
const BULLET_LIFESPAN = 2000;
const BULLET_DELAY = 100;

const HEAT_GENERATED_PER_SHOT = 4;
const HEAT_LOST_PER_TICK = 0.1;
const MAX_HEAT = 10;
const OVERHEAT_DURATION = Phaser.Timer.SECOND * 0.4;

class BulletWeapon {
  constructor(player) {
    this.player = player;
    // bullets
    this.bullets = game.add.group();
    this.bullets.enableBodyDebug = true;
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(100, "player_bullet_sprite_sheet", 0);

    this.bullets.callAll(
      "animations.add",
      "animations",
      "blinky",
      [0, 1, 2, 3],
      10,
      true
    ); // 4 is frames per second
    this.bullets.setAll("anchor.x", 0.5);
    this.bullets.setAll("anchor.y", 0.5);
    this.bullets.setAll("checkWorldBounds", true);
    this.bullet_time = 0;

    this.bullets.forEach(function(bullet) {
      bullet.events.onOutOfBounds.add(function(bullet) {
        bullet.kill();
      }, this);
    }, this);

    this.heat = 0;
    this.overheated = false;
    this.bullet_sound = sound_manager.add("red_bullet_shoot");
  }

  update(controls) {
    if (controls.left_click) {
      this.fire_bullet();
    }
    if (this.heat > 0) {
      this.heat -= HEAT_LOST_PER_TICK;
    }
  }

  render() {
    //game.debug.text(this.heat, 200, 14, "#00ff00");
  }

  fire_bullet() {
    if (game.time.now > this.bullet_time) {
      var bullet = this.bullets.getFirstExists(false);

      if (bullet && this.overheated == false) {
        this.bullet_sound.play("", 0, GLOBAL_VOLUME, false, true);
        this.bullets.callAll("play", null, "blinky");

        this.heat += HEAT_GENERATED_PER_SHOT;
        bullet.reset(
          this.player.sprite.body.x + this.player.sprite.body.width / 2,
          this.player.sprite.body.y + this.player.sprite.body.height / 2
        );
        bullet.lifespan = BULLET_LIFESPAN;
        game.physics.arcade.velocityFromRotation(
          this.player.sprite.rotation,
          this.player.sprite.body.speed + BULLET_ADDITIONAL_SPEED,
          bullet.body.velocity
        );
        this.bullet_time = game.time.now + BULLET_DELAY;
      }

      if (this.heat > MAX_HEAT) {
        this.heat = 0;
        this.overheated = true;
        game.time.events.add(
          OVERHEAT_DURATION,
          function() {
            this.overheated = false;
          },
          this
        );
      }
    }
  }
}