# List of all script calls

## All states/substates

### preCreate(), create(), postCreate()

### preUpdate(elapsed:Float), update(elapsed:Float), postUpdate(elapsed:Float)

### stepHit(curStep:Int), beatHit(curBeat:Int), measureHit(curMeasure:Int)

### onFocus(), onFocusLost()

### draw(event:DrawEvent), postDraw(event:DrawEvent)

The ``event`` has no parameters but can be cancelled

### onStateSwitch(event:StateEvent), onOpenSubState(event:StateEvent)

The ``event`` in question has the following parameter:
- ``substate`` which represents the state/substate it's about to open

### onResize(event:ResizeEvent)

The ``event`` in question has the following parameters:
- ``width`` and ``height`` which represents the new width and height of the game.
- ``oldWidth`` and ``oldHeight`` which represents the old width and height of the game.

### destroy()

## PlayState.hx

### onStageXMLParsed(event:StageXMLEvent), onStageNodeParsed(event:StageNodeEvent)

### onPreGenerateStrums(event:AmountEvent), onPostGenerateStrums(event:AmountEvent)

### onStrumCreation(event:StrumCreationEvent), onPostStrumCreation(event:StrumCreationEvent)

### onNoteCreation(event:NoteCreationEvent), onPostNoteCreation(event:NoteCreationEvent)

### onStartCountdown(event:CancellableEvent), onPostStartCountdown()

### onCountdown(event:CountdownEvent), onPostCountdown(event:CountdownEvent)

### onSongStart(), onStartSong(), onSongEnd()

### onInputUpdate(event:InputSystemEvent), onPostInputUpdate()

### onRatingUpdate(event:RatingUpdateEvent)

### onPlayerHit(event:NoteHitEvent), onDadHit(event:NoteHitEvent), onNoteHit(event:NoteHitEvent)

### onPlayerMiss(event:NoteMissEvent)

### onCameraMove(event:CamMoveEvent)

### onEvent(event:EventGameEvent)

### onSubstateOpen(event:StateEvent), onSubstateClose(event:StateEvent)

### onGamePause(event:CancellableEvent)

### onGameOver(event:GameOverEvent), onPostGameOver(event:GameOverEvent)

### onVocalsResync()

## Global Scripts

### focusLost(), focusGained()

more coming soon