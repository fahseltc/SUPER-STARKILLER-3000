class LevelManager {
  constructor() {
    this.level_json = game.cache.getJSON("levels");
    console.log(this.level_json);

    this.levels = [];
    this.current_level;
    this.change_level(CURRENT_LEVEL_INDEX);
    this.level_display = new LevelDisplay(
      this.level_json[CURRENT_LEVEL_INDEX].LEVEL_NUMBER
    );
  }

  update() {
    if (this.current_level) {
      this.current_level.update();
    }
  }

  render() {
    if (this.current_level) {
      this.current_level.render();
    }
  }

  change_level(level_index) {
    var change_level_type = this.level_json[level_index].LEVEL_TYPE;
    console.log(
      "changing level to: " + level_index + "  Type: " + change_level_type
    );

    if (this.current_level) {
      GLOBAL_SCORE =
        this.current_level.UI.score.score +
        this.current_level.UI.score.score_buffer;
      this.current_level.destroy();
    }

    switch (change_level_type) {
      case "COMBAT":
        this.current_level = new Level(this.level_json[level_index], this);
        break;
      case "READY":
        game.state.start("ready");
        break;
      case "BOSS":
        this.current_level = new BossLevel(this.level_json[level_index], this);
        break;
      case "BOSS_DEAD":
        game.state.start("boss_dead");
        break;
      case "STORY":
        CURRENT_STORY_INDEX = this.level_json[level_index].STORY_INDEX;
        game.state.start("story");
        break;
      case "TRAVEL":
        game.state.start("travel");
        break;
      case "GAME_ENDING_1":
        game.state.start("ending_1");
        break;
      case "GAME_ENDING_2":
        game.state.start("ending_2");
        break;
      case "GAME_ENDING_3":
        game.state.start("ending_3");
        break;
      case "GAME_END_FINAL":
        game.state.start("game_end");
        break;

    }
  }
}