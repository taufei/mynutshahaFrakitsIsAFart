# Cutscenes and dialogues.

## Cutscenes

Making Cutscenes is easy, either drop an .mp4 file in ``./videos`` with the name of the song followed by `-cutscene` at the end, or drop it in the corresponding song folder and simply name it ``cutscene.mp4``

<img src="./Cutscenes or Dialogues.png"/>

You can also put an ``-end`` before ``-cutscene`` to make that cutscene appear at the end of the song.

## Dialogues

Codename Engine also supports Dialogues, though there's a lot to unwrap here, so please read with patience.

Making a basic dialogue is done by making a file called ``dialogue.xml`` in the corresponding song folder, and the content should look something like this:
```xml
<dialogue box="default">
	<!-- All characters -->
	<char name="dad" position="left" />
	<char name="girlfriend" position="middle" />
	<char name="boyfriend" position="right" />

	<!-- Lines -->
	<line char="dad">
		yo its me your <format color="#FF0000">enemy!</format> how are you
	</line>
	<line char="boyfriend">
		shut up u stupid bitch
		ur useless af!!! loser!
	</line>
	<line char="girlfriend">
		agreed
	</line>
</dialogue>
```

This dialogue covers all types of characters *(only having 3 types of positions)*.

Starting with the ``dialogue`` node, it only has 2 parameters:
- ``box`` which, well, determines the textbox that it should use.
- ``forceBoxDefaultTxtSound`` which overrides all text sounds and applies the default one.

For the ``char`` node, it has the following parameters:
- ``name`` determines which character to introduce.
- ``position`` determines the position which the character stays on.
- ``textSound`` determines what sound the character should play when it speaks. *(takes from the ``./sounds`` folder)*
- ``defaultAnim`` i have no idea what that is bro

