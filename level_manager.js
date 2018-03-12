class LevelManager {
  constructor() {
    this.level_json = game.cache.getJSON('levels').levels;
    console.log(this.level_json);

    this.levels = []
    if(after_menu_level_index == -1) {
      // if this is the first level on a new game, then go to first level
      this.current_level_index = 0;
    } else {
      // otherwise, this is not the first level.
      this.current_level_index = after_menu_level_index;
      after_menu_level_index = 0;
    }

    this.current_level;
    this.change_level(this.current_level_index);
    this.level_display = new LevelDisplay(this.level_json[this.current_level_index].LEVEL_NUMBER);
  }

  update() {
    this.current_level.update();
  }

  render() {
    // this if check covers the case where we change level in the update.
    if(this.current_level) {
      this.current_level.render();
    }
  }

  change_level(level_index) {
    var change_level_type = this.level_json[level_index].LEVEL_TYPE;
    console.log("changing level to: " + level_index + "  Type: " + change_level_type);

    if(this.current_level) { this.current_level.destroy(); }
    this.current_level_index = level_index;

    if(change_level_type == "COMBAT") {
      this.current_level = new Level(this.level_json[this.current_level_index], this);
    } else if(change_level_type == "MENU") {
      after_menu_level_index = this.level_json[level_index].NEXT_LEVEL_INDEX;
      game.state.start('ready');
    }
  }
}