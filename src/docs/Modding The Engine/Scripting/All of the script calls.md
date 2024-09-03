# List of all script calls

## All states/substates

### preCreate(), create(), postCreate()

### preUpdate(elapsed:Float), update(elapsed:Float), postUpdate(elapsed:Float)

### stepHit(curStep:Int), beatHit(curBeat:Int), measureHit(curMeasure:Int)

### onFocus(), onFocusLost()

### draw(event:DrawEvent), postDraw(event:DrawEvent)

### onStateSwitch(event:StateEvent)

### onOpenSubState(event:StateEvent)

### onResize(event:ResizeEvent)

### destroy()

## PlayState.hx

### onStageXMLParsed, onStageNodeParsed

### onPreGenerateStrums, onPostGenerateStrums

### onStrumCreation, onPostStrumCreation

### onNoteCreation, onPostNoteCreation

### onStartCountdown, onPostStartCountdown

### onCountdown, onPostCountdown

### onSongStart, onStartSong, onSongEnd

### onInputUpdate, onPostInputUpdate

### onRatingUpdate

### onPlayerHit, onDadHit, onNoteHit

### onPlayerMiss

### onCameraMove

### onEvent

### onSubstateOpen, onSubstateClose

### onGamePause

### onGameOver, onPostGameOver

### onVocalsResync

## Global Scripts

### focusLost(), focusGained()