# Things I learned making a JS game with Phaser

I made a 2D arcade shooter game with [Phaser](https://github.com/photonstorm/phaser-ce) in about 2 months and decided to write up some of the things I learned along the way. This is not my first game, but its probably my most finished one so far, and it was my first time trying to build a medium sized application with Javascript.


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
This turned out to be a great way of doing things. All of my object managers just read directly from this file and build each object defined for each level. I was able to almost complete separate my game logic from my level/game data. If needed, this could be extended to a separate level-editor program that generates these files. The game just reads these files and plays them, similar to an old roll-fed player piano. I think its a nice architecture, at least for simple level-based arcade games.

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
With enough effort creating and fine-tuning levels, I could probably extend my mechanics to more levels. And I might in the future, but I want to wrap this game up.


## Making lists is a great way to organize game development
Here is a list of lists that I found useful:
- What is most important next (AKA NEEDED TO COMPLETE GAME)
- Art tasks
- Story/Writing tasks
- Audio tasks
- Known bugs
- Juice (meaning potential effects to make the game nicer/more polished. See: [Juice it or lose it, a GDC talk](https://www.youtube.com/watch?v=Fy0aCDmgnxg))
- #Tutorial was strewn about my lists to remind me of things that need to be put in it.

Every time I came up with a good idea for my game, I would either put it on the list or add it to the game immediately. Every time someone gave me some feedback about my game or had a cool idea, I would also put it on a list. I mostly used [Trello](https://trello.com/) to manage my lists, but there are a ton of tools for this. Even sticky notes or a whiteboard would work.

Once you have a bunch of lists, its time to sort and prioritize the things on your lists. What art is most important now? What feature would add the most to the game next? Make new lists like:
- Things that must be done
- Things I would like to do
- Things I will not do

I found it very easy to add things to these lists and tell myself "I really need this", but its important to re-evaluate often. Remove things that are _wants_ rather than _needs_. Identify and eliminate features that will take too much effort to implement. AKA "No I will not make it an open world game"

## The web browser environment is awesome:
I really enjoyed all the tools that web browser development offered.
  - Used Heroku to host my basic html5 app as a simple PHP server (for free!)
    - Used PHP to read heroku environment variables and support both production and staging environments.
  - Used browser cookies for storing user settings
  - Chrome developer tools are awesome!
  - Easy to add analytics and ads. Lots of ways to monetize.

## Add a debug menu to your game



