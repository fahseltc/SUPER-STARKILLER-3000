const GAME_DURATION = Phaser.Timer.SECOND * 30;

class GameTimer {
  constructor(score) {
    this.score = score;
    this.timer = game.time.create(false);
    this.timer.add(GAME_DURATION, this.end_game, this);
  }

  start() {
    this.timer.start();
  }

  render() {
    game.debug.text(this.timer.duration / 1000, 2, 14, "#00ff00");
  }

  end_game() {
    last_score = this.score.score + this.score.score_buffer;
    game.state.start('post');
  }
}