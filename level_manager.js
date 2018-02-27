class LevelManager {
  constructor() {
    this.level_json = game.cache.getJSON('levels').levels;
    console.log(this.level_json);
    this.levels = []
    this.current_level_index = 0;
    this.current_level = new Level(this.level_json[this.current_level_index]);
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
    this.current_level.render();
  }

  change_level(level_index) {
    this.current_level.destroy();
    this.current_level_index = level_index;
    console.log("changing level to: " + (level_index + 1));
    this.current_level = new Level(this.level_json[this.current_level_index]);
  }

  get_current_level_index() {
    this.current_level_index = 0;
  }
}