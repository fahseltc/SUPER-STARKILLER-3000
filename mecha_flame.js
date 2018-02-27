const FLAME_FADE_TIME = 1000;

class MechaFlame {
  constructor(mecha) {
    this.mecha = mecha;

    this.flames = game.add.group();
    this.flames.createMultiple(100, 'flame');
    this.flames.setAll('anchor.x', 0.5);
    this.flames.setAll('anchor.y', 0);
    this.flames.setAll('z',-1);
  }

  render() {
    var flame = this.flames.getFirstExists(false);
    if(flame) {
      flame.rotation = this.mecha.sprite.rotation - 30;
      flame.reset(this.mecha.sprite.body.x + this.mecha.sprite.width/2 , this.mecha.sprite.body.y + this.mecha.sprite.height/2);
      flame.alpha = 1;
      flame.lifespan = FLAME_FADE_TIME;
      game.add.tween(flame).to( { alpha: 0 }, FLAME_FADE_TIME, Phaser.Easing.Exponential.Out, true, 0, 0, false);
    }
  }
}