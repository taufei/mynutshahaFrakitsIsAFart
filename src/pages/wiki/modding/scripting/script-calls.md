---
author: Frakits
desc: This page contains a list of all script calls
lastUpdated: 2024-09-10T13:10:47.000Z
title: All script calls
---
# List of all script calls

## All states/substates

### <syntax lang="haxe">preCreate()</syntax>, <syntax lang="haxe">create()</syntax>, <syntax lang="haxe">postCreate()</syntax>

### <syntax lang="haxe">preUpdate(elapsed:Float)</syntax>, <syntax lang="haxe">update(elapsed:Float)</syntax>, <syntax lang="haxe">postUpdate(elapsed:Float)</syntax>

### <syntax lang="haxe">stepHit(curStep:Int)</syntax>, <syntax lang="haxe">beatHit(curBeat:Int)</syntax>, <syntax lang="haxe">measureHit(curMeasure:Int)</syntax>

### <syntax lang="haxe">onFocus()</syntax>, <syntax lang="haxe">onFocusLost()</syntax>

### <syntax lang="haxe">draw(event:DrawEvent)</syntax>, <syntax lang="haxe">postDraw(event:DrawEvent)</syntax>

The ``event`` has no parameters but can be cancelled

### <syntax lang="haxe">onStateSwitch(event:StateEvent)</syntax>, <syntax lang="haxe">onOpenSubState(event:StateEvent)</syntax>

The ``event`` in question has the following parameter:
- ``substate`` which represents the state/substate it's about to open

### <syntax lang="haxe">onResize(event:ResizeEvent)</syntax>

The ``event`` in question has the following parameters:
- ``width`` and ``height`` which represents the new width and height of the game.
- ``oldWidth`` and ``oldHeight`` which represents the old width and height of the game.

### <syntax lang="haxe">destroy()</syntax>

## PlayState.hx

### <syntax lang="haxe">onStageXMLParsed(event:StageXMLEvent)</syntax>, <syntax lang="haxe">onStageNodeParsed(event:StageNodeEvent)</syntax>

### <syntax lang="haxe">onPreGenerateStrums(event:AmountEvent)</syntax>, <syntax lang="haxe">onPostGenerateStrums(event:AmountEvent)</syntax>

### <syntax lang="haxe">onStrumCreation(event:StrumCreationEvent)</syntax>, <syntax lang="haxe">onPostStrumCreation(event:StrumCreationEvent)</syntax>

### <syntax lang="haxe">onNoteCreation(event:NoteCreationEvent)</syntax>, <syntax lang="haxe">onPostNoteCreation(event:NoteCreationEvent)</syntax>

### <syntax lang="haxe">onStartCountdown(event:CancellableEvent)</syntax>, <syntax lang="haxe">onPostStartCountdown()</syntax>

### <syntax lang="haxe">onCountdown(event:CountdownEvent)</syntax>, <syntax lang="haxe">onPostCountdown(event:CountdownEvent)</syntax>

### <syntax lang="haxe">onSongStart()</syntax>, <syntax lang="haxe">onStartSong()</syntax>, <syntax lang="haxe">onSongEnd()</syntax>

### <syntax lang="haxe">onInputUpdate(event:InputSystemEvent)</syntax>, <syntax lang="haxe">onPostInputUpdate()</syntax>

### <syntax lang="haxe">onRatingUpdate(event:RatingUpdateEvent)</syntax>

### <syntax lang="haxe">onPlayerHit(event:NoteHitEvent)</syntax>, <syntax lang="haxe">onDadHit(event:NoteHitEvent)</syntax>, <syntax lang="haxe">onNoteHit(event:NoteHitEvent)</syntax>

### <syntax lang="haxe">onPlayerMiss(event:NoteMissEvent)</syntax>

### <syntax lang="haxe">onCameraMove(event:CamMoveEvent)</syntax>

### <syntax lang="haxe">onEvent(event:EventGameEvent)</syntax>

### <syntax lang="haxe">onSubstateOpen(event:StateEvent)</syntax>, <syntax lang="haxe">onSubstateClose(event:StateEvent)</syntax>

### <syntax lang="haxe">onGamePause(event:CancellableEvent)</syntax>

### <syntax lang="haxe">onGameOver(event:GameOverEvent)</syntax>, <syntax lang="haxe">onPostGameOver(event:GameOverEvent)</syntax>

### <syntax lang="haxe">onVocalsResync()</syntax>

## Global Scripts

### <syntax lang="haxe">focusLost()</syntax>, <syntax lang="haxe">focusGained()</syntax>

more to be documented soon