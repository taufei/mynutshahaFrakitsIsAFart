# Character/Stage Scripts

Character/Stage Scripts run alongside them, or something like that.

### Character Script.
You can create one of those by making a Script file alongside your character's XML data file *(``./data/characters/``)*<br>
In these scripts you don't need to specify the character, since the character becomes the Script's parent.

Here's an example of a Character Script that makes the character spin..:
```hx
function update(elapsed) {
    angle += elapsed * 10;
}
```

### Stage Scripts.
Creating one of those also goes next to the Stage XML data file *(``./data/stages/``)*.<br>
This script also takes the Stage as it's parent, thus not needing to use ``stage.getSprite()``, instead, sprites becomes the variables

Here's an example:
```hx
function postCreate() {
    // animatedObject has already been defined in the XML file.
    animatedObject.frames = Paths.getFrames("animatedObject");
    animatedObject.animation.addByPrefix("idle", "idle", 24, true);
    animatedObject.animation.play("idle");
}
```