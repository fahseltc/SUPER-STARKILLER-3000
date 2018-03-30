# Things I learned making a JS game with Phaser

I made a 2D arcade shooter game with [Phaser](https://github.com/photonstorm/phaser-ce) in about 2 months and decided to write up some of the things I learned along the way. This is not my first game, but its probably my most finished one so far, and it was my first time trying to build a small application with Javascript.


![SUPER STARKILLER 3000](https://github.com/fahseltc/SUPER-STARKILLER-3000/blob/master/docs/article/title.PNG)
[You can play the game SUPER STARKILLER 3000 here](https://super-starkiller-3000.herokuapp.com/)

#### Goals
1. Have some fun learning the Phaser library. I also wanted to see how it compared to LibGDX, a Java game library I have used before.
2. Learn more about Javascript in general. I do use JS at work, but its mostly boring jquery for form submissions and rest calls.
3. Hone my gamedev skills. This isn't my first game, but I know I need to make more games to get more experience.
4. Make more games, fast! So I wanted to finish this game in 2-3 months.


## Use JSON files to structure your game

I didn't start my game this way, but I switched over to it about halfway through and it made everything way easier. My game keeps a global current_level_index variable and looks into the levels JSON file using that as an index.

Here is a look at my levels.json file:
```
[
  {
    "LEVEL_TYPE": "STORY",
    "STORY_INDEX": 0
  },
  {
    "LEVEL_TYPE": "TRAVEL"
  },
  {
    "LEVEL_TYPE": "COMBAT",
    "LEVEL_NUMBER": 1,
    "ENEMY_DATA": {
      "ENEMIES_IN_WAVE": 7
      .......
    }
  },
  {
    "LEVEL_TYPE": "BOSS",
    "BOSS_NUMBER": 1,
    "LEVEL_NUMBER": 2,
    "TURRETS": [.......... ],
    "SHIELDS": ["red", "blue", "red", "red", "red", "blue"],
    "SPIKE_ENEMIES": [
      {
        "X": 200,
        "Y": 50,
        "VELOCITY": { "X": 0, "Y": 400 }
      }
    ]
  }
]
```
This turned out to be a great way of doing things. All of my object managers just read directly from this file and build each object defined for each level. I was able to almost complete separate my game logic from my level/game data. If needed, this could be extended to a separate level-editor program that generates these files. The game just reads these files and plays them, similar to an old roll-fed player piano.

I did the same thing with all of my story text. Another global variable, global_story_index, is used to get data out of this file:
```
  {
    "TEXT": "MISSION #1 TEXT ...."
  },
  {
    "TEXT": "MISSION #2 ....."
  },
```
With this technique I could also localize the text if needed. (A thing I learned at my day job) ¯\\_(ツ)_/¯

## Cut your scope in half
I started with plans for 20-25 total levels and 4-5 bosses, but my game ended with 9 levels and 3 bosses! My game only had so many mechanics, and I felt that I couldn't come up with more compelling levels without adding more features. So I cut the level amount and only added one new feature that wasn't initially planned (the spikey bouncing enemies).

## The web browser environment is awesome:
  - PHP for reading system environment variables (and hosting)
  - cookies for storing user settings
  - Broader JS stuff
    - Adding/removing DOM nodes
    - Dev tools in browsers are great



## Make lists!
Every time a friend mentions a "cool idea" that you like, WRITE IT ON A LIST!
I made lists of

- "What is most important next" AKA "NEEDED TO COMPLETE GAME"
- "Art Tasks"
- "Story/Writing tasks"
- "Audio tasks"
- "Known bugs"
- "Juice" (meaning potential effects to make the game nicer/more polished. See: https://www.youtube.com/watch?v=Fy0aCDmgnxg)
- "#Tutorial" was strewn about my lists to remind me of things that need to be put in it.

- Prioritize Tasks.
I asked myself "What is the next thing I can add that will add the most to my game". Then I made a list of those things and prioritized them. It is very easy to add things to this list and say "I really need this", but its important to keep this list small. Re-evaluate it often and remove things that are _actually_ 'wants' rather than 'needs'.
