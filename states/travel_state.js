var travel_state = {
  preload: function() {
    this.travel_sound = sound_manager.add("travel_whoosh");
  },

  create: function() {
    var graphicsLine = game.add.graphics(0, 0);
    graphicsLine.lineStyle(12, 0xff69b4, 1);
    // top left to bottom right
    graphicsLine.moveTo(0, 0);
    graphicsLine.lineTo(1400, 900);

    // bottom left to top right
    graphicsLine.moveTo(1400, 0);
    graphicsLine.lineTo(0, 900);

    // bottom center to top center
    graphicsLine.moveTo(700, 900);
    graphicsLine.lineTo(700, 0);
    graphicsLine.endFill();

    // left to right
    graphicsLine.moveTo(0, 450);
    graphicsLine.lineTo(1400, 450);
    graphicsLine.endFill();

    // bottom left middle to top right middle
    graphicsLine.moveTo(350, 900);
    graphicsLine.lineTo(1050, 0);
    graphicsLine.endFill();

    // bottom right middle to top left middle
    graphicsLine.moveTo(1050, 900);
    graphicsLine.lineTo(350, 0);
    graphicsLine.endFill();

    this.rect1 = game.add.sprite(
      game.width / 2,
      game.height / 2,
      "pink_rect_filled"
    );
    this.rect1.anchor.x = 0.5;
    this.rect1.anchor.y = 0.5;

    this.rect2 = game.add.sprite(
      game.width / 2,
      game.height / 2,
      "pink_rect_empty"
    );
    this.rect2.anchor.x = 0.5;
    this.rect2.anchor.y = 0.5;
    this.rect2.scale.x = 2;
    this.rect2.scale.y = 2;

    this.rect3 = game.add.sprite(
      game.width / 2,
      game.height / 2,
      "pink_rect_empty"
    );
    this.rect3.anchor.x = 0.5;
    this.rect3.anchor.y = 0.5;
    this.rect3.scale.x = 3;
    this.rect3.scale.y = 3;

    var fragmentSrc = [
        "precision mediump float;",
        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "const float Tau        = 6.2832;",
        "const float speed  = .02;",
        "const float density    = .04;",
        "const float shape  = .04;",

        "float random( vec2 seed ) {",
            "return fract(sin(seed.x+seed.y*1e3)*1e5);",
        "}",

        "float Cell(vec2 coord) {",
            "vec2 cell = fract(coord) * vec2(.5,2.) - vec2(.0,.5);",
            "return (1.-length(cell*2.-1.))*step(random(floor(coord)),density)*2.;",
        "}",

        "void main( void ) {",

            "vec2 p = gl_FragCoord.xy / resolution  - mouse;",

            "float a = fract(atan(p.x, p.y) / Tau);",
            "float d = length(p);",

            "vec2 coord = vec2(pow(d, shape), a)*256.;",
            "vec2 delta = vec2(-time*speed*256., .5);",
            "//vec2 delta = vec2(-time*speed*256., cos(length(p)*10.)*2e0+time*5e-1); // wavy wavy",

            "float c = 0.;",
            "for(int i=0; i<3; i++) {",
                "coord += delta;",
                "c = max(c, Cell(coord));",
            "}",

            "gl_FragColor = vec4(c*d);",
        "}"
    ];

    this.filter = new Phaser.Filter(game, null, fragmentSrc);
    this.filter.setResolution(1400, 900);

    this.sprite = game.add.sprite();
    this.sprite.width = 1400;
    this.sprite.height = 900;

    this.sprite.filters = [ this.filter ];

    this.rectangles = game.add.group();

    this.rectangles.createMultiple(100, "pink_rect_empty");
    this.rectangles.setAll("anchor.x", 0.5);
    this.rectangles.setAll("anchor.y", 0.5);
    this.time_between_rectangles = 500;

    this.time_till_rectangle = game.time.now;

    this.spawn_tween = game.add.tween(this);

    //this.travel_sound.play("", 0, GLOBAL_SFX_VOLUME, false, true);
    this.spawn_tween.to(
      { time_between_rectangles: 0 },
      2000,
      Phaser.Easing.Linear.None,
      true
    );
    this.spawn_tween.onComplete.addOnce(function() {
      game.camera.fade(0x000000, 200, true);
      game.camera.onFadeComplete.addOnce(function() {
        CURRENT_LEVEL_INDEX++;
        game.state.start("play");
      }, this);
    }, this);

    this.player_clicked = false;
  },

  update: function() {
    this.filter.update({x: 700, y: 450 });
    if (game.input.activePointer.isDown && !this.player_clicked) {
      this.player_clicked = true;
      this.spawn_tween.stop();
      game.camera.fade(0x000000, 200, true);
      game.camera.onFadeComplete.addOnce(function() {
        CURRENT_LEVEL_INDEX++;
        game.state.start("play");
      }, this);
    }

    if (game.time.now > this.time_till_rectangle) {
      var rect = this.rectangles.getFirstExists(false);
      rect.scale.x = 1;
      rect.scale.y = 1;
      if (rect) {
        rect.reset(game.width / 2, game.height / 2);
        rect.lifespan = 400;
        game.add
          .tween(rect.scale)
          .to({ x: 5, y: 5 }, 300, Phaser.Easing.Exponential.In, true);
        this.time_till_rectangle = game.time.now + this.time_between_rectangles;
      }
    }
  }
};