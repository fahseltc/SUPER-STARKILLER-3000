class LevelManager {
  constructor() {
    this.level_json = game.cache.getJSON('levels').levels;
    console.log(this.level_json);
    this.levels = []
    this.current_level_index = 0;
    this.current_level;
    this.change_level(this.current_level_index);

    this.level_display = game.add.text(1100, 50, "Lvl: " + this.current_level_index, {
      font: "30px prstart",
      fill: "#000000",
      align: "center"
    });

    this.level_display.anchor.setTo(0.5, 0.5);
  }

  update() {
    this.current_level.update();
    if(game.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
      if(this.current_level_index != 0) { this.change_level(0); }
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
      if(this.current_level_index != 1) { this.change_level(1); }
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.THREE)) {
      if(this.current_level_index != 2) { this.change_level(2); }
    }
  }

  render() {
    this.level_display.text = "Lvl: " + this.current_level_index;
    this.current_level.render();
    //console.log(this.level_timer.timer.duration / 1000);
  }

  change_level(level_index) {
    if(level_index == 99) {
      // change game state to you-win!
    }

    if(this.current_level) { this.current_level.destroy(); }
    this.current_level_index = level_index;
    console.log("changing level to: " + level_index);
    console.log(this.level_json[this.current_level_index]);
    this.current_level = new Level(this.level_json[this.current_level_index], this);

    // this.level_timer = game.time.events.add(this.level_json[this.current_level_index].DURATION * 1000, function() {
    //   console.log('does this ever do?');
    //   this.current_level_index++;
    //   this.change_level(this.current_level_index);
    // }, this);
    //console.log("level will last: " + this.level_json[this.current_level_index].DURATION * 1000);
  }

  get_current_level_index() {
    this.current_level_index = 0;
  }
}