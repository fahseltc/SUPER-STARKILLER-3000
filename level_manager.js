class LevelManager {
  constructor() {
    this.level_json = game.cache.getJSON('levels').levels;
    console.log(this.level_json);

    this.levels = []
    // if(after_menu_level_index == -1) {
    //   // if this is the first level on a new game, then go to first level
    //   this.current_level_index = 0;
    // } else {
    //   // otherwise, this is not the first level.
    //   this.current_level_index = after_menu_level_index;
    //   after_menu_level_index = 0;
    // }

    this.current_level;
    //this.change_level(this.current_level_index);
    this.change_level(CURRENT_LEVEL_INDEX);
    this.level_display = new LevelDisplay(this.level_json[CURRENT_LEVEL_INDEX].LEVEL_NUMBER);
  }

  update() {
    if(this.current_level) {
      this.current_level.update();
    }
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

    if(this.current_level) {
      console.log("Previous last_score: " + last_score)
      console.log("Current UI score: " +  this.current_level.UI.score.score + " Buffer: " + this.current_level.UI.score.score_buffer);
      last_score = this.current_level.UI.score.score + this.current_level.UI.score.score_buffer;
      console.log("new last_score: " + last_score);
      this.current_level.destroy();
    }

    switch(change_level_type) {
      case 'COMBAT':
        this.current_level = new Level(this.level_json[level_index], this);
        break;
      case 'MENU':
        //after_menu_level_index = level_index + 1;
        game.state.start('ready');
        break;
      case 'BOSS':
        this.current_level = new BossLevel(this.level_json[level_index], this);
        break;
      case 'BOSS_DEAD':
        //after_menu_level_index = level_index + 1;
        game.state.start('boss_dead');
        break;
      case 'STORY':
        CURRENT_STORY_INDEX = this.level_json[level_index].STORY_INDEX;
        //after_menu_level_index = level_index + 1;
        game.state.start('story');
    }

    // if(change_level_type == "COMBAT") {
    //   this.current_level = new Level(this.level_json[this.current_level_index], this);
    // } else if(change_level_type == "MENU") {
    //   after_menu_level_index = this.level_json[level_index].NEXT_LEVEL_INDEX;
    //   game.state.start('ready');
    // } else if(change_level_type == "BOSS") {
    //   this.current_level = new BossLevel(this.level_json[this.current_level_index], this);
    // }
  }
}