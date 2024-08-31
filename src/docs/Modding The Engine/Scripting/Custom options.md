# Custom Options
You may find it useful to have custom options specific to your mod, thankfully you can do just that!

To get started, put a file in `data/config` called `options.xml` in whatever folder your mod resides in.

> [!NOTE]  
> You can also put these into an addon, but do note that addons currently override mod options (as of writing)!

There is a template ready for you in `assets/data/config/options.xml`, here's what it looks like:

```xml
<menu name="Mod Options" desc="Modify mod options here">
	<checkbox id="checkboxExample" name="Checkbox example" />
	<number id="numberExample" name="Number example" min="0" max="10" change="1"/>
	<choice id="choiceExample" name="Choice Example">
		<value name="Disabled" value="disabled"/>
		<value name="This only" value="thisOnly"/>
		<value name="All" value="all"/>
	</choice>

	<menu name="Submenu Example" desc="Submenu test">
		<checkbox id="levelOfIdk2" name="Level of idk" />
	</menu>
</menu>
```
I recommend just dumping this template into your `options.xml` file, and going off of that.

It will look something like this in-game:
<img src="./Custom options.png"/>

# Option Types
You're likely wondering: "how does each type of option work?"
That's what is about to be explained!!

All option types (except for `menu`) share 2 common properties:
- `id` - The ID of the option to pull from save data (which we cover just below this section!)
- `name` - This is the name of the option displayed on screen

### Here's what the properties for each type are:

- `menu` - A menu to put your options into, you can have sub-menus inside of them aswell
    - `name` - This is the name of the menu displayed on screen
    - `desc` - This is the description of the menu displayed on screen

- `checkbox` - Makes a checkbox to toggle an option on and off
    - There is no properties, this is the simplest an option can get

- `number` - Self-explanatory i think
    - `min` - The minimum value this number is allowed to stay at
    - `max` - The maximum value this number is allowed to stay at
    - `change` - How much this number is allowed to change by, could be in 5s, 10s, etc

- `choice` - A multiple choice option, which can cycle through several given values
    - `value` - A value that can be chosen
        - `name` - This is the name of the value displayed on screen
        - `value` - This is the actual data/value applied to the option when chosen

# Save Data
You may have noticed that none of the option types have a default value property,
this is because you have to set the default values in a global script.


This is rather easy to do, put this in `data/global.hx`:
```haxe
function create() {
    // FlxG.save is your mod's savedata
    if(FlxG.save.data.myOptionID == null)
        FlxG.save.data.myOptionID = "defaultValue";
}
```

> [!WARNING]  
> You have to do this otherwise your options won't save correctly!