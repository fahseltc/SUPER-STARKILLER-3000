const SCORE_BASE_POSITION_X = 480;
const SCORE_BASE_POSITION_Y = 742 ;

const SCORE_BUFFER_EMPTY_DELAY = 100;

class Score {
  constructor() {
    this.previous_score = last_score;
    this.score = 0;
    if(last_score) { this.score = last_score; }
    this.score_buffer = 0;

    this.score_label = game.add.text(SCORE_BASE_POSITION_X, SCORE_BASE_POSITION_Y, this.create_score_label(), {
      font: '42px prstart',
      fill: GREEN_HEX_COLOR,
      align: 'center',
      fontWeight: 'italic'
    });
    this.score_label.anchor.setTo(0.5, 0.5);
    this.score_label.align = 'center';

    this.score_label_tween = game.add.tween(this.score_label.scale).to({ x: 1.05, y: 1.05 }, SCORE_BUFFER_EMPTY_DELAY, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, SCORE_BUFFER_EMPTY_DELAY, Phaser.Easing.Linear.In)

    this.next_buffer_empty = game.time.now;
  }

  update() {
    if(this.score_buffer > 0 && (game.time.now > this.next_buffer_empty)) {
      this.score += 1;
      this.score_label_tween.start();
      this.score_label.text = this.create_score_label();
      this.score_buffer--;
      this.next_buffer_empty = game.time.now + SCORE_BUFFER_EMPTY_DELAY;
    }
  }

  create_score_label() {
    var score_total_digits = 4;
    var digits_to_create = score_total_digits - this.score.toString().length;

    var score_label_text = '';
    for(var i = 0; i < digits_to_create; i++) {
      score_label_text += '0';
    }
    score_label_text += this.score;
    return score_label_text;
  }


  destroy() {
    last_score += (this.score + this.score_buffer) - this.previous_score;
    this.score_label.destroy();
  }
}