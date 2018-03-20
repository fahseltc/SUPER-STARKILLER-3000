const HEALTHBAR_BASE_POSITION_X = 96;
const HEALTHBAR_BASE_POSITION_Y = 750;

class HealthBar {
  constructor(player) {
    this.player = player;

    this.life_text = game.add.text(
      HEALTHBAR_BASE_POSITION_X + 50,
      HEALTHBAR_BASE_POSITION_Y - 43,
      "LIFE",
      {
        font: "16px prstart",
        fill: WHITE_HEX_COLOR,
        align: "center"
      }
    );

    this.display_sprites = [];

    for (var i = 0; i < this.player.sprite.maxHealth; i++) {
      var sprite = game.add.sprite(
        HEALTHBAR_BASE_POSITION_X,
        HEALTHBAR_BASE_POSITION_Y + 36 * i,
        "life_bar_single"
      );
      sprite.anchor.y = 0.5;
      sprite.visible = true;
      this.display_sprites.push(sprite);
    }
  }

  render() {
    var visible_sprites = this.display_sprites.slice(
      0,
      this.player.sprite.maxHealth - this.player.sprite.health
    );
    visible_sprites.forEach(function(element) {
      element.visible = false;
    });

    var hidden_sprites = this.display_sprites.slice(
      visible_sprites.length,
      this.display_sprites.length
    );
    hidden_sprites.forEach(function(element) {
      element.visible = true;
    });
  }

  destroy() {
    this.display_sprites.forEach(function(element) {
      element.destroy();
    });
    this.life_text.destroy();
  }
}