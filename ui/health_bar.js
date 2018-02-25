class HealthBar {
  constructor(mecha) {
    this.mecha = mecha;

    var g = game.add.graphics(0, 0);
    g.lineStyle(2, 0x000000, 0.5);
    g.beginFill(0x898d93, 1);
    g.drawRect(game.world.centerX - 200, 10, 400, 100);
    g.endFill();

    this.display_sprites = [];

    for(var i = 0; i < this.mecha.sprite.maxHealth; i++) {
      var sprite = game.add.sprite(550 + 100 * i, 60, 'mecha');
      sprite.scale.setTo(0.3, 0.3);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      sprite.visible = true;
      this.display_sprites.push(sprite);
    }
  }

  render(mecha) {

    var visible_sprites = this.display_sprites.slice(0,mecha.sprite.maxHealth - mecha.sprite.health);
    visible_sprites.forEach(function(element) { element.visible = false; })

    var hidden_sprites = this.display_sprites.slice(visible_sprites.length, this.display_sprites.length);
    hidden_sprites.forEach(function(element) { element.visible = true; })
  }
}