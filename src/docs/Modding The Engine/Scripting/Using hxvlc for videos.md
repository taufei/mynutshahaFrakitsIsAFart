# Using hxvlc for videos

Using hxvlc, you can display videos anywhere, and can be used as a sprite as well.

To get started, you get 2 choices:
- ``FlxVideo`` which runs based on flash bitmap, and
- ``FlxSpriteVideo`` which runs based on an FlxSprite.

Using an FlxVideo looks something like this:
```hx
var video:FlxVideo = new FlxVideo();
video.onEndReached.add(function():Void
{
	video.dispose();

	FlxG.removeChild(video);
});
FlxG.addChildBelowMouse(video);

if (video.load(Paths.video("video")))
	new FlxTimer().start(0.001, (_) -> video.play());
```
And using an FlxVideoSprite looks like this:
```hx
var video:FlxVideoSprite = new FlxVideoSprite(0, 0);
video.antialiasing = true;
video.bitmap.onFormatSetup.add(function():Void
{
 	if (video.bitmap != null && video.bitmap.bitmapData != null)
 	{
 		final scale:Float = Math.min(FlxG.width / video.bitmap.bitmapData.width, FlxG.height / video.bitmap.bitmapData.height);

		video.setGraphicSize(video.bitmap.bitmapData.width * scale, video.bitmap.bitmapData.height * scale);
	    video.updateHitbox();
 		video.screenCenter();
 	}
});
video.bitmap.onEndReached.add(video.destroy);
add(video);

if (video.load(Paths.video("video")))
	new FlxTimer().start(0.001, (_) -> video.play());
```
These will load the video ``./videos/video.mp4``, and display it on the screen.

Other thing to note is that when you type ``Paths.video("video")``, keep in mind that you can write the extension next to the path, which let's you load filetypes other than .mp4.

*(btw tiny thing to also note is that if your video suffers from huge filesize i recommend using .webm instead of .mp4)*