# Creating stages
Stages are defined via XML files, similar to <a href="../Creating characters/index.md">Creating characters</a>. By creating an XML file in ``./data/stages``, you officially created a stage.

The default stage XML looks something like this:
```xml
<stage zoom="0.9" name="stage" folder="stages/default/" startCamPosY="600" startCamPosX="1000">
<sprite name="bg" x="-600" y="-200" sprite="stageback" scroll="0.9"/>
<sprite name="stageFront" x="-600" y="600" sprite="stagefront" scroll="0.9"/>
<girlfriend/>
<dad/>
<boyfriend/>
<sprite name="stageCurtains" x="-500" y="-300" sprite="stagecurtains" scroll="1.3"/>
</stage>
```
There's a lot to pack but we will explain what's going on here.

First, to start with the "parent node", which is the `stage` node, that is where stage options are being defined.<br>
```xml
<stage zoom="0.9" name="stage" folder="stages/default/" startCamPosY="600" startCamPosX="1000">
```
Noting options that you can set there:
- ``zoom`` which controls the default zoom of the stage.
- ``name``, name of the stage when you look for it in the Chart Editor.
- ``folder`` which changes the destination of where the sprites are taken from *(like ``images/stages/default/``)*.
- ``startCamPosX, startCamPosY`` set the destination of where the camera starts from *(before countdown)*

As for the other nodes, there's about ``7 types`` of them *(and more if you script them in)*, we'll go through each of them.

*(note that it's important which order you put them in because they will take the same order in-game too)*

### Sprite node (`sprite`, `spr`, `sparrow`)
The sprite node defines the basic sprites in a stage.

```xml
<sprite name="bg" x="-600" y="-200" sprite="stageback" scroll="0.9"/>
```
The options are:
- ``name`` which defines the internal name used for scripting.
- ``x`` and ``y`` define it's position in-game.
- ``sprite`` is the name of the sprite in the files. *(keep in mind if you set this to point to a sparrow spritesheet it will automatically make an animation of all the frames in the spritesheet)*
- ``scroll``, ``scrollx`` and ``scrolly`` determine the scrollFactor of the sprite *(how much it moves with the camera)*

Other options include:
- ``skewx`` and ``skewy`` skewes the sprite.
- ``antialiasing`` determines whether or not the sprite has antialiasing. *(true by default)*
- ``width`` and ``height`` determine the width and height of the sprite's hitbox. *(does not affect the sprite itself)*
- ``scale``, ``scalex`` and ``scaley`` are size multipliers for the sprite's width and height. *(setting it to 2 means double the size)*
- ``graphicSize``, ``graphicSizex`` and ``graphicSizey`` determine the width and height of the sprite.
- ``updateHitbox`` determines whether or not to update the sprite's hitbox.
- ``zoomFactor`` defines how much the sprite should scale with the camera's zoom. *(setting it to 0 will make it stay to the original size no matter what)*
- ``alpha`` is the "opacity" of the sprite
- ``color`` tints the sprite in the color you set it to *(example #FF0000 will tint the sprite in full red)*
- ``playOnCountdown`` tells the sprite whether or not to play it's animation during countdown or not.
- ``beatInterval, beatOffset``, honestly, I don't even know what this shit is okay.

You can also define animations by giving it a child node called ``anim``. A sprite node with an animation node looks something like this:
```xml
<sprite name="dancer1" sprite="limoDancer" type="onbeat">
<anim name="danceLeft" anim="bg dancer sketch PINK" loop="false"/>
<anim name="danceRight" anim="bg dancer sketch PINK" loop="false"/>
</sprite>
```
An anim node can define these options:
- ``name`` defines the internal name of the animation *(used for scripting)*
- ``anim`` is the prefix for finding the animation in the spritesheet.
- ``indices`` indicates which frames to play from the previously found frames.
- ``type`` determines the type of the animation. either ``beat`` or ``loop``.
- ``fps`` is the framerate of your animation.
- ``x`` and ``y`` are the animation offset. *(offset is only applied when the animation is played)*
- ``forced`` whether or not to force animation playback while a different one is already playing.
- ``loop`` to make your animation loop.

### Solid node (`solid`, `box`)
Solid nodes are sprites that is, unlike a Sprite Node, composed of only one select color. This node has less parameters since it doesn't use images. <br>
Creating one of these looks something like this:

```xml
<solid name="void" color="#FFFFFF" width="1280" height="720">
```
*(there's a difference between using `solid` and `box`, while `solid` offers more performance, it might break with shaders and other stuff, so if that happens, use `box` instead)*

Accepted parameters:
- `name` internal name.
- `color` which colors the solid/box.
- `x` and `y` determine the position in the stage.
- `width` and `height` defines the size of the solid/box.