As for the ``line`` node, the example shows it's default usage, so the next parameters are mostly for advanced usage:
- ``bubble`` determines the animation the textbox should play.
- ``callback`` determines what function to call in a Dialogue Script *(see <a href="./Scripting/PlayState Scripts/Cutscenes or Dialogue Scripts.md">Cutscenes/Dialogue Scripts</a>)*
- ``changeDefAnim`` to play a different animation for the character *(``changeDefAnim="scared"``)*.
- ``speed`` is the typing speed *(default is `0.05`)*.
- ``musicVolume`` changes the music volume *(default is `0.8`)*
- ``changeMusic`` determines what song to change to.
- ``playSound`` is the sound that plays once you proceed to the next line.
- ``nextSound`` also plays a sound once you proceed to the next line. *(I really can't figure out why this exists)*

The ``line`` node also accepts ``format`` children, to format different parts of the text. The parameters are:
- ``color`` for coloring.
- ``font`` to change the font of the text.

### Setting up Dialogue Characters.

After realizing how to basically make a dialogue, you can now start adding custom characters besides the default ones.

You can start by making an XML file with the character's corresponding name and put it in ``./data/dialogue/characters/``.

Here's what Boyfriend's data looks like:
```xml
<character x="285">
	<anim name="normal" anim="normal" fps="24" />
</character>
```

We'll quickly go through the parameters here, for ``character``:
- ``name`` which defines the internal name used for scripting.
- ``x`` and ``y`` define it's position in-game.
- ``sprite`` is the name of the sprite in the files. *(keep in mind if you set this to point to a sparrow spritesheet it will automatically make an animation of all the frames in the spritesheet)*
- ``textSound`` determines what sound the character should play when it speaks. *(takes from the ``./sounds`` folder)*

Other options include:
- ``skewx`` and ``skewy`` skewes the sprite.
- ``antialiasing`` determines whether or not the sprite has antialiasing. *(true by default)*
- ``width`` and ``height`` determine the width and height of the sprite's hitbox. *(does not affect the sprite itself)*
- ``scale``, ``scalex`` and ``scaley`` are size multipliers for the sprite's width and height. *(setting it to 2 means double the size)*
- ``graphicSize``, ``graphicSizex`` and ``graphicSizey`` determine the width and height of the sprite.
- ``updateHitbox`` determines whether or not to update the sprite's hitbox.
- ``alpha`` is the "opacity" of the sprite
- ``color`` tints the sprite in the color you set it to *(example #FF0000 will tint the sprite in full red)*
- ``playOnCountdown`` tells the sprite whether or not to play it's animation during countdown or not.
- ``beatInterval, beatOffset``, honestly, I don't even know what this shit is okay.

As for the ``anim`` nodes, these are the parameters:
- ``name`` defines the internal name of the animation *(used for scripting)*
- ``anim`` is the prefix for finding the animation in the spritesheet.
- ``indices`` indicates which frames to play from the previously found frames.
- ``type`` determines the type of the animation. either ``beat`` or ``loop``.
- ``fps`` is the framerate of your animation.
- ``x`` and ``y`` are the animation offset. *(offset is only applied when the animation is played)*
- ``forced`` whether or not to force animation playback while a different one is already playing.
- ``loop`` to make your animation loop.

*(if you think this is familiar yes this is basically the same as making a sprite in a stage.)*

### Setting up Dialogue Boxes.

If you feel like also customizing boxes, fret not because you can also change that as well. *(although this is gonna be a bit more advanced than the last 2)*

You can start by making an XML file with the box's corresponding name and put it in ``./data/dialogue/boxes/``.

The default box's XML data looks like this:
```xml
<dialoguebox y="75">
	<!--
		Node containing all text settings
	-->
	<text font="vcr.ttf" x="107" y="206" width="1053" color="#000000" size="40"/>

	<!--
		All positions for characters
	-->
	<charpos name="left" x="-500" y="184" flipBubble="true" />
	<charpos name="middle" x="0" y="184" />
	<charpos name="right" x="500" y="184" />

	<!--
		All animations for the dialogue box
		For example, if you wanna add an "angry" animation, add an animation named "angry" (box idle), and "angry-open" (not needed, for box apparition)
	-->
	<anim name="normal" anim="speech bubble normal" fps="24" loop="true" x="-30"/>
	<anim name="normal-open" anim="Speech Bubble Normal Open" fps="24" />

	<anim name="angry" anim="AHH speech bubble" fps="24" loop="true" y="60"/>
	<anim name="angry-open" anim="speech bubble loud open" fps="24"  y="60"/>
</dialoguebox>
```

There's a lot to unpack but we'll go over each step in understanding this.

The ``dialoguebox`` node parameters and also the ``anim`` node parameters are exactly like the Dialogue Character ones *(such as ``sprite`` for dialoguebox)*, so we'll skip those. *(keep in mind if you make an animation with an ``-open`` at the end it will be used as an opening animation)*.

For the ``text`` node, which is required for this Dialogue Box to be considered valid, has the following parameters:
- ``x`` and ``y`` to change the positioning of the text in the box.
- ``width`` to determine the width of the field.
- ``color`` for coloring the text.
- ``size`` to determine the size of the text *(default is `20`)*.
- ``font`` to determine the font that the text should use *(picks up the font from ``./fonts``)*.
- ``antialiasing`` to determine whether or not your text should use antialiasing.
- ``borderStyle`` determines if it has a border and which type of border the text should use *(``outline``, ``shadow``, ``outline_fast`` or ``none``)*.
    - ``borderQuality`` for determining the quality of the border.
    - ``shadowOffsetX`` and ``shadowOffsetY`` for offseting the shadow *(if selected that style)*.
    - ``borderSize`` for sizing the border.
    - ``borderColor`` for coloring the border.

Now, for the ``charpos`` node, it's pretty simple, these are the parameters:
- ``name`` is the name of the position.
- ``x`` and ``y`` is for the position itself, i guess.
- ``flipBubble`` determines if the Dialogue Box itself should flip for the character.