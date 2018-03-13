const SCORE_BASE_POSITION_X = 250;
const SCORE_BASE_POSITION_Y = 750 ;

class Score {
  constructor() {
    this.score;
    this.score_buffer;
    this.score_label;
    this.score_label_tween;

    this.previous_score = last_score;
    this.score = last_score;
    this.score_buffer = 0;

    this.background = game.add.sprite(SCORE_BASE_POSITION_X, SCORE_BASE_POSITION_Y, "score_bg");
    this.background.anchor.setTo(0.5, 0.5);

    this.static_score_text = game.add.text(SCORE_BASE_POSITION_X, SCORE_BASE_POSITION_Y - 22, "SCORE", {
      font: "24px prstart",
      fill: "#FF0000",
      align: "center",
      fontWeight: "bold"
    });
    this.static_score_text.anchor.setTo(0.5, 0.5);
    this.static_score_text.align = 'center';

    this.score_label = game.add.text(SCORE_BASE_POSITION_X, SCORE_BASE_POSITION_Y + 15, this.create_score_label(), {
      font: "36px prstart",
      fill: "#FFFFFF",
      align: "center"
    });
    this.score_label.anchor.setTo(0.5, 0.5);
    this.score_label.align = 'center';

    this.score_label_tween = game.add.tween(this.score_label.scale).to({ x: 1.1, y: 1.1 }, 150, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In)
  }

  update() {
    if(this.score_buffer > 0) {
      this.score += 1;
      this.score_label_tween.start();
      this.score_label.text = this.create_score_label();
      this.score_buffer--;
    }
  }

  create_score_label() {
    var score_total_digits = 10;
    var digits_to_create = score_total_digits - this.score.toString().length;

    var score_label_text = "";
    for(var i = 0; i < digits_to_create; i++) {
      score_label_text += "0";
    }
    score_label_text += this.score;
    return score_label_text;
  }


  destroy() {
    last_score += (this.score + this.score_buffer) - this.previous_score;
    this.score_label.destroy();
    this.static_score_text.destroy();
    this.background.destroy();
  }
}