class TimerDisplay {
  constructor(timer) {
    this.timer = timer.timer;
    this.timer_label = game.add.text(700, 150, this.timer.duration / 1000, {
      font: "30px prstart",
      fill: "#FFFFFF",
      align: "center"
    });

    this.timer_label.anchor.setTo(0.5, 0.5);
  }

  render() {
    this.timer_label.text = (this.timer.duration / 1000).toFixed(2);
  }

  destroy() {
    this.timer.destroy();
    this.timer_label.destroy();
  }
}