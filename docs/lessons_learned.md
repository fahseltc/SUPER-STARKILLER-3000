# Things I learned making a JS game with Phaser

things learned

### Use JSON files to structure your game

I didn't start my game this way, but switched over to it about halfway through, and it made everything way easier. My game keeps a global variable called CURRENT_LEVEL_INDEX and looks into the levels json file using that as an index. It turned out to be a great solution as often I found that many disparate parts of my code needed to know about the current level. For example, both the UI and the enemy spawning code needed to know how many enemies were in a given level. Passing that information around in constructors would be a pain.
Here is a look at my levels.json file
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
    "TURRETS": [.....],
    "SHIELDS": ["red", "blue", "red", "red", "red", "blue"],
    "SPIKE_ENEMIES": [
      {
        "X": 200,
        "Y": 50,
        "VELOCITY": { "X": 0, "Y": 400 }
      }
    ]
  },
```

  - story text


- The web browser environment is awesome:
  - PHP for reading system environment variables (and hosting)
  - cookies for storing user settings
  - Broader JS stuff
    - Adding/removing DOM nodes
    - Dev tools in browsers are great

### Cut your scope in half. I started with plans for 20-25ish total levels and 4-5 bosses. My game ended with 9 levels and 3 bosses!

### Make lists!
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
