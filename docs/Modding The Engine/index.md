# Modding The Engine

To start modding the engine, you simply make a folder in ``./mods``. It's really that simple, as making a mod does not require any setup.

As for the next steps, we will cover those in this documentation as well.

For starters, we have to know what a mod structure looks like. A mod with all the folders and files available looks something like this:
- ### songs
    - example song
        - song
            - Inst.ogg
            - Voices.ogg
            - Voices-dad.ogg
            - Voices-bf.ogg
            - Inst-hard.ogg
            - Voices-hard.ogg
            - Voices-dad-hard.ogg
            - Voices-bf-hard.ogg
        - charts
            - easy.json
            - normal.json
            - hard.json
            - example custom difficulty.json
        - scripts
            - modchart.hx
            - example script.hx
        - meta.json
- ### data
    - characters
        - example character.xml
        - example character.hx
    - stages
        - example stage.xml
        - example stage.hx
    - notes
        - example notetype.hx
    - splashes
        - example splashes.xml
    - dialogue
        - boxes
            - example box.xml
            - example box.hx
        - characters
            - example portrait.xml
            - example portrait.hx
    - config
        - credits.xml
        - discord.json
        - menuItems.txt
        - options.xml
    - titlescreen
        - introText.txt
        - titlescreen.xml
    - weeks
        - weeks
            - example week.xml
        - characters
            - example character.xml
        - weeks.txt
- images
- fonts
- sounds
- music
- shaders
- videos