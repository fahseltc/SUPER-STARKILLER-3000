class Score {
  constructor() {
    this.score;
    this.score_buffer;
    this.score_label;
    this.score_label_tween;

    this.score = 0;
    this.score_buffer = 0;

    this.score_label = game.add.text(200, 60, "0", {
      font: "40px prstart",
      fill: "#FFFFFF",
      align: "center"
    });
    this.score_label.text = 0;
    this.score_label.anchor.setTo(0.5, 0.5);
    this.score_label.align = 'center';

    this.score_label_tween = game.add.tween(this.score_label.scale).to({ x: 1.2, y: 1.2}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In)
  }

  update() {
    if(this.score_buffer > 0) {
      this.score += 1;
      this.score_label_tween.start();
      this.score_label.text = this.score;
      this.score_buffer--;
    }
  }

  destroy() {
    this.score_label.destroy();
  }
}