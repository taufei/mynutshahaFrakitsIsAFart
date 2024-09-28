# README

### Guidelines for Submitting Mods

1. **Image Resolution**
   All images provided within your mod or related to it **must** adhere to a resolution of **1280x720** or less.
   And have a aspect ratio of **16:9**.
   And have a file extension of **.jpg**. Unless the png version has a smaller file size.
   It is recommended to use a photo editing software like [Photopea](https://www.photopea.com/) to crop and resize your images.
   You can't have animated gifs or apngs.

2. **Allowed Mods**
   Only **Codename Engine mods** are allowed. Mods pull requests that do not adhere to this standard will not be accepted.

3. **Download Links**
   Providing a full build download link is **discouraged**. Please refrain from including direct links to full builds. Unless your mod is a **hardcoded Codename Engine mod**.

4. **Mod Pack Link**
   If possible, provide a link to a **mod pack** that consolidates your mod with others for easier integration.

5. **Hardcoded Codename Engine Mods**
   - If your mod is a **hardcoded Codename Engine mod**, you **must provide a link** to its source code.
   - In this case, you are **not required** to provide a mod pack link.
   - Additionally, make sure to add the tag `"hardcoded"` to your `meta.json` file for proper categorization.

6. **Softcoded Codename Engine Mods**
   - If your mod is a **softcoded Codename Engine mod**.
   - In this case, you **must provide a mod pack link**.
   - Additionally, make sure to add the tag `"softcoded"` to your `meta.json` file for proper categorization.

7. Unreleased mods
   - If your mod is **not yet released**, you must set the `version` field to `"unreleased"`.
   - and add the tag `"upcoming"` to your `meta.json` file for proper categorization.

8. Correct timestamps
   - If your mod is **not yet released**, you must set the `lastUpdated` field to `"unreleased"`.
   - If your mod is **released**, you must set the `lastUpdated` field to the date in the format `"YYYY-MM-DDThh:mm:ss.000Z"`. (Make sure its in UTC)
       - GameBanana: If the mod is on GameBanana you can use this script `document.querySelector(".DateModified time").getAttribute("datetime")` to get the correct date.
       - GameJolt: Open the Inspect Element (F12) on the relative time, and put the date in the format `"YYYY-MM-DDThh:mm:ss.000Z"`. (Make sure its in UTC)
       - GitHub: Open the latest commit and run the script: `document.querySelector("relative-time").getAttribute("datetime")`
   - If you dont know how to get the correct date, you can use this website https://dencode.com/date/iso8601?v=Put%20the%20date%20here&tz=UTC&decimal-separator=%2E then use the value from ISO8601 Date (Extend) to get the correct date.

9. Tags
   - Only moderators can add these specific tags to mods.
       - `featured` - Mods that are featured on the website.
       - `best` - Mods that are the best of all time.
### Thank you for your contribution!