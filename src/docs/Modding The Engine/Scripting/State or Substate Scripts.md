# State/Substate Scripts
State/Substate Scripts are scripts that can change any state or substate of the game.<br>
You can change the Main Menu, the Freeplay Menu and even the Chart Editor.

## Modifying a pre-existing State/Substate

To get started, make a Script in ``./data/states`` and name it corresponding to the state/substate you want to change.

For example, if you decide to change the Main Menu, make a Script like this ``./data/states/MainMenuState.hx``<br>
A basic Main Menu modification looks like this:
```haxe
function postCreate() {
    forceCenterX = false; // disable the code that centers the menu buttons.
    for (i=>button in menuItems.members) {
        button.x += Math.sin(i) * 300; // move buttons
    }
}
```
This code results in the menu looking like this.
<img src="./State or Substate Scripts.png"/>

You can do this with every State/Substate of course, but keep in mind you have to study the state's code first before modifying it. *(you can find the code in <a href="https://github.com/FNF-CNE-Devs/CodenameEngine">Codename Engine's Repository</a>)*<br>
*Also look for <a href="./All of the script calls.md">All of the script calls</a> for menu script calls*

## Creating custom States/Substates

You can also create entirely custom ones too! By putting them in the same ``./data/states/`` folder, you create new ModStates/ModSubstates.

Accessing them is done via this piece of code:
```haxe
FlxG.switchState(new ModState("MyCustomState")); // assuming we have made a new Script ./data/states/MyCustomState.hx
```
or this code
```haxe
openSubstate(new ModSubstate("MyCustomSubstate")) // assuming we have made a new Script ./data/states/MyCustomSubstate.hx
```