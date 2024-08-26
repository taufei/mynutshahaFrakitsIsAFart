# Additional Chart Editor Features

while we have only covered the basic of charting in <a href="./index.md">Creating songs</a>, we will cover the additional chart editor features here, in no particular order.

## Strumlines.
### More than 2.
Songs in Codename Engine are more modular, in the sense that you're no longer restricted to just 2 strumlines. This means that, you can have as many strumlines and characters in the song as you like. Moreover, Girlfriend also gets her own strumline.

<img src="Chart Editor Features.png"/>

### Moving around.
This is only an in-editor thing, but if you don't like how the Strumlines are ordered, or you're left handed, you can change the order of them easily with just this lock button.<br>
(insert a gif here)
### Hitsounds
Pretty self explanatory, but you get to choose which Strumline should play a Hitsound when you get past a Note.

<img src="Chart Editor Features-1.png"/>

### Waveforms.
Waveforms allows for visualizing songs, and we have that too. You get 2 or more options depending on how many audio files you have in the songs.

<img src="Chart Editor Features-2.png"/>

<img src="Chart Editor Features-3.png"/>

### Editing Strumlines Data.
Strumlines have more options than usual, being able to do things without scripting them in.

<img src="Chart Editor Features-4.png"/>

- <b>Characters</b>, is where you input your characters. As you can see, you can have more than one character per Strumline.
- <b>Type</b>, is where you determine the type of the strumline. Player makes the Strumline playable by a player, while Opponent and Additional makes the Strumline be handled by a CPU.
- <b>Stage positioning</b>, is where you select where the Strumline characters will be placed, pretty self-explanatory.
- <b>Scale and HUD position</b>, is where you set the scale of the strumline and the position in the HUD. <i>(keep in mind when setting the HUD positioning, the X axis is determined by a float, aka. 0.25 is Opponent side, 0.75 is Player side, and 0.5 is the middle point, while y axis uses actual positioning)</i>
- <b>Visible</b> determines whether or not your Strumline shows up in the song. If you have it disabled, your Strumline will cease to exist <i>(though your notes will be intact and still play)</i>.
- <b>Scroll Speed and that switch with a long name in it</b> determines if this Strumline should use a scroll speed, separately from the other Strumlines.
- <b>Vocal Suffix</b> is covered in <a href="#multi-vocals">Multi Vocals</a>.

## Events & Notetypes.
### Events
Events exist in the Chart Editor to avoid coding a lot of code for just a few events. Some of them are already built-in but you can also code your own <i>(see <a href="../Scripting/PlayState Scripts/Events or Notetype Scripts.md">Events/Notetype Scripts</a>)</i>.

<img src="Chart Editor Features-5.png"/>
<img src="Chart Editor Features-6.png"/>

Each event has it's own parameters, instead of a pre-established number of parameters. <br> Events are also stackable, without having to painstakingly putting them close together.

<img src="Chart Editor Features-8.png"/>
<img src="Chart Editor Features-7.png"/>

Events are also movable.<br>
(insert gif of moving events)

### Notetypes

<img src="Chart Editor Features-9.png"/>

You can code your own notetypes, or use the pre-existing one <i>(though only 2 exists currently)</i>. They need to first be added to the Notetypes list before being able to use them. Afterwards you can simply select them from the dropdown here.

<img src="Chart Editor Features-10.png"/>

You can also change the graphic of a Notetype without programming, by putting the Notetype's spritesheet in ``images/game/notes``.

## Changing additional chart/meta data.

<img src="Chart Editor Features-12.png"/>

If you wish to change some data regarding the chart <i>(scroll speed, bpm, stage etc.)</i>, you can do so here.

### Editing chart data.

<img src="Chart Editor Features-13.png"/>

Editing chart data has only 2 options, and they're self explanatory.

### Editing metadata information.

<img src="Chart Editor Features-14.png"/>

Editing metadata information, is also self-explanatory, though you can notice this menu is similar to what you've seen in <a href="./index.md">Creating songs</a>, so this should be easy to figure out. Though you might also notice there's a new option, <b>Custom Values</b>. These are extra values that let's you set certain values specifically for the song <i>(for example, crediting someone for a song)</i>. This will be covered in <a href="../Scripting/PlayState Scripts/Gameplay Scripts.md">Gameplay Scripts</a>.

## Saving.

The chart editor allows for multiple ways to save a chart. Currently, there's about 10 ways to save the information of a chart.

<img src="Chart Editor Features-11.png"/>

We know what the first option does, but what about those other ones? Well, here's what they do:
- <b>Save Without Events</b> saves the chart without saving it's events.
- <b>Save Events Separately</b> saves the events in a separate file, which gets parsed on any difficulty chart you play on. <i>(Note that if you used this you have to also use <b>Save Without Events</b>, otherwise you will face issues with duplicate events)</i>
- <b>Save Meta</b> saves the meta into a separate file.
- <b>Export For FNF Legacy</b> saves the chart in a format that is supported by other FNF engines.
- <b>Save For Psych Engine</b> saves the chart specifically in Psych Engine's format.