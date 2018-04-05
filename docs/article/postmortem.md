# SUPER STARKILLER 3000 Postmortem


After 2 months of development time, I finished SUPER STARKILLER 3000. Its a 2D action / bullet-hell style shooter with a full (short) story, made using Phaser. You can play it here: [SUPER STARKILLER 3000](https://super-starkiller-3000.herokuapp.com/)

This is my 3rd complete game, my first game using Phaser, and my most finished + polished game yet.

![SUPER STARKILLER 3000](https://github.com/fahseltc/SUPER-STARKILLER-3000/blob/master/docs/article/title.PNG)

## Things that went right
  
  
### Accomplished goals
#### Javascript
I went into this project familiar with Javascript, but only through boring JQuery form submission and AJAX calls at work. So I wanted to learn more about the web development environent in general, and I also wanted to see how Phaser compared to other game libaries I have used (mostly libGDX). Part of this game involved creating a simple leaderboard database backend, which let me learn a lot about Express and the whole Node.js world. NPM turned out to be really interesting and useful, and nowhere near as complicated as I thought it would be.
I also learned about Javascript prototypes, though they seem tricky still. I mostly stuck to Javascript Classes, which I understand is just some syntactic sugar.
In my next project I want to use Nodes module system, along with NPM and webpack to compress/minify all my assets.

#### Hone my gamedev skills
This is only my third game and I realize that to get better I must make more games. Not only that, but I must make them more quickly. So I planned to only spend 2 months on this game, which would include 4-5 bosses and 15-20 levels. Sadly, I ended up with only 3 bosses and 9 levels, but I did manage to complete my game in 2 months!
I did manage to flex my programming skills and also worked extensively on my art ability (which is still terrible). This very article is another gamedev skill I'm trying to learn: writing and marketing!


### Process
I didnt start this game with much of a plan, other than "I need to make a game in less than 2 months" and "synthwave". I decided early on what the basic game-type and mechanics would be, but other than that I took a lot of advice from testers and made stuff up as I went. One thing I really stuck with throughout was keeping meticulous lists.

#### Lists!
Here is a list of lists that I found useful:
- What is most important next (AKA NEEDED TO COMPLETE GAME)
- Art tasks
- Story/Writing tasks
- Audio tasks
- Known bugs
- Juice (meaning potential effects to make the game nicer/more polished. See: [Juice it or lose it, a GDC talk](https://www.youtube.com/watch?v=Fy0aCDmgnxg))
- #Tutorial was strewn about my lists to remind me of things that need to be put in it.

Every time I came up with a good idea for my game, I would either put it on the list or add it to the game immediately. Every time someone gave me some feedback about my game or had a cool idea, I would also put it on a list. I mostly used [Trello](https://trello.com/) to manage my lists, but there are a ton of tools for this. Even sticky notes or a whiteboard would work

Once you have a bunch of lists, its time to sort and prioritize the things on your lists. What art is most important now? What feature would add the most to the game next? Make new lists like:
- Things that must be done
- Things I would like to do
- Things I will not do

I found it very easy to add things to these lists and tell myself "I really need this", but its important to re-evaluate often. Remove things that are _wants_ rather than _needs_. Identify and eliminate features that will take too much effort to implement. AKA "No I will not make it an open world game".


### JSON-based level structure

I didn't start my game this way, but I switched over to it about halfway through and it made everything way easier. Basically, my game keeps a global current_level_index variable and looks into the levels JSON file using that as an index.

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
This turned out to be a great way of doing things. All of my object managers just read directly from this file and build each object defined for each level. I was able to almost complete separate my game logic from my level/game data. If needed, this could be extended to a separate level-editor program that generates these files. The game just reads these files and plays them, similar to an old roll-fed player piano. I think its a nice architecture, at least for simple level-based arcade games and it allows easy modding support or community driven balancing.

I did the same thing with all of my story text. Another global variable, global_story_index, is used to get data out of this file:
```
  {
    "TEXT": "MISSION #1 TEXT ...."
  },
  {
    "TEXT": "MISSION #2 ....."
  },
```
With this technique I could also localize the text if needed. (A thing I also learned at my day job) ¯\\_(ツ)_/¯


#### Collaborate with other nerds
Somehow, I managed to swindle two of my gaming friends to help out.
One friend, Chez, ended up writing a pretty great short story for me. Even just a few sentences of text between each level added a lot to make my simple game more interesting. Writing is a gamedev skill I havent really devoted any time to, so I was really thankful for his help.
Another friend, Pat, helped my out by creating a majority of the art in the game. Again, Art is another gamedev skill I need way more practice in, and I did do some great work with Aseprite and paint.net.
We quickly settled on the following workflow:
1. I would make a white rectangle of the correct dimensions, and begin making this rectangle act as an enemy, or powerup or whathaveyou. I would then share my progress with Pat.
2. Pat, upon seeing said rectangle, would berate me and immediately begin work on replacing it with something better.
This ended up working well.


## Things that went wrong
While I did mostly meet my goals with this game, not everything was peachy.

#### Art is still hard
As noted above, I again struggled with art in my game. I usually stick to very basic 16x16 to 64x64 sprites as they are easier for me to make look terrible, but this game I ended up varying the sizes of things a lot. I also failed to come up with consistent art sizes, and had to do a lot of scaling images in-game.
My friend Pat was a big help here, but in the end our two art styles arent really in the same place, so I feel like some of the art is a bit disjointed. Some of the art I made was passable, but most of the art Pat made was excellent, and made mine look worse in comparison. I feel this shows in the final product.
Going forward, I want to improve the following:
- Better art direction/documentation at the beginning.
- Better definition of art and canvas sizes required. Think about resolution scaling early.
- Pick a color pallete early and stick to it.

#### Procrastination + Life getting in the way
![SUPER STARKILLER 3000](https://github.com/fahseltc/SUPER-STARKILLER-3000/blob/master/docs/article/github_additions.PNG)
The first two week of development went great, and I worked on the project for many hours a day. But then as time went on, I spent less and less time each day, and even didnt work at all some days. I feel like if I kept up the development pace that I had in the first two weeks, then game would be done a month ago. Its hard to stay motivated, even on a short project, but if I could find a way then I could be much more productive.
I also some family health issues happen during this time, which killed a lot of my productivity. I don't think there is a way around "shit happens" though, so sometimes you just have to roll with it, I guess.

