---
author: Nex_isDumb
desc: This page explains how to use Cutscenes/Dialogue Scripts in your mod!
lastUpdated: 2024-10-13T22:48:19.093Z
title: Cutscenes/Dialogue Scripts
---
# Cutscenes/Dialogue Scripts

Cutscenes/Dialogue Scripts make Scripted Cutscenes/Dialogues possible!

For the both of them: you can start them manually with also with custom prefix through other scripts using the ``startCutscene`` PlayState function or other ways that will be said down below.<br>
For more advanced users: if you even want to avoid using the ``startCutscene`` function you can play with classes like <syntax lang="haxe">VideoCutscene</syntax>, <syntax lang="haxe">ScriptedCutscene</syntax> and etc; check the source code!

## Cutscenes

You can automatically start a scripted cutscene by placing the script in ``./song/YOUR SONG/cutscene.hx``.

The cutscenes code is rather simple to recreate, you can find the most simple examples in Tankman's songs and a bit of advanced ones inside Roses and Thorns: if you checked Roses you can also understand that the game automatically detects for scripts that are named as ``end-cutscene.hx`` like with any other cutscenes as it was already said in <a href="../../cutscenes-dialogues.md">Cutscenes and Dialogues</a>.

The code has SOME functions that can be found in the substates behaviour referenced in the <a href="../script-calls.md">All of the script calls</a> page, such as ``create``, ``destroy``, ``stepHit`` and more.<br>
*(I'd recommend to actually mainly use ``destroy`` to for example destroy some eventual sprites, stop some eventual timers or such as the cutscene COULD get skipped and so end/finish prematurely)*

Important functions to use when coding the scripted cutscene:
- <syntax lang="haxe">close();</syntax> - Closes the scripted cutscene.
- <syntax lang="haxe">startVideo(path:String, ?callback:Void->Void);</syntax> - Starts a Video Cutscene and uses an optional ``callback`` whenever it ended. You can check if it's done through the boolean variable ``isVideoPlaying``.
- <syntax lang="haxe">startDialogue(path:String, ?callback:Void->Void);</syntax> - Starts a Dialogue Cutscene and uses an optional ``callback`` whenever it ended. You can check if it's done through the boolean variable ``isDialoguePlaying``.

## Dialogues

Dialogue Scripts behave a little bit differently than Scripted Cutscenes.

(to be finished, maybe should create a new cutscene section for teh dialogue ones since there are also boxes and dialogue character scripts)