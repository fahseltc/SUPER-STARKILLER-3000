class HealthBar {
  constructor(mecha) {
    this.mecha = mecha;

    this.background = game.add.sprite(162, 125, "life_bg");
    this.background.anchor.setTo(0.5, 0.5);
    this.display_sprites = [];

    for(var i = 0; i < this.mecha.sprite.maxHealth; i++) {
      var sprite = game.add.sprite(90 + 50 * i, 125, 'player');
      sprite.scale.setTo(0.2, 0.2);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      sprite.visible = true;
      this.display_sprites.push(sprite);
    }
  }

  render(mecha) {

    var visible_sprites = this.display_sprites.slice(0, mecha.sprite.maxHealth - mecha.sprite.health);
    visible_sprites.forEach(function(element) { element.visible = false; })

    var hidden_sprites = this.display_sprites.slice(visible_sprites.length, this.display_sprites.length);
    hidden_sprites.forEach(function(element) { element.visible = true; })
  }

  destroy() {
    this.display_sprites.forEach(function(element) { element.destroy(); } )
  }
}