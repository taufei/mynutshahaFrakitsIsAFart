# Custom Classes

Custom classes can be made either inside the script you need it in or you can make a script file coresponding with the name of the class in ``./source``, and using `import` to import it.

Here is a basic Song Script code that uses it:
```hx
class SpecialSprite extends FlxSprite {
    public var customValue:String = null;
    public function new(x:Float, y:Float, customValue:String) {
        super(x, y);
        this.customValue = customValue;
        //other code stuff
    }

    public override function update(elapsed) {
        super.update(elapsed);
    }
}

function create() {
    var spr = new SpecialSprite(200, 400, "powerful");
    add(spr);
}
```

### Particularities
As of writing this, this system is very limited and also presents some defects. For example:
- You cannot extend FlxGroups or other typed classes *(the ones that end with a ``<T>``)*.
- Certain classes like FlxText needs to have their ``update`` function manually called.
- all variables need to be public in order to be accessed inside the class.