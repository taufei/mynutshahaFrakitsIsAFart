# Pause and Game Over Scripts

## Pause
To entirely overwrite the existing menu with one you make yourself from scratch, put the following line inside a gameplay script;
```hx
PauseSubState.script = 'data/scripts/pause';
```

Then, in `data/scripts/pause.hx`, paste this in as a template.
```hx
function create(e){
    e.cancel();

    camera = pauseCam = new FlxCamera();
    pauseCam.bgColor = FlxColor.TRANSPARENT;
    FlxG.cameras.add(pauseCam, false);

    // your code goes below this line
}
```
This script will prevent the base pause menu from loading and allow you to add whatever you want to it.

Some functions to remember are:

`close();` - Closes the pause menu, resumes gameplay
`FlxG.switchState(new PlayState());` - Reloads the state, restarts the song

## Game Over
idk ive never used the game over script thing oops